/* =====================================================================
   BLOOD DESTINY — character roster
   Single source of truth for the character roster and their detail pages.
   Bios use the EXACT wording from the original site's Characters page.

   Image paths: `image` is the full-body character art, resolved through the
   shared `portrait()` helper (src/data/site.ts) so the roster and detail pages
   share one asset base. Files live in `public/assets/images/characters/<file>`
   and are served at `/assets/images/characters/<file>`. The roster cards
   instead use the cropped bust (`<file>_top.png`) via `cardPortrait()` below.
   ===================================================================== */
import { portrait } from '@/data/site';

export type CharacterGroup = 'playable' | 'supporting';

export interface Character {
  /** Matches the route param, e.g. /characters/jackSmith. */
  id: string;
  name: string;
  /** Small-caps label shown above the name. */
  role: string;
  group: CharacterGroup;
  /** Full-body character art, resolved via the portrait() helper. */
  image: string;
  /** Bio paragraphs — exact wording from the original site. */
  bio: string[];
}

export const characters: Character[] = [
  /* ---- Playable ---- */
  {
    id: 'jackSmith',
    name: 'Jack Smith',
    role: 'Protagonist · Lieutenant',
    group: 'playable',
    image: portrait('jack_smith.png'),
    bio: [
      'Jack Smith is the protagonist of Blood Destiny, and a Lieutenant-ranked fighter in the organization Olympia. He is an aspiring warrior with dreams of becoming the strongest in the world, and he sees his occupation as an Olympian mercenary as a way to increase his battle prowess and eventually allow him to achieve that goal. He is a "Synchronizer" that wields sophisticated weaponry powered by the exposed mana circuits in his arms for both close and mid-ranged combat.',
      'Due to his confident (and somewhat reckless) nature, he will often charge directly into the fray in order to defeat as many opponents as possible, even if it places him in a compromising position. He takes great pride in his skills in battle, and will even keep track of the number of enemies he has slain so that he can gloat about his accomplishments to others.',
      'Six years ago, Jack survived an attack by a group of vampires in his hometown. He nearly died as a result of this experience, but was by a mysterious woman shrouded in light, who quickly eliminated the vampires who were attempting to kill him. He lost consciousness shortly after she rescued him, and woke up in an Olympian hospital. The image of that woman has been etched into his memories ever since, and he wonders if he will ever see her again.',
    ],
  },
  {
    id: 'fuyumiTomoe',
    name: 'Fuyumi Tomoe',
    role: 'Commander · Jack\'s CO',
    group: 'playable',
    image: portrait('fuyumi_tomoe.png'),
    bio: [
      'Fuyumi Tomoe is a Commander-ranked fighter in the organization Olympia, and the commanding officer of Jack Smith. She is extremely powerful, even by meta-human standards, and is feared throughout the world as the "Demoness of Ice". Among all humans in the world, her strength is believed to be ranked within the top twenty.',
      'Fuyumi usually seems like a cold and unapproachable individual, but she reveals her softer side whenever she is around her younger sister, Koyuki. She has a complex relationship with her father, who views her as a "failure" despite her great talents due to the comparatively far greater potential of her younger sister.',
      'She always seeks out the most powerful opponents, with the intention of defeating them and proving to herself (and to her father) that she is somebody whose strength deserves acknowledgement.',
    ],
  },
  {
    id: 'lionhartFreeman',
    name: 'Zayvion "Lionhart" Freeman',
    role: 'Commander · Jack\'s Friend',
    group: 'playable',
    image: portrait('lionhart_freeman.png'),
    bio: [
      'Zayvion Freeman (more commonly known as "Lionhart") is a popular Commander within the organization Olympia, and a good friend of Jack Smith. While Fuyumi Tomoe is serious and reserved, Lionhart in contrast is very laid-back and easygoing. He enjoys conversing with others, and will often banter with Jack outside of missions. He leads a squad of three, which comprises of Denzel Gray, Ophelia Snow, and Naomi Ito.',
      'He picked up his carefree attitude from his late wife Talia Freeman, who was the type of person to always think optimistically and smile, no matter the circumstance. After failing to save her from a demon, Lionhart joined Olympia, vowing to save as many people as he possibly could with his own strength, so that no one would ever experience the sorrow that he felt that day.',
    ],
  },
  {
    id: 'denzelGray',
    name: 'Denzel Gray',
    role: 'Ensign',
    group: 'playable',
    image: portrait('denzel_gray.png'),
    bio: [
      'Denzel Gray is one of the three subordinates serving underneath Lionhart Freeman, and is an Ensign-ranked mercenary who excels in close-ranged combat. He possesses great physical strength and an abundance of ki energy, and he makes the most of these attributes by wielding heavy gauntlets to dish out powerful physical blows on his opponents.',
      'Denzel is a hot-headed and brash individual whose recklessness rivals even Jack Smith\'s. He is proud of his strength and will often challenge Jack Smith to compete against him in various ridiculous (and often comedic) contests of physical prowess. While he often bickers with Jack, he does secretly admire him and views him as a rival to eventually surpass. He is secretly in love with fellow teammate Ophelia Snow but has yet to reveal his feelings for her.',
    ],
  },
  {
    id: 'opheliaSnow',
    name: 'Ophelia Snow',
    role: 'Lieutenant',
    group: 'playable',
    image: portrait('ophelia_snow.png'),
    bio: [
      'Ophelia Snow is one of the three subordinates serving underneath Lionhart Freeman, and is a Lieutenant-ranked mercenary who specializes in scouting and magic casting. She has special eyes that can be imbued with mana to greatly enhance her visual prowess. Formerly a resident of the isolated supernation of Arc Novelia, she joined Olympia in order to learn about the battle-oriented magic used by its mercenaries, as well as its usage of synchronization to awaken dormant mana circuits within human bodies.',
      'Ophelia is a polite and kind-hearted young woman, but she is also quite timid and lacking in self-confidence. Her teammates Naomi Ito and (especially) Denzel Gray dote on her and are quite protective of her as a result. She wishes to overcome her personal insecurities and looks up to Jack Smith due to his unwavering confidence and desire to grow stronger.',
    ],
  },
  {
    id: 'naomiIto',
    name: 'Naomi Ito',
    role: 'Lieutenant',
    group: 'playable',
    image: portrait('naomi_ito.png'),
    bio: [
      'Naomi Ito is one of the three subordinates serving underneath Lionhart Freeman, and is a Lieutenant-ranked mercenary who specializes in long-ranged combat. Like Jack Smith, she is a "Synchronizer" who wields a sniper rifle powered by the mana circuits in her right arm (though unlike Jack, she prefers not to show off the exposed mana circuits of her right arm). She is also quite proficient with a katana for close quarters combat.',
      'Naomi has a sarcastic and condescending attitude and gets easily irritated by the antics of Jack Smith and her teammate Denzel Gray. She will often berate them and make snark remarks towards them every time they do things that she views as foolish. In contrast, however, she acts kindly and more understanding towards her other teammate, Ophelia Snow, who Naomi views as someone that needs to be protected.',
      'She is of noble descent, and was born into a wealthy family situated within the Kyoudan Empire. She is currently estranged from her parents, who had arranged for her (against her will) to get married to a high ranking officer within the Kyoudan Empire\'s military force. Naomi ended up running away from home in order to avoid that fate. She has not spoken to any member of her family for several years.',
    ],
  },
  /* ---- Supporting ---- */
  {
    id: 'alderZeke',
    name: 'Alder Zeke',
    role: 'Former Commander',
    group: 'supporting',
    image: portrait('alder_zeke.png'),
    bio: [
      'Alder Zeke is the stern former Commander of Jack Smith who has been a member of Olympia since its inception 27 years ago. He was Jack\'s Commander for three years before retiring at the beginning of the story.',
      'Alder possesses a strong sense of justice, believing that mercenaries have no place on the battlefield unless they demonstrate grit and determination. Through their numerous battles together, Alder develops a personal attachment to Jack, drawn to the young warrior\'s unusually powerful drive. Over time, Alder comes to regard Jack as if he is one of his own sons. During a mission, Alder is forced to entrust Jack with temporary leadership of his squad while he pursues a powerful entity that only he can handle alone. However, Jack\'s decision during the mission leads to devastating consequences, including multiple casualties and the crippling of Alder\'s squad members. Taking responsibility for the incident alongside Jack, Alder is forced to retire from his position, ultimately passing on his duties to Fuyumi Tomoe.',
    ],
  },
  {
    id: 'koyukiTomoe',
    name: 'Koyuki Tomoe',
    role: 'Mercenary in Training',
    group: 'supporting',
    image: portrait('koyuki_tomoe.png'),
    bio: [
      'Koyuki Tomoe is the younger sister of Fuyumi Tomoe and currently training to become a full-fledged mercenary. Koyuki is a prodigy at fighting and extremely naturally talented even at her young age, and is expected to eventually surpass her older sister in power.',
      'Koyuki is extremely emotionally attached to Fuyumi, which often leads to possessive behavior when she perceives other men as being overly familiar with her. Consequently, she tends to act impudently towards Jack Smith whenever she sees him with Fuyumi.',
    ],
  },
  {
    id: 'reyDeLorean',
    name: 'Rey DeLorean',
    role: 'Chief Engineer of Weapons Technology',
    group: 'supporting',
    image: portrait('rey_delorean.png'),
    bio: [
      'Rey DeLorean is the Chief Engineer of Weapons Technology within the R&D Division of Olympia, and is the owner of the DeLorean Laboratories. She oversees the development and maintenance of synchro weapons, armaments, and other technologies related to synchronization.',
      'She is a hardworking woman who is passionate about her work and takes great pride in the various weapons that she\'s developed, which are at the very cutting edge of synchronization technology. Mercenaries in Olympia can set up appointments with her directly or with her assistants in order to repair their synchro gear, request the development of new gear customized for their own needs, upgrade their existing gear, and receive synchronization modifications. Jack Smith\'s weapons were designed and developed by her, and Jack relies on Rey and her team for continuous maintenance and upgrades. She is typically friendly with Jack and the other mercenaries that make appointments with her, although she has a scary side that manifests itself whenever her creations are not well taken care of.',
    ],
  },
];

export const playableCharacters = characters.filter((c) => c.group === 'playable');
export const supportingCharacters = characters.filter((c) => c.group === 'supporting');
export const getCharacter = (id: string): Character | undefined =>
  characters.find((c) => c.id === id);

/** Visual accent: ice for the females and ember for the males. */
export const accentFor = (c: Character): 'ice' | 'ember' =>
  c.id === 'fuyumiTomoe' ||
    c.id === 'opheliaSnow' ||
    c.id === 'naomiIto' ||
    c.id === 'koyukiTomoe' ||
    c.id === 'reyDeLorean'
    ? 'ice'
    : 'ember';

/** Cropped bust portrait shown on the roster cards (full-body art is `image`). */
export const cardPortrait = (c: Character): string =>
  c.image.replace(/\.png$/, '_top.png');

/** One-line teaser for the roster cards: the first sentence of the bio. */
export const cardHook = (c: Character): string => {
  const intro = c.bio[0] ?? '';
  const end = intro.match(/[.!?](?=\s|$)/);
  return end ? intro.slice(0, (end.index ?? 0) + 1) : intro;
};