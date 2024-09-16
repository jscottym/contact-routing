import { computed, inject, provide, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// helper for providing a base path for a given object
export default function useBasePath(objectName,  { doProvide, basePath } = {}) {
    const route = useRoute();
    const router = useRouter();
    const entity = ref(null);

    // If the component is responsible for providing, compute the base path
    if (doProvide) {
        provide(`${objectName}BasePath`, basePath);
    } else {
        basePath = inject(`${objectName}BasePath`, null);
        if (!basePath) {
            console.error(`${objectName}BasePath is not provided!`);
        }
    }

    function navigateToList(){
        router.push(basePath);
    }

    function navigateToEdit() {
        router.push(`${basePath}/${route.params[`${objectName}Id`]}/edit`);
    }

    function navigateToDetails() {
        router.push(`${basePath}/${route.params[`${objectName}Id`]}/details`);
    }

    function navigateToId({id}) {
        id ??= route.params[`${objectName}Id`];
        router.push(`${basePath}/${id}`);
    }

    const isListRoute = computed(() => route.path === basePath);

    return {
        entity,
        basePath,
        navigateToList,
        navigateToEdit,
        navigateToDetails,
        navigateToId,
        isListRoute,
    };
}
