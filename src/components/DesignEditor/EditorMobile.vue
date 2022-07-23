<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "EditorMobile",

  setup() {
    return () => (
      <div class="editor-mobile">

      </div>
    );
  },
})
</script>

<style lang="scss" scoped>
.editor-mobile {
  width: 337.5px;
  height: 600px;
  background-color: #fff;
  border: 6px solid #555;
  border-radius: 10px;
  box-shadow: var(--el-box-shadow-dark);
}
</style>