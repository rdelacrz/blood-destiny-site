<template>
  <div class='updates-wrapper container'>
    <div class='updates-content-wrapper'>
      <template v-if='isLoading'>
        Loading updates...
      </template>
      <template v-else>
        <div v-for='(update, index) in displayedUpdates' :key='index' class='update-row-wrapper'>
          <img class='update-image' :src='updateCover' alt ='Update Cover' />
          <div class='update-details-container'>
            <div class='update-title'>{{update.title}}</div>
            <div class='update-date general-text'>{{formatDate(update.date)}}</div>
            <div v-html='update.description' class='update-description general-text' />
          </div>
        </div>
      </template>
    </div>
    <Pagination paginationWrapper='updates-pagination' v-model:currentPage='currentPage' :total='totalPages' />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';
import { mapState } from 'vuex';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/vue-query';
import { getUpdatePosts } from './getUpdatePosts.telefunc';

import updateCover from '@/assets/images/graphics/updates/update_cover.png';

export default {
  name:'updates',
  components: {
    Pagination: defineAsyncComponent(() => import('@/components/form-elements/Pagination.vue')),
  },
  setup() {
    // The query should be prefetched and sent from the server
    const query = useQuery({
      queryKey: ['getUpdatePosts'],
      queryFn: getUpdatePosts,
    });
    return {
      query,
    }
  },
  data() {
    return {
      currentIndex: 0,
      maxDisplay: 3,
      updateCover,
    };
  },
  computed: {
    ...mapState(['dateUtils']),
    isLoading() {
      return this.query.isLoading.value || false;
    },
    updateList() {
      return this.query.data.value || [];
    },
    displayedUpdates() {
      return this.updateList.slice(this.currentIndex, this.currentIndex + this.maxDisplay);
    },
    currentPage: {
      get() {
        return Math.floor(this.currentIndex / this.maxDisplay) + 1;
      },
      set(page: number) {
        this.currentIndex = (page - 1) * this.maxDisplay;
      },
    },
    totalPages() {
      const count = this.updateList.length;
      const remainder = count % this.maxDisplay;
      return Math.floor(count / this.maxDisplay) + remainder;
    },
  },
  methods: {
    formatDate(date: any) {
      if (date) {
        try {
          return format(new Date(date), 'LLL-dd-yyyy hh:mm:ss aa');
        } catch(e) {
          console.error(e);
        }
      }
      return date;
    }
  }
};
</script>

<style scoped lang='scss'>
.updates-wrapper {
  max-width: 1000px;
  .updates-content-wrapper {
    margin-bottom: 20px;
    .update-row-wrapper {
      display: flex;
      margin-bottom: 40px;
      .update-image {
        margin-right: 45px;
        max-height: 153px;
        max-width: 165px;
      }
      .update-details-container {
        flex: 1;
        .update-title {
          font-family: 'Broadway';
          font-size: 28px;
        }
        .update-description {
          font-size: 16px;
        }
      }
    }
  }
}
</style>

<!-- Won't work unless scope is removed -->
<style lang='scss'>
.updates-wrapper {
  margin-bottom: 120px;
}
</style>