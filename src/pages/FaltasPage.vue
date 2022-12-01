<template>
  <div class="q-pa-md">
    <q-page padding>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                type="number"
                v-model="falta.nro"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                dense
                label="Selecione Nro"
                style="width: 47%"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor selecione NroRonda',
                  (val) => (val > 1 && val < 80) || 'Por favor selecione Nro',
                ]"
              />

              <q-input
                filled
                dense
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="falta.fecha_hora"
                style="width: 47%"
                mask="date"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su fecha',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fecha">
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
          </div>
        </div>

        <div class="row justify-between q-gutter-md">
          <q-select
            filled
            dense
            v-model="falta.id_jugadores"
            map-options
            emit-value
            option-value="id"
            option-label="nombre"
            :options="jugadores"
            style="width: 47%"
            label="Seleccione Nombre Jugadores "
          />
          <q-select
            filled
            v-model="falta.id_arbitros"
            map-options
            emit-value
            option-value="id"
            option-label="nombre"
            dense
            :options="arbitros"
            style="width: 47%"
            label="Seleccione Nombre Arbitros "
          />
        </div>

        <div class="row justify-between q-gutter-md">
          <q-select
            filled
            v-model="falta.id_partidas"
            dense
            map-options
            emit-value
            option-value="id"
            option-label="nombre"
            :options="partidas"
            style="width: 47%"
            label="Seleccione Nombre Partidas "
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
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  getArbitros,
  getFaltas,
  getHistorialPartidas,
  getJugadores,
  getPartidas,
  crearFaltas,
  updateFaltas,
  deleteFaltas,
} from "../services";

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
  /*
  {
    name: "id_historial_partidas",
    align: "center",
    label: "Nombre-Historial-Partidas",
    field: "nombre_historial_partidas",
    sortable: true,
  },*/
  {
    name: "id_partidas",
    align: "center",
    label: "Nombre-Partidas",
    field: "nombre_partidas",
    sortable: true,
  },
];
const rows = ref([]);
const fecha = ref(null);
const jugadores = ref([]);
const historialpartidas = ref([]);
const arbitros = ref([]);
const partidas = ref([]);
const selected = ref([]);

const falta = reactive({
  id: null,
  nro: null,
  fecha_hora: null,
  id_jugadores: null,
  id_arbitros: null,
  id_historial_partidas: null,
  id_partidas: null,
});

async function onSubmit() {
  await crearFaltas(falta);
}

async function Actualizar() {
  await updateFaltas(falta);
}

async function Delete() {
  await deleteFaltas(falta);
}

onMounted(async () => {
  rows.value = await getFaltas();
  jugadores.value = await getJugadores();
  arbitros.value = await getArbitros();
  historialpartidas.value = await getHistorialPartidas();
  partidas.value = await getPartidas();
});

function handleSelection(details) {
  let rowSelected = {
    nro: null,
    fecha_hora: null,
    id_jugadores: null,
    id_arbitros: null,
    id_historial_partidas: null,
    id_partidas: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(falta, rowSelected);
}
</script>
<style>
.q-table {
  color: rgba(128, 128, 128, 0.993);
  background-color: #f3abe7;
}

v-model {
  text-align: center;
  margin-left: 50%;
}
</style>
