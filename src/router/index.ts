import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { routeSweep } from '@/utils/atmosphere';
import { getCharacter } from '@/data/characters';
import type { BackgroundKey } from '@/data/site';

// Views are imported eagerly rather than via () => import(): the site is
// small, and lazy chunks made the first visit to a page block on a separate
// network fetch (prod) or on-demand compile (dev). That delay read as a
// "dead" first click that only worked on the second try. Bundling the views
// keeps navigation instant on the first click.
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import CharactersView from '@/views/CharactersView.vue';
import CharacterDetailView from '@/views/CharacterDetailView.vue';
import SoundtrackView from '@/views/SoundtrackView.vue';
import UpdatesView from '@/views/UpdatesView.vue';
import ContactView from '@/views/ContactView.vue';

// Per-route background key is read by TheBackgroundSystem via route.meta.bg.
declare module 'vue-router' {
  interface RouteMeta {
    bg?: BackgroundKey;
  }
}

const routes: RouteRecordRaw[] = [{
  path: '/',
  component: HomeView,
  meta: { bg: 'tower' },
}, {
  path: '/about',
  component: AboutView,
  meta: { bg: 'town' },
}, {
  path: '/characters',
  component: CharactersView,
  meta: { bg: 'dorms' },
}, {
  // Detail page shares the Characters night/dorms background. The guard
  // redirects unknown ids to /characters, so the view always resolves a
  // character (and can assert it) instead of rendering a not-found state.
  path: '/characters/:id',
  component: CharacterDetailView,
  meta: { bg: 'dorms' },
  beforeEnter: (to) =>
    getCharacter(to.params.id as string) ? true : { path: '/characters' },
}, {
  path: '/soundtrack',
  component: SoundtrackView,
  meta: { bg: 'valley' },
}, {
  path: '/updates',
  component: UpdatesView,
  meta: { bg: 'temple' },
}, {
  path: '/contact',
  component: ContactView,
  meta: { bg: 'temple-hall' },
}, {
  path: '/:pathMatch(.*)*',
  redirect: '/',
}];

const router = createRouter({
  history: createWebHashHistory(), // Hash mode = zero-config static hosting
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach(() => {
  requestAnimationFrame(() => routeSweep());
});

export default router;
