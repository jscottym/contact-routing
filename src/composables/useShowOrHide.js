    import {computed} from 'vue';
    import {useRoute} from 'vue-router';
    import {useMediaQuery} from "@vueuse/core";

    export default function useShowOrHide(breakpoint, routeRegex) {
    const route = useRoute();

    const isWideEnough = useMediaQuery(`(min-width: ${breakpoint}px)`);

    const isCurrentRoute = computed(() => {
        return routeRegex.test(route.path);
    });

    return {
    isWideEnough,
    isCurrentRoute,
};
}
