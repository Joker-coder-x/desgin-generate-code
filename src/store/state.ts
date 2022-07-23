import { createComponentVNode } from "@/components/DesignEditor/utils";
import { DeviceTypes, DisplayMap, IState, IVNode, MaterialTypes } from "../types";

const root = createComponentVNode({
  label: "根容器",
  key: "root-container",
  display: DisplayMap.BLOACK,
  __root: true,
  render: (): IVNode => ({
    type: 'div',
    props: {
      class: "root-container"
    }
  })
});

export default {
  device: DeviceTypes.PC,
  curMaterialType: MaterialTypes.COMPONENT,
  previewVisiable: false,
  root,
  baseContextMenuInfo: {
    x: 0,
    y: 0,
    visiable: true
  }
} as IState;