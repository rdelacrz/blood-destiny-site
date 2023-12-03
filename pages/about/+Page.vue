<template>
  <div class='about-wrapper container'>
    <div class='title-container'>
      <div class='title' :style="{'background-image': titleBackground}">The Story</div>
    </div>
    <div class='story-content-wrapper'>
      <p class='general-text'>
        Blood Destiny is a visual novel that takes place in a fictional version of the world, during the year 2245. About 200 years have 
        passed since the Third World war that devastated the whole planet, which is now divided into four enormous supernations. The story 
        revolves around a young mercenary named Jack Smith, who is part of an organization named Olympia which accepts contracts from the four 
        nations to deal with supernatural threats. Jack is a proud and confident fighter who aspires to become the strongest in the world. Over 
        the course of the story, he will be drawn into various conflicts involving legendary creatures, ancient civilizations lost to history, and 
        unsolved mysterious from his own past.
      </p>
      <p class='general-text'>
        There are several heroines in the story that will serve as potential love interests to Jack. The player may select different choices 
        throughout the novel to influence the story's direction, and potentially which heroine he ends up with. Once every regular route has 
        been cleared, the final route will be unlocked which will lead to the True Ending of the story. There will also be turn-based RPG battles 
        where the player will have to fight various enemies.
      </p>
    </div>
    <div class='screenshots-row-container'>
      <img :src='screenshots.one' alt='Screenshot One' />
      <img :src='screenshots.two' alt='Screenshot Two' />
      <img :src='screenshots.three' alt='Screenshot Three' />
    </div>
  </div>
</template>

<script lang="ts">
import bloodGraphic from '@/assets/images/graphics/blood_center.png';
import screenshot1 from '@/assets/images/graphics/screenshots/screenshot_01.png';
import screenshot2 from '@/assets/images/graphics/screenshots/screenshot_02.png';
import screenshot3 from '@/assets/images/graphics/screenshots/screenshot_03.png';

export default {
  name: 'about',
  data() {
    return {
      titleBackground: `url(${bloodGraphic})`,
      screenshots: {
        one: screenshot1,
        two: screenshot2,
        three: screenshot3,
      },
    }
  },
};
</script>

<style lang='scss' scoped>
$content-max-width: 1100px;

.about-wrapper {
  .title-container {
    position: relative;
    display: flex;
    justify-content: center;
    .title {
      position: absolute;
      top: -120px;
      background-repeat: no-repeat;
      color: white;
      text-align: center;
      font-family: 'Broadway';
      font-size: 36px;
      height: 415px;
      width: 347px;
      padding-top: 180px;
      text-transform: capitalize;
    }
  }
  .story-content-wrapper {
    position: relative;
    padding: 150px 80px 30px 80px;
    max-width: $content-max-width;
    margin: 0 auto;
  }
  .screenshots-row-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: $content-max-width;
    padding: 0 80px;
    img {
      border: solid 1px #545354;
      height: 200px;
      width: 320px;

      @media (max-width: 1200px) {
        height: auto;
        width: 240px;
      }

      @media (max-width: 940px) {
        height: auto;
        width: 100%;
        + img {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
