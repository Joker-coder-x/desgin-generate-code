import { Component, ComponentOptions, DefineComponent, Ref } from "vue";

export * from "./store";

export type ScopeSlotHandler = (scope?: Record<string, any>) => any;

export interface ISlots {
  [prop: string]: ScopeSlotHandler | undefined;
  default?: ScopeSlotHandler;
}

export enum DeviceTypes {
  PC = "PC",
  MOBILE = "MOBILE"
};

export enum DisplayMap {
  INLINE_BLOCK = "inline-block",
  BLOACK = "block",
  INLINE = "inline",
};

export interface IComponentConfig {
  key: string;
  label: string;
  render: () => IVNode;
  display: DisplayMap;
  __layout?: boolean;
  __builtIn?: boolean;
  __root?: boolean;
}

export interface IComponent {
  uid: string;
  __root: boolean;
  componentConfig: IComponentConfig;
  type: Component | string;
  props: Record<string, any>;
  slots?: ISlots | null;
  children?: IComponent[];
}

export interface IVNode {
  type: Component | string;
  slots?: ISlots | null;
  props: Record<string, any>;
  children?: IVNode[]
}

export interface IDragInfo {
  dragTarget: Ref<IComponentConfig | null>;
  setDragTarget: (c: IComponentConfig | null) => void;
}

export interface ITreeNode {
  label: string
  children?: ITreeNode[]
}

export type NormalizeVnodeHandler = (vnode: IComponent) => INormalizedVNode;

export interface INormalizedVNode  {
  type: string | { tag: string };
  props: Record<string, any>;
  slots: Record<string, any>;
  children: (INormalizedVNode | string )[];
}


export interface ITransferableComponentOptions extends ComponentOptions {
  transform: (vnode: IComponent, normalizeVnode: NormalizeVnodeHandler) => INormalizedVNode;
}

export type ComponentConfigRecord = Record<string, IComponentConfig>;
export type ComponentConfigMap = Record<string, IComponentConfig[]>;