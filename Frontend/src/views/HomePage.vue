<template>
  <div class="flex justify-center m-20 items-center flex-col">
    <h1 class="text-2xl font-bold">{{ $t("welcomeMsg") }}</h1>
  </div>

  <label for="locale">Locale: </label>
  <select
    v-model="$i18n.locale"
    id="locale"
    @change="setLanguageStorage($i18n.locale)"
  >
    <option
      v-for="locale in $i18n.availableLocales"
      :value="locale"
      :key="locale"
    >
      {{ locale }}
    </option>
  </select>

  <br /><br />
  <form onsubmit="return false" enctype="multipart/form-data">
    <div>
      <input type="file" name="file" @change="onFileChange" />
      <button type="submit" @click="uploadImage">Subir imagen</button>
      <img :src="imageSrc" v-if="imageSrc" />
    </div>
  </form>
</template>

<script>
import { api } from "../../utils/axios";

export default {
  methods: {
    onFileChange(event) {
      this.image = event.target.files[0];
    },
    async uploadImage() {
      const formData = new FormData();
      formData.append("image", this.image);
      try {
        const response = await api.post("book/upload/cover", formData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    setLanguageStorage(locale) {
      localStorage.setItem("language", locale);
    },
  },
};
</script>

<style></style>
