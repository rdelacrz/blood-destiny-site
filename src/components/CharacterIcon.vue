<template>
  <button :class="{'character-icon-wrapper': true, 'selected': selected}" @click='onIconClick'>
    <div class='character-icon-container'>
      <img class='character-icon' :src='icon' />
    </div>
  </button>
</template>

<script lang='ts'>
export default {
  name: 'character-icon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    selected: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    onIconClick() {
      this.$emit('select');
    }
  }
}
</script>

<style scoped lang='scss'>
$diameter: 100px;

.character-icon-wrapper {
  background: none;
  border: none;
  outline: none;
  .character-icon-container {
    position: relative;
    background: rgba(#F9F9F9, 0.22);
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
    height: $diameter;
    width: $diameter;
    overflow: hidden;
    transition: box-shadow 0.3s ease-in-out;
  }
  &.selected {
    .character-icon-container {
      border: solid 1px white;
      &::before {
        position: absolute;
        content: "";
        background: rgba(#6C1209, 0.4);
        display: block;
        height: 100%;
        width: 100%;
      }
    }
  }
  &:focus, &:hover {
    .character-icon-container {
      box-shadow: 0 0 6px 3px white;
    }
  }
}
</style>
