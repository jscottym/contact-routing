    import {computed, getCurrentInstance} from 'vue';
    import {useRoute} from 'vue-router';
    import {useMediaQuery} from "@vueuse/core";

    export default function useShowOrHide(breakpoint, routeRegex) {
    const route = useRoute();

    const isWideEnough = useMediaQuery(`(min-width: ${breakpoint}px)`);

    const instance = getCurrentInstance();
    const isCurrentPanelComponent = computed(() => {
        if (!instance || !route.matched.length) return false;

        const currentComponent = instance.type;
        const matchedRoute = route.matched[route.matched.length - 1];

        const matchedComponent = matchedRoute?.components?.default;

        return currentComponent === matchedComponent;
    });
    const isChildComponent = computed(() => {
        if (!instance || !route.matched.length) return false;

        const matchedComponent = route.matched[route.matched.length - 1]?.components?.default;

        let parent = instance.proxy?.$parent;
        while (parent) {
          if (parent.$.type === matchedComponent) return true;
          parent = parent.$parent;
        }
        return false;
      });

    const isCurrentRoute = computed(() => {
        return routeRegex.test(route.path);
    });

    return {
        isWideEnough,
        isCurrentRoute,
        isCurrentPanelComponent,
    };
}
