import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useBreakpoints() {
  const currentWidth = ref(window.innerWidth);

  const updateWidth = () => {
    currentWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth);
  });

  return { currentWidth };
}
