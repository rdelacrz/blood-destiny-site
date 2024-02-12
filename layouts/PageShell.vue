<template>
  <div class="flex flex-col min-h-screen bg-blue-dark text-white">
    <PageHeader />
    <main class="page-content flex-auto">
      <div v-if="!isHomePage" :class="[
          'bg-black py-[150px] text-center relative z-10 bg-cover bg-center', 
          {'bg-black': !backgroundClass, [backgroundClass]: !!backgroundClass}
        ]">
        <div class="container mx-auto">
          <h1 class="uppercase text-6xl font-semibold">
            {{ pageContext.config.pageTitle }}
          </h1>
          <div class="p-4 max-w-[800px] mx-auto">
            {{ pageContext.config.pageDescription }}
          </div>
          <div class="text-3xl">
            <template v-for="breadcrumb in breadcrumbs">
              <template v-if="!!breadcrumb.url">
                <a class="transition-color ease-in-out duration-300 hover:text-crimson-light" 
                  :href="breadcrumb.url"
                >
                  {{ breadcrumb.text }}
                </a> /
              </template>
              <span v-else class="text-crimson">
                {{ breadcrumb.text }}
              </span>
            </template>
          </div>
        </div>
      </div>
      <div class="container mx-auto px-4 md:px-8 lg:px-16">
        <slot />
      </div>
    </main>
    <PageFooter />

    <Dialog v-model="isActive" :dialogTitle="dialogTitle" :dialogText="dialogBody" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, defineAsyncComponent, onMounted } from "vue";
import { usePageContext } from "@/hooks";
import { useDialogStore } from "@/store";
import PageFooter from "./footer/Footer.vue";
import PageHeader from "./header/Header.vue";

const Dialog = defineAsyncComponent(() => import('@/components/Dialog.vue'));

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

onMounted(() => {
  // Popup logic
});

</script>