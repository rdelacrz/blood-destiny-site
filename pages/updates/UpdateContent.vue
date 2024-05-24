<template>
  <div class="pt-4 pb-20">
    <template v-if="isLoading">
      <Loader />
    </template>
    <div v-for="(update, i) in displayedUpdates" :key="update.postId" 
      :class="[
        'py-8 grid gap-20 grid-rows-1 grid-cols-1 lg:grid-cols-2',
        i < displayedUpdates.length - 1 ? 'border-b border-white' : undefined
      ]"
    >
      <div :class="['self-center', i % 2 === 1 ? 'order-last' : undefined]">
        <h2 class="font-prosto-one text-[2.5rem] mb-4">
          {{update.title}}
        </h2>
        <div class="font-poppins text-xl text-crimson font-semibold mb-2">
          {{formatDate(update.date)}}
        </div>
        <div v-html="update.description" class="font-poppins injected-html" />
      </div>
      <div class="hidden lg:flex self-center justify-self-center items-center justify-center 
        h-[400px] lg:h-[600px] w-[400px] lg:w-[600px]
        before:absolute before:block before:h-[400px] before:lg:h-[600px] before:w-[400px] before:lg:w-[600px] before:p-10
        before:bg-gradient-radial before:from-crimson before:from-1% before:to-70% before:opacity-40"
      >
        <img class="relative" :src="updateCover" alt ="Update Cover" />
      </div>
    </div>
    <Pagination v-model:currentPage="currentPage" :total="totalPages" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onServerPrefetch } from "vue";
import { format } from "date-fns";
import { useQuery } from "@tanstack/vue-query";
import { onLoad } from "./UpdateContent.telefunc";

import updateCover from "@/assets/images/graphics/updates/update_cover.png";

import Loader from "@/components/Loader.vue";
import Pagination from "@/components/Pagination.vue";

const MAX_DISPLAY_PER_PAGE = 3;

// Queries data
const { data: updateList, isLoading, suspense } = useQuery({
  queryKey: ["getUpdatePosts"],
  queryFn: async () => await onLoad(),
});
onServerPrefetch(suspense);

const currentIndex = ref(0);

const displayedUpdates = computed(() => updateList.value?.slice(currentIndex.value, currentIndex.value + MAX_DISPLAY_PER_PAGE) || []);

const currentPage = computed({
  get() {
    return Math.floor(currentIndex.value / MAX_DISPLAY_PER_PAGE) + 1;
  },
  set(page: number) {
    currentIndex.value = (page - 1) * MAX_DISPLAY_PER_PAGE;
  }
});

const totalPages = computed(() => {
  const count = updateList.value?.length || 0;
  const fullPages = Math.floor(count / MAX_DISPLAY_PER_PAGE);
  const remainder = count % MAX_DISPLAY_PER_PAGE;
  return remainder === 0 ? fullPages : fullPages + 1;
});

const formatDate = (date: Date) => {
  if (date) {
    try {
      return format(date, "LLL-dd-yyyy hh:mm:ss aa");
    } catch(e) {
      console.error(e);
    }
  }
  return date;
}
</script>