<script lang="tsx">
import { 
  computed,
  defineComponent, 
  inject, 
  PropType, 
  ref, 
  unref, 
  watch
} from 'vue';
import { IComponent, IDragInfo } from '../../types';
import { 
  CLEANUP_ITEMS_ACTIVE, 
  DRAG_INFO_KEY 
} from './injectKeys';
import {
  createComponentVNode
} from "./utils";

import EditorCanvasBlock from './EditorCanvasBlock.vue';
import { useBaseContextInfo } from './hooks';

export default defineComponent({
  name: "EditorCanvasLayoutItem",

  __builtIn: true,

  props: {
    parentActive: {
      type: Boolean,
      required: true
    },
    node: {
      type: Object as PropType<IComponent>,
      required: true
    }
  },  

   transform (vnode: IComponent, normalizeVNode: any) {
    return {
      type: 'div',
      props: { 
        ...vnode.props,
       style: "flex: 1;"
      },
      slots: { ...vnode.slots },
      children: vnode.children?.map(c => normalizeVNode(c))
    }
  },

  setup(props, { expose }) {
    const isActive = ref<boolean>(false);
    const cleanupItemsActive = inject(CLEANUP_ITEMS_ACTIVE) as any;
    const { dragTarget, setDragTarget } = inject(DRAG_INFO_KEY) as IDragInfo;
    const [info, setContextInfo] = useBaseContextInfo();

    const handleChnageActive = (e: MouseEvent) => {
      if (props.parentActive) {
        if (!e.shiftKey && !isActive.value) {
          cleanupItemsActive();
        }

        isActive.value = !isActive.value;
      }
    };

    watch(() => props.parentActive, (newVal) => {
      if (!newVal) {
        isActive.value = false;
      }
    });

    const setActive = (active: boolean): void => {
      isActive.value = active;
    }

    const handleDragover = (e: Event): void => {
      e.preventDefault();
    }
    const handleDrop = (): void => {
      if (dragTarget.value) {
        const componentConfig = dragTarget.value;
        console.warn(componentConfig);
        props.node.children?.push(createComponentVNode(componentConfig));
        
        setDragTarget(null);
      }
    }

    const renderder = computed(() => {
      const children = props.node.children;

      if (children && children.length) {
        return children.map((node: IComponent) => {
          return (<EditorCanvasBlock node={ node }></EditorCanvasBlock>);
        });
      } else {
        return null;
      }
    });
    const handleMousedownRight = (e: MouseEvent) => {
      e.preventDefault();
      if (e.button === 2) {
        const { clientX, clientY } = e;
        setContextInfo(clientX, clientY, true);
        
        console.log("mouse right click", e);
      }
    }

    expose({ setActive });

    return () => (
      <>
        <div 
          v-preventcontextmenu 
          class={ ['layout-item', isActive.value ? 'active' : ''].join(' ') } 
          onClick={ handleChnageActive }
          onDragover={ handleDragover }
          onDrop={ handleDrop }
          onMousedown={ handleMousedownRight }
        >
          { unref(renderder) }
        </div>
      </>
    );
  },   
})
</script>

<style lang="scss" scoped>
.layout-item {
  flex: 1;
  outline : 1px dashed rgb(0, 145, 255);


  &:hover {
    background-color: rgba(198, 228, 195, 0.644);
  }

  &.active {
    outline: 5px solid rgb(0, 81, 255);
  }
}
</style>
