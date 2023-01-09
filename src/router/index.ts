import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/Home.vue'),
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/About.vue'),
    },
    {
        path: '/characters',
        name: 'characters',
        component: () => import('@/pages/Characters.vue'),
    },
    {
        path: '/soundtrack',
        name: 'soundtrack',
        component: () => import('@/pages/Soundtrack.vue'),
    },
    {
        path: '/updates',
        name: 'updates',
        component: () => import('@/pages/Updates.vue'),
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('@/pages/Contact.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
