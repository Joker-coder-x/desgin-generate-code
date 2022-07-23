<script lang="tsx">
import { useStore } from "@/store";
import { computed, defineComponent, PropType, Teleport } from "vue";
import { useBaseContextInfo } from "../../hooks";

export default defineComponent({
  name: "BaseContextMenuWrapper",

  setup(props, { slots }) {
    const [info, setContextInfo] = useBaseContextInfo();
   
    const styles = computed(() => {
      return {
        left: info.value.x + 'px',
        top: info.value.y + 'px'
      }
    });
    const handleClickOutSide = () => {
      setContextInfo(false);
    }

    return () => {
      return (
        <Teleport to="body">
          <div 
            v-preventcontextmenu 
            v-show={ info.value.visiable } 
            v-clickoutside={ handleClickOutSide }
            style={ styles.value } 
            class="base-conext-menu--wrapper"
          >
            { slots.default && slots.default() }
          </div>
        </Teleport>
      );
    }
  }
});
</script>

<style lang="scss" scoped>
  .base-conext-menu--wrapper {
    position: fixed;
    z-index: 999;
  }
</style>