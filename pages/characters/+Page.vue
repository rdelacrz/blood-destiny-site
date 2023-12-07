<template>
  <div class='characters-wrapper container'>
    <div class='description-wrapper'>
      <div class='character-name' v-text='character.name' />
      <perfect-scrollbar class='description-scrollbar-container' :options='scrollbarOptions'>
        <div class='character-description general-text' v-html='character.description' />
      </perfect-scrollbar>
    </div>

    <div class='character-image-wrapper'>
      <div class='carousel-container'>
        <Carousel ref='characterCarousel' :itemsToShow="1" :wrap-around="true" v-model="selectedCharacter">
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
    </div>

    <div class='character-icons-selector-container'>
      <CharacterIcon v-for='(c, index) in characters' :key='index' :icon='c.icon' :selected="selectedCharacter === index" 
        @select="handleCharacterIconClick(index)" />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent, ref } from 'vue';
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
  setup() {
    return {
      characterCarousel: ref<any>(),
    };
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
      // https://ismail9k.github.io/vue3-carousel/api/methods.html#slideto-index-number
      this.characterCarousel?.slideTo(characterIndex);
    },
    handlePreviousCharacter() {
      // https://ismail9k.github.io/vue3-carousel/api/methods.html#prev
      this.characterCarousel?.prev();
    },
    handleNextCharacter() {
      // https://ismail9k.github.io/vue3-carousel/api/methods.html#next
      this.characterCarousel?.next();
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
  .character-image-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 100px;
    max-width: 600px;
    width: 100%;
    .carousel-container {
      max-width: 400px;
    }
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
    max-height: 80vh;
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
    width: 400px;
  }
  
  .character-change-button {
    position: absolute;
    bottom: 80px;
    &.previous-button {
      left: 1.25em;
    }
    &.next-button {
      right: 1.25em;
    }
  }
}
</style>