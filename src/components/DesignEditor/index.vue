<script lang="tsx">
import { computed, defineComponent, provide, ref, watch} from "vue";
import { DeviceTypes, MaterialTypes } from "../../types/index";
import { ArrowDown } from '@element-plus/icons-vue';
import { useStore } from "../../store";
import { SET_CUR_MATERIAL_TYPE, SET_DEVICE, SET_PREVIEW_VISIABLE } from "../../store/actionTypes";

import { DRAG_INFO_KEY, EDITOR_KEY, ROOT_KEY } from "./injectKeys";
import { useComponentTree, useDragInfo } from "./hooks";

import editorConfig from "./editorConfig";

import Editor from "./Editor";
import EditorPc from "./EditorPc.vue";
import EditorMobile from "./EditorMobile.vue";
import EditorMaterialList from "./EditorMaterialList.vue";
import EditorRightPanel from "./EditorRightPanel.vue";
import EditorPreview from "./EditorPreview.vue";

import { normalizeVNode } from "./utils";
import { renderVNode } from "@/utils";


let editor: Editor = new Editor();
for (const [namespace, componentList] of Object.entries(editorConfig)) {
  for (const comp of componentList) {
    editor.addComponent(comp.key, namespace, comp);
  }
}

export default defineComponent({
  name: "DesignEditor",

  components: {
    EditorPc,
    EditorMobile,
    ArrowDown,
    EditorMaterialList,
    EditorRightPanel,
    EditorPreview
  },  

  setup () {
    const store = useStore();
    const root = useComponentTree();
    const dragInfo = useDragInfo();
    const genTpl = ref<string>('');

    const device = computed(() => store.state.device);
    const curMaterialType = computed({
      get () {
        return store.state.curMaterialType;
      },
      set (type: MaterialTypes) {
        store.dispatch(SET_CUR_MATERIAL_TYPE, type);
      }
    });

    const handleCommand = (command: DeviceTypes) => store.dispatch(SET_DEVICE, command);
    const handlePreviewClick = () => store.dispatch(SET_PREVIEW_VISIABLE);
    const handlePreviewDialogOpen = () => {
      const nVnode = normalizeVNode(root);
      genTpl.value = renderVNode(nVnode);
      console.log(genTpl.value);
    }

    provide(EDITOR_KEY, editor);
    provide(DRAG_INFO_KEY, dragInfo);
    provide(ROOT_KEY, root);

    return () => (
      <div class="design-editor">
        <div class="common-layout">
          <el-container>
            <el-aside width="250px" class="material-area">
              <el-tabs class="demo-tabs" v-model={ curMaterialType.value }  >
                <el-tab-pane label="组件" name={ MaterialTypes.COMPONENT }><EditorMaterialList></EditorMaterialList></el-tab-pane>
                <el-tab-pane label="模板" name={ MaterialTypes.TEMPLATE }></el-tab-pane>
              </el-tabs>
            </el-aside>
            <el-main class="preview-area">
              <el-row gutter={ 20 }>
                <el-col span={ 12 } offset={ 6 }>
                  <el-row class="preview-nav">
                    <el-col span={ 8 }>
                      <div class="preview-nav-item">
                        <el-dropdown class="device-types" trigger="click" onCommand={ handleCommand }>
                        {{
                          default: () => (
                            <span class="el-dropdown-link">
                              <span>{ device.value }</span>
                              <el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                          ),
                          dropdown: () => (
                            <el-dropdown-menu>
                              <el-dropdown-item command={ DeviceTypes.PC }>PC</el-dropdown-item>
                              <el-dropdown-item command={ DeviceTypes.MOBILE }>Mobile</el-dropdown-item>
                            </el-dropdown-menu>
                          )
                        }} 
                        </el-dropdown>
                      </div>
                    </el-col>
                    <el-col span={ 4 }><div class="preview-nav-item" onClick={ handlePreviewClick }>预览</div></el-col>
                    <el-col span={ 4 }><div class="preview-nav-item">清空</div></el-col>
                    <el-col span={ 4 }><div class="preview-nav-item">导入</div></el-col>
                    <el-col span={ 4 }><div class="preview-nav-item">导出</div></el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="preview-content">
                { 
                  device.value === DeviceTypes.PC ? 
                    <editor-pc></editor-pc> : 
                    <editor-mobile></editor-mobile>
                }
              </el-row>
              <editor-preview tpl={ genTpl.value } onOpen={ handlePreviewDialogOpen }></editor-preview>
            </el-main>
            <el-aside width="300px" class="attr-area">
              <editor-right-panel></editor-right-panel>
            </el-aside>
          </el-container>
        </div>
      </div>
    );
  }
});
</script>

<style lang="scss" scoped>
.design-editor {
  height: 100vh;

  .material-area {
    padding: 10px;
    background-color: #fff;
  }

  .preview-area{
    $boxFillColor: #dfdfdf;

    padding: 10px;
    background-color: #fff;
    background-image: linear-gradient(45deg, $boxFillColor 25%, transparent 25%, transparent 75%, $boxFillColor 75%, $boxFillColor),
    linear-gradient(45deg, $boxFillColor 25%, transparent 25%, transparent 75%, $boxFillColor 75%, $boxFillColor);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;

    .preview-nav {
      height: 50px;
      border-radius: 8px;
      overflow: hidden;

      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-color: #000;
        color: #fff;
        cursor: pointer;
        user-select: none;
        border-right: 1px solid #666;
      }
    }

    .preview-content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 50px);
      padding: 20px 8px;
    }
  }

  .attr-area {
    padding: 10px;
  }
}

.device-types {
  width: 100%;
  height: 100%;
}

.el-dropdown-link {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  .el-icon {
    margin-left: 1em;
  }
}
</style>