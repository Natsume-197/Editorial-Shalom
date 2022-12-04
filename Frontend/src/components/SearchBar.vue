<template>
  <form @submit.prevent="">
    <div class="x-4 py-2 w-80 h-16">
      <div class="flex-1">
        <div class="">
          <div class="bg-white absolute shadow-md rounded-lg px-3 py-2 mb-4">
            <div class="flex items-center bg-gray-200 rounded-md">
              <div class="pl-2">
                <svg
                  class="fill-current text-gray-500 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    class="heroicon-ui"
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                  />
                </svg>
              </div>
              <input
                class="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                id="search"
                type="text"
                placeholder="Buscar libros..."
                @keypress.enter="submit()"
                v-model="query"
              />
            </div>
            <div class="text-sm w-80">
              <div
                v-if="bookArray && bookArray.length > 0 "
                class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                v-for="(item, index) in bookArray"
              >
                <span class="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                <div
                  @click="itemClicked(item)"
                  class="flex-grow font-medium px-2"
                >
                  {{ item.title }}
                </div>
                <div class="text-sm font-normal text-gray-500 tracking-wide">
                  Infantil
                </div>
              </div>
              <!-- Mostramos el mensaje de "No hay resultados disponibles" si no hay libros en la búsqueda -->
              <div
                v-else-if="query !== '' && bookArray.length === 0"
                class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
              >
                {{ noResultsMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import router from "../router";
import { api } from "../../utils/axios";

export default {
  data() {
    return {
      query: '',
      limit: 5,
      bookArray: [],
      noResultsMessage: "No hay resultados disponibles",
    };
  },
  methods: {
    submit() {
      //if you want to send any data into server before redirection then you can do it here
      this.$router.push("/search/?query=" + this.query);
      this.query = "";
    },
    itemClicked(item) {
      console.log(item);
      router.push("/book/" + item.id);
    },
    resultQuery() {
      if (this.query.trim()) {
        api.get(`search?query=${this.query}`).then((response) => {
          if (response.data.books) {
            try {
              if (response.data.books.length === 0) {
              this.bookArray = [];
            }
            } catch (error) {
              this.bookArray = [];
              return 
            }
            
            var bookArray = response.data.books.slice(0, this.limit);
            this.bookArray = bookArray;
          } else {
            this.bookArray = [];
          }
        });
      }
    },
  },
  watch: {
    query(val) {
      if (val) {
        this.resultQuery();
      } else {
        this.bookArray = [];
      }
    },
  },
};
</script>
