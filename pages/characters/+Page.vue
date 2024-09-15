<template>
  <div class="py-20">
    <h2 class="font-prosto-one text-[4rem] text-center text-6xl mb-8">Playable Characters</h2>
    <p class="font-poppins text-center max-w-[900px] w-full mx-auto mb-20">
      The following characters are members of the main cast who play a pivotal role in the story and are
      controllable by the player within the various battles of the visual novel.
    </p>
    <div class="grid gap-x-5 gap-y-12 grid-rows-6 md:grid-rows-3 xl:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-20">
      <div v-bind:key="character.id" v-for="character in primaryCharacterList">
        <div class="bg-blue-dark border border-crimson shadow-glow shadow-crimson mb-8">
          <img :src="character.topImg" :alt="character.name" />
        </div>
        <div class="font-poppins text-2xl mb-2">{{ character.name }}</div>
        <div v-html="character.description" class="font-poppins mb-4 line-clamp-3" />
        <div class="max-w-[120px]">
          <AppButton :href="`/characters/${character.id}`">
            Read More
          </AppButton>
        </div>
      </div>
    </div>
  </div>
  
  <h2 class="font-prosto-one text-[4rem] text-center text-6xl mb-8">Supporting Characters</h2>
  <p class="font-poppins text-center max-w-[900px] w-full mx-auto mb-20">
    Though not directly playable, these characters are vital to the narrative, providing the player with important
    insight and assistance throughout the story.
  </p>
  <div class="grid gap-x-5 gap-y-12 grid-rows-6 md:grid-rows-3 xl:grid-rows-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-20">
    <div v-bind:key="character.id" v-for="character in supportingCharacterList">
      <div class="bg-blue-dark border border-crimson shadow-glow shadow-crimson mb-8">
        <img :src="character.topImg" :alt="character.name" />
      </div>
      <div class="font-poppins text-2xl mb-2">{{ character.name }}</div>
      <div v-html="character.description" class="font-poppins mb-4 line-clamp-3" />
      <div class="max-w-[120px]">
        <AppButton :href="`/characters/${character.id}`">
          Read More
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { primaryCharacterList, supportingCharacterList } from "@/utilities";

const AppButton = defineAsyncComponent(() => import("@/components/clickable-elements/AppButton.vue"));
</script>