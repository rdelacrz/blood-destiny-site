<template>
  <div class='characters-wrapper container'>
    <div class='description-wrapper'>
      <div class='character-name' v-text='character.name' />
      <perfect-scrollbar class='description-scrollbar-container' :options='scrollbarOptions'>
        <div class='character-description general-text' v-html='character.description' />
      </perfect-scrollbar>
    </div>

    <div class='character-image-container'>

      <Carousel :itemsToShow="1" :wrap-around="true" v-model="selectedCharacter">
        <Slide v-for="slide in characters.length" :key="slide">
          <div class="carousel__item">
            <img :src='characters[slide - 1].illustration' alt='Selected Character' height='725' width='250' />
          </div>
        </Slide>
        <template #addons>
          <button class='character-change-button icon-button previous-button' @click='handlePreviousCharacter'>
            <img :src='backIcon' alt='Previous Character Button' height='40' width='50' />
          </button>
          <button class='character-change-button icon-button next-button' @click='handleNextCharacter'>
            <img :src='frontIcon' alt='Next Character Button' height='40' width='50' />
          </button>
        </template>
      </Carousel>

    </div>

    <div class='character-icons-selector-container'>
      <CharacterIcon v-for='(c, index) in characters' :key='index' :icon='c.icon' :selected="selectedCharacter === index" 
        @select="handleCharacterIconClick(index)" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent } from 'vue';
import { mapState } from 'vuex';
import { Character } from '@/models';

import { Carousel, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

import backIcon from '@/assets/images/icons/icon_back.png';
import frontIcon from '@/assets/images/icons/icon_forward.png';

export default {
  name: 'characters',
  components: {
    CharacterIcon: defineAsyncComponent(() => import('@/components/CharacterIcon.vue')),
    Carousel,
    Slide
  },
  data() {
    return {
      backIcon,
      frontIcon,
      selectedCharacter: 0,
      scrollbarOptions: {
        wheelSpeed: 1,
      },
    };
  },
  computed: {
    ...mapState('CharactersModule', ['characters']),
    character() {
      const characters = this.characters as Character[];
      const selectedCharacter = this.selectedCharacter as number;
      return characters[selectedCharacter];
    },
  },
  methods: {
    handleCharacterIconClick(characterIndex: number) {
      this.selectedCharacter = characterIndex;
    },
    handlePreviousCharacter() {
      if (this.selectedCharacter === 0) {
        this.selectedCharacter = this.characters.length - 1;
      } else {
        this.selectedCharacter -= 1;
      }
    },
    handleNextCharacter() {
      if (this.selectedCharacter >= this.characters.length - 1) {
        this.selectedCharacter = 0;
      } else {
        this.selectedCharacter += 1;
      }
    },
  },
};
</script>

<style lang='scss'>
.characters-wrapper {
  display: flex;
  max-width: 80%;
  padding-bottom: 50px;
  .description-wrapper {
    max-width: 42%;
    width: 100%;
    .character-name {
      font-family: 'Broadway';
      font-size: 36px;
      margin-bottom: 35px;

    }
    .description-scrollbar-container {
      max-height: calc(100vh - 200px);
    }
  }
  .character-image-container {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 400px;
  }
  .character-icons-selector-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    height: 400px;
    width: 250px;
    .character-icon-wrapper {
      margin: 5px;
    }
  }
}
</style>

<!-- Won't work unless scope is removed -->
<style lang='scss'>
.characters-wrapper {
  .character-description {
    p {
      &:first-of-type {
        margin-top: 0;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  
  .carousel {
    width: 600px;
  }
  .carousel__item {
    min-height: 750px;
    width: 100%;
  }
  
  .character-change-button {
    position: absolute;
    bottom: 80px;
    &.previous-button {
      left: 100px;
    }
    &.next-button {
      right: 100px;
    }
  }
}
</style>