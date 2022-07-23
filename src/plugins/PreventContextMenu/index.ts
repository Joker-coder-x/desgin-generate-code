import { App } from "vue"
import preventContextMenu from "./preventContextMenu";

function install (app: App) {
  app.directive('preventcontextmenu', preventContextMenu);
}

export default {
  install
};