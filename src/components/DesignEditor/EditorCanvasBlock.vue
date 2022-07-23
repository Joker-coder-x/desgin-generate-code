<script lang="tsx">
import { isString } from '@/utils/index';
import { defineComponent, PropType } from 'vue';
import { IComponent } from '@/types';
import { renderComponent, renderElement } from './utils';

const EditorCanvasBlock = defineComponent({
  name: "EditorCanvasBlock",

  props: {
    node: {
      type: Object as PropType<IComponent>,
      required: true
    }
  },

  setup(props) {
    const vnode = props.node;

    return () =>{
      // 如果是内置的布局组件
      if (vnode.componentConfig.__layout) {
        return renderComponent(vnode);
      }

      if (vnode.__root) {
        return renderElement(vnode);
      }

      return (
        <div 
          class="editor-canvas-block" 
          style={{ display: vnode.componentConfig.display }}>
          {
            isString(vnode.type) 
              ? renderElement(vnode) 
              : renderComponent(vnode)
          }
        </div>
      )
    } 
  },
});

export default EditorCanvasBlock;
</script>


<style lang="scss" scoped>
.editor-canvas-block {
  position: relative;
  cursor: move;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  &:hover {
    outline: 1px solid blue;
  }
}
</style>