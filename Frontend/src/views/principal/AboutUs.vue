<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import DetailsBook from "../../components/home/DetailsBook.vue";
import Footer from "../../components/home/Footer.vue";
</script>

<template>
  <div class="mx-auto mt-16">
    <Navbar />
    <body style="overflow: hidden">
        
        <div class="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
            <div class=" w-full">
                <h2 class="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2 text-left">{{ $t("aboutus.abouttitle") }}</h2>
                <p class="font-normal text-base lg:text-xl leading-6 text-gray-600 mt-6 text-left ">{{ $t("aboutus.abouttitle2") }}</p>
           

            <div class="flex flex-col lg:flex-row justify-between gap-8 mt-10 bg-purple-500">
                <div class="w-full lg:w-5/12 flex flex-col justify-center ">
                    <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-white pb-4 mx-4 mt-4">{{ $t("aboutus.mision1") }}</h1>
                    <p class="font-normal text-base lg:text-xl leading-6 text-white mx-4 lg:mb-4">{{ $t("aboutus.mision2") }}</p>
                </div>
                
                <div class="w-full lg:w-8/12">
                    <img class="w-full h-full" src="../../assets/images/placeholderKids.png" alt="A group of People" />
                </div>
            </div>

            
            <div class="flex flex-col-reverse lg:flex-row justify-between gap-8 mt-10  bg-rose-500">
                <div class="w-full lg:w-8/12">
                        <img class="w-full h-full" src="../../assets/images/placeholderKids2.png" alt="A group of People" />
                </div>
                <div class="w-full lg:w-5/12 flex flex-col justify-center ">
                    <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-white pb-4 mx-4 mt-4">{{ $t("aboutus.vision1") }}</h1>
                    <p class="font-normal text-base lg:text-xl leading-6 text-white mx-4 lg:mb-4">{{ $t("aboutus.vision2") }}</p>
                </div>
            </div>
        </div>
    </div>
    </body>
    <Footer />
  </div>
</template>

<style>
@font-face {
  font-family: "DynaPuff";
  src: url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@200&display=swap')
}

* {
  font-family: 'DynaPuff', cursive;
}

</style>