<script setup>
import { register } from "swiper/element/bundle";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { ref } from "vue";

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
      "https://www.nautiljon.com/images/manga/00/17/tensei_oujo_to_tensai_reijou_no_mahou_kakumei_16171.webp",
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
</script>

<template>
  <div class="main-section-categories block bg-cyan-500 pt-8 pb-8">
    <div class="tabs text-center">
      <TabGroup>
        <TabList class="space-x-10 mb-8">
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
                  ? 'text-lg font-semibold text-yellow-300 cursor-default outline-none bg-cyan-700 w-24 h-12 text-center items-center rounded-xl'
                  : 'text-lg font-semibold',
              ]"
            >
              {{ category }}
            </button>
          </Tab>
        </TabList>
        <div class="content-tabs">
          <TabPanels class="sm:mx-52 md:mx-20 lg:mx-52">
            <TabPanel>
              <swiper-container
                :modules="modules"
                navigation="{
                  'nextEl': .swiper-button-next,
                  'prevEl': .swiper-button-prev
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
                    slidesPerView: 2,
                    spaceBetween: 20,
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
                @progress="onProgress"
                @slidechange="onSlideChange"
                grid-col="4"
              >
                <swiper-slide
                  v-for="(item, index) in carouselItems"
                  :key="index"
                  class=""
                >
                  <router-link to="/book">
                    <div
                      class="px-6 h-96 pt-6 pb-4 bg-white rounded-xl transform transition-all shadow-xl overflow-hidden"
                    >
                      <!-- Image -->

                      <img
                        class="w-full h-60 object-contain rounded-xl transition delay-100 hover:rotate-6 mb-4 duration-300"
                        :src="item.imageSrc"
                        alt=""
                      />
                      <div class="sm:p-4">
                        <!-- Heading -->
                        <h2 class="text-sm sm:font-bold sm:text-lg">
                          {{ item.title }}
                        </h2>
                      </div>
                    </div>
                  </router-link>
                  <br />
                </swiper-slide>
              </swiper-container>
            </TabPanel>
            <TabPanel>Content 2</TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
    </div>
  </div>
</template>
