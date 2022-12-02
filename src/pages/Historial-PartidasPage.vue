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
            <!-- <q-badge color="teal">Model: "{{ search }}"</q-badge>--->
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-select
                dense
                filled
                v-model="historialpartida.id_jugadores"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="jugadores"
                label="Seleccione jugador"

                style="width: 47%"
              />

              <q-input
                filled
                v-model="date"
                label="Selecione fecha-hora"
                dense
                style="width: 47%"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
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
                      <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
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
            <br />

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                dense
                v-model="historialpartida.id_rondas"
                map-options
                emit-value
                option-value="id"
                option-label="nro"
                :options="rondas"
                label="Seleccione Nombre ronda"
                style="width: 47%"
              />
              <q-select
                dense
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="historialpartida.puntaje"
                :options="puntajes"
                label="Seleccione su Puntaje"
                style="width: 47%"
              />
            </div>
            <br />
            <div class="row justify-between q-gutter-md">
              <q-select
                dense
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                filled
                v-model="historialpartida.id_eventos"
                :options="eventos"
                label="Seleccione su evento"
                style="width: 47%"
              />
              <q-select
                dense
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="historialpartida.id_jueces"
                :options="jueces"
                label="Seleccione su Nombre Juez"
                style="width: 47%"
              />
            </div>
            <br />
            <div class="row justify-between q-gutter-md">
              <q-select
                dense
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                filled
                v-model="historialpartida.id_premios"
                :options="premios"
                label="Seleccione su Nombre Premio"
                style="width: 47%"
              />

              <q-select
                dense
                filled
                v-model="historialpartida.id_faltas"
                map-options
                emit-value
                option-value="id"
                option-label="nro"
                :options="faltas"
                label="Seleccione su Nombre Faltas"
                style="width: 47%"
              />
            </div>
            <br />

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                dense
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="historialpartida.id_partidas"
                :options="partidas"
                label="Seleccione su Nombre Partidas"
                style="width: 47%"
              />

              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="historialpartida.id_arbitros"
                :options="arbitros"
                dense
                label="Seleccione su Nombre Arbitros "
                style="width: 47%"
              />
            </div>
          </div>
        </div>

        <br />
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
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
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
  }, //ya esta
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

const date = ref("2019-02-01 12:44");

const eventos = ref(null);
const jueces = ref(null);
const premios = ref([]);
const faltas = ref([]);
const partidas = ref([]);
const arbitros = ref([]);

const selected = ref([]);
const puntajes = ref([]);
const filter = ref([]);

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
}

async function Delete() {
  await deleteHistorialPartidas(historialpartida);
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
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(historialpartida, rowSelected);
}
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
