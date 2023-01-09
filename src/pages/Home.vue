<template>
  <Page wrapperClass='home-wrapper container'>
    <div class='home-content-wrapper'>
      <div class='website-title-text'>
        Blood<br />Destiny
      </div>
      <div class='caption-text general-text'>
        Prepare to venture into a fascinating new world with supernatural elements, mysterious agendas, and unexpected twists.
      </div>
      <AppButton id='downloadBtn' buttonType='download' @click='handleDownloadClick'>Download</AppButton>
    </div>
  </Page>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: "home",
  components: {
    Page: defineAsyncComponent(() => import('@/layouts/Page.vue')),
    AppButton: defineAsyncComponent(() => import('@/components/clickable-elements/AppButton.vue')),
  },
  data() {
    return {
      pageTitle: 'Blood Destiny',
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
.home-wrapper {
  .website-title-text {
    color: white;
    font-family: 'Broadway';
    font-size: 110px;
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
