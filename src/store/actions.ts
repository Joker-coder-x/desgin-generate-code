import { Commit } from "vuex";
import { 
  DeviceTypes, 
  IBaseContextMenuInfo, 
  IState, 
  MaterialTypes 
} from "../types";
import { 
  SET_BASE_CONTEXT_MENU_INFO, 
  SET_CUR_MATERIAL_TYPE, 
  SET_DEVICE, 
  SET_PREVIEW_VISIABLE 
} from "./actionTypes";

interface ICtx {
  commit: Commit;
  state: IState;
}

export default {
  [SET_CUR_MATERIAL_TYPE] ({ commit }: ICtx, type: MaterialTypes): void {
    commit(SET_CUR_MATERIAL_TYPE, type);
  },
  [SET_DEVICE] ({ commit }: ICtx, type: DeviceTypes): void {
    commit(SET_DEVICE, type);
  },
  [SET_PREVIEW_VISIABLE] ({ commit, state }: ICtx, visiable?: boolean) {
    if (visiable === undefined) {
      commit(SET_PREVIEW_VISIABLE, !state.previewVisiable);
    } else {
      commit(SET_PREVIEW_VISIABLE, visiable);
    }
  },
  [SET_BASE_CONTEXT_MENU_INFO] ({ commit }: ICtx, info: IBaseContextMenuInfo) {
    commit(SET_BASE_CONTEXT_MENU_INFO, info);
  }
}