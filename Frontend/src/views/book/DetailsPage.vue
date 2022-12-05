<template>
<section class="text-gray-700 body-font overflow-hidden bg-white">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://images.cdn1.buscalibre.com/fit-in/360x360/1a/75/1a75bba5a63b24b071af3fda2416b7b9.jpg">
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">Infantil</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{bookData.title}}</h1>
        <div class="flex mb-2">
          <span class="flex items-center">
            <span class="text-gray-600">{{bookData.total_pages}} página(s)</span>
          </span>
          <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            En Stock (15 unidades)
          </span>
        </div>
        <p class="leading-relaxed">{{bookData.description}}</p>
        <span class="flex py-4 font- text-xl">
            Detalles del libro
        </span>

        <span class="flex ">
           ・ ISBN: {{bookData.isbn}}
        </span>
        <span class="flex ">
           ・ Tamaño: {{bookData.format}}cm
        </span>
        <span class="flex ">
           ・ Fecha de lanzamiento: {{bookData.released_date}}
        </span>

        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">

          <div class="flex items-center">
            <span class="mr-3">Idioma</span>
            <div class="relative">
              <select class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                <option>Español</option>
                <option>Inglés</option>
              </select>
              <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
        
            </div>
            
          </div>
       
        </div>
        <div class="flex">
          <span class="title-font font-medium text-2xl text-gray-900">${{bookData.price}} (COP)</span>
          <button class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Comprar</button>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { api } from "../../../utils/axios";

export default {
    
  data() {
    return {
      bookData: {
        title: '',
        category: '',
        pageCount: 0,
        stock: 0,
        description: '',
        imageUrl: '',
      },
    }
  },
  mounted() {
    this.fetchBookData();
  },
  methods: {
    async fetchBookData() {
      try {
        const response = await api.get(`book/${this.$route.params.id}`)

        console.log(response)
        this.bookData = response.data.book;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>