import { DeviceTypes, IBaseContextMenuInfo, IState, MaterialTypes } from "../types";
import { SET_BASE_CONTEXT_MENU_INFO, SET_CUR_MATERIAL_TYPE, SET_DEVICE, SET_PREVIEW_VISIABLE } from "./actionTypes";

export default {
  [SET_CUR_MATERIAL_TYPE] (state: IState, type: MaterialTypes): void {
    state.curMaterialType = type;
  },
  [SET_DEVICE] (state: IState, type: DeviceTypes): void {
    state.device = type;
  },
  [SET_PREVIEW_VISIABLE] (state: IState, visiable: boolean) {
    state.previewVisiable = visiable;
  },
  [SET_BASE_CONTEXT_MENU_INFO] (state: IState, info: IBaseContextMenuInfo) {
    state.baseContextMenuInfo = { ...info };
  }
}