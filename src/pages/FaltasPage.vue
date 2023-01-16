<template>
  <div class="q-pa-md">
    <q-page padding>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione su numero de falta
                  <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  type="number"
                  v-model="falta.nro"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  dense
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Por favor selecione NroRonda',
                    (val) => (val > 1 && val < 80) || 'Por favor selecione Nro',
                  ]"
                />
              </div>

              <div>
                <label
                  >Seleccione fecha_hora falta
                  <span class="text-red">*</span></label
                >

                <q-input
                  filled
                  v-model="falta.fecha_hora"
                  dense
                  mask="datetime"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="falta.fecha_hora"
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
                          v-model="falta.fecha_hora"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
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
                  >Seleccione Nombre Jugadores
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  dense
                  v-model="falta.id_jugadores"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="jugadores"
                />
              </div>


              <!---  @update:model-value="handleSelectionJugador"-->
              <div>
                <label
                  >Seleccione Nombre Arbitros
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="falta.id_arbitros"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  dense
                  :options="arbitros"
                />
              </div>

              <div>
                <label
                  >Seleccione Nombre Partidas
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="falta.id_partidas"
                  dense
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="partidas"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-between q-gutter-md"></div>

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
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import {
  getArbitros,
  getFaltas,
  getJugadores,
  getPartidas,
  crearFaltas,
  updateFaltas,
  deleteFaltas,
} from "../services";

import { date } from "quasar";

const columns = [
  {
    name: "nro",
    required: true,
    label: "Nro",
    align: "left",
    field: "nro",
    sortable: true,
  },
  {
    name: "fecha_hora",
    align: "center",
    label: "Fecha-Hora",
    field: "fecha_hora",
    sortable: true,
    format: (val, row) => date.formatDate(val, "DD/MM/YYYY HH:mm"),
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "id_arbitros",
    align: "center",
    label: "Nombre-Arbitros",
    field: "nombre_arbitros",
    sortable: true,
  },

  {
    name: "id_partidas",
    align: "center",
    label: "Nombre-Partidas",
    field: "nombre_partidas",
    sortable: true,
  },
];
const rows = ref([]);
const jugadores = ref([]);
const arbitros = ref([]);
const partidas = ref([]);
const selected = ref([]);
const datetime = ref([]);
const falta = reactive({
  nro: null,
  fecha_hora: null,
  id_jugadores: null,
  id_arbitros: null,
  id_partidas: null,
});

async function onSubmit() {
  await crearFaltas(falta);

  Object.assign(falta, {
    nro: null,
    fecha_hora: null,
    id_jugadores: null,
    id_arbitros: null,
    id_partidas: null,
  });
}

async function Actualizar() {
  await updateFaltas(falta);

  Object.assign(falta, {
    nro: null,
    fecha_hora: null,
    id_jugadores: null,
    id_arbitros: null,
    id_partidas: null,
  });
}

async function Delete() {
  await deleteFaltas(falta);

  Object.assign(falta, {
    nro: null,
    fecha_hora: null,
    id_jugadores: null,
    id_arbitros: null,
    id_partidas: null,
  });
}

onMounted(async () => {
  rows.value = await getFaltas();
  jugadores.value = await getJugadores();
  arbitros.value = await getArbitros();
  partidas.value = await getPartidas();
});

function handleSelection(details) {
  let rowSelected = {
    nro: null,
    fecha_hora: null,
    id_jugadores: null,
    id_arbitros: null,
    id_partidas: null,
  };

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, {
      ...details.rows[0],
      fecha_hora: date.formatDate(
        details.rows[0].fecha_hora,
        "YYYY-MM-DD HH:mm"
      ),
    });
  }

  Object.assign(falta, rowSelected);
}

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(falta).every((key) => falta[key] && falta[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);

const partidajugadorFilter = computed(() =>
  jugadores.value.filter((p) => p.id_partidas === partidajugador.id_partidas)
);

function handleSelectionJugador() {
  partidajugador.id_jugadores = null;
}
</script>
<style>
/*.q-table {
  color: rgba(128, 128, 128, 0.993);
  background-color: #f3abe7;
}*/

v-model {
  text-align: center;
  margin-left: 50%;
}
</style>
