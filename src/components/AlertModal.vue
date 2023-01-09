<template>
  <modal name='alert-modal' class='alert-modal-wrapper'>
    <div>test</div>
  </modal>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'alert-modal',
  computed: {
    popupParam() {
      const store = useStore();
      return store.state.popupParam;
    },
  },
  watch: {
    popupParam: function() {
      if (this.popupParam?.isActive) {
        (this as any).$modal.show('alert-modal');
      } else {
        (this as any).$modal.hide('alert-modal');
      }
    }
  },
  methods: {
  },
})
</script>

<style scoped lang='scss'>
.alert-modal-wrapper {
  
}
</style>
