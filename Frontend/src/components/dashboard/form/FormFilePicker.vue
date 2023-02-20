<script setup>
import { mdiCloudArrowUpOutline } from '@mdi/js'
import { computed, ref, watch } from 'vue'
import BaseButton from '../minimal/BaseButton.vue'

const props = defineProps({
  modelValue: {
    type: [Object, File, Array],
    default: null
  },
  label: {
    type: String,
    default: 'Upload'
  },
  icon: {
    type: String,
    default: mdiCloudArrowUpOutline
  },
  accept: {
    type: String,
    default: null
  },
  addon: Boolean,
  roundedFull: Boolean,
  small: Boolean,
  outline: Boolean,
  color: {
    type: String,
    default: 'info'
  }
})

const emit = defineEmits(['update:modelValue'])

const root = ref(null)

const file = ref(props.modelValue)

const modelValueProp = computed(() => props.modelValue)

watch(modelValueProp, value => {
  file.value = value

  if (!value) {
    root.value.input.value = null
  }
})

const upload = event => {
  const value = event.target.files || event.dataTransfer.files

  file.value = value[0]

  emit('update:modelValue', file.value)

  // Use this as an example for handling file uploads
  // let formData = new FormData()
  // formData.append('file', file.value)

  // const mediaStoreRoute = `/your-route/`

  // axios
  //   .post(mediaStoreRoute, formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     },
  //     onUploadProgress: progressEvent
  //   })
  //   .then(r => {
  //
  //   })
  //   .catch(err => {
  //
  //   })
}

// const uploadPercent = ref(0)
//
// const progressEvent = progressEvent => {
//   uploadPercent.value = Math.round(
//     (progressEvent.loaded * 100) / progressEvent.total
//   )
// }
</script>

<template>
  <div class="flex items-stretch justify-start">
    <label class="inline-flex">
      <BaseButton
        as="a"
        :class="{'w-12 h-12':roundedFull}"
        :icon-size="roundedFull ? 24 : null"
        :rounded-full="roundedFull"
        :small="small || roundedFull"
        :label="roundedFull ? null : label"
        :icon-right="icon"
        :addon="!!(addon && file)"
        :outline="outline"
        :color="color"
      />
      <input
        ref="root"
        type="file"
        class="top-0 absolute left-0 w-full h-full opacity-0 outline-none cursor-pointer -z-10"
        :accept="accept"
        @input="upload"
      >
    </label>
    <div v-if="addon && file">
      <span
        class="inline-flex px-4 py-2 justify-center bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r cursor-default"
      >
        {{file.name}}
      </span>
    </div>
  </div>
</template>