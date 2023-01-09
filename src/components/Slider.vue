<template>
  <div class='slider-container'>
    <div class='slider-progress' :style="{'width': progressWidth, 'background': sliderColor || '#FFFFFF'}" />
    <input ref='sliderElem' class='slider' type='range' 
      :min="min || 0" :max='max' :step='step' :value='value' @input='handleSliderChange' @change='handleSliderChange' />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'slider',
  props: {
    sliderColor: {
      type: String,
      required: false,
    },
    min: {
      type: [Number, String],
      required: false,
    },
    max: {
      type: [Number, String],
      required: true,
    },
    step: {
      type: [Number, String],
      required: false,
    },
    value: {
      type: [Number, String],
      required: true,
    },
  },
  emits: ['update'],
  computed: {
    progressWidth() {
      const min = parseFloat(this.min?.toString() || '0');
      const range = parseFloat(this.max?.toString() || '1') - min;
      const progressPercentage = parseFloat(this.value?.toString() || '0') / range * 100;
      return progressPercentage + '%';
    },
  },
  methods: {
    handleSliderChange(event: Event) {
      const target = <HTMLInputElement> event.target;
      this.$emit('update', target.value);
    }
  }
});
</script>

<style scoped lang='scss'>
$slider-height: 5px;

.slider-container {
  position: relative;
  display: flex;
  align-items: center;
  height: $slider-height;
  .slider-progress {
    position: absolute;
    left: 0;
    height: $slider-height;
    pointer-events: none
  }
  .slider {
    -webkit-appearance: none;
    background: #666666;
    cursor: pointer;
    height: $slider-height;
    width: 100%;
    outline: none;

    &::-moz-range-thumb {
      @include slide-thumb-styles();
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    &::-webkit-slider-thumb {
      appearance: none;
      @include slide-thumb-styles();
    }
  }
}
</style>
