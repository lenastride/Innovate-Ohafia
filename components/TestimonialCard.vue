<script setup lang="ts">
interface Props {
  name: string;
  img: string;
  title: string;
  testimony: string;
  isActive: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  click: [];
}>();

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <div
    class="cursor-pointer w-full transition-all duration-300 ease-in-out"
    @click="handleClick"
  >
    <div
      :class="[
        'relative flex flex-col items-center text-center p-6  shadow-lg border-2 transition-all duration-300 min-h-[16em] w-full py-3',
        isActive
          ? 'bg-[#0072B5] w-full scale-105  text-white border-[#0072B5]'
          : 'bg-white 2xl:w-[18em] md:w-full text-gray-700 border-0 shadow-none'
      ]"
    >
      <!-- Avatar - Only shown when active -->
      <div
        v-if="isActive"
        class="absolute -top-8 w-20 h-20  border-4 border-white overflow-hidden shadow-lg bg-white z-30"
      >
        <img
          :src="img"
          :alt="name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Content -->
      <div class="w-full pt-8 flex-1 flex flex-col justify-center">
        <div class="mb-4">
          <h2 
            :class="[
              'text-xl font-bold mb-1',
              isActive ? 'text-white' : 'text-gray-800'
            ]"
          >
            {{ name }}
          </h2>
          <p 
            :class="[
              'text-sm',
              isActive ? 'text-blue-100' : 'text-gray-500'
            ]"
          >
            {{ title }}
          </p>
        </div>
        
        <p
          :class="[
            'text-sm leading-relaxed transition-all duration-300',
            isActive ? 'text-white' : 'text-gray-600'
          ]"
        >
          {{ testimony }}
        </p>
      </div>

      <!-- Active indicator dot -->
      <!-- <div
        v-if="isActive"
        class="absolute -bottom-2 w-4 h-4 bg-[#0072B5] transform rotate-45 rounded-sm"
      /> -->
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>