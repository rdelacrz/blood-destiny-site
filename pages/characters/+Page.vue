<template>
  <div class="py-20">
    <h2 class="text-center text-6xl mb-8">Playable Characters</h2>
    <p class="text-center max-w-[900px] w-full mx-auto mb-8">
      The following characters are members of the main cast who play a pivotal role in the story and are
      controllable by the player within the various battles of the visual novel.
    </p>
    <div class="grid gap-10 grid-rows-6 md:grid-rows-3 xl:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="(character, index) in characterList">
        <div class="bg-blue-dark border-2 border-crimson shadow-glow shadow-crimson mb-4">
          <img :src="character.topImg" :alt="character.name" />
        </div>
        <div class="text-2xl mb-2">{{ character.name }}</div>
        <div v-html="character.description" class="mb-4 line-clamp-3" />
        <div class="max-w-[120px]">
          <AppButton :href="`/characters/${index}`">
            Read More
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { characterList } from "@/utilities";

const AppButton = defineAsyncComponent(() => import("@/components/clickable-elements/AppButton.vue"));
</script>