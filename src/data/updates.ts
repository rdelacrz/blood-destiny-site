/* =====================================================================
   BLOOD DESTINY — devlog / updates timeline
   `Update` is the view model the timeline renders. Live entries are fetched
   and mapped in api/updates.ts; the UPDATES array below is the explicit
   offline / local-dev fallback used when no endpoint is configured (or while
   one is being stood up). See composables/useUpdates.ts.
   ===================================================================== */

export interface Update {
  /** Stable key for v-for / scroll-reveal. */
  id: string | number;
  /** Human date label, e.g. "May 2024". */
  date: string;
  title: string;
  /** Body copy — HTML from the API, plaintext for the seed entries below. */
  body: string;
  /** Optional category pill (seed entries: Story / Art / Audio / System). */
  tag?: string;
  /** Optional author credit (live data: post_by / updateBy). */
  author?: string;
  /** Optional cover image URL. */
  cover?: string;
}

export const updates: Update[] = [
  {
    id: 'big-updates-2024-11-12',
    title: 'Big Updates',
    date: '2024-11-12T00:07:13',
    cover: '/updates/update_cover.png',
    body:
      'Hello everyone.\n\n' +
      'Apologies for the long delay between updates, but our team has not stopped working on Blood Destiny, and we have some major updates. \n\n' +
      'For one, we have an old member returning to our team Ashes Aflame. He will be helping us with designing the logic of the AI and managing the overall direction of the battle system and other aspects of the visual novel.\n\n' +
      'Second of all, we finally have splash screen for our development group, which will be seen by players when they first open up the visual novel. It is well designed, and I cannot wait for you guys to see it. ' +
      'We have also finally gotten a new enemy animated for the battle system of the visual novel and aim to get one more boss-type enemy implemented for the demo. We are getting close to the endgame of demo development. We are acquiring sound effects now for both the cutscenes and the battles themselves, and we will soon implement them into the novel.\n\n' +
      'Overall, I am happy with the direction of development, and I hope to showcase some material for you guys soon.',
  },
  {
    id: 'delayed-update-2024-09-07',
    title: 'Delayed Update on Blood Destiny',
    date: '2024-09-07T00:38:01',
    cover: '/updates/update_cover.png',
    body:
      'Hello all. It has been quite a bit of time since my last update.\n\n' +
      'I\'m happy to say that just about all the art assets needed for the demo have been completed. We need only a couple more animations for the battle system, sound effects for the overall experience, a UI design for the visual novel, and a couple more songs for the soundtrack. Otherwise, in terms of actual assets, we have everything we need for the demo.\n\n' +
      'From a gameplay standpoint, I have been improving the robustness and overall logic of the code, added various new features (such as actual status effects, an improved animation system to handle multiple art assets for a single action (e.g. attacks, skills, etc), and more enemy AI features. My long-term partner on this project has also refined the dialogue and done research on what sound effects to use for the visual novel.\n\n' +
      'One major thing I would like to do is hire an artist to design a minimalistic but beautiful design for the overall UI of the novel (main menu layout, popup menu layout, battle UI, etc). We will do research on this on our end to figure out exactly what is needed. As of now, I am aiming for a late Fall release for this visual novel to be released. I am currently out of the country on vacation, so my output will be a little bit less than normal, but I will post more updates soon!',
  },
  {
    id: 'more-art-more-music-2024-07-07',
    title: 'More Art, More Music',
    date: '2024-07-07T20:35:25',
    cover: '/updates/update_cover.png',
    body:
      'Hello everyone.\n\n' +
      'I have been a bit busy with real-life stuff since the last time, so I haven\'t been as productive as I usually have been. Nonetheless, since the last time I posted an update, more backgrounds have been created, as well as more additional poses for characters that will appear in the demo.\n\n' +
      'I have also composed a new song called "Prepare for War", which you can check out in the soundtrack section. It took a bit of time to compose (and I may revise parts of it in the future), but for now, I do like how it sounds.\n\n' +
      'Finally, I have refactored parts of the battle system code in order for it to be more scaleable and handle multi-hit actions. Prior to these changes, attacks with multiple-hits could not be rendered and handled properly, but that should no longer be an issue now.\n\n' +
      'I hope to post more exciting updates soon!',
  },
];
