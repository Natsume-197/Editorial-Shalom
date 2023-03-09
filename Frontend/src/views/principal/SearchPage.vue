<script setup>
import Navbar from "../../components/home/elements/Navbar.vue";
import Footer from "../../components/home/Footer.vue";
import { useRoute } from "vue-router";
import { api } from "../../utils/axios";
import { ref, reactive } from "vue";

const route = useRoute();
const query = route.query.query;

const data = reactive({
  books: null,
});

const response = api.get(`search?name=${query}`).then((response) => {
  data.books = response.data.books;
});
const url_base = import.meta.env.VITE_API_URL_SHALOM + "/assets/books/covers/";

</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1">
      <Navbar />

      <div class="bg-white py-6 sm:py-8 lg:py-12 mt-24">
        <div class="mx-auto max-w-screen-lg px-4 md:px-8">
          <div class="mb-6 sm:mb-10 lg:mb-16">
            <h2
              class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl"
            >
              Resultados de la busqueda
            </h2>
          </div>

          <div
            class="mb-5 flex flex-col sm:mb-8 sm:divide-y sm:border-t sm:border-b"
          >
          <div v-for="item in data.books" :key="item" class="">
      
            <!-- product - start -->
            <div class="py-5 sm:py-8">
              <div class="flex flex-wrap gap-4 sm:py-2.5 lg:gap-6">
                <div class="sm:-my-2.5">
                  <a
                    href="#"
                    class="group relative block h-40 w-24 overflow-hidden rounded-lg bg-gray-100 sm:h-56 sm:w-40"
                  >
                    <img
                    :src="url_base + item.cover"
                      loading="lazy"
                      alt="Photo by Thái An"
                      class="h-full w-full transition duration-200 group-hover:scale-110"
                    />
                  </a>
                </div>

                <div class="flex flex-1 flex-col justify-between">
                  <div>
                    <a
                      href="#"
                      class="mb-1 capitalize inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                      >{{item.book_t[0].title}}</a
                    >

                    <span class="block text-gray-500">{{ item.category.name }}</span>
                    <span class="block text-gray-500 mt-2">{{ item.book_t[0].description }}</span>
                  </div>

                  <div>
    

                    <span class="flex items-center gap-1 text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      In stock
                    </span>
                  </div>
                </div>

                <div
                  class="flex w-full justify-between border-t pt-4 sm:w-auto sm:border-none sm:pt-0"
                >
         

                  <div class="ml-4 pt-3 sm:pt-2 md:ml-8 lg:ml-16">
                    <span class="block font-bold text-gray-800 md:text-lg"
                      >{{ item.price.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                        useGrouping: true,
                      }) }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- product - end -->
          </div>
          </div>
        </div>
      </div>

    </div>
    <Footer />
  </div>
</template>
