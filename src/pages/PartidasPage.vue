<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese nombre Partida <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  v-model="partida.nombre"
                  lazy-rules
                  dense
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Nombre Partida',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>

              <div>
                <label
                  >Ingrese descripcion Partida
                  <span class="text-red">*</span></label
                >
                <q-input
                  v-model="partida.descripcion"
                  filled
                  clearable
                  type="textarea"
                  autogrow
                  lazy-rules
                  dense
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Descripcion',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>

              <div>
                <label
                  >Seleccione Deporte de la Partida
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  v-model="partida.nombre_deportes"
                  dense
                  :options="deportes"
                  lazy-rules
                />
              </div>
            </div>

            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione Nombre Torneo
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  v-model="partida.id_torneos"
                  dense
                  :options="torneos"
                />
              </div>

              <div>
                <label
                  >Ingrese la fecha partida
                  <span class="text-red">*</span></label
                >

                <q-input
                  filled
                  dense
                  v-model="partida.fecha"
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
                        <q-date v-model="partida.fecha">
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
                <label
                  >Ingrese tiempo_inicio Partida
                  <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  v-model="partida.tiempo_inicio"
                  mask="fulltime"
                  :rules="['fulltime']"
                  format24h
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="partida.tiempo_inicio" with-seconds>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <br />
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese tiempo_duracion Partida
                  <span class="text-red">*</span></label
                >

                <q-input
                  filled
                  dense
                  v-model="partida.tiempo_duracion"
                  mask="fulltime"
                  :rules="['fulltime']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="partida.tiempo_duracion" with-seconds>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div>
                <label
                  >Ingrese tiempo finalizo Partida
                  <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  v-model="partida.tiempo_fin"
                  mask="fulltime"
                  :rules="['fulltime']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="partida.tiempo_fin" with-seconds>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div>
                <label
                  >Seleccione su Ronda <span class="text-red">*</span></label
                >

                <q-select
                  filled
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nro"
                  v-model="partida.id_rondas"
                  dense
                  :options="rondas"
                />
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
      </q-form>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import {
  getPartidas,
  getRondas,
  crearPartidas,
  getDeportes,
  getTorneos,
  updatePartidas,
  deletePartidas,
} from "../services";

import { date } from "quasar";
const selected = ref([]);
const rondas = ref([]);

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
    name: "descripcion",
    align: "center",
    label: "Descripcion",
    field: "descripcion",
    sortable: true,
  },

  {
    name: "nombre_deportes",
    align: "center",
    label: "Nombre-Deportes",
    field: "nombre_deportes",
    sortable: true,
  },

  {
    name: "id_torneos",
    align: "center",
    label: "Nombre-Torneos",
    field: "nombre_torneos",
    sortable: true,
  },
  {
    name: "fecha",
    align: "center",
    label: "Fecha",
    field: "fecha",
    format: (val, row) => date.formatDate(val, "DD/MM/YYYY"),
    sortable: true,
  },
  {
    name: "tiempo_inicio",
    align: "center",
    label: "Tiempo_Inicio",
    field: "tiempo_inicio",
    format24h: (val, row) => date.format24h(val, "HH:mm:ss"),

    sortable: true,
  },
  {
    name: "tiempo_duracion",
    align: "center",
    label: "Tiempo_Duracion",
    field: "tiempo_duracion",
    format24h: (val, row) => date.format24h(val, "HH:mm:ss"),
    sortable: true,
  },
  {
    name: "tiempo_fin",
    align: "center",
    label: "Tiempo_Fin",
    field: "tiempo_fin",
    format24h: (val, row) => date.format24h(val, "HH:mm:ss"),
    sortable: true,
  },
  {
    name: "id_rondas",
    align: "center",
    label: "Nro-Rondas",
    field: "nro_rondas",
    sortable: true,
  },
];

const rows = ref([]);
const torneos = ref([]);

const deportes = [
  "Tenis",
  "F??tbol",
  "Voleibol",
  "Baloncesto",
  "Nataci??n",
  "Golf",
  "B??isbol",
  "Hockey",
];

const partida = reactive({
  nombre: null,
  descripcion: null,
  nombre_deportes: null,
  id_torneos: null,
  fecha: null,
  tiempo_inicio: null,
  tiempo_duracion: null,
  tiempo_fin: null,
  id_rondas: null,
});

async function onSubmit() {
  await crearPartidas(partida);
  Object.assign(partida, {
    nombre: null,
    descripcion: null,
    nombre_deportes: null,
    id_torneos: null,
    fecha: null,
    tiempo_inicio: null,
    tiempo_duracion: null,
    tiempo_fin: null,
    id_rondas: null,
  });
}

async function Actualizar() {
  await updatePartidas(partida);
  Object.assign(partida, {
    nombre: null,
    descripcion: null,
    nombre_deportes: null,
    id_torneos: null,
    fecha: null,
    tiempo_inicio: null,
    tiempo_duracion: null,
    tiempo_fin: null,
    id_rondas: null,
  });
}

async function Delete() {
  await deletePartidas(partida);

  Object.assign(partida, {
    nombre: null,
    descripcion: null,
    nombre_deportes: null,
    id_torneos: null,
    fecha: null,
    tiempo_inicio: null,
    tiempo_duracion: null,
    tiempo_fin: null,
    id_rondas: null,
  });
}

onMounted(async () => {
  rows.value = await getPartidas();
  deportes.value = await getDeportes();
  rondas.value = await getRondas();
  torneos.value = await getTorneos();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    descripcion: null,
    nombre_deportes: null,
    id_torneos: null,
    fecha: null,
    tiempo_inicio: null,
    tiempo_duracion: null,
    tiempo_fin: null,
    id_rondas: null,
  };

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(partida, rowSelected);
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
    Object.keys(partida).every((key) => partida[key] && partida[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>

<style></style>
