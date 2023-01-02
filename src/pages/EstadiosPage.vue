<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese nombre estadio <span class="text-red">*</span></label
                >
                <q-input
                  dense
                  filled
                  v-model="estadio.nombre"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor ingrese su Nombre',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>
              <div>
                <label
                  >Seleccione su nombre Jugador <span class="text-red"></span
                ></label>
                <q-select
                  filled
                  v-model="estadio.id_jugadores"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="jugadores"
                  dense
                  lazy-rules
                />
              </div>

              <div>
                <label>Seleccion cancha <span class="text-red">*</span></label>
                <q-select
                filled
                  v-model="estadio.id_canchas_estadios_partidas"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="cancha"
                  dense
                  lazy-rules
                />
              </div>

              <div>
                <label
                  >Seleccione su cesped <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="estadio.cesped"
                  dense
                  :options="cespeds"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor seleccione su cesped',
                  ]"
                />
              </div>

              <div>
                <label
                  >Ingrese nombre propietario estadio
                  <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  v-model="estadio.propietario"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su NombrePropietario',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>
              <div>
                <label
                  >Ingrese su administrador
                  <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  v-model="estadio.administrador"
                  lazy-rules
                  dense
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su NombreAdminsitra',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>

              <div>
                <label
                  >Ingrese su pais estadio
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="estadio.nombre_paises"
                  dense
                  :options="paises"
                  map-options
                  emit-value
                  option-value="country"
                  option-label="country"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor seleccione su pais',
                  ]"
                />
              </div>

              <div>
                <label
                  >Ingrese el ubigeo del estadio
                  <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  v-model="estadio.ubigeo"
                  dense
                  mask="######"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor ingrese su ubigeo',
                  ]"
                />
              </div>
              <div>
                <label
                  >Ingrese su direccion <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  v-model="estadio.direccion"
                  icon="mdi-map-marker-outline"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Direccion',
                  ]"
                />
              </div>

              <div>
                <div>
                  <label
                    >Ingrese su ciudad estadio
                    <span class="text-red">*</span></label
                  >
                  <q-select
                    filled
                    dense
                    v-model="estadio.nombre_ciudades"
                    :options="ciudades"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Por favor ingrese su Ciudad',
                    ]"
                    :disable="!ciudades || !ciudades.length"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn
          dense
          color="primary"
          label="Crear"
          type="submit"
          icon="fa-solid fa-folder-plus"
          :disable="botonbloqueocrear"
        />

        <q-btn
          dense
          color="amber"
          label="Editar"
          @click="Actualizar"
          icon="fa-solid fa-pen-to-square"
          :disable="botonbloqueoactualizar"
        />
        <q-btn
          dense
          color="red"
          label="Borrar"
          @click="Delete"
          icon="fa-solid fa-trash-can"
          :disable="botonbloqueoeliminar"
        />
      </div>

      <q-table
        :rows="rows"
        :columns="columns"
        separator="cell"
        dense
        row-key="id"
        selection="single"
        v-model:selected="selected"
        @selection="handleSelection"
      >
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
  getEstadioPartida,
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
    name: "id_canchas_estadios_partidas",
    align: "center",
    label: "Cancha",
    field: "nombre",
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


const cancha = ref(null);
const nombre_ciudades = ref([]);
let cespeds = ["sintetico", "natural", "piso"];
const cesped = ref(null);
const selected = ref([]);

const estadio = reactive({
  nombre: null,
  id_jugadores: null,
  id_canchas_estadios_partidas: null,
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
  Object.assign(estadio, {
    nombre: null,
    id_jugadores: null,
    id_canchas_estadios_partidas: null,
    cesped: null,
    administrador: null,
    propietario: null,
    ubigeo: null,
    direccion: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

async function Actualizar() {
  await updateEstadios(estadio);
  Object.assign(estadio, {
    nombre: null,
    id_jugadores: null,
    id_canchas_estadios_partidas: null,
    cesped: null,
    administrador: null,
    propietario: null,
    ubigeo: null,
    direccion: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

async function Delete() {
  await deleteEstadios(estadio);
  Object.assign(estadio, {
    nombre: null,
    id_jugadores: null,
    id_canchas_estadios_partidas: null,
    cesped: null,
    administrador: null,
    propietario: null,
    ubigeo: null,
    direccion: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === estadio.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getEstadios();
  paises.value = await getPaises();
  jugadores.value = await getJugadores();
  cancha.value = await getEstadioPartida();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    id_jugadores: null,
    id_canchas_estadios_partidas: null,
    cesped: null,
    administrador: null,
    propietario: null,
    ubigeo: null,
    direccion: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };
  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
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

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(estadio).every((key) => estadio[key] && estadio[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>
<style>
/*.q-table {
  color: grey;
  background-color: #77d6f3;
}*/
</style>
