<template>
  <!-- hero - start -->

  <div class="waveWrapper waveAnimation -z-10">
    <div class="waveWrapperInner bgTop">
      <div
        class="wave waveTop"
        style="
          background-image: url('http://front-end-noobs.com/jecko/img/wave-top.png');
        "
      ></div>
    </div>
    <div class="waveWrapperInner bgMiddle">
      <div
        class="wave waveMiddle"
        style="
          background-image: url('http://front-end-noobs.com/jecko/img/wave-mid.png');
        "
      ></div>
    </div>
    <div class="waveWrapperInner bgBottom">
      <div
        class="wave waveBottom"
        style="
          background-image: url('http://front-end-noobs.com/jecko/img/wave-bot.png');
        "
      ></div>
    </div>
  </div>

  <div class="pb-6 sm:pb-8 lg:pb-12 mt-32 mb-40">
    <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <section
        class="min-h-96 flex justify-center items-center flex-1 shrink-0 bg-gray-100 overflow-hidden shadow-lg rounded-lg relative py-16 md:py-20 xl:py-48"
      >
        <div class="w-full lg:w-2/3 flex mb-12 md:mb-16">
          <div
            class="w-full h-full object-cover object-center absolute inset-0"
          >
            <img
              src="../../assets/images/medium-shot-kids-laying-together.jpg"
              class="w-full h-full object-cover object-center animate-fade-in-down"
            />
          </div>
        </div>

        <!-- text start -->
        <div
          class="sm:max-w-xl flex flex-col items-center relative p-4 bg-sky-600 rounded-l-lg shadow-xl animate-fade-in-down"
        >
          <p
            class="text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 md:mb-4 mt-6"
          >
            ¡Bienvenidos a la Editorial Shalom!
          </p>
          <h1 class="text-white text-lg sm:text-xl text-center mb-4 md:mb-4">
            Libros educativos para niños en edad de preescolar
          </h1>

          <div
            class="w-full flex flex-col sm:flex-row sm:justify-center gap-2.5 mb-4"
          >
            <a
              href="#"
              class="inline-block bg-rose-500 hover:bg-rose-600 active:bg-rose-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >Comprar</a
            >

            <a
              href="#"
              class="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >Información</a
            >
          </div>
        </div>
        <!-- text end -->
      </section>
    </div>
  </div>
</template>

<style>
/***Animation Arrow down***/
@keyframes down {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(20px);
  }
}
@-webkit-keyframes down {
  0% {
    -webkit-transform: translateY(0px);
  }
  100% {
    -webkit-transform: translateY(20px);
  }
}

@keyframes move_wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(-25%) translateZ(0) scaleY(0.55);
  }
  100% {
    transform: translateX(-50%) translateZ(0) scaleY(1);
  }
}
.waveWrapper {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
.waveWrapperInner {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  bottom: -1px;
  background-image: linear-gradient(
    to top,
    rgb(14 165 233) 20%,
    rgb(14 165 233) 80%
  );
}
.bgTop {
  z-index: 15;
  opacity: 0.5;
}
.bgMiddle {
  z-index: 10;
  opacity: 0.75;
}
.bgBottom {
  z-index: 5;
}
.wave {
  position: absolute;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat no-repeat;
  background-position: 0 bottom;
  transform-origin: center bottom;
}
.waveTop {
  background-size: 50% 100px;
}
.waveAnimation .waveTop {
  animation: move-wave 3s;
  -webkit-animation: move-wave 3s;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}
.waveMiddle {
  background-size: 50% 120px;
}
.waveAnimation .waveMiddle {
  animation: move_wave 10s linear infinite;
}
.waveBottom {
  background-size: 50% 100px;
}
.waveAnimation .waveBottom {
  animation: move_wave 15s linear infinite;
}
</style>
