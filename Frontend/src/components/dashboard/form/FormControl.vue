<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useMainStore } from "../../../stores/main";
import FormControlIcon from "../minimal/FormControlIcon.vue";
import { controlTextColor } from "../../../assets/style/colors";
import { mdiAsterisk, mdiLockOff } from "@mdi/js";

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  autocomplete: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  inputmode: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
  type: {
    type: [String, Number, Object, Array],
    default: "text",
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: "",
  },
  iconRight: {
    type: String,
    default: null,
  },
  required: Boolean,
  borderless: Boolean,
  transparent: Boolean,
  ctrlKFocus: Boolean,
  isPassword: Boolean,
});

const textColor = computed(() => {
  return controlTextColor(props.error, props.success);
});

const emit = defineEmits(["update:modelValue", "setRef", "right-icon-click"]);
const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const inputElClass = computed(() => {
  const base = [
    "px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded-lg w-full",
    "dark:placeholder-gray-400",
    computedType.value === "textarea" ? "h-24" : "h-12",
    props.borderless ? "border-0" : "border",
    props.transparent ? "bg-transparent" : "bg-white dark:bg-blue-darkInput",
  ];
  if (props.icon) {
    base.push("pl-10");
  }

  if (computedIconRight.value) {
    base.push("pr-10");
  }

  return base;
});

const computedType = computed(() => {
  if (props.options && props.type !== "list") {
    return "select";
  }
  if (props.buttonLabel || props.buttonIcon) {
    return "button";
  }
  if (props.type === "password" && passwordIsOpen.value) {
    return "text";
  }

  return props.type;
});

const computedIconRight = computed(() => {
  if (props.error) {
    return mdiAlertCircle;
  }
  if (props.success) {
    return mdiCheckCircle;
  }
  if (props.iconRight) {
    return props.iconRight;
  }
  if (props.type === "password") {
    return passwordIsOpen.value ? mdiLockOff : mdiAsterisk;
  }
  if (props.type === "list") {
    return mdiUnfoldMoreHorizontal;
  }
  return null;
});

const controlIconH = computed(() =>
  props.type === "textarea" ? "h-full" : "h-12"
);

// Password hide/show
const passwordIsOpen = ref(false);
const rightIconClickable = computed(() => props.type === "password");
const openPasswordToggle = (e) => {
  if (rightIconClickable.value) {
    passwordIsOpen.value = !passwordIsOpen.value;
    emit("right-icon-click", e);
  }
};

const mainStore = useMainStore();
const selectEl = ref(null);
const textareaEl = ref(null);
const inputEl = ref(null);
onMounted(() => {
  if (selectEl.value) {
    emit("setRef", selectEl.value);
  } else if (textareaEl.value) {
    emit("setRef", textareaEl.value);
  } else {
    emit("setRef", inputEl.value);
  }
});
if (props.ctrlKFocus) {
  const fieldFocusHook = (e) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      inputEl.value.focus();
    } else if (e.key === "Escape") {
      inputEl.value.blur();
    }
  };
  onMounted(() => {
    if (!mainStore.isFieldFocusRegistered) {
      window.addEventListener("keydown", fieldFocusHook);
      mainStore.isFieldFocusRegistered = true;
    } else {
      // console.error('Duplicate field focus event')
    }
  });
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", fieldFocusHook);
    mainStore.isFieldFocusRegistered = false;
  });
}
</script>

<template>
  <div class="relative">
    <select
      v-if="computedType === 'select'"
      :id="id"
      v-model="computedValue"
      :name="name"
      :class="inputElClass"
      :type="computedType"
    >
      <option value="" disabled selected>Seleccione una categoría...</option>
      <option
        v-for="option in options"
        :key="option.id ?? option"
        :value="option"
      >
        {{ option.label ?? option }}
      </option>
    </select>

    <textarea
      v-else-if="computedType === 'textarea'"
      :id="id"
      v-model="computedValue"
      :class="inputElClass"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :type="computedType"
    />

    <input
      v-else
      :id="id"
      ref="inputEl"
      v-model="computedValue"
      :name="name"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :required="required"
      :placeholder="placeholder"
      :type="computedType"
      :class="inputElClass"
    />
    <FormControlIcon v-if="icon" :icon="icon" :h="controlIconH" />
    <FormControlIcon
      v-if="computedIconRight"
      :icon="computedIconRight"
      :h="controlIconH"
      :text-color="textColor"
      :clickable="rightIconClickable"
      is-right
      @icon-click="openPasswordToggle"
    />
  </div>
</template>
