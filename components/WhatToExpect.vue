
<script setup>
    const obj = {
      activities: [
        {
          name: "Masterclass"
        },
        {
          name: "Network"
        },
        {
          name: "Start-up Pitches"
        }
      ]
    }

    function addLeadingZero(num) {
      return num >= 1 && num <= 9 ? `0${num}` : `${num}`;
    }
</script>

<template>

    <main class="flex flex-col justif-center items-center">
        <section class="w-full max-w-[70em]">
            <h1 class="font-bold text-2xl md:text-3xl text-[#D90000] ml-[6.3%] text-left">What to expect</h1>
        </section>
        <section class="flex flex-col w-full pt-10 md:flex-row justify-center">
            <div class="w-full overflow-hidden max-h-[34em]">
                <img class="w-full" src="/what_to_expect_image.png">
            </div>
            <div class="w-full md:p-[5em] md:pl-[7em] bg-cover bg-[url(/who_to_expect_bg.png)] ">
                <div class="">
                    <li class="flex items-center pl-10" v-for="(activity, index) in obj.activities" :key="index">
                      <span class="block w-full text-2xl font-bold">
                        {{activity.name}}
                      </span>
                      <span class="block w-full font-bold text-[5rem]">
                        {{addLeadingZero(index + 1)}}
                      </span>
                    </li>
                </div>
            </div>
        </section>
    </main>

</template>
