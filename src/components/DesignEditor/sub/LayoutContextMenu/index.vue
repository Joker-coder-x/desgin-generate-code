<script lang="tsx">
import { defineComponent } from "vue";

  export default defineComponent({
    name: "LayoutContextMenu",

    setup () {
      return () => {
        return (
          <el-card class="box-card">
            {
              Array(4).fill(0).map((_) => {
                return (
                   <div key={ _ } class="text item">{ 'List item ' + _ }</div>
                )
              })
            }
          </el-card>
        );
      }
    }
  });
</script>

<style lang="scss" >
</style>