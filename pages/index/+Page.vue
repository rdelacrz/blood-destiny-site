<template>
  <div class='home-content-wrapper container'>
    <div class='website-title-text'>
      Blood<br />Destiny
    </div>
    <div class='caption-text general-text'>
      Prepare to venture into a fascinating new world with supernatural elements, mysterious agendas, and unexpected twists.
    </div>
    <!--
    <AppButton id='downloadBtn' :backgroundSrc='downloadSrc' @click='handleDownloadClick'>Download</AppButton>
    -->
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';
import buttonDownload from '@/assets/images/backgrounds/buttons/button_download.png';

export default {
  name: "home",
  components: {
    AppButton: defineAsyncComponent(() => import('@/components/clickable-elements/AppButton.vue')),
  },
  data() {
    return {
      downloadSrc: buttonDownload,
    };
  },
  methods: {
    handleDownloadClick() {
      alert('Download clicked')
    }
  }
};
</script>

<style scoped lang='scss'>
.home-content-wrapper {
  .website-title-text {
    color: white;
    font-family: 'Broadway';
    font-size: 6.875em;
    line-height: 110px;
  }
  .caption-text {
    margin-bottom: 30px;
    max-width: 600px;
  }
}
</style>

<!-- This CSS can't be scoped, otherwise Button CSS will not be affected -->
<style lang='scss'>
#downloadBtn {
  font-size: 24px;
  font-weight: 500;
  padding: 13px 21px;
  text-transform: uppercase;
}
</style>
