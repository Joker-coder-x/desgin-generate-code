import { computed, ComputedRef, inject, reactive, Ref, ref } from "vue";
import { IComponentConfig, IComponent, IVNode, DisplayMap, IDragInfo, IBaseContextMenuInfo } from "@/types";
import { DRAG_INFO_KEY } from "../injectKeys";
import { createComponentVNode } from "../utils";
import { SET_BASE_CONTEXT_MENU_INFO, useStore } from "@/store";

export function useDragInfo (): IDragInfo {
  const dragTarget = ref<IComponentConfig | null>(null);
  const setDragTarget = (component: IComponentConfig | null): void => {
    dragTarget.value = component;
  }

  return {
    dragTarget,
    setDragTarget
  };
}

export function useDragTarget ()
: Ref<IComponentConfig | null> 
{
  return (inject(DRAG_INFO_KEY) as IDragInfo).dragTarget;
}

export function useComponentTree (): IComponent {
  const root = reactive(createComponentVNode({
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
  }));

  return root;
}

export function useBaseContextInfo ():
 [ComputedRef<IBaseContextMenuInfo>, typeof setContextMenuInfo] 
{
  const store = useStore();
  const info = computed(() => store.state.baseContextMenuInfo);
  
  function setContextMenuInfo(visiable: boolean): void;
  function setContextMenuInfo(x: number, y: number): void;
  function setContextMenuInfo(x: number, y: number, visiable: boolean): void;
  function setContextMenuInfo(...args: (number| boolean)[]): void {
    let x: number,
        y: number,
        visiable: boolean;

    if (args.length === 1) {
      visiable = args[0] as boolean;
      store.dispatch(SET_BASE_CONTEXT_MENU_INFO, {
        ...info.value,
        visiable
      });
    } else if (args.length === 2) {
      [x, y] = args as number[];
      store.dispatch(SET_BASE_CONTEXT_MENU_INFO, {
        ...info.value,
        x,
        y
      });
    } else if (args.length === 3) {
      [x, y, visiable] = args as [number, number, boolean];
      store.dispatch(SET_BASE_CONTEXT_MENU_INFO, {
        x,
        y,
        visiable
      });
    }
  }

  return [info, setContextMenuInfo];
}