<template>
  <select :id='id' :value='value' @input="handleSelectUpdate" :required='required'
      :class="{'select-field form-element': true, [`${inputClass}`]: !!inputClass}" :placeholder='placeholder'
      :style="{'background-image': `url(${dropdownIcon})`}">
    <option v-for='(option, index) in options' :key='index' :value='option.value'>
      {{ option.text }}
    </option>
  </select>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { OptionValueSet } from '@/models';

import dropdownIcon from '@/assets/images/icons/icon_dropdown_arrow.png';

export default defineComponent({
  name: 'select-field',
  props: {
    id: {
      type: String,
      required: false,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    options: {
      type: Array as () => OptionValueSet[],
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    inputClass: {
      type: String,
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['update:value'],
  data() {
    return { dropdownIcon };
  },
  methods: {
    handleSelectUpdate(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.$emit('update:value', target.value);
    }
  },
})
</script>