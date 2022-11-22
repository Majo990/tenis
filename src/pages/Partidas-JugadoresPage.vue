<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="q-gutter-md">
        <div class="buscador">
          <q-input
            v-model="filter"
            dense
            debounce="500"
            filled
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <!---   <q-badge color="teal">Model: "{{ search }}"</q-badge>-->
        </div>
      </div>
    </div>
    <strong>Formulario </strong>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="partidajugador.partidas"
              map-options
              emit-value
              option-value="id"
              option-label="nombre"
              :options="partidas"
              style="width: 47%"
              dense
              lazy-rules
              label="Seleccione Nombre Jugadores "
            />

            <q-select
              filled
              v-model="partidajugador.id_jugadores"
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
          <br />
          <div class="col-6 q-gutter-md text-center items-center">
            <q-btn dense color="primary" label="Crear" type="submit" />
            <q-btn dense color="amber" label="Actualizar" @click="Actualizar" />
            <q-btn dense color="red" label="Borrar" @click="Delete" />
          </div>
        </div>
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
import { ref, onMounted } from "vue";
import {
  getJugadores,
  getPartidas,
  getPartidasJugadores,
  crearPartidasJugadores,
  deletePartidasJugadores,
  updatePartidasJugadores
} from "../services";
const columns = [
  {
    name: "id_partidas",
    align: "center",
    label: "Nombre_Partidas",
    field: "nombre_partidas",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre_Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
];

const rows = ref([]);
const filter = ref("");
const jugadores = ref([]);
const partidas = ref([]);
const selected = ref([]);

const partidajugador = {
  id:null,
  id_partidas: null,
  id_jugadores: null,
};

async function onSubmit() {
  await crearPartidasJugadores(partidajugador);
}

async function Actualizar() {
  await updatePartidasJugadores(partidajugador);
}

async function Delete() {
  await deletePartidasJugadores(partidajugador);
}

onMounted(async () => {
  rows.value = await getPartidasJugadores();
  partidas.value = await getPartidas();
  jugadores.value = await getJugadores();
});

function handleSelection(details) {
  let rowSelected = {
    id_partidas: null,
    id_jugadores: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(partidajugador, rowSelected);
}
</script>
<style>
.buscador {
  width: 600px;
}
</style>
