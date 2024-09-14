import { useMediaQuery } from "@vueuse/core";

export default function useScreenWidth() {
    const isUltraWide = useMediaQuery('(min-width: 1800px)');
    const isDesktopOrWider = useMediaQuery('(min-width: 1470px)');
    const isDesktop = useMediaQuery('(min-width: 1470px) and (max-width: 1799px)');
    const isTabletOrWider = useMediaQuery('(min-width: 751px)');
    const isTablet = useMediaQuery('(min-width: 751px) and (max-width: 1469px)');
    const isMobile = useMediaQuery('(max-width: 750px)');


    return {
        isUltraWide,
        isDesktop,
        isDesktopOrWider,
        isTablet,
        isTabletOrWider,
        isMobile
    };
}
