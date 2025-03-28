<template>
  <div class="flex p-[1em] justify-center items-center flex-col md:p-[4em]">
    <form class="w-full flex flex-col justify-center items-center max-w-[90em]">
      <div
        class="max-w-[50em] p-[1em] md:px-[8em] md:py-[5em] border-solid border-[1px] md:border-[2px] border-[#D90000] bg-cover bg-no-repeat w-full bg-[url(./form_bg.png)]"
      >
        <div class="flex justify-center items-center flex-col">
          <h1 class="font-bold text-[1.7rem] text-[#D90000]">Send a Message</h1>
          <p class="text-center">
            Send a Message We're here to help! Whether you have questions about
            our initiative, want to collaborate, or simply say hello, we'd love
            to hear from you.
          </p>
        </div>
        <div class="flex flex-col gap-2 pt-8 justify-center items-center">
          <div class="w-full flex gap-3">
            <input
              type="email"
              placeholder="Email address"
              class="p-3 w-full border-[#D90000] border-solid border-[1px] md:border-2"
            />
            <input
              type="text"
              placeholder="Full Name"
              class="p-3 w-full border-[#D90000] border-solid border-[1px] md:border-2"
            />
          </div>
          <div class="w-full">
            <input
              type="text"
              placeholder="Subject"
              class="p-3 w-full border-[#D90000] border-solid border-[1px] border-2"
            />
          </div>
          <div class="w-full">
            <textarea
              class="p-3 w-full resize-none h-[13em] border-[#D90000] border-solid border-[1px] border-2"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <div class="w-full justify-center flex">
            <button
              class="bg-[#D90000] max-w-[15em] text-white font-bold w-full p-3"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
