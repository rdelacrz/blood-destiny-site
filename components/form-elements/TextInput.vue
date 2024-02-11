<template>
  <input :id='id' :value='value' @input="handleInputChange" :type='type' :required='required'
    :class="{'text-input-field form-element': true, [`${inputClass}`]: !!inputClass}" :placeholder='placeholder' />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'text-input-field',
  props: {
    id: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    inputClass: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    required: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['update:value'],
  methods: {
    handleInputChange(event: Event) {
      const target = <HTMLInputElement> event.target;
      this.$emit('update:value', target.value);
    },
  }
});
</script>