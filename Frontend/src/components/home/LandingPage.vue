<template>
  <!-- hero - start -->
  <!--Hey! This is the original version
of Simple CSS Waves-->

  <div class="header">
    <div class="pb-6 sm:pb-8 lg:pb-12 mt-32">
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
    <!--Content before waves-->

    <!--Waves Container-->
    <div>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,255,255,0.7"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.5)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.3)"
          />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
    <!--Waves end-->
  </div>
  <!--Header ends-->
</template>

<style>
.header {
  position: relative;
  overflow: hidden;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgb(151, 132, 235) 0%,
    rgb(24, 164, 230) 100%
  );
  color: white;
}

.inner-header {
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .content {
    height: 30vh;
  }
  h1 {
    font-size: 24px;
  }
}
</style>
