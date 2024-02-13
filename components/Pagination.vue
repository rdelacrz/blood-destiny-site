<template>
  <div class="w-full text-center">
    <v-btn v-bind="getButtonProps()" @click='() => setPage(currentPage - 1)'>
      <FontAwesomeIcon :icon="faArrowLeft" />
    </v-btn>

    <v-btn v-bind="getButtonProps(1)" v-if='total >= 1' @click="setPage(1)">
      <span>1</span>
    </v-btn>

    <v-btn v-bind="getButtonProps()" v-if='currentPage >= maxDisplay && total > maxDisplay' @click='() => changePageSet(false)'>
      <span>...</span>
    </v-btn>

    <v-btn v-bind="getButtonProps(page)"  v-for='page in innerPageList' :key='page' @click="setPage(page)">
      <span>{{ page }}</span>
    </v-btn>

    <v-btn v-bind="getButtonProps()" v-if='currentPage <= total - maxDisplay + 2 && total > maxDisplay' @click='() => changePageSet(true)'>
      <span>...</span>
    </v-btn>

    <v-btn v-bind="getButtonProps(total)" v-if='total >= 2' @click="setPage(total)">
      <span>{{ total }}</span>
    </v-btn>

    <v-btn v-bind="getButtonProps()" @click='() => setPage(currentPage + 1)'>
      <FontAwesomeIcon :icon="faArrowRight" />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  total: {
    type: Number,
    default: 1,
  },
  maxDisplay: {
    type: Number,
    default: 5,
  }
});

const currentPage = defineModel("currentPage", { type: Number, default: 1 });


/* Computed */

const numOfInnerPages = computed(() => {
  return Math.min(props.maxDisplay, props.total) - 2;   // Max page number of displays - first and last page displays
});

const firstInnerPage = computed(() => {
  if (currentPage.value < props.maxDisplay) {
    return 2;
  }
  if (currentPage.value > props.total - numOfInnerPages.value) {
    return props.total - numOfInnerPages.value;
  }
  return currentPage.value - (currentPage.value % numOfInnerPages.value);
});

const lastInnerPage = computed(() => {
  if (currentPage.value > props.total - numOfInnerPages.value) {
    return props.total - 1;
  }
  return firstInnerPage.value + numOfInnerPages.value - 1;
});

const innerPageList = computed(() => {
  if (props.total <= 2) {
    return [];
  }

  const pageNumbers: number[] = [];
  for (let page = firstInnerPage.value; page <= lastInnerPage.value; page++) {
    pageNumbers.push(page);
  }
  
  return pageNumbers;
});


/* Functions */

const setPage = (page: number) => {
  if (page < 1) {
    page = 1;
  } else if (page > props.total) {
    page = props.total;
  }
  currentPage.value = page;
}

const changePageSet = (forward: boolean) => {
  let page: number;
  if (forward) {
    page = lastInnerPage.value < props.total ? lastInnerPage.value + 1 : props.total;
  } else {
    page = firstInnerPage.value > 1 ? firstInnerPage.value - 1 : 1;
  }
  currentPage.value = page;
}

const getButtonProps = (page?: number) => {
  const currentPageClass = page === currentPage.value ? " bg-crimson" : "";
  return {
    class: "border border-crimson font-prosto-one leading-none text-xl rounded-[5px] mx-[0.4rem]" + currentPageClass,
    variant: "flat", 
    size: "2.5rem"
  } as any;
}

</script>
