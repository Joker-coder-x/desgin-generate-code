import { createStore, Store, useStore as baseUseStore } from "vuex";

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

import { IState } from "../types";
import { InjectionKey } from 'vue';

export * from "./actionTypes";

export const key: InjectionKey<Store<IState>> = Symbol();
export const store = createStore<IState>({
  state,
  mutations,
  getters,
  actions
});

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}

