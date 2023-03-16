<script setup>
import { mdiBallotOutline, mdiFileUploadOutline } from "@mdi/js";
import SectionMain from "../../../components/dashboard/sections/SectionMain.vue";
import CardBox from "../../../components/dashboard/cardbox/CardBox.vue";
import LayoutAuthenticated from "../../../layouts/LayoutDashboard.vue";
import SectionTitleLineWithButton from "../../../components/dashboard/sections/SectionTitleLineWithButton.vue";
import BaseButton from "../../../components/dashboard/minimal/BaseButton.vue";
import FormField from "../../../components/dashboard/form/FormField.vue";
import BaseDivider from "../../../components/dashboard/minimal/BaseDivider.vue";
import BaseButtons from "../../../components/dashboard/minimal/BaseButtons.vue";
import FormControl from "../../../components/dashboard/form/FormControl.vue";
import FormCheckRadioGroup from "../../../components/dashboard/form/FormCheckRadioGroup.vue";
import FormFilePicker from "../../../components/dashboard/form/FormFilePicker.vue";
import CoverBook from "../../../assets/images/placeholderCoverBook.png";
import { reactive, computed, onMounted, ref } from "vue";
import { registerBook } from "../../../utils/actions";
import { api } from "../../../utils/axios";

let state = reactive({});

const form = reactive({
  title: "",
  isbn: "",
  description: "",
  category: "",
  released_date: Date,
  price: null,
  available_units: null,
  title_english: "",
  description_english: "",
  file: null,
  cover: null,
  pdf: null,
});

onMounted(() => {
  api.get("/book/category").then((response) => {
    state.categories = response.data.categories
      .map((category) => {
        return {
          id: category.id,
          label:
            category.name.charAt(0).toUpperCase() +
            category.name.slice(1).toLowerCase(),
        };
      })
      .sort((a, b) => (a.label > b.label ? 1 : -1));
  });
});

const data = reactive({
  file: null,
  preview: CoverBook,
});

const handleFileChange = (event) => {
  var input = event.target;
  if (input.files) {
    var reader = new FileReader();
    reader.onload = (e) => {
      data.preview = e.target.result;
    };
    form.cover = input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};

const submitForm = async () => {
  let formData = new FormData();
  formData.append("title", form.title);
  formData.append("isbn", form.isbn);
  formData.append("description", form.description);
  formData.append("category", form.category.id);
  formData.append("released_date", form.released_date);
  formData.append("price", form.price);
  formData.append("available_units", form.available_units);
  formData.append("title_english", form.title_english);
  formData.append("description_english", form.description_english);

  if (form.cover) {
    formData.append("image", form.cover);
  }

  if (form.pdf) {
    formData.append("pdf", form.pdf);
  }

  await registerBook(formData);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiBallotOutline"
        title="Formulario Libro"
        main
      >
      </SectionTitleLineWithButton>
      <form @submit.prevent="submitForm" class="grid gap-4 mb-6 xl:grid-cols-3">
        <CardBox class="col-span-2 h-min">
          <FormField label="Datos Básicos">
            <FormControl
              v-model="form.title"
              required
              placeholder="Título original"
            />
            <FormControl v-model="form.isbn" placeholder="ISBN" />
          </FormField>
          <FormField label="" help="Máximo 700 caracteres">
            <FormControl
              type="textarea"
              placeholder="Descripción o sinopsis del libro..."
              v-model="form.description"
            />
          </FormField>
          <FormField>
            <FormField label="Categoría">
              <FormControl
                v-model="form.category"
                :options="state.categories"
              />
            </FormField>
            <FormField label="Fecha de lanzamiento" horizontal>
              <FormControl type="date" v-model="form.released_date" />
            </FormField>
          </FormField>
          <BaseDivider />
          <FormField label="Datos de venta">
            <FormControl
              v-model="form.price"
              placeholder="Precio (COP)"
              expanded
              middle-addon
            />
            <FormControl
              v-model="form.available_units"
              placeholder="Unidades disponibles"
              expanded
              middle-addon
            />
          </FormField>
          <BaseDivider />
          <CardBox isAccordion accordionTitle="Traducción (Opcional)" class="">
            <FormField label="">
              <FormControl
                v-model="form.title_english"
                placeholder="Título en inglés"
              />
            </FormField>
            <FormField label="" help="Máximo 700 caracteres">
              <FormControl
                type="textarea"
                v-model="form.description_english"
                placeholder="Descripción o sinopsis del libro en inglés..."
              />
            </FormField>
          </CardBox>
        </CardBox>
        <div class="">
          <CardBox class="w-full">
            <FormField label="Previsualización">
              <img
                :src="data.preview"
                class="img-fluid object-contain h-82 w-86"
              />
            </FormField>
            <BaseDivider />

            <template v-if="form.file">
              <span
                class="inline-flex px-4 py-2 w-full justify-center bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r cursor-default"
              >
                {{ form?.file?.name }}
              </span>
            </template>

            <template v-if="form.file && !form.pdf">
              <BaseDivider />
            </template>
            <template v-if="form.pdf && form.file"> <br /><br /> </template>

            <template v-if="form.pdf">
              <span
                class="inline-flex px-4 py-2 w-full justify-center bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r cursor-default"
              >
                {{ form?.pdf?.name }}
              </span>
              <br />
              <BaseDivider />
            </template>

            <FormField label="Subida de archivos">
              <CardBox class="mt-4 flex-col items-center">
                <BaseButtons class="">
                  <FormFilePicker
                    class=""
                    v-model="form.file"
                    label="Portada"
                    outline
                    noWrap
                    @change="handleFileChange"
                  />
                  <FormFilePicker
                    v-model="form.pdf"
                    label="Preview"
                    outline
                    accept=".pdf"
                    :icon="mdiFileUploadOutline"
                  />
                </BaseButtons>
              </CardBox>
            </FormField>
          </CardBox>
          <CardBox class="mt-4 flex-col items-center">
            <FormField>
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Añadir libro" />
                <BaseButton
                  type="reset"
                  color="info"
                  outline
                  label="Reiniciar"
                />
              </BaseButtons>
            </FormField>
          </CardBox>
        </div>
      </form>
    </SectionMain>
  </LayoutAuthenticated>
</template>
