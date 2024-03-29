<script setup>
import { computed } from "vue";
import { mdiClose } from "@mdi/js";
import BaseButton from "../minimal/BaseButton.vue";
import BaseButtons from "../minimal/BaseButtons.vue";
import CardBox from "./CardBox.vue";
import OverlayLayer from "../OverlayLayer.vue";
import CardBoxComponentTitle from "./CardBoxComponentTitle.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    default: "info",
  },
  buttonLabel: {
    type: String,
    default: "Accion",
  },
  hasCancel: Boolean,
  hasMainButton: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  functionConfirm: {
    type: Function,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const confirmCancel = async (mode) => {
  emit(mode);
  if (mode === "confirm") {
    await props.functionConfirm().then((result_hide) =>{
      console.log(result_hide)
      value.value = result_hide
    });
    
  } else {
    value.value = false;
  }
};

const confirm = () => confirmCancel("confirm");
const cancel = () => confirmCancel("cancel");

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && value.value) {
    cancel();
  }
});
</script>

<template>
  <OverlayLayer v-show="value" @overlay-click="cancel">
    <CardBox
      v-show="value"
      class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 overflow-y-auto"
      is-modal
    >
      <CardBoxComponentTitle :title="title">
        <BaseButton
          v-if="hasCancel"
          :icon="mdiClose"
          color="whiteDark"
          small
          rounded-full
          @click.prevent="cancel"
        />
      </CardBoxComponentTitle>
      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton
            v-if="hasMainButton"
            :label="buttonLabel"
            :color="button"
            @click="confirm"
          />
          <BaseButton
            v-if="hasCancel"
            label="Cancelar"
            :color="button"
            outline
            @click="cancel"
          />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
