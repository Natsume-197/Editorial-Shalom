<script setup>
import { api } from "../../utils/axios";
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue';
import Modal from "./modal.vue"
import { useI18n } from "vue-i18n";

const route = useRoute();
const id = route.params.id;
const response = await api.get(`book/${id}`);

const i18nLocale = useI18n();
console.log(i18nLocale.locale.value)

let title = ''
let description = ''

// Se ordena el arreglo primero
response.data.book.book_t.sort((a, b) => a.id_language - b.id_language)
const url_base = import.meta.env.VITE_API_URL_SHALOM +"/assets/books/covers/"

if(i18nLocale.locale.value === 'es'){
    title = response.data.book.book_t[0].title
    description = response.data.book.book_t[0].description
}else{
    title = response.data.book.book_t[1].title
    description = response.data.book.book_t[1].description
}

const data = reactive({
    title: title,
    description: description,
    isbn: response.data.book.isbn,
    total_pages: response.data.book.total_pages,
    category: response.data.book.category.name,
    price: response.data.book.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits:0,  useGrouping: true }),
    released_date: new Date(response.data.book.released_date).toLocaleString().split(",")[0],
    cover: url_base+response.data.book.cover
})

let showModal = ref(false)


const openModal = () => { 
     showModal.value = true;
}

const closeModal = () => { 
     showModal.value = false;
}

</script>
<template>
  <section class="text-gray-700 body-font overflow-hidden bg-white">
    <div class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          class="lg:w-1/2 w-full object-contain px-8 object-center rounded border border-gray-200"
          :src=data.cover
          @click="openModal(data.cover)"
        />
        <Modal :image="image" v-if="showModal" @close="closeModal" />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">
            {{ data.category }}
          </h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            {{ data.title }}
          </h1>
          <div class="flex mb-2">
            <span class="flex items-center">
              <span class="text-gray-600"
                >{{ data.total_pages }} página(s)</span
              >
            </span>
            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
              En Stock (15 unidades)
            </span>
          </div>
          <p class="leading-relaxed">{{ data.description }}</p>
          <span class="flex py-4 font- text-xl"> Detalles del libro </span>

          <span class="flex"> ・ ISBN: {{ data.isbn }} </span>
          <span class="flex"> ・ Tamaño: {{ data.format }}32x62cm </span>
          <span class="flex">
            ・ Fecha de lanzamiento: {{ data.released_date }}
          </span>

          <div
            class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"
          >
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900"
              >{{ data.price }} (COP)</span
            >
            <button
              class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

