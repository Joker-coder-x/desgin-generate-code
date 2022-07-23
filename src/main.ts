import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import "./assets/styles/index.scss";
import { store, key } from "./store";

import PreventContextMenu from './plugins/PreventContextMenu';
import { ClickOutSide } from './directives';

const app = createApp(App);
  
app.use(ElementPlus)
  .use(store, key)
  .use(PreventContextMenu)
  .directive('clickoutside', ClickOutSide)
  .mount('#app');