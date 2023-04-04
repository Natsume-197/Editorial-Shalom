<script setup>
import { register } from "swiper/element/bundle";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref, onMounted } from "vue";
import { api } from "../../utils/axios"

const categories = ref(["Nuevo", "Selección"]);

register();

const carouselItems = [
  {
    title: "Tensei Oujo to Tensai Reijou no Mahou Kakumei",
    imageSrc: "https://pbs.twimg.com/media/FZ8piU4UcAAhj5T.jpg",
  },
  {
    title: "Tensei Oujo to Tensai Reijou no Mahou Kakumei",
    imageSrc: "https://aleatoriascan.xyz/wp-content/uploads/2022/12/32.jpg",
  },
  {
    title: "Tensei Oujo to Tensai",
    imageSrc:
      "https://animenewsplus.net/wp-content/uploads/2022/08/Tensei-Oujo-to-Tensai-Reijou-no-Mahou-Kakumei-Cover-Volume-5-1.webp",
  },
  {
    title: "Tensei Oujo to Tensai Reijou no Mahou Kakumei",
    imageSrc:
      "https://cdn.novelupdates.com/images/2020/01/revolution-cover.jpg",
  },
  {
    title: "Little Genius",
    imageSrc:
      "https://media.discordapp.net/attachments/738158789655527426/1078545170548670495/Imagen_de_WhatsApp_2023-02-23_a_las_17.15.43.jpg?width=914&height=671",
  },
];

const url_base = import.meta.env.VITE_API_URL_SHALOM + "/assets/books/covers/";

const response = await api.get(`book`);
  response.data.books = response.data.books.sort(
    (a, b) =>
      new Date(b.published_date).getTime() -
      new Date(a.published_date).getTime()
  );
</script>

<template>
  <div class="w-full px-4 md:px-32 mx-auto bg-sky-500 pt-10">
    <div class="tabs text-center">
      <TabGroup>
        <TabList class="space-x-10 mb-10">
          <Tab
            v-for="category in categories"
            as="template"
            :key="category"
            v-slot="{ selected }"
          >
            <button
              :class="[
                ' text-lg font-semibold text-white md:text-xl ',
                'text-lg font-semibold text-white md:text-xl ',
                selected
                  ? 'text-lg font-semibold text-white-300 cursor-default outline-none w-24 h-12 text-center items-center rounded-xl bg-cyan-800 text-yellow-300'
                  : 'text-lg font-semibold underline hover:no-underline',
              ]"
            >
              {{ category }}
            </button>
          </Tab>
        </TabList>
        <div class="content-tabs">
          <TabPanels class="sm:mx-52 md:mx-20">
            <TabPanel>
              <swiper-container
                :pagination="{
                  type: 'bullets',
                }"
                :autoplay="{
                  delay: 3500,
                  disableOnInteraction: false,
                }"
                :breakpoints="{
                  '340': {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  '640': {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  '768': {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  '1024': {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }"
                grid-col="4"
              >
                <swiper-slide
                  v-for="(item, index) in response.data.books"
                  :key="index"
                  class=""
                >
                
                  <router-link :to="'/book/'+item.id">
                    <div
                      class="px-2 h-80 sm:px-6 sm:h-96 sm:pt-6 sm:pb-4 bg-white rounded-xl transform transition-all shadow-xl overflow-hidden"
                    >
                      <!-- Image -->
                      <img
                        class="w-full mt-1 h-60 object-contain rounded-xl transition delay-100 hover:rotate-6 mb-2 sm:mb-6 duration-300"
                        :src="url_base+item.cover"
                        alt=""
                      />
                      <div class="sm:p-2">
                        <!-- Heading -->
                        <h2 class="text-sm sm:text-lg font-medium">
                          {{ item.book_t[0].title }}
                        </h2>
                      </div>
                    </div>
                  </router-link>
                  <br /><br /><br />
                  
                </swiper-slide>
                
              </swiper-container>

  
              <br />
            </TabPanel>
            <TabPanel> </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
    </div>
  </div>
  <div class="w-full px-4 md:px-8 mx-auto  bg-sky-400">
    <div class="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
      <router-link
        to="/books"
        class="inline-block rounded-lg bg-rose-500 px-8 py-3 text-center text-lg font-bold m-10 text-white outline-none transition duration-100 hover:bg-rose-600 focus-visible:ring"
        >{{ $t("showcase.explorebutton") }}</router-link
      >
    </div>
  </div>
</template>
