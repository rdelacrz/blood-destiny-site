/**
 * @fileoverview BLOOD DESTINY — site content & asset URLs.
 * All assets are self-hosted from /public/assets (served at /assets/*).
 * No external image/CDN hosts. The image/portrait helpers are shared
 * with characters.ts.
 */

/** Base path for every self-hosted asset (public/assets → /assets). */
const ASSET_BASE = '/assets';

/** Resolve any file under public/assets to its served URL. */
export const asset = (path: string): string => `${ASSET_BASE}/${path}`;

/** Image helper. `w` is kept for call-site compatibility (now unused —
    local files are served at their native resolution). */
export const ix = (path: string, _w = 2000): string => asset(`images/${path}`);

/** Character portrait helper. */
export const portrait = (file: string, _w = 1100): string =>
  ix(`characters/${file}`);

export type BackgroundKey =
  | 'tower' | 'town' | 'dorms' | 'valley' | 'temple' | 'temple-hall';

export interface SiteAssets {
  logoColor: string;
  logoWhite: string;
  promo: string;
  bg: Record<BackgroundKey, string>;
}

export const ASSETS: SiteAssets = {
  logoColor: asset('images/graphics/blood_destiny_logo.png'),
  logoWhite: asset('images/graphics/blood_destiny_logo_white.png'),
  promo: asset('images/graphics/jack_fuyumi_promo.png'),
  bg: {
    tower: ix('backgrounds/bkgd_tower_red_sky.png'),
    town: ix('backgrounds/bkgd_town_red_sky.png'),
    dorms: ix('backgrounds/bkgd_olympia_dorms_night.png'),
    valley: ix('backgrounds/bkgd_valley_night.png'),
    temple: ix('backgrounds/bkgd_temple_entrance.png'),       // Updates — snowy shrine door
    'temple-hall': ix('backgrounds/bkgd_temple_hallway.png'), // Contact — glyph corridor
  },
};

export interface NavItem {
  label: string;
  to: string;
}

export const NAV: NavItem[] = [{
  label: 'Home',
  to: '/'
}, {
  label: 'About',
  to: '/about'
}, {
  label: 'Characters',
  to: '/characters'
}, {
  label: 'Soundtrack',
  to: '/soundtrack'
}, {
  label: 'Updates',
  to: '/updates'
}, {
  label: 'Contact',
  to: '/contact'
}];

export interface Social {
  handle: string;
  url: string;
}

export const SOCIAL: Social = {
  handle: '@BloodDestinyVN',
  url: 'https://twitter.com/BloodDestinyVN',
};

export const STORY: string[] = [
  'Blood Destiny unfolds in a fictional mirror of our world in the year 2245 — roughly two centuries after a Third World War shattered the planet. What remains has been redrawn into four enormous supernations, among them Arc Novelia and the Kyoudan Empire.',
  'You follow Jack Smith, a young mercenary of the organization Olympia, which takes contracts from the four nations to confront supernatural threats. Proud and confident, Jack aspires to become the strongest in the world — and is steadily drawn into conflicts involving legendary creatures, lost ancient civilizations, and unsolved mysteries from his own past.',
  'Several heroines serve as potential love interests, and your choices steer the branching narrative — and which heroine Jack ends up beside. Clearing every regular route unlocks the final route and the True Ending.',
  'Between the story beats lies a full RPG: turn-based battles, a deep leveling and attribute system, mana circuits, ki energy, and the Synchronizers who bend them to their will.',
];

export type FeatureMotif = 'rune' | 'crest' | 'blade' | 'circuit';

export interface Feature {
  title: string;
  body: string;
  motif: FeatureMotif;
}

export const FEATURES: Feature[] = [{
  title: 'Branching Routes',
  body: 'Multiple heroines and divergent paths shaped entirely by your choices.',
  motif: 'rune'
}, {
  title: 'The True Ending',
  body: 'Clear every regular route to unlock the final route and its True Ending.',
  motif: 'crest'
}, {
  title: 'Turn-Based Battles',
  body: 'Tactical RPG combat against supernatural threats and legendary foes.',
  motif: 'blade'
}, {
  title: 'Leveling & Attributes',
  body: 'A deep progression system of stats, mana circuits and synchro weapons.',
  motif: 'circuit'
}];

export const TAGLINE =
  'Prepare to venture into a fascinating new world with supernatural elements, mysterious agendas, and unexpected twists.';
