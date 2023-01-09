<template>
  <div :class='wrapperClass'>
    <div class='card-content-container front' @click='setExpansionState(true)'>
      <img :src='sketchFile' :alt='imgAltText' />
      <div class='character-name'>{{characterName}}</div>
    </div>
    <div class='card-content-container back'>
      <div class='close-button-container'>
        <button class='md-icon-button md-accent' @click='setExpansionState(false)'>
          <i class='far fa-times-circle'></i>
        </button>
      </div>
      <div class='character-name'>{{characterName}}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'character-card',
  props: {
    characterName: {
      type: String,
      required: true,
    },
    sketchFile: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    imgAltText() {
      return this.characterName + ' Card Image';
    },
    wrapperClass() {
      return {
        'character-card-wrapper': true,
        'expanded': this.$data.expanded,
      };
    }
  },
  methods: {
    setExpansionState(expanded: boolean) {
      this.expanded = expanded;
    },
  },
}
</script>

<style scoped lang='scss'>
$perspective: 600px;

.character-card-wrapper {
  position: relative;
  height: 360px;
  width: 250px;
  .card-content-container {
    position: absolute;
    backface-visibility: hidden;
    height: 100%;
    width: 100%;
    max-height: 360px;
    max-width: 250px;
    overflow: hidden;
    transition: all 0.6s;
    &.front {
      cursor: pointer;
      transform: perspective($perspective) rotateY(0deg);
      .character-name {
        position: absolute;
        bottom: 30px;
        background: rgba(black, 0.4);
        color: white;
        font-size: 26px;
        padding: 5px 5px 5px 20px;
      }
    }
    &.back {
      background: white;
      transform: perspective($perspective) rotateY(180deg);
      .close-button-container {
        padding: 5px 10px;
        text-align: right;
      }
    }
  }
  &.expanded {
    .card-content-container {
      position: fixed;
      top: 63px;
      left: 0;
      max-height: calc(100vh - 63px);
      max-width: 100vw;
      &.front {
        transform: perspective($perspective) rotateY(180deg);
      }
      &.back {
        transform: perspective($perspective) rotateY(360deg);
      }
    }
  }
}
</style>
