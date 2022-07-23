<script lang="tsx">
import { defineComponent, inject, ref } from 'vue';
import { DRAG_INFO_KEY, EDITOR_KEY } from './injectKeys';
import { IComponent, IComponentConfig, IDragInfo } from '../../types';

import Editor from './Editor';

export default defineComponent({
  emits: ['changeDragTarget'],
  setup(props,  { emit }) {
    const editor = inject(EDITOR_KEY) as Editor;
    const dragInfo = inject(DRAG_INFO_KEY) as IDragInfo;
    const componentMap = editor.getComponentMap();
    const activeNames = ref<string[]>(Object.keys(componentMap));
    const handleChange = (val: string[]) => activeNames.value = val;
    const handleDragStart = (e: DragEvent, component: IComponentConfig) => {
      dragInfo.setDragTarget(component);
    }

    return () => (
      <el-collapse v-model={activeNames.value} onChange={ handleChange }>
        {
          Object.entries(componentMap).map(([key, componentList]) => {
            return (
              <el-collapse-item name={key} key={key}>
                {{
                  title: () => (<h3>{key}</h3>),
                  default: () => (
                    <div class="component-list">
                      {
                        componentList.map(component => {
                          return (
                            <div class="component-item" key={component.key}>
                              <div 
                                class="component-item-content" 
                                draggable="true"
                                onDragstart={ (e: DragEvent) => handleDragStart(e, component) as any }>
                                <span>{component.label}</span>
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  )
                }}
              </el-collapse-item>
            );
          })
        }
      </el-collapse>
    )
  },
})
</script>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  user-select: none;

  .component-item {
    width: 50%;
    padding: 4px;
    box-sizing: border-box;

    &-content {
      padding: 5px 10px;
      background: #efefef;
      color: #424242;
      font-size: .95em;
      cursor: move;
      box-sizing: border-box;

      &:hover {
        outline: 1px solid blue;
      }
    }
  }
}
</style>
