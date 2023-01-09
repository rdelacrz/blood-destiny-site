import { ComponentOptionsMixin } from 'vue';

export const titleMixin: ComponentOptionsMixin = {
    mounted() {
        const { pageTitle } = (this as any).$data;
        if (pageTitle && typeof document !== undefined) {
            document.title = pageTitle;
        }
    },
};
