/* =====================================================================
   BLOOD DESTINY — original soundtrack
   `audioUrl` points at a self-hosted file in /public/assets/audio. Tracks
   without a produced/imported file omit it and fall back to the UI-only
   preview ticker (see Soundtrack).
   ===================================================================== */
import { asset } from '@/data/site';

/** Self-hosted audio source helper (public/assets/audio → /assets/audio). */
const audio = (file: string): string => asset(`audio/${file}`);

export interface Track {
  /** Track number (1-based) shown in the list. */
  n: number;
  title: string;
  artist: string;
  /** Display duration, "m:ss" — also parsed for the preview ticker. */
  duration: string;
  /** Real audio source. Absent until audio is produced/imported. */
  audioUrl?: string;
}

export const TRACKS: Track[] = [{
  n: 1,
  title: 'Ephemeral Memories',
  artist: 'BlooD.',
  duration: '2:54',
  audioUrl: audio('ephemeral_memories.mp3')
}, {
  n: 2,
  title: 'Trauma',
  artist: 'BlooD.',
  duration: '1:53',
  audioUrl: audio('trauma.mp3')
}, {
  n: 3,
  title: 'Prepare for War',
  artist: 'BlooD.',
  duration: '2:38',
  audioUrl: audio('prepare_for_war.mp3')
}, {
  n: 4,
  title: 'Echoes of the Nephilim',
  artist: 'BlooD.',
  duration: '3:14',
  audioUrl: audio('echoes_of_the_nephilim.mp3')
}, {
  n: 5,
  title: 'Call of the Ancients',
  artist: 'BlooD.',
  duration: '2:55',
  audioUrl: audio('call_of_the_ancients.mp3')
}, {
  n: 6,
  title: 'Demoness of Ice',
  artist: 'BlooD.',
  duration: '2:28',
  audioUrl: audio('demoness_of_ice.mp3')
}, {
  n: 7,
  title: 'Memento Mori',
  artist: 'BlooD.',
  duration: '1:39',
  audioUrl: audio('memento_mori.mp3')
}, {
  n: 8,
  title: 'Dark Days',
  artist: 'BlooD.',
  duration: '3:28',
  audioUrl: audio('dark_days.mp3')
}, {
  n: 9,
  title: 'Calm Before the Storm',
  artist: 'BlooD.',
  duration: '1:40',
  audioUrl: audio('calm_before_the_storm.mp3')
}, {
  n: 10,
  title: 'Just An Ordinary Day',
  artist: 'BlooD.',
  duration: '1:28',
  audioUrl: audio('just_an_ordinary_day.mp3')
}, {
  n: 11,
  title: 'Beginning of the End',
  artist: 'BlooD.',
  duration: '3:33',
  audioUrl: audio('beginning_of_the_end.mp3')
}, {
  n: 12,
  title: 'Farewell',
  artist: 'BigRicePiano',
  duration: '3:16',
  audioUrl: audio('farewell.mp3')
}, {
  n: 13,
  title: 'Vincent Vangloria\'s Theme',
  artist: 'Brian R.',
  duration: '4:05',
  audioUrl: audio('vincent_vangloria_theme.mp3')
}];
