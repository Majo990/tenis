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
        </div>
      </div>
    </div>

    <q-form @submit="onSubmit" class="q-gutter-md">
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <div>
              <label
                >Seleccione su Estadio
                <span class="text-red">*</span></label
              >
              <q-select
                filled
                v-model="estadiopartida.id_estadios"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="estadio"
                dense
                lazy-rules
              />
            </div>

            <div>
              <label
                >Seleccione el nombre Partida
                <span class="text-red">*</span></label
              >
              <q-select
                filled
                v-model="estadiopartida.id_partidas"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="partida"
                dense
                lazy-rules
              />
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
      :filter="filter"
    >
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  getEstadios,
  getPartidas,
  getEstadioPartida,
  crearEstadioPartida,
  deleteEstadioPartida,
  updateEstadioPartida,
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
    name: "id_estadios",
    align: "center",
    label: "Nombre_Estadios",
    field: "nombre_estadios",
    sortable: true,
  },
];

const rows = ref([]);
const filter = ref("");
const estadio = ref([]);
const partida = ref([]);
const selected = ref([]);

const estadiopartida = reactive({
  id_partidas: null,
  id_estadios: null,
});

async function onSubmit() {
  await crearEstadioPartida(estadiopartida);
  Object.assign(estadiopartida, {
    id_partidas: null,
    id_estadios: null,
  });
}

async function Actualizar() {
  await updateEstadioPartida(estadiopartida);
  Object.assign(estadiopartida, {
    id_partidas: null,
    id_estadios: null,
  });
}

async function Delete() {
  await deletePartidasJugadores(estadiopartida);
  Object.assign(estadiopartida, {
    id_partidas: null,
    id_estadios: null,
  });
}

onMounted(async () => {
  rows.value = await getEstadioPartida();
  partida.value = await getPartidas();
  estadio.value = await getEstadios();
});

function handleSelection(details) {
  let rowSelected = {
    id_partidas: null,
    id_estadios: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(estadiopartida, rowSelected);
}
</script>
