    import {computed, getCurrentInstance, inject} from 'vue';
    import {useRoute} from 'vue-router';
    import {useMediaQuery} from "@vueuse/core";


    // helper for showing or hiding components based on route and screen size

    export default function useShowOrHide(breakpoint, routeRegex) {
    const route = useRoute();
    const panelOffset = inject('panelOffset', 0);

    const remainingWidth = breakpoint + panelOffset;
    console.log('remainingWidth', breakpoint, panelOffset, remainingWidth);

    const isWideEnough = computed(()=> {
        return useMediaQuery(`(min-width: ${remainingWidth}px)`).value;
    });

    const instance = getCurrentInstance();
    const isCurrentPanelComponent = computed(() => {
        if (!instance || !route.matched.length) return false;

        const currentComponent = instance.type;
        const matchedRoute = route.matched[route.matched.length - 1];

        const matchedComponent = matchedRoute?.components?.default;

        return currentComponent === matchedComponent;
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
