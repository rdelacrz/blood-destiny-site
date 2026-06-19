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

export const UPDATES: Update[] = [{
  id: 'seed-2024-05',
  date: 'May 2024',
  tag: 'Story',
  title: 'Chapter 3 script locked',
  body: 'The third chapter\'s branching script is complete, including two new heroine-specific scenes and the first taste of the Kyoudan Empire arc.'
}, {
  id: 'seed-2024-03',
  date: 'Mar 2024',
  tag: 'Art',
  title: 'Character sprites — second pass',
  body: 'Updated expression sheets for Jack, Fuyumi and Ophelia, plus new combat poses for the turn-based battle UI.'
}, {
  id: 'seed-2024-01',
  date: 'Jan 2024',
  tag: 'Audio',
  title: 'Three new OST tracks',
  body: '“Demoness of Ice,” “Call of the Ancients” and “Beginning of the End” join the soundtrack, produced by BlooD.'
}, {
  id: 'seed-2023-11',
  date: 'Nov 2023',
  tag: 'System',
  title: 'Synchronization combat prototype',
  body: 'First playable build of the mana-circuit synchro system — weapon swapping, ki gauges and attribute scaling are now wired in.'
}];
