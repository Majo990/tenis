<template>
  <div class="q-pa-md">
    <q-page padding>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="nombrearbitro"
                label="Ingrese su Nombre arbitro "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su NombreArbitr',
                ]"
                style="width: 47%"
              />
              <q-input
                filled
                v-model="nombrearbitro"
                label="Ingrese su Apellido "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Apellido',
                ]"
                style="width: 47%"
              />
            </div>
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                type="number"
                v-model="age"
                label="Selecione Edad"
                style="width: 47%"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your age',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione su edad',
                ]"
              />
                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  style="width: 348px"
                  label="Seleccione sexo "
                  lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor seleccione su sexo',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione su sexo',
                ]"
                />
              <!-- <div  class="q-pa-md" style="max-width: 300px">-->

                    <q-input
                      filled
                      v-model="price"
                      style="width: 47%"
                      label="Ingrese su Altura"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      input-class="text-right"
                      suffix="m"
                      lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your age',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor ingrese altura',
                ]"
                    ></q-input>
                    <q-input
                      filled
                      v-model="price"
                      style="width: 47%"
                      label="Ingrese su Peso"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      input-class="text-right"
                      suffix="kg"
                      lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor ingrese su peso',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor ingrese su peso',
                ]"
                >
                    </q-input>


                <!----<q-input
                  standout
                  v-model="email"
                  type="email"
                  prefix="Email:"
                  suffix="@gmail.com"
                  lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor seleccione su email',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor ingrese su email',
                ]"
                >
                  <template v-slot:prepend>
                     <q-icon name="mail" /
                  </template>
                </q-input>-->
              </div>
              <div class="q-pa-md" style="max-width: 300px">
    <q-input filled v-model="date" mask="date" :rules="['date']">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
          </div>
        </div>


                <q-select
                  filled
                  v-model="models"
                  :options="pais"
                  style="width: 47%"
                  label="Seleccione su Pais "
                  lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor seleccione su pais',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su pais',
                ]"
                />
              </div>
            <div class="row justify-between q-gutter-md">
                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  style="width: 47%"
                  label="Seleccione su Ciudades "
                  lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor seleccione su ciudad',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su ciudad',
                ]"
                />
              </div>

            <div class="col-6 q-gutter-md text-center items-center">
              <q-btn color="primary" label="Crear" />
              <q-btn color="secondary" label="Leer " />
              <q-btn color="amber" label="Actualizar" />
              <q-btn color="red" label="Borrar" />
            </div>
            <br/>
         <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="cell"/>

          </q-form>
        </q-page>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getArbitros } from "../services";
import { useQuasar } from "quasar";
import {ref} from 'vue';


// eslint-disable-next-line vue/no-export-in-script-setup

// eslint-disable-next-line vue/no-export-in-script-setup
export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);

    return {
      model: ref(null),
      options: ["Femenino", "Masculino"],

      return {
      date: ref('2019/02/01')
            };




      models: ref(null),
      pais: ["Ecuador", "Peru", "Paris", "Argentina", "Chile", "Bolivia"],

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },
      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
};




const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellido",
    align: "center",
    label: "Apellido",
    field: "apellido_arbitros",
    sortable: true,
  },
  {
    name: "edad",
    align: "center",
    label: "Edad",
    field: "edad",
    sortable: true,
  },
  {
    name: "sexo",
    align: "center",
    label: "Sexo",
    field: "sexo",
    sortable: true,
  },
  {
    name: "altura",
    align: "center",
    label: "Altura",
    field: "altura",
    sortable: true,
  },
  {
    name: "peso",
    align: "center",
    label: "peso",
    field: "Peso",
    sortable: true,
  },
  {
    name: "fecha_nacimiento",
    align: "center",
    label: "Fecha_Nacimiento",
    field: "fecha_nacimiento",
    sortable: true,
  },
  {
    name: "id_paises",
    align: "center",
    label: "Nombre-Paises",
    field: "nombre_paises",
    sortable: true,
  },
  {
    name: "id_ciudades",
    align: "center",
    label: "Nombre-Ciudades",
    field: "nombre_ciudades",
    sortable: true,
  },
];
</script>
<style></style>
