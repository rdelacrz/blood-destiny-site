import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { routeSweep } from '@/utils/atmosphere';
import { getCharacter, cardHook } from '@/data/characters';
import { applySeo } from '@/utils/seo';
import type { RouteSeo } from '@/utils/seo';
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

// Per-route metadata read elsewhere: TheBackgroundSystem reads meta.bg, and the
// afterEach SEO hook reads meta.seo (see src/utils/seo.ts).
declare module 'vue-router' {
  interface RouteMeta {
    bg?: BackgroundKey;
    seo?: RouteSeo;
  }
}

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'home',
  component: HomeView,
  meta: { bg: 'tower' }, // home uses the site-default SEO (no override)
}, {
  path: '/about',
  name: 'about',
  component: AboutView,
  meta: {
    bg: 'town',
    seo: {
      title: 'About the Story',
      description: 'The world, story and RPG systems of Blood Destiny — a dark '
        + 'supernatural visual novel set in 2245, following Olympia mercenary '
        + 'Jack Smith across four warring supernations.',
    },
  },
}, {
  path: '/characters',
  name: 'characters',
  component: CharactersView,
  meta: {
    bg: 'dorms',
    seo: {
      title: 'Characters',
      description: 'Meet the cast of Blood Destiny — the Olympia mercenaries and '
        + 'supporting characters who shape Jack Smith\'s branching journey '
        + 'through the world of 2245.',
    },
  },
}, {
  // Detail page shares the Characters night/dorms background. The guard
  // redirects unknown ids to /characters, so the view always resolves a
  // character (and can assert it) instead of rendering a not-found state.
  // Its SEO is built per-character in the afterEach hook below.
  path: '/characters/:id',
  name: 'character',
  component: CharacterDetailView,
  meta: { bg: 'dorms' },
  beforeEnter: (to) =>
    getCharacter(to.params.id as string) ? true : { path: '/characters' },
}, {
  path: '/soundtrack',
  name: 'soundtrack',
  component: SoundtrackView,
  meta: {
    bg: 'valley',
    seo: {
      title: 'Soundtrack',
      description: 'Listen to the original soundtrack of Blood Destiny — '
        + 'atmospheric battle and story themes scoring the dark world of 2245.',
    },
  },
}, {
  path: '/updates',
  name: 'updates',
  component: UpdatesView,
  meta: {
    bg: 'temple',
    seo: {
      title: 'Updates & Devlog',
      description: 'Development updates and devlog for Blood Destiny — the latest '
        + 'progress on the supernatural visual novel by Ashes Aflame.',
    },
  },
}, {
  path: '/contact',
  name: 'contact',
  component: ContactView,
  meta: {
    bg: 'temple-hall',
    seo: {
      title: 'Contact',
      description: 'Get in touch with Ashes Aflame about Blood Destiny — '
        + 'questions, press and community.',
    },
  },
}, {
  path: '/:pathMatch(.*)*',
  redirect: '/',
}];

const router = createRouter({
  // HTML5 history (clean /about URLs, no #) so each route is a distinct,
  // crawlable URL for Google. Vercel rewrites all non-/api paths to index.html
  // (see vercel.json) so deep links resolve; Vite's dev server and `preview`
  // do the SPA fallback automatically.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach((to) => {
  // Sync the document title + social/crawler meta tags to the new route.
  // Character detail pages get a per-character title, bio teaser and portrait.
  let seo: RouteSeo = { ...(to.meta.seo ?? {}) };
  if (to.name === 'character') {
    const character = getCharacter(to.params.id as string);
    if (character) {
      seo = {
        title: character.name,
        description: `${character.name} — ${character.role}. ${cardHook(character)}`,
        image: character.image,
      };
    }
  }
  applySeo(seo, to.path);

  requestAnimationFrame(() => routeSweep());
});

export default router;
