<script setup>
import { computed, reactive, ref } from "vue";
import { userStore } from "../../stores/user";
import Navbar from "../../components/home/elements/Navbar.vue";
import Footer from "../../components/home/Footer.vue";
import { onMounted } from "vue";
import { api } from "../../utils/axios";
import { getRequestsUser } from "../../utils/actions";
import ShoppingHistory from "./ShoppingHistory.vue";
import { logout } from "../../utils/actions";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const open = ref(false);
const toast = useToast();
const store = userStore();
const user = computed(() => store.userInfo);
const router = useRouter();

let items = null;
const table = reactive({
  items: null,
});

const data = reactive({
  res: "",
  name: "",
  email: "",
  city: "",
  cellphone: "",
  address: "",
});

async function getFCurrentUser() {
  try {
    data.res = await api.get(`user/` + user.value.id);

    data.name = data.res.data.user.name;
    data.email = data.res.data.user.email;
    data.cellphone = data.res.data.user.cellphone;
    data.address = data.res.data.user.address;
    data.city = data.res.data.user.city;

    console.log(data.res.data.user);
  } catch (error) {
    if (error.response.status === 404) {
      logout();
      router.push("/");
    }
    console.log(error.response.status);
  }
}

onMounted(() => {
  getFCurrentUser();
});

getRequestsUser(user.value.id).then((response) => {
  table.items = response.data.sales_request;
});

const removeAccountModal = () => {
  open.value = true;
};

const removeAccountAction = async () => {
  try {
    const res = await api.patch("/deleteuser/" + user.value.id);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  logout();
  router.push("/");
};

const updateDetailsAccount = async () => {
  let body = {
    name: data.name,
    address: data.address,
    cellphone: data.cellphone,
    city: data.city,
  };
  try {
    await api.patch("/userforuser/" + user.value.id, body);
    toast.success(`Se ha actualizado la información de tu usuario.`, {
      timeout: 5000,
      position: "top-center",
      icon: true,
    });
  } catch (error) {
    console.error(error);
    // Aquí puedes manejar el error como quieras, por ejemplo, mostrar un mensaje de error al usuario.
    toast.error(`Ocurrió un error al actualizar la información de tu usuario.`, {
      timeout: 5000,
      position: "top-center",
      icon: true,
    });
  }
};

</script>

<template>
  <div class="mx-auto flex flex-col min-h-screen">
    <div class="flex-1 bg-sky-300">
      <Navbar />

      <section class="flex justify-center overflow-hidden">
        <div class="px-4 py-8 sm:py-12 sm:px-6 lg:pt-16 lg:px-8 w-5/6">
          <div
            class="grid grid-cols-1 gap-y-8 lg:grid-cols-4 lg:items-center lg:gap-x-8 mt-20"
          >
            <div class="max-w-2xl text-center lg:mx-0 lg:text-left col-start-1 col-span-2">
              <div
                class="dark:!bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full flex-col items-center bg-white border rounded-2xl bg-cover bg-clip-border p-[16px] dark:text-white dark:shadow-none"
              >
                <p class="font-bold text-2xl text-left mb-2">
                  Perfil del usuario
                </p>

                <div
                  class="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
                  style="
                    background-image: url('https://i.ibb.co/FWggPq1/banner.png');
                  "
                >
                  <div
                    class="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400"
                  >
                    <img
                      class="h-full w-full rounded-full"
                      src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/gdruy0cnkgnaadpxiadi"
                      alt=""
                    />
                  </div>
                </div>
                <div class="mt-16 flex flex-col items-center">
                  <h4 class="text-bluePrimary text-xl font-bold">
                    {{ data.name }}
                  </h4>
                  <p class="text-lightSecondary text-base font-normal">
                    {{ data.email }}
                  </p>
                </div>

                <div class="mt-6 mb-3 flex gap-4 md:!gap-14">
                  <div class="flex flex-col items-center justify-center">
                    <h3 class="text-bluePrimary text-2xl font-bold">0</h3>
                    <p class="text-lightSecondary text-sm font-normal">
                      Pedidos
                    </p>
                  </div>
                  <div class="flex flex-col items-center justify-center">
                    <h3 class="text-bluePrimary text-2xl font-bold">0</h3>
                    <p class="text-lightSecondary text-sm font-normal">
                      Compras
                    </p>
                  </div>
                  <div class="flex flex-col items-center justify-center">
                    <h3 class="text-bluePrimary text-2xl font-bold">0</h3>
                    <p class="text-lightSecondary text-sm font-normal">
                      Tickets
                    </p>
                  </div>
                </div>

                <template>
                  <TransitionRoot as="template" :show="open">
                    <Dialog
                      as="div"
                      class="relative z-50"
                      @close="open = false"
                    >
                      <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                      >
                        <div
                          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        />
                      </TransitionChild>

                      <div class="fixed inset-0 z-10 overflow-y-auto">
                        <div
                          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                        >
                          <TransitionChild
                            as="template"
                            enter="ease-out duration-300"
                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                            <DialogPanel
                              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                            >
                              <div
                                class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
                              >
                                <div class="sm:flex sm:items-start">
                                  <div
                                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                                  >
                                    <ExclamationTriangleIcon
                                      class="h-6 w-6 text-red-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div
                                    class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left"
                                  >
                                    <DialogTitle
                                      as="h3"
                                      class="text-base font-semibold leading-6 text-gray-900"
                                      >Eliminar cuenta</DialogTitle
                                    >
                                    <div class="mt-2">
                                      <p class="text-sm text-gray-500">
                                        ¿Estás seguro de que deseas eliminar tu
                                        cuenta? Todos tus datos serán
                                        permanentemente borrados. Esta acción no
                                        es reversible.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                              >
                                <button
                                  type="button"
                                  class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                  @click="removeAccountAction"
                                >
                                  Eliminar
                                </button>
                                <button
                                  type="button"
                                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  @click="open = false"
                                  ref="cancelButtonRef"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </DialogPanel>
                          </TransitionChild>
                        </div>
                      </div>
                    </Dialog>
                  </TransitionRoot>
                </template>

                <button
                  @click="removeAccountModal"
                  class="bg-rose-500 w-full mt-2 text-white hover:bg-rose-700 block px-3 py-2 rounded-md text-xl font-semibold"
                >
                  Eliminar cuenta
                </button>
              </div>
            </div>

            <div class="col-start-3 col-span-3">
              <div
                class="bg-white shadow-md border rounded-2xl px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
              >
                <p class="font-bold text-2xl text-left mb-6">
                  Detalles del usuario
                </p>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Nombre
                    </label>
                    <input
                      v-model="data.name"
                      placeholder="No disponible"
                      class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>
                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Correo
                    </label>
                    <input
                      v-model="data.email"
                      placeholder="Correo"
                      disabled
                      class="text-black placeholder-gray-600 disabled:bg-gray-100 disabled:text-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                  <div class="md:w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Celular
                    </label>
                    <input
                      v-model="data.cellphone"
                      placeholder="No disponible"
                      class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-6">
                  <div class="md:w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-last-name"
                    >
                      Dirección
                    </label>
                    <input
                      v-model="data.address"
                      placeholder="No disponible"
                      class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                  </div>
                </div>

                <div class="-mx-3 md:flex mb-2">
                  <div class="md:w-full px-3">
                    <label
                      class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                      for="grid-state"
                    >
                      Ciudad
                    </label>
                    <div class="relative">
                      <input
                        v-model="data.city"
                        placeholder="No disponible"
                        class="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-blueGray-500 focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                      />
                    </div>
                  </div>
                </div>
                <button
                  @click="updateDetailsAccount"
                  class="bg-sky-500 mt-4 text-white hover:bg-sky-700 block px-3 py-2 rounded-md text-xl font-semibold"
                >
                  Actualizar información
                </button>
              </div>
            </div>

            <div class="col-start-1 col-span-4">
              <div
                class="bg-white shadow-md border rounded-2xl px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
              >
                <ShoppingHistory />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<style></style>
