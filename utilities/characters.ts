import { Character } from '@/models';

import jackSmithTop from '@/assets/images/characters/jack_smith_top.png';
import jackSmith from '@/assets/images/characters/jack_smith.png';
import fuyumiTomoeTop from '@/assets/images/characters/fuyumi_tomoe_top.png';
import fuyumiTomoe from '@/assets/images/characters/fuyumi_tomoe.png';
import lionhartFreemanTop from '@/assets/images/characters/lionhart_freeman_top.png';
import lionhartFreeman from '@/assets/images/characters/lionhart_freeman.png';
import denzelGrayTop from '@/assets/images/characters/denzel_gray_top.png';
import denzelGray from '@/assets/images/characters/denzel_gray.png';
import opheliaSnowTop from '@/assets/images/characters/ophelia_snow_top.png';
import opheliaSnow from '@/assets/images/characters/ophelia_snow.png';
import naomiItoTop from '@/assets/images/characters/naomi_ito_top.png';
import naomiIto from '@/assets/images/characters/naomi_ito.png';

export const characterList: Character[] = [
  {
    name: 'Jack Smith',
    description: `
      <p>
        Jack Smith is the protagonist of Blood Destiny, and a Lieutenant-ranked fighter in the organization Olympia.
        He is an aspiring warrior with dreams of becoming the strongest in the world, and he sees his occupation as an
        Olympian mercenary as a way to increase his battle prowess and eventually allow him to achieve that goal. He is a
        "Synchronizer" that wields sophisticated weaponry powered by the exposed mana circuits in his arms for both close
        and mid-ranged combat.
      </p>
      <p>
        Due to his confident (and somewhat reckless) nature, he will often charge directly into the fray in order to defeat
        as many opponents as possible, even if it places him in a compromising position. He takes great pride in his skills
        in battle, and will even keep track of the number of enemies he has slain so that he can gloat about his
        accomplishments to others.
      </p>
      <p>
        Six years ago, Jack survived an attack by a group of vampires in his hometown. He nearly died as a result of this
        experience, but was saved a mysterious woman shrouded in light, who quickly eliminated the vampires who were
        attempting to kill him. He lost consciousness shortly after she rescued him, and woke up in an Olympian hospital.
        The image of that woman has been etched into his memories ever since, and he wonders if he will ever see her again.
      </p>
    `,
    topImg: jackSmithTop,
    fullImg: jackSmith,
  },
  {
    name: 'Fuyumi Tomoe',
    description: `
      <p>
        Fuyumi Tomoe is a Commander-ranked fighter in the organization Olympia, and the commanding officer of Jack Smith.
        She is extremely powerful, even by meta-human standards, and is feared throughout the world as the "Ice Demon".
        Among all humans in the world, her strength is believed to be ranked within the top twenty.
      </p>
      <p>
        Fuyumi usually seems like a cold and unapproachable individual, but she reveals her softer side whenever she is around
        her younger sister, Koyuki. She has a complex relationship with her father, who views her as a "failure" despite her
        great talents due to the comparatively far greater potential of her younger sister.
      </p>
      <p>
        She always seeks out the most powerful opponents, with the intention of defeating them and proving to herself (and
        to her father) that she is somebody whose strength deserves acknowledgement.
      </p>`,
      topImg: fuyumiTomoeTop,
    fullImg: fuyumiTomoe,
  },
  {
    name: 'Lionhart Freeman',
    description: `
      <p>
        Lionhart Freeman is a popular Commander within the organization Olympia, and a good friend of Jack Smith. While
        Fuyumi Tomoe is serious and reserved, Lionhart in contrast is very laid-back and easygoing. He enjoys conversing
        with others, and will often banter with Jack outside of missions. He leads a squad of three, which comprises of
        Denzel Gray, Ophelia Snow, and Naomi Ito.
      </p>
      <p>
        He picked up his carefree attitude from his late wife Talia Freeman, who was the type of person to always think
        optimistically and smile, no matter the circumstance. After failing to save her from a demon, Lionhart joined Olympia,
        vowing to save as many people as he possibly could with his own strength, so that no one would ever experience the
        sorrow that he felt that day.
      </p>
    `,
    topImg: lionhartFreemanTop,
    fullImg: lionhartFreeman,
  },
  {
    name: 'Denzel Gray',
    description: `
      <p>
        Denzel Gray is one of the three subordinates serving underneath Lionhart Freeman, and is an Ensign-ranked mercenary
        who excels in close-ranged combat. He possesses great physical strength and an abundance of ki energy, and he makes the
        most of these attributes by wielding heavy gauntlets to dish out powerful physical blows on his opponents.
      </p>
      <p>
        Denzel is a hot-headed and brash individual whose recklessness rivals even Jack Smith's. He is proud of his strength
        and will often challenge Jack Smith to compete against him in various ridiculous (and often comedic) contests of physical
        prowess. While he often bickers with Jack, he does secretly admire him and views him as a rival to eventually surpass. He
        is secretly in love with fellow teammate Ophelia Snow but has yet to reveal his feelings for her.
      </p>
    `,
    topImg: denzelGrayTop,
    fullImg: denzelGray,
  },
  {
    name: 'Ophelia Snow',
    description: `
      <p>
        Ophelia Snow is one of the three subordinates serving underneath Lionhart Freeman, and is a Lieutenant-ranked mercenary
        who specializes in scouting and magic casting. She has special eyes that can be imbued with mana to greatly enhance her
        visual prowess. Formerly a resident of the isolated supernation of Arc Novelia, she joined Olympia in order to learn about
        the battle-oriented magic used by its mercenaries, as well as its usage of synchronization to awaken dormant mana circuits
        within human bodies.
      </p>
      <p>
        Ophelia is a polite and kind-hearted young woman, but she is also quite timid and lacking in self-confidence. Her teammates
        Naomi Ito and (especially) Denzel Gray dote on her and are quite protective of her as a result. She wishes to overcome her
        personal insecurities and looks up to Jack Smith due to his unwavering confidence and desire to grow stronger.
      </p>
    `,
    topImg: opheliaSnowTop,
    fullImg: opheliaSnow,
  },
  {
    name: 'Naomi Ito',
    description: `
      <p>
        Naomi Ito is one of the three subordinates serving underneath Lionhart Freeman, and is a Lieutenant-ranked mercenary
        who specializes in long-ranged combat. Like Jack Smith, she is a "Synchronizer" who wields a sniper rifle powered by
        the mana circuits in her right arm (though unlike Jack, she prefers not to show off the exposed mana circuits of her
        right arm). She is also quite proficient with a katana for close quarters combat.
      </p>
      <p>
        Naomi has a sarcastic and condescending attitude and gets easily irritated by the antics of Jack Smith and her teammate
        Denzel Gray. She will often berate them and make snark remarks towards them every time they do things that she
        views as foolish. In contrast, however, she acts kindly and more understanding towards her other teammate, Ophelia Snow,
        who Naomi views as someone that needs to be protected.
      </p>
      <p>
        She is of noble descent, and was born into a wealthy family situated within the Kyoudan Empire. She is currently estranged
        from her parents, who had arranged for her (against her will) to get married to a high ranking officer within the Kyoudan
        Empire's military force. Naomi ended up running away from home in order to avoid that fate. She has not spoken to any member
        of her family for several years.
      </p>
    `,
    topImg: naomiItoTop,
    fullImg: naomiIto,
  },
];

export const getCharacter = (characterId?: string | number) => {
  const index = Number(characterId || 0);
  const character = index < characterList.length
    ? characterList[index]
    : characterList[0];
  return character;
}