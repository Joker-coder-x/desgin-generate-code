import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'vue': "vue/dist/vue.esm-bundler.js"
    },
    extensions: ['.ts', '.tsx', '.js', '.vue']
  },
  plugins: [
    vue({
     
    }),
    vueJsx({})
  ]
})
