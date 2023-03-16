<script setup>
import { computed } from "vue";
import {
  mdiCashMinus,
  mdiCashPlus,
  mdiReceipt,
  mdiCreditCardOutline,
} from "@mdi/js";
import BaseLevel from "../minimal/BaseLevel.vue";
import PillTag from "../pilltag/PillTag.vue";
import IconRounded from "../minimal/IconRounded.vue";
import CardBox from "./CardBox.vue"

const props = defineProps({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

  type: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
});

const type =  computed(() => {
  if(props.type === 1){
    return "Nuevo pedido"
  }else if(props.type === 2){
    return "Procesando"
  }else if(props.type === 3){
    return "Pagado"
  }else if(props.type === 4){
    return "En envío"
  }else if(props.type === 5){
    return "Entregado"
  }else if(props.type === 6){
    return "Completado"
  }else if(props.type === 7){
    return "Rechazado"
  }else if(props.type === 7){
    return "Cancelado"
  }
})

const icon = computed(() => {
  if(props.type === 1){
    return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
  }else if(props.type === 2){
    return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
  }else if(props.type === 3){
    return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
  }else if(props.type === 4){
    return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
  }else if(props.type === 5){
    return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
  }else if(props.type === 6){
    return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
  }else if(props.type === 7){
    return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
  }else if(props.type === 8){
    return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
  }
  return {
    icon: mdiCreditCardOutline,
    type: "info",
  };
});




const diffInMs   = new Date(new Date()) - new Date(props.date)
const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

</script>


<template>
  <CardBox class="mb-6 last:mb-0" is-hoverable>
    
    <BaseLevel>
      <BaseLevel type="justify-start">
        <IconRounded :icon="icon.icon" :color="icon.type" class="md:mr-6" />
        <div class="text-center space-y-1 md:text-left md:mr-6">
          <h4 class="text-xl">{{ props.email }}</h4>
          <p class="text-gray-500 dark:text-slate-400">
            <div v-if="diffInDays === 0">
               Realizada hoy por la cuenta "{{ account }}"
            </div>
            <div v-else>
              Hace {{ diffInDays }} día(s) por la cuenta "{{ account }}"
            </div>
          </p>
        </div>
      </BaseLevel>
      <div class="text-center md:text-right space-y-2">
        <p class="text-base text-gray-300">
          $ {{ amount }} 
        </p>
        <div>
          <PillTag :color="icon.type" :label="type"  />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>