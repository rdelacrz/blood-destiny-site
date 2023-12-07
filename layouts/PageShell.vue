<template>
  <div class='page-wrapper' :style="{'background-image': `url(${background})`}">
    <img id='bottomLeftBloodSplatter' class='desktop' :src='bottomLeft' alt='Bottom Left Blood Splatter' width='535' height='509' />
    <img id='upRightBloodSplatter' class='desktop' :src='upRight' alt='Up Right Blood Splatter' width='397' height='379' />
    <PageHeader />
    <main class='page-content-wrapper container'>
      <VueQueryHydrate>
        <slot></slot>
      </VueQueryHydrate>
    </main>
  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent, defineComponent } from 'vue';
import { mapState } from 'vuex';
import { } from '@/contexts';
import { useStore } from '@/store';

import background from '@/assets/images/backgrounds/site_background.png';
import bottomLeft from '@/assets/images/graphics/blood_bottom_left.png';
import upRight from '@/assets/images/graphics/blood_up_right.png';

export default defineComponent({
  name: 'page-layout',
  components: {
    PageHeader: defineAsyncComponent(() => import('./Header.vue')),
    VueQueryHydrate: defineAsyncComponent(() => import('./VueQueryHydrate.vue')),
  },
  computed: {
    ...mapState(['popupParam']),
  },
  data() {
    return {
      background,
      bottomLeft,
      upRight,
    }
  },
  mounted() {
    const store = useStore();
    if (store.state.popupParam?.isActive) {
      store.commit('setPopupState', null);
    }
  }
});
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$bkgd_opacity: 0.7;

.page-wrapper {
  position: relative;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 1.875em;
  &::before {
    position: absolute;
    background: rgba(black, $bkgd_opacity);
    content: "";
    height: 100%;
    width: 100%;
  }
  #bottomLeftBloodSplatter {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: $bkgd_opacity;
  }
  #upRightBloodSplatter {
    position: absolute;
    top: 0;
    right: 0;
    opacity: $bkgd_opacity;
  }
  .page-content-wrapper {
    flex: 1;
    z-index: 1;
    padding: 0 20px;
  }
}
</style>