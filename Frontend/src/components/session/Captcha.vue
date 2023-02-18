<template>
    <VueRecaptcha
      :sitekey="siteKey"
      :load-recaptcha-script="true"
      @error="handleError"
    ></VueRecaptcha>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { VueRecaptcha } from 'vue-recaptcha';

export default defineComponent({
  name: 'ReCaptcha',
  components: {
    VueRecaptcha
  },
  setup() {
    const siteKey = computed(() => {
      return import.meta.env.VITE_API_KEY_GOOGLE;
    });

    const handleError = () => {
      // Do some validation
    };

    const handleSuccess = (response) => {
        console.warn(response)
    };

    return {
      handleSuccess,
      handleError,
      siteKey,
    };
  }
});
</script>