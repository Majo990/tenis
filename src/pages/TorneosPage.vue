<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>

        <div class="row justify-between q-gutter-md">
          <div>
            <label
              >Seleccione su fecha Torneo <span class="text-red">*</span></label
            >

            <q-input
              filled
              dense
              v-model="torneo.fecha"
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="torneo.fecha">
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
          </div>

          <div>
            <label>Seleccione el Estadio <span class="text-red">*</span></label>
            <q-select
              filled
              v-model="torneo.id_estadios"
              dense
              map-options
              emit-value
              option-value="id"
              option-label="nombre"
              :options="estadio"
            />
          </div>
        </div>

        <div class="row justify-between q-gutter-md">
          <div>
            <label>
              Ingrese el Nombre Torneo <span class="text-red">*</span></label
            >
            <q-input
              filled
              dense
              v-model="torneo.nombre"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese el Nombre Torneo',
              ]"
              :onkeydown="onkeyDown"
            />
          </div>
          <div>
            <label>
              Seleccione el Nombre Pais Torneo
              <span class="text-red">*</span></label
            >

            <q-select
              filled
              v-model="torneo.nombre_paises"
              dense
              :options="paises"
              map-options
              emit-value
              option-value="country"
              option-label="country"
            />
          </div>
        </div>

        <div class="row justify-between q-gutter-md">
          <div>
            <label>
              Seleccione el Ciudad Torneo
              <span class="text-red">*</span></label
            >

            <q-select
              filled
              dense
              v-model="torneo.nombre_ciudades"
              :options="ciudades"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Ciudad',
              ]"
              :disable="!ciudades || !ciudades.length"
            />
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
    </q-form>

    <br />
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
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {
  getTorneos,
  getPaises,
  getEstadios,
  crearTorneos,
  updateTorneos,
  deleteTorneos,
} from "../services";

import { date } from "quasar";

const columns = [
  {
    name: "fecha",
    align: "center",
    label: "Fecha",
    field: "fecha",
    format: (val, row) => date.formatDate(val, "DD/MM/YYYY"),
    sortable: true,
  },
  {
    name: "id_estadios",
    align: "center",
    label: "Nombre-Estadios",
    field: "nombre_estadios",
    sortable: true,
  },
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },

  {
    name: "nombre_paises",
    align: "center",
    label: "Nombre-Paises",
    field: "nombre_paises",
    sortable: true,
  },
  {
    name: "nombre_ciudades",
    align: "center",
    label: "Nombre-Ciudades",
    field: "nombre_ciudades",
    sortable: true,
  },
];

const estadio = ref([]);
const rows = ref([]);
const paises = ref([]);
const selected = ref([]);

const torneo = reactive({
  fecha: null,
  id_estadios: null,
  nombre: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  await crearTorneos(torneo);
  Object.assign(torneo, {
    fecha: null,
    id_estadios: null,
    nombre: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

async function Actualizar() {
  await updateTorneos(torneo);
  Object.assign(torneo, {
    fecha: null,
    id_estadios: null,
    nombre: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

async function Delete() {
  await deleteTorneos(torneo);
  Object.assign(torneo, {
    fecha: null,
    id_estadios: null,
    nombre: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === torneo.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getTorneos();
  paises.value = await getPaises();
  estadio.value = await getEstadios();
});

function handleSelection(details) {
  let rowSelected = {
    fecha: null,
    id_estadios: null,
    nombre: null,
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
  Object.assign(torneo, rowSelected);
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
    Object.keys(torneo).every((key) => torneo[key] && torneo[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>

<style lang="scss">
/*.marco {
  border-style: solid;
  border-radius: 5%;
  border-width: 1px;
  padding: 10px;
  padding-right: 150px;
  height: 50%;
  max-width: 54%;
}*/
</style>
