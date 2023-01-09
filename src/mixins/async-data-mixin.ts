import { ComponentOptionsMixin } from 'vue';

// a global mixin that calls `asyncData` when a route component's params change
export const asyncDataMixin: ComponentOptionsMixin = {
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options;
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to,
            }).then(next).catch(next);
        } else {
            next();
        }
    },
};
