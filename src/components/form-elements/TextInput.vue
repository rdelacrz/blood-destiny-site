<template>
  <input :id='id' :value='value' @input="$emit('update:value', $event.target.value)" :type='type' :required='required'
    :class="{'text-input-field form-element': true, [inputClass]: !!inputClass}" :placeholder='placeholder' />
</template>

<script>
export default {
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
}
</script>

<style lang='scss'>
.text-input-field {
}
</style>