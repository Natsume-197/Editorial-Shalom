<template>
  <form @submit="getData">
    <div class="x-4 py-2 w-80 h-16">
      <div class="flex-1">
        <div class="absolute">
          <div class="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
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
                v-model="query"
              />
            </div>
            <div class="text-sm w-80">
              <div
                class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2"
                v-for="(item, index) in bookArray"
              >
                <span class="bg-green-400 h-2 w-2 m-2 rounded-full"></span>
                <div
                  @click="itemClicked(item)"
                  class="flex-grow font-medium px-2"
                >
                  {{ item.advice }}
                </div>
                <div class="text-sm font-normal text-gray-500 tracking-wide">
                  Infantil
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
      query: null,
      limit: 5,
      bookArray: [],
    };
  },
  methods: {
    itemClicked(item) {
      console.log(item);
      router.push("/libro/" + item.id);
    },
    resultQuery() {
      if (this.query.trim()) {
        axios
          .get(`https://api.adviceslip.com/advice/search/${this.query}`)
          .then((response) => {
            if (response.data.slips) {
              var bookArray = response.data.slips.slice(0, this.limit);
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
        this.bookArray = null;
      }
    },
  },
};
</script>
