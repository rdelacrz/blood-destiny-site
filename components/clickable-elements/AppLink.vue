<template>
  <div :class="['p-[10px] border', {'border-crimson': active, 'border-transparent': !active}]">
    <a :href="to" :class="[
        'font-poppins leading-6 uppercase transition-color ease-in-out duration-300', 
        {'text-crimson ': active, 'text-white hover:text-crimson-light': !active}
      ]"
    >
      <slot></slot>
    </a>
  </div>
</template> 

<script setup lang="ts">
import { usePageContext } from "@/hooks";
import { computed } from "vue";

const props = defineProps<{
  linkClass?: string;
  to: string;
}>();

const pageContext = usePageContext();

const active = computed(() => {
  const { urlPathname } = pageContext;
  return props.to === "/" ? urlPathname === props.to : urlPathname?.startsWith(props.to);
});
</script>