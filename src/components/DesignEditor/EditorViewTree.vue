<script lang="tsx">
import { IComponent } from '@/types';
import { computed, defineComponent, inject } from 'vue'
import { ROOT_KEY } from './injectKeys';
import { normalizeTreeData } from './utils';

export default defineComponent({
  name: "EditorViewTree",
  setup() {
    const root = inject(ROOT_KEY) as IComponent;
    const data = computed(() => [normalizeTreeData(root)]);
    const defaultProps = {
      children: 'children',
      label: 'label',
    };

    return () => {
      return (
        <el-tree data={ data.value } props={ defaultProps } />
      );
    }
  },
})
</script>
