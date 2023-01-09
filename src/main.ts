import { createApp } from 'vue';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import { asyncDataMixin, titleMixin } from '@/mixins';
import router from '@/router';
import { store, storeKey } from '@/store';
import App from './App.vue';
import './styles/global.scss'

createApp(App)
    .use(router)
    .use(store, storeKey)
    .use(PerfectScrollbar)
    .mixin(asyncDataMixin)
    .mixin(titleMixin)
    .mount('#app');
