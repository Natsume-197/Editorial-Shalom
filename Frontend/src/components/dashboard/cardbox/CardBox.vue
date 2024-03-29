<script setup>
import { computed, useSlots } from "vue";
import CardBoxComponentBody from "./CardBoxComponentBody.vue";
import CardBoxComponentFooter from "./CardBoxComponentFooter.vue";
import Accordion from "../Accordion.vue";
import BaseDivider from "../minimal/BaseDivider.vue";

const props = defineProps({
  rounded: {
    type: String,
    default: "rounded-2xl",
  },
  flex: {
    type: String,
    default: "flex-col",
  },
  hasComponentLayout: Boolean,
  hasTable: Boolean,
  isForm: Boolean,
  isHoverable: Boolean,
  isModal: Boolean,
  isAccordion: {
    type: Boolean,
    default: null,
  },
  accordionTitle: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["submit"]);

const slots = useSlots();

const hasFooterSlot = computed(() => slots.footer && !!slots.footer());

const componentClass = computed(() => {
  const base = [
    props.rounded,
    props.flex,
    props.isModal ? "dark:bg-blue-darkContainer" : "dark:bg-blue-darkContainer/70",
  ];

  if (props.isHoverable) {
    base.push("hover:shadow-lg transition-shadow duration-500");
  }

  return base;
});

const submit = (event) => {
  emit("submit", event);
};
</script>

<template>
  <template v-if="isAccordion">
    <Accordion class="">
      <template v-slot:title>
        <span class="font-semibold text-xl">{{ props.accordionTitle }}</span>
      </template>

      <template v-slot:content>
        <component
          :is="isForm ? 'form' : 'div'"
          :class="componentClass"
          class="bg-white flex"
          @submit="submit"
        >
          <slot v-if="hasComponentLayout" />

          <template v-else>
            <CardBoxComponentBody :no-padding="hasTable">
              <slot />
            </CardBoxComponentBody>

            <CardBoxComponentFooter v-if="hasFooterSlot">
              <slot name="footer" />
            </CardBoxComponentFooter>
          </template>
        </component>
      </template>
    </Accordion>
  </template>
  <template v-else>
    <component
      :is="isForm ? 'form' : 'div'"
      :class="componentClass"
      class="bg-white flex"
      @submit="submit"
    >
      <slot v-if="hasComponentLayout" />
      <template v-else>
        <CardBoxComponentBody :no-padding="hasTable">
          <slot />
        </CardBoxComponentBody>
        <CardBoxComponentFooter v-if="hasFooterSlot">
          <slot name="footer" />
        </CardBoxComponentFooter>
      </template>
    </component>
  </template>
</template>
