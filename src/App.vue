<template>
  <div>
    <design-editor></design-editor>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import DesignEditor from "./components/DesignEditor/index.vue";

export default defineComponent({
  components: {
    DesignEditor
  },

  setup() {
    
  },
})


</script>

<style>
#app {
  height: 100%;
}

.common-layout {
  height: 100%;
}

.el-container {
  height: 100%;
}
</style>