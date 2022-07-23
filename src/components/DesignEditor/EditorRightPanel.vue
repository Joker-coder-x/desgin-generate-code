<script lang="tsx">
import { defineComponent, ref } from 'vue';

import EditorViewTree from "./EditorViewTree.vue";

export default defineComponent({
  name: "EditorRightPanel",

  components: {
    EditorViewTree,
  },  

  setup() {
    const activeNames = ref<string[]>(['1']);
    const handleChange = (val: string[]) => activeNames.value = val;

    return () => {
      return (
        <el-collapse v-model={ activeNames.value } onChange={ handleChange }>
          <el-collapse-item name="1">
            {{
              title: () => (<h3>组件树</h3>),
              default: () => (
                <editor-view-tree></editor-view-tree>
              )
            }}
          </el-collapse-item>
          <el-collapse-item name="2">
            {{
              title: () => (<h3>基本属性</h3>),
              default: () => (
                <>
                  <div>
                    Consistent with real life: in line with the process and logic of real
                    life, and comply with languages and habits that the users are used to;
                  </div>
                  <div>
                    Consistent within interface: all elements should be consistent, such
                    as: design style, icons and texts, position of elements, etc.
                  </div>
                </>
              )
            }}
          </el-collapse-item>
          <el-collapse-item name="3">
            {{
              title: () => (<h3>组件属性</h3>),
              default: () => (
                <>
                  <div>
                    Consistent with real life: in line with the process and logic of real
                    life, and comply with languages and habits that the users are used to;
                  </div>
                  <div>
                    Consistent within interface: all elements should be consistent, such
                    as: design style, icons and texts, position of elements, etc.
                  </div>
                </>
              )
            }}
          </el-collapse-item>
        </el-collapse>
      );
    }
  },
})
</script>
