<script lang="tsx">
import { ElMessage } from 'element-plus';
import { defineComponent, inject, Ref } from 'vue'
import { IComponent, IDragInfo } from '../../types';
import { DRAG_INFO_KEY, ROOT_KEY } from './injectKeys';
import { createComponentVNode, renderComponent } from './utils';

import EditorCanvasBlock from './EditorCanvasBlock.vue';
import BaseContextMenuWrapper from "./sub/BaseContextMenuWrapper/index.vue";

export default defineComponent({
  name: "EditorPc",

  setup() {
    const root = inject(ROOT_KEY) as IComponent;
    const { dragTarget, setDragTarget } = inject(DRAG_INFO_KEY) as IDragInfo;
    
    const handleDragover = (e: Event): void => {
      e.preventDefault();
    }
    const handleDrop = (): void => {
      if (dragTarget.value) {
        const componentConfig = dragTarget.value;
       
        if (componentConfig.__layout) {
          root.children?.push(createComponentVNode(componentConfig));
          setDragTarget(null);
        } else {
          ElMessage({
            message: '顶层容器必须放置layout组件!!!',
            type: 'warning'
          });
        }
      }
    }

    return () => (
      <div 
        class="editor-pc"
        onDragover={ handleDragover }
        onDrop={ handleDrop }>
          <EditorCanvasBlock node={ root }></EditorCanvasBlock>
          <BaseContextMenuWrapper>
            <div><h1>hello world</h1></div>
          </BaseContextMenuWrapper>
      </div>
    );
  },
})
</script>

<style lang="scss" scoped>
.editor-pc {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #fff;
  border: 5px solid #555;
  border-radius: 10px;
  box-shadow: var(--el-box-shadow-dark);
}
</style>