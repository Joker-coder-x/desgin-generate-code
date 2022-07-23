import { ElButton, ElInput, ElInputNumber, ElRadio, ElRate } from "element-plus";
import { ComponentConfigMap, DisplayMap, IVNode } from "../../types";
import EditorCanvasLayout from "./EditorCanvasLayout.vue";

export default <ComponentConfigMap>{
  "layout": [
    {
      label: "栅格布局",
      key: "editor-canvas-layout",
      display: DisplayMap.BLOACK,
      __layout: true,
      render: (): IVNode => ({
        type: EditorCanvasLayout,
        props: {},
        slots: {}
      })
    }
  ],
  "basic": [
    {
      label: "按钮",
      key: "el-button",
      display: DisplayMap.INLINE_BLOCK,
      render: (): IVNode => ({
        type: ElButton,
        props: {},
        slots: {
          default: () => "按钮"
        }
      })
    },
  ],
  "form": [
    {
      label: "单行输入",
      key: "el-input",
      display: DisplayMap.INLINE_BLOCK,
      render: (): IVNode => ({
        type: ElInput,
        props: {
          placeholder: "请输入"
        }
      })
    },
    {
      label: "数字输入框",
      key: "el-input-number",
      display: DisplayMap.INLINE_BLOCK,
      render: (): IVNode => ({
        type: ElInputNumber,
        props: {
          placeholder: "请输入"
        }
      })
    },
    {
      label: "单选框",
      key: "el-radio",
      display: DisplayMap.INLINE_BLOCK,
      render: (): IVNode => ({
        type: ElRadio,
        props: {},
        slots: {
          default: () => "Radio Option1"
        }
      })
    },
    {
      label: "评分",
      key: "el-rate",
      display: DisplayMap.INLINE_BLOCK,
      render: (): IVNode => ({
        type: ElRate,
        props: {},
        slots: {
          default: () => "五星评分"
        }
      })
    },
  ]
}