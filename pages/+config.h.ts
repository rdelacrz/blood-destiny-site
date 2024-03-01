import type { Config } from "vike/types";
import vikePinia from "vike-pinia";
import vikeVue from "vike-vue/config";
import Head from "@/layouts/HeadDefault.vue";
import Layout from "@/layouts/LayoutDefault.vue";
import { onRenderHtml } from "./onRenderHtml";
import favicon from '@/assets/favicon.ico';

// https://vike.dev/config
export default {
  passToClient: ["title", "routeParams",  "piniaInitialState", "vueQueryState"],
  prefetchStaticAssets: "viewport",   // https://vike.dev/clientRouting#link-prefetching
  Head,
  Layout,
  favicon,
  onRenderHtml,
  // https://vike.dev/meta
  meta: {
    title: {
      env: { server: true, client: true },
    },
    pageTitle: {
      env: { server: true, client: true },
    },
    pageDescription: {
      env: { server: true, client: true },
    },
    pageBackgroundClass: {
      env: { server: true, client: true },
    },
    getBreadcrumbs: {
      env: { server: true, client: true },
    },
    queryFn: {
      env: { server: true },   // Backend queryFn should not be exposed to client side
    },
    queryKey: {
      env: { server: true, client: true },
    },
  },
  extends: [vikeVue, vikePinia]
} satisfies Config
