import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { routeSweep } from "../composables/atmosphere";
import { getCharacter } from "../data/characters";
import type { BackgroundKey } from "../data/site";

/* Views are imported eagerly rather than via () => import(): the site is
   small, and lazy chunks made the first visit to a page block on a separate
   network fetch (prod) or on-demand compile (dev). That delay read as a
   "dead" first click that only worked on the second try. Bundling the views
   keeps navigation instant on the first click. */
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Characters from "../views/Characters.vue";
import CharacterDetail from "../views/CharacterDetail.vue";
import Soundtrack from "../views/Soundtrack.vue";
import Updates from "../views/Updates.vue";
import Contact from "../views/Contact.vue";

/* Per-route background key is read by BackgroundSystem via route.meta.bg. */
declare module "vue-router" {
  interface RouteMeta {
    bg?: BackgroundKey;
  }
}

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home, meta: { bg: "tower" } },
  { path: "/about", component: About, meta: { bg: "town" } },
  { path: "/characters", component: Characters, meta: { bg: "dorms" } },
  {
    // Detail page shares the Characters night/dorms background. The guard
    // redirects unknown ids to /characters, so the view always resolves a
    // character (and can assert it) instead of rendering a not-found state.
    path: "/characters/:id",
    component: CharacterDetail,
    meta: { bg: "dorms" },
    beforeEnter: (to) =>
      getCharacter(to.params.id as string) ? true : { path: "/characters" },
  },
  { path: "/soundtrack", component: Soundtrack, meta: { bg: "valley" } },
  { path: "/updates", component: Updates, meta: { bg: "town" } },
  { path: "/contact", component: Contact, meta: { bg: "tower" } },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(), // hash mode = zero-config static hosting
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.afterEach(() => {
  requestAnimationFrame(() => routeSweep());
});

export default router;
