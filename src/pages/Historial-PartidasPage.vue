<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="q-gutter-md">
          <div class="buscador">
            <q-input
              dense
              v-model="filter"
              debounce="500"
              filled
              placeholder="Buscar"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione nombre Jugadores
                  <span class="text-red">*</span></label
                >
                <q-select
                  dense
                  filled
                  v-model="historialpartida.id_jugadores"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="jugadores"
                />
              </div>

              <div>
                <label
                  >Seleccione fecha_hora historialpartida
                  <span class="text-red">*</span></label
                >
                <q-input filled v-model="historialpartida.fecha_hora" dense>
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="historialpartida.fecha_hora"
                          mask="YYYY-MM-DD HH:mm"
                        >
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

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="historialpartida.fecha_hora"
                          mask="YYYY-MM-DD HH:mm"
                        >
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
                  >Seleccione N° Ronda <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  dense
                  v-model="historialpartida.id_rondas"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nro"
                  :options="rondas"
                />
              </div>
            </div>

            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione Puntaje <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  type="number"
                  v-model="historialpartida.puntaje"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor seleccione su puntaje ',
                  ]"
                />
              </div>

              <div>
                <label
                  >Seleccione su evento <span class="text-red">*</span></label
                >
                <q-select
                  dense
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  filled
                  v-model="historialpartida.id_eventos"
                  :options="eventos"
                />
              </div>

              <div>
                <label
                  >Seleccione su Nombre-Jueces
                  <span class="text-red">*</span></label
                >
                <q-select
                  dense
                  filled
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  v-model="historialpartida.id_jueces"
                  :options="jueces"
                />
              </div>
            </div>

            <!--<div class="row justify-between q-gutter-md"></div>--->
            <br />
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione su Nombre-Premio
                  <span class="text-red">*</span></label
                >
                <q-select
                  dense
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  filled
                  v-model="historialpartida.id_premios"
                  :options="premios"
                />
              </div>

              <div>
                <label
                  >Seleccione su N°Faltas <span class="text-red">*</span></label
                >
                <q-select
                  dense
                  filled
                  v-model="historialpartida.id_faltas"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nro"
                  :options="faltas"
                />
              </div>

              <div>
                <label
                  >Seleccione su Nombre-Partidas
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  v-model="historialpartida.id_partidas"
                  :options="partidas"
                  dense
                />
              </div>

              <div>
                <label
                  >Seleccione su Nombre-Arbitros
                  <span class="text-red">*</span></label
                >

                <q-select
                  filled
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  v-model="historialpartida.id_arbitros"
                  :options="arbitros"
                  dense
                />
              </div>
            </div>
          </div>
        </div>

        <br />

        <br />
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
          :filter="filter"
        >
        </q-table>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive ,computed} from "vue";
import {
  getArbitros,
  getEventos,
  getFaltas,
  getHistorialPartidas,
  getJueces,
  getJugadores,
  getPartidas,
  getPremios,
  getRondas,
  crearHistorialPartidas,
  updateHistorialPartidas,
  deleteHistorialPartidas,
} from "../services";

import { date } from "quasar";

const columns = [
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "fecha_hora",
    align: "center",
    label: "Fecha-Hora",
    field: "fecha_hora",
    sortable: true,
  }, //ya esta    format: (val, row) => date.formatDate(timeStamp, "YYYY-MM-DDTHH:mm:ss.A"),
  {
    name: "id_rondas",
    align: "center",
    label: "Nro-Rondas",
    field: "nro",
    sortable: true,
  },
  {
    name: "puntaje",
    align: "center",
    label: "Puntaje",
    field: "puntaje",
    sortable: true,
  }, //ya esta
  {
    name: "id_eventos",
    align: "center",
    label: "Nombre-Eventos",
    field: "nombre_eventos",
    sortable: true,
  },
  {
    name: "id_jueces",
    align: "center",
    label: "Nombre-Jueces",
    field: "nombre_jueces",
    sortable: true,
  },
  {
    name: "id_premios",
    align: "center",
    label: "Nombre-Premios",
    field: "nombre_premios",
    sortable: true,
  },
  {
    name: "id_faltas",
    align: "center",
    label: "Nombre-Faltas",
    field: "nro",
    sortable: true,
  },
  {
    name: "id_partidas",
    align: "center",
    label: "Nombre-Partidas",
    field: "nombre_partidas",
    sortable: true,
  },
  {
    name: "id_arbitros",
    align: "center",
    label: "Nombre-Arbitros",
    field: "nombre_arbitros",
    sortable: true,
  },
];

const rows = ref([]);
const jugadores = ref([]);
const rondas = ref([]);
const filter = ref("");

const eventos = ref(null);
const jueces = ref(null);
const premios = ref([]);
const faltas = ref([]);
const partidas = ref([]);
const arbitros = ref([]);
const selected = ref([]);

onMounted(async () => {
  rows.value = await getHistorialPartidas();
});

const historialpartida = reactive({
  id_jugadores: null,
  fecha_hora: null,
  id_rondas: null,
  puntaje: null,
  id_eventos: null,
  id_jueces: null,
  id_premios: null,
  id_faltas: null,
  id_partidas: null,
  id_arbitros: null,
});

async function onSubmit() {
  await crearHistorialPartidas(historialpartida);
}

async function Actualizar() {
  await updateHistorialPartidas(historialpartida);
Object.assign(historialpartida,{
  id_jugadores: null,
  fecha_hora: null,
  id_rondas: null,
  puntaje: null,
  id_eventos: null,
  id_jueces: null,
  id_premios: null,
  id_faltas: null,
  id_partidas: null,
  id_arbitros: null,
});
}

async function Delete() {
  await deleteHistorialPartidas(historialpartida);
  Object.assign(historialpartida,{
  id_jugadores: null,
  fecha_hora: null,
  id_rondas: null,
  puntaje: null,
  id_eventos: null,
  id_jueces: null,
  id_premios: null,
  id_faltas: null,
  id_partidas: null,
  id_arbitros: null,
});
}

onMounted(async () => {
  rows.value = await getHistorialPartidas();
  jugadores.value = await getJugadores();
  rondas.value = await getRondas();
  eventos.value = await getEventos();
  jueces.value = await getJueces();
  premios.value = await getPremios();
  faltas.value = await getFaltas();
  partidas.value = await getPartidas();
  arbitros.value = await getArbitros();
});

function handleSelection(details) {
  let rowSelected = {
    id_jugadores: null,
    fecha_hora: null,
    id_rondas: null,
    puntaje: null,
    id_eventos: null,
    id_jueces: null,
    id_premios: null,
    id_faltas: null,
    id_partidas: null,
    id_arbitros: null,
  };

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {

    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;

    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(historialpartida, rowSelected);
}



const botonbloqueocrear = computed(() => {
  if (
    Object.keys(historialpartida).every((key) => historialpartida[key] && historialpartida[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);



















</script>

<style>
.q-table {
  color: grey;
  background-color: hsl(189, 84%, 71%);
}
.buscador {
  width: 600px;
}
</style>
