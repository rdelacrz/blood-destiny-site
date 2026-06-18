/* =====================================================================
   BLOOD DESTINY — devlog / updates timeline
   ===================================================================== */

export interface Update {
  /** Human date label, e.g. "May 2024". */
  date: string;
  /** Category tag, e.g. "Story" / "Art" / "Audio" / "System". */
  tag: string;
  title: string;
  body: string;
}

export const UPDATES: Update[] = [
  {
    date: "May 2024",
    tag: "Story",
    title: "Chapter 3 script locked",
    body: "The third chapter's branching script is complete, including two new heroine-specific scenes and the first taste of the Kyoudan Empire arc.",
  },
  {
    date: "Mar 2024",
    tag: "Art",
    title: "Character sprites — second pass",
    body: "Updated expression sheets for Jack, Fuyumi and Ophelia, plus new combat poses for the turn-based battle UI.",
  },
  {
    date: "Jan 2024",
    tag: "Audio",
    title: "Three new OST tracks",
    body: "“Demoness of Ice,” “Call of the Ancients” and “Beginning of the End” join the soundtrack, produced by BlooD.",
  },
  {
    date: "Nov 2023",
    tag: "System",
    title: "Synchronization combat prototype",
    body: "First playable build of the mana-circuit synchro system — weapon swapping, ki gauges and attribute scaling are now wired in.",
  },
];
