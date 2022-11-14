<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              dense
              filled
              v-model="nombre"
              label="Ingrese su Nombre "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 47%"
            />
            <q-select
              filled
              v-model="nombre_jugadores"
              :options="os"
              dense
              style="width: 47%"
              label="Seleccione Nombre Jugadores "
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="cancha"
              dense
              label="Seleccione su cancha"
              :options="canchas"
              style="width: 47%"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor seleccione su cancha',
              ]"
            />

            <q-select
              filled
              v-model="cesped"
              dense
              label="Seleccione su cesped"
              :options="cespeds"
              style="width: 47%"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor seleccione su cesped',
              ]"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="adminsitrador"
              label="Ingrese su Administrador "
              lazy-rules
              dense
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su NombreAdminsitra',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              dense
              v-model="propietario"
              label="Ingrese el Nombre Propietario "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su NombrePropietario',
              ]"
              style="width: 47%"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="ubigeo"
              label="Ingese su ubigeo"
              dense
              mask="######"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su ubigeo',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              dense
              v-model="direccion"
              icon="mdi-map-marker-outline"
              label="Ingrese su Direccion  "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Direccion',
              ]"
              style="width: 47%"
            />

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
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor ingrese su Pais',
              ]"
            />

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
        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn dense color="primary" label="Crear" type="submit" />
          <q-btn dense color="secondary" label="Leer " />
          <q-btn dense color="amber" label="Actualizar" />
          <q-btn dense color="red" label="Borrar" />
        </div>
      </div>
    </div>

    <br />
    <q-table
      dense
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getEstadios, getPaises } from "../services";

const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },

  {
    name: "cancha",
    align: "center",
    label: "Cancha",
    field: "cancha",
    sortable: true,
  },
  {
    name: "cancha",
    align: "center",
    label: "Cancha",
    field: "cancha",
    sortable: true,
  },

  {
    name: "cesped",
    align: "center",
    label: "Cesped",
    field: "cesped",
    sortable: true,
  },
  {
    name: "administrador",
    align: "center",
    label: "Administradores",
    field: "adminsitrador",
    sortable: true,
  },
  {
    name: "propietario",
    align: "center",
    label: "Propietario",
    field: "propietario",
    sortable: true,
  },
  {
    name: "ubigeo",
    align: "center",
    label: "Ubigeo",
    field: "ubigeo",
    sortable: true,
  },
  {
    name: "direccion",
    align: "center",
    label: "Direccion",
    field: "direccion",
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
let canchas = [
  "cancha1",
  "cancha2",
  "cancha3",
  "cancha4",
  "cancha5",
  "cancha6",
];
const cancha = ref(null);

let cespeds = ["sintetico", "natural", "piso"];
const cesped = ref(null);

const ciudades = computed(
  () => paises.value.find((p) => p.country === pais.value)?.cities
);

onMounted(async () => {
  rows.value = await getEstadios();
  paises.value = await getPaises();
});
</script>
<style>
.q-table {
  color: grey;
  background-color: #77d6f3;
}
</style>
