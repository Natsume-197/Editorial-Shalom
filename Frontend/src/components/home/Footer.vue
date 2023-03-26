<template>
  <footer class="overflow-y-hidden z-50">
    
    <div class="mx-auto lg:px-12 sm:px-6 px-4 bg-sky-600	  ">
      <div class="flex flex-col items-center justify-center">
        <div class="flex items-center mt-6 text-center">
          <p class="text-base leading-4 text-white">
            2023 <span class="font-semibold">Editorial Shalom</span>
          </p>
          <div class="border-l border-white pl-2 ml-2">
            <p class="text-base leading-4 text-white">
                {{ $t("footer.copy1") }}
            </p>
          </div>

        </div>
        <p class="text-base leading-4 mt-5 mb-5 text-white underline  text-center">
             <span class="font-semibold">{{ $t("footer.copy2") }}</span>
          </p>        
      </div>
    </div>
  </footer>
</template>

<script setup></script>
