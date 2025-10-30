<!-- pages/index.vue or your parent component -->
<script setup>
// Sample data with images - replace with your actual images
const achievements = [
  {
    title: "Learn Through Practice",
    description: "We move beyond the classroom to focus on real-world skills. In our workshops, hackathon, and mentorship sessions, you don't just talk about technology—you build it. This practical experience gives you the confidence and ability to solve problems and create tangible solutions.",
    image: "/achievement-1_480.png",
    imageAlt: "Students learning tech skills"
  },
  {
    title: "Connect with Tech Careers", 
    description: "We directly connect Ohafia's talent with job opportunities. At our dedicated Career & Job Fair, you can meet hiring tech companies. The Corporate Career Track and our networking events provide the guidance and personal connections to help you start and grow your career in tech.",
    image: "/achievement-1_480.png",
    imageAlt: "Entrepreneurship workshop"
  },
  {
    title: "Start Your Own Venture",
    description: "We believe the next successful tech business can start right here in Ohafia. For aspiring founders, our Entrepreneurship Track offers a Business Pitch Contest and an Exhibition. This is your platform to refine your idea, present it to potential investors, and find the partners you need to build a sustainable company.",
    image: "/achievement-1_480.png",
    imageAlt: "Business partnership meeting"
  },
  {
    title: "Join Our Growing Community",
    description: "Innovate Ohafia is just the beginning. We are building a lasting network by partnering with tech companies, schools, NGOs, and government. This growing community ensures that support, mentorship, and new opportunities continue long after the event, creating a permanent foundation for growth in Ohafia.",
    image: "/achievement-1_480.png",
    imageAlt: "Community tech event"
  },
//   {
//     title: "Resource Access",
//     description: "Provide access to cutting-edge tools, technologies, and resources needed for successful innovation.",
//     image: "/images/resources.jpg",
//     imageAlt: "Technology resources and tools"
//   }
]
</script>

<template>
  <section class="bg-[#F5F5F5] w-full py-14 flex flex-col items-center">
    <div class="w-full max-w-[70em] flex flex-col justify-center gap-4">
      <h1 class="font-bold text-2xl md:text-3xl text-[#D90000] ml-[6.3%] text-left">
        How do we achieve this?
      </h1>
      
      <AppCarousel
        :items="achievements"
        :auto-play="true"
        :auto-play-interval="5000"
      />
    </div>
  </section>
</template>