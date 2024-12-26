<template>
  <div :class="['p-[10px] border', {'border-crimson': active, 'border-transparent': !active}]">
    <AppBaseLink :href="to" :class="[
      'font-poppins leading-6 uppercase transition-color ease-in-out duration-300', 
      {
        'text-crimson ': active,
        'text-white hover:text-crimson-light': !active,
        'pointer-events-auto': allowNavigation,
        'pointer-events-none': !allowNavigation,
      }
    ]">
      <slot />
    </AppBaseLink>
  </div>
</template> 

<script setup lang="ts">
import AppBaseLink from "@/components/clickable-elements/AppBaseLink.vue";
import { useClientSideRendering, usePageContext } from "@/hooks";
import { computed } from "vue";

const allowNavigation = useClientSideRendering();

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