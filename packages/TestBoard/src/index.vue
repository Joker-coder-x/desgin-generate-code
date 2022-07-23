<template>
  <div class="test-board">
    <h1 :style="{ color: color }">Test Board</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "TestBoard",

  props: {
    color: String
  },

  setup() {
    
  },
})
</script>
