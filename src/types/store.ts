import { DeviceTypes, IComponent } from ".";

export enum MaterialTypes {
  COMPONENT = "COMPONENT",
  TEMPLATE = "TEMPLATE",
}

export interface IBaseContextMenuInfo {
  x: number;
  y: number;
  visiable: boolean;
}

export interface IState {
  device: DeviceTypes;
  curMaterialType: MaterialTypes;
  root: IComponent;
  previewVisiable: boolean;
  baseContextMenuInfo: IBaseContextMenuInfo;
}
