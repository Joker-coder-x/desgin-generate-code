import { App } from "vue";
import TestBoard from "./src/index.vue";

TestBoard.install = (app: App): void => {
  app.component(TestBoard.name, TestBoard);
};

export default TestBoard;