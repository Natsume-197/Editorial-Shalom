<template>
 
<div class="container px-6 mx-auto">

  <h1 class="text-2xl font-semibold text-gray-800 mb-10 lg:text-3xl  dark:text-white">
            {{ $t("bookseries.seriestitle1") }}  <span class="underline decoration-rose-500">{{ $t("bookseries.seriestitle2") }}</span>  {{ $t("bookseries.seriestitle3") }}
        </h1>

                    
  <div class="bg-white">
    
    <div class=" px-4 md:px-8 mx-auto mb-20 ">
      <div class="absolute blob2"/>

      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div class="h-auto md:h-auto  overflow-hidden rounded-lg">
            <img
              src="../../assets/images/book1.svg"
              loading="lazy"
              alt="Photo by Martin Sanchez"
              class="w-auto h-auto object-cover object-center"
            />
          </div>
        </div>
        <div class="md:pt-8 -order-1 md:order-1">
          <p class="text-rose-500 font-bold text-center md:text-left">{{ $t("categories.category1") }}</p>

          <h1
            class="text-gray-800 text-2xl sm:text-3xl font-bold text-center md:text-left mb-4 md:mb-6"
          >
            Little Geniuses
          </h1>

          <p class="text-gray-500 sm:text-xl mb-6 md:mb-8 	">
            {{ $t("bookseries.seriesa1") }}

            <br /><br />{{ $t("bookseries.seriesa2") }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white">
    
    <div class=" px-4 md:px-8 mx-auto mb-20">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div class="md:pt-8">
          <p class="text-rose-500 font-bold text-center md:text-left">
            {{ $t("categories.category3") }}
          </p>

          <h1
            class="text-gray-800 text-2xl sm:text-3xl font-bold text-center md:text-left mb-4 md:mb-6"
          >
            Geniecitos
          </h1>

          <p class="text-gray-500 sm:text-xl mb-6 md:mb-8">
            {{ $t("bookseries.seriesb1") }}
            <br /><br />
            {{ $t("bookseries.seriesb2") }}
          </p>
        </div>
        <div>
          <div
            class="h-auto md:h-auto  overflow-hidden rounded-lg flex items-center justify-center"
          >
            <img
              src="../../assets/images/book2.svg"
              loading="lazy"
              alt="Photo by Martin Sanchez"
              class="w-auto h-auto object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white ">
      <div class=" px-4 md:px-8 mx-auto mb-20 ">
        <div class="grid md:grid-cols-2 gap-8 lg:gap-12 ">
          <div>
            <div
              class="h-auto md:h-auto  overflow-hidden rounded-lg "
            >
              <img
                src="../../assets/images/book3.svg"
                loading="lazy"
                alt="Photo by Martin Sanchez"
                class="w-auto h-auto object-cover object-center"
              />
            </div>
          </div>
          <div class="md:pt-8 -order-1 md:order-1">
            <p class="text-rose-500 font-bold text-center md:text-left">
              {{ $t("categories.category2") }}
            </p>

            <h1
              class="text-gray-800 text-2xl sm:text-3xl font-bold text-center md:text-left mb-4 md:mb-6"
            >
            Little Stars

            </h1>

            <p class="text-gray-500 sm:text-xl mb-6 md:mb-8">
              {{ $t("bookseries.seriesc1") }}
              <br /><br />

              {{ $t("bookseries.seriesc2") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white">
    
    <div class=" px-4 md:px-8 mx-auto mb-20">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div class="md:pt-8">
          <p class="text-rose-500 font-bold text-center md:text-left">
            {{ $t("categories.category4") }}
          </p>

          <h1
            class="text-gray-800 text-2xl sm:text-3xl font-bold text-center md:text-left mb-4 md:mb-6"
          >
          Aventura Lógico
          </h1>

          <p class="text-gray-500 sm:text-xl mb-6 md:mb-8">
            {{ $t("bookseries.seriesd1") }}

            <br /><br />
            {{ $t("bookseries.seriesd2") }}

          </p>
        </div>
        <div>
          <div
            class="h-auto md:h-auto  overflow-hidden rounded-lg flex items-center justify-center"
          >
            <img
              src="../../assets/images/book4.svg"
              loading="lazy"
              alt="Photo by Martin Sanchez"
              class="w-auto h-auto object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>

  
</div>
</template>

<style>
.blob2 { 
    transform: rotateY(160deg);
    height: 100%;
    left: -72%;
    height: 180%;
    width: 78%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width=%22625.508%22 height=%22776.125%22 viewBox=%22199.993 68.219 625.508 776.125%22%3E%3Cdefs%3E%3ClinearGradient id=%22b%22 gradientTransform=%22rotate(-45 .5 .5)%22%3E%3Cstop offset=%22NaN%25%22 stop-color=%22%23ba59ff%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M766 603.5q-59 103.5-162.5 184t-254 47Q199 801 200 650.5T250.5 400Q300 300 400 159t263-63q163 78 162.5 241T766 603.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22url(%23b)%22 d=%22M766 603.5q-59 103.5-162.5 184t-254 47Q199 801 200 650.5T250.5 400Q300 300 400 159t263-63q163 78 162.5 241T766 603.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
}





</style>