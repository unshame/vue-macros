<script setup lang="ts">
import DefineRenderVue from './examples/define-render/index.vue'
import DefineOptionsVue from './examples/define-options/index.vue'
import DefinePropsVue from './examples/define-props/index.vue'
import DefinePropsRefsVue from './examples/define-props-refs/index.vue'
import HoistStaticVue from './examples/hoist-static/index.vue'
import DefineModelReactivityVue from './examples/define-models/reactivity-transform/parent.vue'
import DefineModelRuntimeVue from './examples/define-models/runtime/parent.vue'
import DefineSlotsVue from './examples/define-slots/parent.vue'
import ExportPropsVue from './examples/export-props/index.vue'
import ExportExposeVue from './examples/export-expose/index.vue'
import BetterDefineVue from './examples/better-define/index.vue'
// import NamedTemplateVue from './examples/named-template/index.vue'
import SetupBlockVue from './examples/setup-block/index.vue'

import DefinePropVue from './examples/define-prop/index.vue'
import DefineEmitVue from './examples/define-emit/index.vue'

import { SetupComponentFoo } from './examples/setup-component'

import SetupSFC from './examples/setup-sfc/index.setup'
import ShortVmodel from './examples/short-vmodel/parent.vue'
import Full from './examples/full.setup'
</script>

<template>
  <div grid="~ cols-3 gap2">
    <fieldset>
      <legend>defineOptions</legend>
      <DefineOptionsVue />
    </fieldset>

    <fieldset>
      <legend>defineRender</legend>
      <DefineRenderVue />
    </fieldset>

    <fieldset>
      <legend>defineProps</legend>
      <DefinePropsVue />
    </fieldset>

    <fieldset>
      <legend>definePropsRefs</legend>
      <DefinePropsRefsVue />
    </fieldset>

    <fieldset>
      <legend>exportProps</legend>
      <ExportPropsVue />
    </fieldset>

    <fieldset>
      <legend>exportExpose</legend>
      <ExportExposeVue />
    </fieldset>

    <fieldset>
      <legend>hostStatic</legend>
      <HoistStaticVue />
    </fieldset>

    <fieldset>
      <legend>namedTemplate</legend>
      <!-- <NamedTemplateVue /> -->
      TODO
    </fieldset>

    <fieldset>
      <legend>defineModels</legend>
      <DefineModelReactivityVue />
      <hr />
      <DefineModelRuntimeVue />
    </fieldset>

    <fieldset>
      <legend>defineSlots</legend>
      <DefineSlotsVue />
    </fieldset>

    <fieldset>
      <legend>betterDefine</legend>
      <BetterDefineVue />
    </fieldset>

    <fieldset>
      <legend>setupComponent</legend>
      <SetupComponentFoo />
    </fieldset>

    <fieldset>
      <legend>setupSFC</legend>
      <SetupSFC />
    </fieldset>

    <fieldset>
      <legend>setupBlock</legend>
      <SetupBlockVue />
    </fieldset>

    <fieldset>
      <legend>Short v-model</legend>
      <short-vmodel />
    </fieldset>

    <fieldset>
      <legend>Full example</legend>
      <Full model-value="123" />
    </fieldset>

    <fieldset>
      <legend>defineProp</legend>
      <DefinePropVue />
    </fieldset>

    <fieldset>
      <legend>defineEmit</legend>
      <DefineEmitVue />
    </fieldset>
  </div>
</template>

<style>
legend {
  font-family: monospace;
  font-size: 16px;
  font-weight: bold;
}
</style>
