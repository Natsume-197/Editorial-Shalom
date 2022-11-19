<template>
  <div class="flex items-center justify-center mt-24">
    <div class="px-40 py-20 bg-white rounded-md shadow-2xl">
      <div class="flex flex-col items-center">
        <h1 class="font-bold text-blue-600 text-5xl">Error 404</h1>
        <p class="mb-8 text-center text-gray-500 md:text-lg">
          La página que buscas no se ha encontrado.
        </p>

        <router-link
          to="/"
          class="px-6 py-2 text-sm rounded-md font-semibold text-white hover:underline bg-red-600"
          >Regresar a la página principal</router-link
        >
      </div>
    </div>
  </div>
</template>
