<script lang="tsx">
import { DisplayMap, IComponent, INormalizedVNode, IVNode, NormalizeVnodeHandler } from '@/types';
import { defineComponent, onBeforeUpdate, onMounted, PropType, provide, ref, watch } from 'vue';
import { useRefs } from '../../hooks';
import EditorCanvasLayoutItem from './EditorCanvasLayoutItem.vue';
import { CLEANUP_ITEMS_ACTIVE, LAYOUT_ACTIVE } from './injectKeys';
import { createComponentVNode } from './utils';

export default defineComponent({
  name: "EditorCanvasLayout",

  props: {
    node: {
      type: Object as PropType<IComponent>,
      required: true
    }
  },

  setup (props) {
    const itemCount = ref<number>(3);
    const isActive = ref<boolean>(false);
    const [ itemRefs, setItemRefs ] = useRefs<typeof EditorCanvasLayoutItem>();

    const cleanupItemsActive = (): void => {
      itemRefs.value.forEach(instance => {
        instance.setActive(false);
      })
    }

    const subVnodes = Array(itemCount.value).fill(0).map(() => {
      return createComponentVNode({
        label: "栅格列",
        key: "editor-canvas-layout-item",
        display: DisplayMap.BLOACK,
        __layout: true,
        render: (): IVNode=> ({
          type: EditorCanvasLayoutItem,
          props: {}
        })
      });
    });
    props.node.children = subVnodes;

    const handleChnageActive = (): void => { isActive.value = true };
    const handleClickOutSide = (): void => {
      cleanupItemsActive();
      isActive.value = false;   
    }
    // const handleMousedownRight = (e: MouseEvent) => {
    //   if (e.button === 2) {
    //     console.log("mouse right click");
    //   }
    // }
    
    provide(CLEANUP_ITEMS_ACTIVE, cleanupItemsActive);

    return () => (
      <div 
        v-preventcontextmenu 
        v-clickoutside={ handleClickOutSide }
        class={ ['layout', isActive.value ? 'active' : ''].join(' ') } 
        onClick={ handleChnageActive }
      >
        {
          props.node.children?.map((cnode, index) => {
            return (
              <EditorCanvasLayoutItem 
                parentActive={ isActive.value } 
                ref={ (instance) => setItemRefs(instance, index) }
                node={ cnode }
              ></EditorCanvasLayoutItem>
            );
          })
        }
      </div>
    );
  },

  transform (vnode: IComponent, normalizeVNode: NormalizeVnodeHandler): INormalizedVNode {
    return {
      type: 'div',
      props: { 
        ...vnode.props,
        style: "display: flex;min-height: 30px;"
      },
      slots: { ...vnode.slots },
      children: vnode.children!.map(c => normalizeVNode(c))
    }
  }
})


</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  min-height: 30px;
  outline: 1px dashed blue;

  // &:hover {
  //   background-color: rgba(103, 161, 186, 0.322);
  //   outline: 1px solid blue;
  //   cursor: move;
  // }

  &.active {
    outline: 3px solid blue;
  }
}
</style>
