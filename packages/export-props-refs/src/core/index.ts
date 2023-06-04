import {
  DEFINE_PROPS,
  MagicString,
  WITH_DEFAULTS,
  getTransformResult,
  isCallOf,
  parseSFC,
  importHelperFn,
} from '@vue-macros/common'
import {
  CallExpression,
  ExportNamedDeclaration,
  Expression,
  VariableDeclaration,
  type VariableDeclarator,
} from '@babel/types'

export function transformExportPropsRefs(code: string, id: string) {
  const { scriptSetup, getSetupAst } = parseSFC(code, id)
  if (!scriptSetup) return

  const offset = scriptSetup.loc.start.offset
  const s = new MagicString(code)

  const props: Record<string, { type: string; defaultValue?: string }> = {}
  let hasDefineProps = false

  function isSupported(
    declInit: Expression | null,
    declParent: VariableDeclaration
  ): declInit is CallExpression {
    return (
      declInit?.type === 'CallExpression' &&
      declInit.callee?.type === 'Identifier' &&
      declInit.callee?.name === 'ref' &&
      declParent.kind === 'const'
    )
  }

  function walkVariableDeclarator(
    decl: VariableDeclarator,
    declParent: VariableDeclaration
  ) {
    if (decl.id.type !== 'Identifier') {
      throw new Error('Only support identifier in export props refs')
    } else if (
      decl.init &&
      (isCallOf(decl.init, DEFINE_PROPS) || isCallOf(decl.init, WITH_DEFAULTS))
    ) {
      hasDefineProps = true
      return
    }

    const init = decl.init as Expression | null

    if (!isSupported(init, declParent)) {
      throw new Error(
        'Only support assigning ref<type>(defaultValue) to props in export props refs'
      )
    }

    const argument = init.arguments[0]
    const typeParam = init.typeParameters?.params[0]

    const type = typeParam ? `: ${s.sliceNode(typeParam, { offset })}` : ': any'
    const name = decl.id.name
    const defaultValue = argument
      ? s.sliceNode(argument, { offset })
      : undefined
    props[name] = { type, defaultValue }
  }

  const setupAst = getSetupAst()!
  for (const stmt of setupAst.body) {
    if (
      stmt.type === 'ExportNamedDeclaration' &&
      stmt.declaration?.type === 'VariableDeclaration'
    ) {
      for (const decl of stmt.declaration.declarations) {
        walkVariableDeclarator(decl, stmt.declaration)
      }
      s.removeNode(stmt, { offset })
    } else if (isCallOf(stmt, DEFINE_PROPS) || isCallOf(stmt, WITH_DEFAULTS)) {
      hasDefineProps = true
    }
  }

  if (Object.keys(props).length === 0) {
    return
  } else if (hasDefineProps) {
    throw new Error("Don't support export props refs mixed with defineProps")
  }

  let codegen = ''
  let destructureString = ''
  let withDefaultsString = ''
  for (const [name, { type, defaultValue }] of Object.entries(props)) {
    codegen += `  ${name}${defaultValue ? '?' : ''}${type},\n`
    destructureString += ` ${name},`
    withDefaultsString += defaultValue ? `  ${name}: ${defaultValue},\n` : ''
  }
  codegen = `withDefaults(defineProps<{\n${codegen}}>(), {\n${withDefaultsString}});
const {${destructureString} } = ${importHelperFn(
    s,
    offset,
    'toRefs'
  )}(__props);`

  s.prependLeft(offset, `\n${codegen}`)

  return getTransformResult(s, id)
}
