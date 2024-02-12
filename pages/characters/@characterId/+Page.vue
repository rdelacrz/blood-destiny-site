<template>
  <div class="py-20 grid gap-20 grid-rows-1 grid-cols-2">
    <div class="self-center">
      <h2 class="text-4xl font-semibold mb-4">
        {{character.name}}
      </h2>
      <div v-html="character.description" class="injected-html" />
    </div>
    <div ref="sectionContainer" class="self-center justify-self-center flex items-center justify-center
        before:absolute before:block before:h-[700px] before:w-[700px] before:p-10
        before:bg-gradient-radial before:from-crimson before:from-1% before:to-70% before:opacity-40"
      >
      <img 
        :class="[
          'relative max-h-[700px] transition-all duration-500',
          showCharacter
            ? 'top-0 opacity-100'
            : 'top-[-50px] opacity-0'
        ]"
        :src="character.fullImg" 
        :alt="character.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { usePageContext } from '@/hooks';
import { getCharacter } from "@/utilities";
import { useGoTo } from "vuetify";

const pageContext = usePageContext();
const character = computed(() => getCharacter(pageContext.routeParams?.characterId));

const sectionContainer = ref<HTMLDivElement>();
const showCharacter = ref(false);

const goTo = useGoTo();

onMounted(() => {
  if (sectionContainer.value) {
    goTo(sectionContainer.value);
  }
  setTimeout(() => {
    showCharacter.value = true;
  }, 500);
});

</script>