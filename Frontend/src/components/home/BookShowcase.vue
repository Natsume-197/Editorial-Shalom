<script setup>
import { onMounted, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { api } from "../../utils/axios";

const response = reactive({
  data: null,
});

async function getBooks() {
  try {
    const res = await api.get(`book`);
    response.data = res.data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getBooks();
});

const i18nLocale = useI18n();
console.log(i18nLocale.locale.value);

const url_base = import.meta.env.VITE_API_URL_SHALOM + "/assets/books/covers/";
</script>
<template>
  <div class="lg:px-28 my-32">
    <div class="store_store__vh_9r">
      <section class="store_mainContainer__wg8_C rounded-lg">
        <h1
          class="store_catalogTitle__roHG_ text-black font-semibold text-5xl mb-10"
        >
          Catalogo de libros
        </h1>

        <section v-if="!response.data" class="bg-white dark:bg-gray-900">
          <div class="container py-10 mx-auto animate-pulse">
            <div
              class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-32 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3"
            >
              <div class="w-full">
                <div
                  class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"
                ></div>

                <h1
                  class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></h1>
                <p
                  class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></p>
              </div>

              <div class="w-full">
                <div
                  class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"
                ></div>

                <h1
                  class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></h1>
                <p
                  class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></p>
              </div>

              <div class="w-full">
                <div
                  class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"
                ></div>

                <h1
                  class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></h1>
                <p
                  class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></p>
              </div>

              <div class="w-full">
                <div
                  class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"
                ></div>

                <h1
                  class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></h1>
                <p
                  class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></p>
              </div>

              <div class="w-full">
                <div
                  class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"
                ></div>

                <h1
                  class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></h1>
                <p
                  class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></p>
              </div>

              <div class="w-full">
                <div
                  class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"
                ></div>

                <h1
                  class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></h1>
                <p
                  class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></p>
              </div>

              <div class="w-full">
                <div
                  class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"
                ></div>

                <h1
                  class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></h1>
                <p
                  class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></p>
              </div>

              <div class="w-full">
                <div
                  class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"
                ></div>

                <h1
                  class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></h1>
                <p
                  class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"
                ></p>
              </div>
            </div>
          </div>
        </section>
        <template v-if="response.data">
        
        <div class="store_bookGrid__Ps5Yl">
          
            <div v-for="item in response.data.books" :key="item" class="">
              <router-link
                class="BookCard_card__CVnLd store_bookCard__SveR5"
                :to="`book/${item.id}`"
              >
                <img
                  class="BookCard_image__sJlHo"
                  :src="url_base + item.cover"
                />

                <div class="BookCard_textPart__W3q1f">
                  <h3 class="BookCard_title__AgSkT">
                    {{ item.book_t[0].title }}
                  </h3>
                  <h5 class="BookCard_author__TF7aM"></h5>
                  <p class="BookCard_coverType__WYHhd">
                    {{ item.category.name }}
                  </p>
                  <h3 class="BookCard_price__7PWNw">
                    {{
                      item.price.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0,
                        useGrouping: true,
                      })
                    }}
                  </h3>
                </div>
              </router-link>
            </div>
        </div>
      </template>
      </section>
      <template v-if="response.data">
      <div class="store_filterCol__PwzP_">
        <aside class="store_filterBar__szdS1">
          <div class="store_checkGroup__4ho41">
            <h3>Disponibilidad</h3>
            <div>
              <input type="checkbox" class="Checkbox_checkbox__wYHKu" /><label
                >Agotado</label
              >
            </div>
            <div>
              <input type="checkbox" class="Checkbox_checkbox__wYHKu" /><label
                >En stock</label
              >
            </div>
          </div>
          <div class="store_checkGroup__4ho41">
            <h3>Género</h3>
            <div>
              <input type="checkbox" class="Checkbox_checkbox__wYHKu" /><label
                >Fantasía</label
              >
            </div>
          </div>
          <button class="Button_btn__TBmtl Button_secondary__y71g1">
            Aplicar Filtro
          </button>
        </aside>
        
      </div>
    </template>
    </div>
    
  </div>
  
</template>

<style>
.Input_container__3HOqe {
  display: flex;
  border-radius: 8px;
}

.Input_container__3HOqe:focus-within {
  outline: 2px solid #ffffff;
}

.Input_iconBox__WoIcS {
  display: flex;
  background: #29335a;
  border-right: 0.4px solid #384577;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 8px 0 0 8px;
}

.Input_iconBox__WoIcS svg {
  fill: #b5c1f2;
  width: 30px;
}

.Input_input__NcgaD {
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 1.3rem;
  color: #b5c1f2;
  background: #29335a;
  border: none;
  outline: none;
  width: 100%;
}

.Input_input__NcgaD::-webkit-input-placeholder {
  color: #b5c1f2;
}

.Input_input__NcgaD:-moz-placeholder {
  color: #b5c1f2;
}

.Input_withIcon__TFRrq {
  border-radius: 0 8px 8px 0;
}

.Select_container__5D_Ng {
  display: flex;
  min-width: 15rem;
}

.Select_iconBox__pawih {
  display: flex;
  background: #29335a;
  border-right: 0.4px solid #384577;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 8px 0 0 8px;
}

.Select_iconBox__pawih svg {
  fill: #b5c1f2;
  width: 30px;
}

.Select_select__6tI4a {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 1.3rem 3rem 1.3rem 1.3rem;
  color: #b5c1f2;
  border: none;
  outline: none;
}

@media screen and (max-width: 1200px) {
  .Select_select__6tI4a {
    width: 100%;
  }
}

.Select_withIcon__p1Moq {
  border-radius: 0 8px 8px 0;
}

.BookCard_card__CVnLd {
  display: flex;
  width: 19rem;
  flex-direction: column;
  padding: 1rem;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
  transition: all 0.2s;
}

@media screen and (max-width: 386px) {
  .BookCard_card__CVnLd {
    width: 16rem;
  }
}

.BookCard_card__CVnLd:hover {
  cursor: pointer;
  transform: translateY(-5px) scale(1.005) translateZ(0);
  filter: drop-shadow(0 7px 7px rgba(0, 0, 0, 0.25));
}

.BookCard_image__sJlHo {
  height: 18rem;
  -o-object-fit: cover;
  object-fit: cover;
  object-position: top;
  border-radius: 10px 10px 0 0;
}

.BookCard_textPart__W3q1f {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 0 0.7rem 0.7rem;
  border-radius: 0 0 10px 10px;
  height: 12em;
}

.BookCard_title__AgSkT {
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0.8rem 0 0;
  color: #000000;
  font-weight: 700;
}

.BookCard_author__TF7aM {
  margin: 0.4rem 0 0;
  font-weight: 500;
  font-size: 0.9rem;
  color: #000000;
}

.BookCard_coverType__WYHhd {
  margin: auto 0 0;
}

.BookCard_bottom__6jPun {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.BookCard_btns__2WzJ0 {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.9rem;
}

.BookCard_price__7PWNw {
  color: #000000;
  font-size: calc(1.325rem + 0.9vw);
  margin: 0.7rem 0;
}

@media (min-width: 1200px) {
  .BookCard_price__7PWNw {
    font-size: 2rem;
  }
}

.RangeInput_rangeInput__3GMPA {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.RangeInput_numberInput__02wqq {
  border-radius: 4px;
  background: #7f8ab6;
  color: #fff;
  text-align: center;
  padding: 0.6rem 0.2rem;
  width: 4.4rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  outline: none;
  -moz-appearance: textfield;
}

.RangeInput_numberInput__02wqq::-webkit-inner-spin-button,
.RangeInput_numberInput__02wqq::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.RangeInput_numberInput__02wqq::-webkit-input-placeholder {
  color: #b5c1f2;
}

.RangeInput_numberInput__02wqq:-moz-placeholder {
  color: #b5c1f2;
}

.Checkbox_checkbox__wYHKu {
  transform: scale(1.8);
  accent-color: #ff95b5;
}

.store_store__vh_9r {
  display: flex;
}

.store_mainContainer__wg8_C {
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  padding: 0 2rem;
}

@media screen and (max-width: 1300px) {
  .store_mainContainer__wg8_C {
    margin: 0 auto;
  }
}

@media screen and (min-width: 1300px) {
  .store_filterCol__PwzP_ {
    width: 317px;
  }
}

.store_filterBar__szdS1 {
  margin-top: 7rem;
  position: fixed;
  top: 0;
  width: 18rem;
  z-index: -10;
  border-radius: 6px;
  padding: 1.5rem;
  flex-direction: column;
  gap: 1rem;
  display: flex;
}

@media screen and (max-width: 1300px) {
  .store_filterBar__szdS1 {
    height: 100%;
    margin-top: 0;
    display: none;
    overflow-y: scroll;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    justify-content: flex-start;
    font-size: calc(1.325rem + 0.9vw);
    width: 100%;
    z-index: 10000;
    background-color: #f1f1f1;
    opacity: 0.98;
    gap: 0.5rem;
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (max-width: 1300px) and (min-width: 1200px) {
  .store_filterBar__szdS1 {
    font-size: 2rem;
  }
}

@media screen and (max-width: 1300px) and (min-width: 680px) {
  .store_filterBar__szdS1 {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 auto;
    justify-content: flex-start;
    justify-items: center;
    align-items: center;
  }
}

.store_filterBar__szdS1 h3 {
  color: #000000;
  margin: 0 0 0.8rem;
  padding: 0;
}

.store_checkGroup__4ho41 {
  display: flex;
  flex-direction: column;
  margin-top: 0;
}

@media screen and (min-width: 1300px) {
  .store_checkGroup__4ho41 {
    margin-top: 1rem;
  }
}

.store_checkGroup__4ho41 div {
  margin-bottom: 0.3rem;
}

@media screen and (min-width: 1300px) {
  .store_checkGroup__4ho41 div {
    margin-bottom: 0.7rem;
  }
}

.store_checkGroup__4ho41 div label {
  margin-left: 0.5rem;
}

.store_searchSort__dk8vc {
  display: flex;
  flex-direction: row;
  max-width: 70rem;
  gap: 1.5rem;
}

@media screen and (max-width: 1000px) {
  .store_searchSort__dk8vc {
    flex-direction: column;
  }
}

.store_bookGrid__Ps5Yl {
  margin: 2rem auto;
  display: grid;
  justify-content: flex-start;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2rem;
  gap: 2rem;
  -webkit-animation-name: store_fadeInBottom__q1RNM;
  animation-name: store_fadeInBottom__q1RNM;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@media screen and (min-width: 680px) {
  .store_bookGrid__Ps5Yl {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1000px) {
  .store_bookGrid__Ps5Yl {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1300px) {
  .store_bookGrid__Ps5Yl {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1650px) {
  .store_bookGrid__Ps5Yl {
    grid-template-columns: repeat(4, 1fr);
  }
}

@-webkit-keyframes store_fadeInBottom__q1RNM {
  0% {
    opacity: 0;
    transform: translateY(10%);
  }

  to {
    opacity: 1;
  }
}

@keyframes store_fadeInBottom__q1RNM {
  0% {
    opacity: 0;
    transform: translateY(10%);
  }

  to {
    opacity: 1;
  }
}

.store_bookCard__SveR5 {
  padding: 0;
}

.store_close__D6Ezp {
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border-color: transparent;
}

.store_button__ywSR0 {
  max-width: 40rem;
  display: none;
}

@media screen and (max-width: 1300px) {
  .store_button__ywSR0 {
    display: block;
  }
}

.store_apply__kMb3i {
  width: 100%;
}
</style>
