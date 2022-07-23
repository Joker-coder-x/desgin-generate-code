<script lang="tsx">
import { useStore, SET_PREVIEW_VISIABLE } from "@/store";
import { Component, computed, defineComponent, getCurrentInstance, markRaw, ref, watch } from "vue";
import { createComponent } from "./utils";

export default defineComponent({
  name: "EditorPreview",

  props: {
    tpl: String,
  },

  setup (props) {
    const app = getCurrentInstance()?.appContext.app!;
    const store = useStore();
    const Comp = ref<Component | null>(null);
    const previewVisiable = computed({
      get (): boolean {
        return store.state.previewVisiable;
      },
      set (newVal: boolean): void {
        store.dispatch(SET_PREVIEW_VISIABLE, newVal);
      }
    });

    watch(
      () => props.tpl, 
      (newVal) => {
        if (newVal) {
          Comp.value = markRaw(createComponent(app, "PreviewComponent", props.tpl!));
        }
      },
      {
        immediate: true
      }
    );

    return () => {
      const Tag = Comp.value ? Comp.value : 'div';
      return (
        <el-dialog v-model={ previewVisiable.value } title="预览区域">
          <Tag></Tag>
        </el-dialog>
      );
    }
  }
});
</script>