export interface Testimony {
    name: string;
    img: string;
    title: string;
    testimony: string;
    isActive?: boolean;
  }
  
  export const useTestimonialCarousel = () => {
    const testimonies = ref<Testimony[]>([
      {
        name: "James Brown",
        img: "/avatar.png",
        title: "Princess of africa",
        testimony: "#InnovateOhafia conferences bring together professionals, experts, and industry leaders from diverse backgrounds. ",
      },
      {
        name: "Sarah Johnson",
        img: "/avatar.png",
        title: "CEO at TechCorp",
        testimony: "The conference was incredibly insightful. I met amazing professionals and gained valuable knowledge that helped grow our business significantly.",
      },
      {
        name: "Mike Chen",
        img: "/avatar.png",
        title: "Lead Developer",
        testimony: "An outstanding event that brought together the best minds in the industry. The networking opportunities were unparalleled.",
      },
    ]);
  
    const activeIndex = ref(1); // Start with middle card active
  
    const setActiveIndex = (index: number) => {
      activeIndex.value = index;
    };
  
    const nextTestimony = () => {
      activeIndex.value = (activeIndex.value + 1) % testimonies.value.length;
    };
  
    const prevTestimony = () => {
      activeIndex.value = (activeIndex.value - 1 + testimonies.value.length) % testimonies.value.length;
    };
  
    // Computed property to get testimonies with active state
    const testimoniesWithActiveState = computed(() => {
      return testimonies.value.map((testimony, index) => ({
        ...testimony,
        isActive: index === activeIndex.value
      }));
    });
  
    return {
      testimonies: testimoniesWithActiveState,
      activeIndex,
      setActiveIndex,
      nextTestimony,
      prevTestimony
    };
  };