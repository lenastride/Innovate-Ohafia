<template>
<div class="py-20 md:pt-40">
    <section class="flex flex-col gap-8">
        <h1 class="text-[2.5rem] text-center font-bold">Our Partners</h1>
        <div class="w-full bg-[#F5F5F5] p-8 flex justify-evenly">
            <div class="w-[70em] justify-around items-center flex">
                <div class="px-[6px]">
                    <img src="/logos_webflow.svg" alt="">
                </div>
                <div class="px-[6px]">
                    <img src="/logos_invision.svg" alt="">
                </div>
                <div class="px-[6px]">
                    <img src="/logos_webflow.svg" alt="">
                </div>
                <div class="px-[6px]">
                    <img src="/logos_invision.svg" alt="">
                </div>
            </div>
        </div>
    </section>

    <section class=" mt-[3em] py-[4.5em] overflow-x-hidden flex-col justify-center items-center md:flex-row flex gap-10">
        <PartnerCard titlePosition="top" title="Vision" text="To bridge the digital divide in Ohafia by empowering youth with the skills, resources, and connections needed to become active participants in the global tech landscape." />
        <PartnerCard titlePosition="bottom" title="Mission" text="To establish Ohafia as a hub for tech innovation and entrepreneurship, fostering a dynamic and prosperous future for the region." />
    </section>
</div>
</template>
