<template>
<form @submit="getData">
  <div class="flex items-center justify-center">
    <div class="flex border-2 rounded-lg">
      <input
        type="text"
        class="px-4 py-2 w-50 text-black focus:outline-none"
        placeholder="Buscar libros..."
        v-model="query"
      />
      <button class="flex items-center justify-center px-5 rounded-lg">
        <svg
          class="w-6 h-6 text-gray-600 rounded-lg"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          />
        </svg>
      </button>
    </div>
  </div>
</form>
</template>

<script>
export default {
  data() {
    return {
        query: null
    }
  },
  watch: {
    // whenever query changes, this function will run
    query(newQuery, oldQuery) {
        this.getData()
    }
  },

  methods: {
    async getData(){
        console.log(this.query)
    }
  }
}
</script>
