<template>
  <div class="flex flex-col min-h-screen bg-blue-dark text-white overflow-x-hidden">
    <PageHeader />
    <div :class="[
      'page-content flex-auto',
      {'bg-tower-red-sky bg-cover bg-center h-fit md:h-[700px] xl:h-[800px] 2xl:h-[900px] mb-20': isHomePage}
    ]">
      <div v-if="!isHomePage" :class="[
        'bg-black py-[150px] text-center relative z-10 bg-cover bg-center', 
        {'bg-black': !backgroundClass, [backgroundClass]: !!backgroundClass}
      ]">
        <div class="container mx-auto">
          <h1 class="uppercase text-[4rem] font-prosto-one text-shadow">
            {{ pageContext.config.pageTitle }}
          </h1>
          <div class="pb-3 max-w-[620px] mx-auto font-poppins text-shadow">
            {{ pageContext.config.pageDescription }}
          </div>
          <div class="text-[1.625rem] font-medium">
            <template v-for="breadcrumb in breadcrumbs">
              <template v-if="!!breadcrumb.url">
                <AppBaseLink class="transition-color ease-in-out duration-300 hover:text-crimson-light drop-shadow-subtle-outline" 
                  :href="breadcrumb.url"
                >
                  {{ breadcrumb.text }}
                </AppBaseLink> /
              </template>
              <span v-else class="text-crimson drop-shadow-subtle-outline">
                {{ breadcrumb.text }}
              </span>
            </template>
          </div>
        </div>
      </div>
      <main class="container mx-auto px-4 lg:px-16">
        <slot />
      </main>
    </div>
    <PageFooter />

    <Dialog v-model="isActive" :dialogTitle="dialogTitle" :dialogText="dialogBody" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, defineAsyncComponent } from "vue";
import { usePageContext } from "@/hooks";
import { useDialogStore } from "@/store";
import PageFooter from "./footer/Footer.vue";
import PageHeader from "./header/Header.vue";

import AppBaseLink from "@/components/clickable-elements/AppBaseLink.vue";
const Dialog = defineAsyncComponent(() => import("@/components/Dialog.vue"));

const store = useDialogStore();
const { isActive, dialogTitle, dialogBody } = storeToRefs(store);

const pageContext = usePageContext();

const isHomePage = computed(() => pageContext.urlPathname === '/');

const breadcrumbs = computed(() => {
  if (pageContext.config.getBreadcrumbs) {
    return pageContext.config.getBreadcrumbs(pageContext);
  } else {
    return [];
  }
});

const backgroundClass = computed(() => pageContext.config.pageBackgroundClass);
</script>
