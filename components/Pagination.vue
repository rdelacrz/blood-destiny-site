<template>
  <div :class="{'pagination-container': true, [`${paginationWrapper}`]: !!paginationWrapper}">
    <button class='pagination-button' @click='() => setPage(currentPage - 1)'>
      <img :src='icons.prev' alt='Previous Icon' />
    </button>

    <button v-if='total >= 1' :class='buttonClass(1)' @click="$emit('update:currentPage', 1)">
      1
    </button>

    <button v-if='currentPage >= maxDisplay && total > maxDisplay' class='pagination-button' @click='() => changePageSet(false)'>
      ...
    </button>

    <button v-for='page in innerPageList' :key='page' :class='buttonClass(page)' @click="$emit('update:currentPage', page)">
      {{ page }}
    </button>

    <button v-if='currentPage <= total - maxDisplay + 2 && total > maxDisplay' class='pagination-button' @click='() => changePageSet(true)'>
      ...
    </button>

    <button v-if='total >= 2' :class='buttonClass(total)' @click="$emit('update:currentPage', total)">
      {{ total }}
    </button>

    <button class='pagination-button' @click='() => setPage(currentPage + 1)'>
      <img :src='icons.next' alt='Next Icon' />
    </button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import prev from '@/assets/images/icons/icon_previous.png';
import next from '@/assets/images/icons/icon_next.png';

export default defineComponent({
  props: {
    paginationWrapper: {
      type: String,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
    maxDisplay: {
      type: Number,
      default: 5,
    },
  },
  emits: ['update:currentPage'],
  data() {
    return {
      icons: {
        prev,
        next,
      },
    };
  },
  computed: {
    numOfInnerPages() {
      return Math.min(this.maxDisplay, this.total) - 2;   // Max page number of displays - first and last page displays
    },
    firstInnerPage() {
      if (this.currentPage < this.maxDisplay) {
        return 2;
      }
      if (this.currentPage > this.total - this.numOfInnerPages) {
        return this.total - this.numOfInnerPages;
      }
      return this.currentPage - (this.currentPage % this.numOfInnerPages);
    },
    lastInnerPage() {
      if (this.currentPage > this.total - this.numOfInnerPages) {
        return this.total - 1;
      }
      return this.firstInnerPage + this.numOfInnerPages - 1;
    },
    innerPageList() {
      if (this.total <= 2) {
        return [];
      }

      const pageNumbers: number[] = [];
      for (let page = this.firstInnerPage; page <= this.lastInnerPage; page++) {
        pageNumbers.push(page);
      }
      
      return pageNumbers;
    },
  },
  methods: {
    setPage(page: number) {
      if (page < 1) {
        page = 1;
      } else if (page > this.total) {
        page = this.total;
      }
      this.$emit('update:currentPage', page);
    },
    changePageSet(forward: boolean) {
      let page: number;
      if (forward) {
        page = this.lastInnerPage < this.total ? this.lastInnerPage + 1 : this.total;
      } else {
        page = this.firstInnerPage > 1 ? this.firstInnerPage - 1 : 1;
      }
      this.$emit('update:currentPage', page);
    },
    buttonClass(page: number) {
      return {'pagination-button': true, 'current': page === this.currentPage};
    },
  }
});
</script>