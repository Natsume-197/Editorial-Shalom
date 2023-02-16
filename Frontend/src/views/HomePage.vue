<template>
  <div class="flex justify-center m-20 items-center flex-col">
    <h1 class="text-2xl font-bold">{{ $t("welcomeMsg") }}</h1>
  </div>
  <h1 class="text-2xl font-bold">i18n soporte</h1>
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

  <br />
  <hr class="solid">
  <h1 class="text-2xl font-bold">Subida de archivo (imagenes)</h1>
    <div class="col-md-5 offset-md-1">
      <form>
        <div class="form-group">
          <label for="my-file">Selecciona una imagen</label>
          <input type="file" name="file" accept="image/*" @change="previewImage" class="form-control-file" id="my-file">
          <div class="border p-2 mt-3">
            <p>Preview</p>
            <template v-if="preview">
              <img :src="preview" class="img-fluid" />
              <p class="mb-0">file name: {{ image.name }}</p>
              <p class="mb-0">size: {{ image.size/1024 }}KB</p>
            </template>
          </div>
        </div>
        <button type="submit" @click="uploadImage">Subir</button>
      </form>
    </div>
    <hr class="solid">
    <h1 class="text-2xl font-bold">Prueba</h1>
</template>

<script>
import { api } from "../../utils/axios";

export default {
  data() {
    return {
      preview: null,
    };
  },
  methods: {
    previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
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

<style>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}

hr.solid {
  border-top: 3px solid #bbb;
}
</style>
