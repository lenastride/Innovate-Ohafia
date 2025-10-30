export const useCarouselAutoRotate = (itemCount: number, activeIndex: Ref<number>) => {
    const interval = ref<NodeJS.Timeout | null>(null);
    
    const startAutoRotate = (intervalTime: number = 5000) => {
      stopAutoRotate();
      interval.value = setInterval(() => {
        activeIndex.value = (activeIndex.value + 1) % itemCount;
      }, intervalTime);
    };
    
    const stopAutoRotate = () => {
      if (interval.value) {
        clearInterval(interval.value);
        interval.value = null;
      }
    };
    
    onUnmounted(() => {
      stopAutoRotate();
    });
    
    return {
      startAutoRotate,
      stopAutoRotate
    };
  };