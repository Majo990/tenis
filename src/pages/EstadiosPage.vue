<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                dense
                filled
                v-model="estadio.nombre"
                label="Ingrese su Nombre "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Nombre',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />
              <q-select
                filled
                v-model="estadio.id_jugadores"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="jugadores"
                style="width: 47%"
                dense
                lazy-rules
                label="Seleccione Nombre Jugadores "
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="estadio.cancha"
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
                v-model="estadio.cesped"
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
                v-model="estadio.administrador"
                label="Ingrese su Administrador "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su NombreAdminsitra',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />

              <q-input
                filled
                dense
                v-model="estadio.propietario"
                label="Ingrese el Nombre Propietario "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su NombrePropietario',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="estadio.ubigeo"
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
                v-model="estadio.direccion"
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
                v-model="estadio.nombre_paises"
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
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Pais',
                ]"
              />

              <q-select
                filled
                dense
                v-model="estadio.nombre_ciudades"
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

            <div class="col-6 q-gutter-md text-center items-center">
              <q-btn
                dense
                color="primary"
                label="Crear"
                type="submit"
                icon="fa-solid fa-folder-plus"
              />
              <q-btn
                dense
                color="amber"
                label="Editar"
                @click="Actualizar"
                icon="fa-solid fa-pen-to-square"
              />
              <q-btn
                dense
                color="red"
                label="Borrar"
                @click="Delete"
                icon="fa-solid fa-trash-can"
              />
            </div>
          </div>
        </div>
      </div>


      <q-table
        :rows="rows"
        :columns="columns"
        separator="cell"
        dense
        row-key="id"
        selection="single"
        v-model:selected="selected"
        @selection="handleSelection">


      </q-table>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {
  getEstadios,
  crearEstadios,
  getJugadores,
  getPaises,
  updateEstadios,
  deleteEstadios,
} from "../services";

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
    field: "administrador",
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
const jugadores = ref([]);
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

const estadio = reactive({
  id: null,
  nombre: null,
  id_jugadores: null,
  cancha: null,
  departamento: null,
  cesped: null,
  administrador: null,
  propietario: null,
  ubigeo: null,
  direccion: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  await crearEstadios(estadio);
}

async function Actualizar() {
  await updateEstadios(estadio);
}

async function Delete() {
  await deleteEstadios(estadio);
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === estadio.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getEstadios();
  paises.value = await getPaises();
  jugadores.value = await getJugadores();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    id_jugadores: null,
    cancha: null,
    departamento: null,
    cesped: null,
    administrador: null,
    propietario: null,
    ubigeo: null,
    direccion: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(estadio, rowSelected);
}

function onkeyDown(evt) {
  if (
    (evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
}
</script>
<style>
.q-table {
  color: grey;
  background-color: #77d6f3;
}
</style>
