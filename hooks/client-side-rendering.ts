import { onMounted, Ref, ref } from "vue";

export function useClientSideRendering(): Ref<boolean> {
  const isClientSideRendered = ref(false);
  onMounted(() => {
    isClientSideRendered.value = true;
  });
  return isClientSideRendered;
}