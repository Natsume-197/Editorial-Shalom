<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import DetailsBook from "../../components/home/DetailsBook.vue";
import Footer from "../../components/home/Footer.vue";
</script>

<template>
  <div class="mx-auto lg:mt-20">
    <Navbar />
    <body style="overflow: hidden">
        
        <div class="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
            <div class=" w-full">
                <h2 class="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-800 lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2 text-left">¿Quienes somos?</h2>
                <p class="font-normal text-xl leading-6 text-gray-600 mt-6 text-left ">Bienvenidos a la Editorial Shalom, una editorial colombiana que se dedica a crear libros para niños en edad preescolar con el objetivo de ampliar su conocimiento y educación de una manera divertida. Nos enfocamos en utilizar el juego, la tecnología y el bilingüismo como herramientas para lograr que los niños aprendan mientras se divierten.</p>
           

            <div class="flex flex-col lg:flex-row justify-between gap-8 mt-10 bg-cyan-300">
                <div class="w-full lg:w-5/12 flex flex-col justify-center ">
                    <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4 mx-4">Nuestra misión</h1>
                    <p class="font-normal text-xl leading-6 text-gray-600 mx-4">La misión del grupo Editorial Shalom es contribuir al desarrollo de la educación de los niños en edad preescolar por medio del juego, la tecnología y el bilingüismo. Pensamos que es el trabajo más importante en el mundo por eso nos esforzamos en apoyar a profesores y padres.</p>
                </div>
                
                <div class="w-full lg:w-8/12">
                    <img class="w-full h-full" src="../../assets/images/placeholderKids.png" alt="A group of People" />
                </div>
            </div>

            
            <div class="flex lg:flex-row flex-col justify-between gap-8 pt-12">

                <div class="w-full lg:w-8/12 lg:pt-8">
                        <img class="w-full h-full" src="../../assets/images/placeholderKids2.png" alt="A group of People" />
                </div>
                <div class="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 class="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">Nuestra visión</h1>
                    <p class="font-normal text-xl leading-6 text-gray-600">Nuestra visión es convertirnos en una editorial de referencia para los niños en edad preescolar y que los profesores tengan todas las herramientas tanto en español como en inglés y lograr transmitir el mensaje “Aprender en un reto divertido” y que trae recompensas.</p>
                </div>
            </div>
        </div>
    </div>
    </body>
    <Footer />
  </div>
</template>
