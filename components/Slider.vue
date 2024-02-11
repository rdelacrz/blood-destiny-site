<template>
  <input
    :class="['relative appearance-none w-full bg-white rounded-md', hideThumb && 'hide-thumb']"
    type="range"
    :style="{'background': `linear-gradient(to right, #FF0000 ${progress}%, white ${progress}%)`, height}"
    :min="min || 0" 
    :max="max" 
    :step="step" 
    :value="value" 
    @input="handleSliderChange" 
    @change="handleSliderChange" 
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  min?: number | string;
  max?: number | string;
  step?: number | string;
  value: number | string;
  hideThumb?: boolean;
  height?: string | number;
}>();

const emits = defineEmits(["update"]);

const progress = computed(() => {
  const max = parseFloat(props.max?.toString() || "0");
  const value = parseFloat(props.value?.toString() || "0");
  return value / max * 100;
});

const handleSliderChange = (event: Event) => {
  const target = <HTMLInputElement> event.target;
  emits("update", target.value);
}
</script>

<style scoped lang="scss">
input[type=range] {
  @include range-thumb-styles() {
    background: #D9D9D9;
    border-radius: 50%;
    height: 16px;
    width: 16px;
    cursor: pointer;
  }
  &.hide-thumb {
    @include range-thumb-styles() {
      visibility: hidden;
    }
  }
}
</style>