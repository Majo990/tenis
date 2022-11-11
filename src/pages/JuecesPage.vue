<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>

      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              dense
              v-model="nombre"
              label="Ingrese el Nombre Juez "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre Juez',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="nombrearbitro"
              label="Ingrese su Apellido "
              lazy-rules
              dense
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Apellido',
              ]"
              style="width: 47%"
            />
          </div>
          <div class="row justify-between q-gutter-md">
            <q-input
              dense
              filled
              type="number"
              v-model="age"
              label="Selecione Edad"
              style="width: 47%"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Please type your age',
                (val) => (val > 1 && val < 80) || 'Por favor selecione su edad',
              ]"
            />
            <q-select
              filled
              dense
              v-model="model"
              :options="options"
              style="width: 348px"
              label="Seleccione sexo "
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Por favor seleccione su sexo',
                (val) => (val > 1 && val < 80) || 'Por favor selecione su sexo',
              ]"
            />
            <!-- <div  class="q-pa-md" style="max-width: 300px">-->

            <q-input
              filled
              dense
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
                (val) => (val !== null && val !== '') || 'Please type your age',
                (val) => (val > 1 && val < 80) || 'Por favor ingrese altura',
              ]"
            ></q-input>
            <q-input
              filled
              dense
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
                (val) => (val > 1 && val < 80) || 'Por favor ingrese su peso',
              ]"
            >
            </q-input>
          </div>
          <div class="row justify-between q-gutter-md">
            <q-input
                  filled
                  v-model="date"
                  mask="date"
                  dense
                  :rules="['date']"
                  style="width: 47%"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>


            <q-select
              filled
              v-model="pais"
              dense
              :options="paises"
              map-options
              emit-value
              option-value="country"
              option-label="country"
              label="Seleccione su Pais"
              style="width: 47%"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              dense
              v-model="ciudad"
              :options="ciudades"
              label="Ingrese su  Ciudad"
              style="width: 47%"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Ciudad',
              ]"
            />
          </div>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn dense color="primary" label="Crear" />
        <q-btn dense color="secondary" label="Leer " />
        <q-btn dense color="amber" label="Actualizar" />
        <q-btn dense color="red" label="Borrar" />
      </div>
      <br />

      <q-table
        dense
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="cell"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getJueces, getPaises } from "../services";


const date = ref("2019/02/01");
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    format: "nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellido",
    required: true,
    label: "Apellido",
    align: "left",
    format: "apellido",
    field: "apellido",
    sortable: true,
  },
  {
    name: "fecha_nacimiento",
    required: true,
    label: "Fecha-Nacimiento",
    align: "left",
    format: "fecha_nacimiento",
    field: "fecha_nacimiento",
    sortable: true,
  },
  {
    name: "edad",
    required: true,
    label: "Edad",
    align: "left",
    format: "edad",
    field: "edad",
    sortable: true,
  },
  {
    name: "sexo",
    required: true,
    label: "Sexo",
    align: "left",
    format: "sexo",
    field: "sexo",
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
const rows = ref([]);

const paises = ref([]);
const pais = ref([]);
const ciudad = ref([]);

const ciudades = computed(
  () => paises.value.find((p) => p.country === pais.value)?.cities
);

onMounted(async () => {
  rows.value = await getJueces();
  paises.value = await getPaises();
});
</script>
