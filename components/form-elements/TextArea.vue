<template>
  <textarea :id='id' :value='value' @input="$emit('update:value', $event.target.value)" :required='required'
    :class="{'text-area-field form-element': true, [inputClass]: !!inputClass}" :placeholder='placeholder' />
</template>

<script>
export default {
  name: 'textarea-field',
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
    required: {
      type: Boolean,
      required: false,
    },
  },
  emits: ['update:value'],
}
</script>