import { onBeforeUpdate, Ref, ref, UnwrapRef } from "vue";

export default function useRefs <T>() 
: [Ref<UnwrapRef<T[]>>, (r: any, i: number) => void] 
{
  const refs = ref<T[]>([]);

  onBeforeUpdate(() => {
    refs.value =  [];
  });

  const setRefs = (ref: any, idx: number): void => {
    if (ref) {
      refs.value[idx] = ref;
    }
  };

  return [refs, setRefs];
}