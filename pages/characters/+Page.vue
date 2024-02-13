<template>
  <div class="py-20">
    <h2 class="font-prosto-one text-[4rem] text-center text-6xl mb-8">Playable Characters</h2>
    <p class="font-poppins text-center max-w-[900px] w-full mx-auto mb-20">
      The following characters are members of the main cast who play a pivotal role in the story and are
      controllable by the player within the various battles of the visual novel.
    </p>
    <div class="grid gap-x-5 gap-y-12 grid-rows-6 md:grid-rows-3 xl:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="(character, index) in characterList">
        <div class="bg-blue-dark border border-crimson shadow-glow shadow-crimson mb-8">
          <img :src="character.topImg" :alt="character.name" />
        </div>
        <div class="font-poppins text-2xl mb-2">{{ character.name }}</div>
        <div v-html="character.description" class="font-poppins mb-4 line-clamp-3" />
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