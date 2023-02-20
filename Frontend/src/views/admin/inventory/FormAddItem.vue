<script setup>
import { mdiBallotOutline, mdiFileUploadOutline } from "@mdi/js";
import SectionMain from "../../../components/dashboard/SectionMain.vue";
import CardBox from "../../../components/dashboard/CardBox.vue";
import LayoutAuthenticated from "../../../layouts/LayoutDashboard.vue";
import SectionTitleLineWithButton from "../../../components/dashboard/SectionTitleLineWithButton.vue";
import BaseButton from "../../../components/dashboard/minimal/BaseButton.vue";
import FormField from "../../../components/dashboard/FormField.vue";
import BaseDivider from "../../../components/dashboard/minimal/BaseDivider.vue";
import BaseButtons from "../../../components/dashboard/minimal/BaseButtons.vue";
import FormControl from "../../../components/dashboard/FormControl.vue";
import FormCheckRadioGroup from "../../../components/dashboard/FormCheckRadioGroup.vue";
import FormFilePicker from "../../../components/dashboard/FormFilePicker.vue";
import CoverBook from "../../../assets/images/placeholderCoverBook.png";
import { reactive, ref } from "vue";
import { registerBook } from "../../../utils/actions";

const selectOptions = [
  { id: 1, label: "Matemáticas" },
  { id: 2, label: "Integrados" },
  { id: 3, label: "Español" },
  { id: 4, label: "Inglés" },
];

const form = reactive({
  title: "",
  isbn: "",
  description: "",
  category: selectOptions[0],
  released_date: Date,
  price: null,
  available_units: null,
  title_english: "",
  description_english: "",
  file: null,
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
    //this.image=input.files[0];
    reader.readAsDataURL(input.files[0]);
  }
};

const submitForm = async () => {
  await registerBook(form);
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
              <FormControl v-model="form.category" :options="selectOptions" />
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
                required
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
          <CardBox class="h-min">
            <FormField label="Portada del libro">
              <img
                :src="data.preview"
                class="img-fluid object-contain h-82 w-86"
              />
            </FormField>

            <template v-if="form.file">
              <span
                class="inline-flex px-4 py-2 justify-center bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r cursor-default"
              >
                {{ form?.file?.name }}
              </span>
              <br />
              <br />
            </template>

            <FormField label="Subida de archivos">
              <CardBox class="mt-4 flex-col items-center">
                <BaseButtons class="">
                  <FormFilePicker
                    class=""
                    v-model="form.file"
                    label="Imagen"
                    outline
                    noWrap
                    @change="handleFileChange"
                  />
                  <FormFilePicker
                    class=""
                    v-model="form.file"
                    label="Preview"
                    outline
                    :icon="mdiFileUploadOutline"
                    @change="handleFileChange"
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
