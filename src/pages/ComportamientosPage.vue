<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="comportamiento.descripcion"
                label="Ingrese su Descripcion "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Descripcion',
                ]"
                style="width: 47%"
              />
              <q-select
                filled
                v-model="comportamiento.id_jugadores"
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
                v-model="comportamiento.id_arbitros"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="arbitro"
                dense
                style="width: 47%"
                lazy-rules
                label="Seleccione Nombre Arbitro"
              />
              <q-select
                filled
                v-model="comportamiento.id_sanciones"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="sancion"
                dense
                style="width: 47%"
                lazy-rules
                label="Seleccione Nombre Sancion"
              />
              <br />
            </div>
          </div>
        </div>
        <br />
        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn dense color="primary" label="Crear" type="submit" />
          <q-btn dense color="amber" label="Actualizar" @click="Actualizar" />
          <q-btn dense color="red" label="Borrar" @click="Delete" />
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
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  getComportamientos,
  getJugadores,
  getArbitros,
  getSanciones,
  crearComportamientos,
  updateComportamientos,
  deleteComportamientos,
} from "../services";

const columns = [
  {
    name: "descripcion",
    required: true,
    label: "Descripcion",
    align: "left",
    field: "descripcion",
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
  {
    name: "id_sanciones",
    align: "center",
    label: "Nombre-Sancion",
    field: "nombre_sancion",
    sortable: true,
  },
];

const selected = ref([]);
const rows = ref([]);
const jugadores = ref([]);
const arbitro = ref([]);
const sancion = ref([]);

const comportamiento = reactive({
  id:null,
  descripcion: null,
  id_jugadores: null,
  id_arbitros: null,
  id_sanciones: null,
});

async function onSubmit() {
  await crearComportamientos(comportamiento);
}

async function Actualizar() {
  await updateComportamientos(comportamiento);
}

async function Delete() {
  await deleteComportamientos(comportamiento);
}

onMounted(async () => {
  rows.value = await getComportamientos();
  jugadores.value = await getJugadores();
  arbitro.value = await getArbitros();
  sancion.value = await getSanciones();
});

function handleSelection(details) {
  let rowSelected = {
    descripcion: null,
    id_jugadores: null,
    id_arbitros: null,
    id_sanciones: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(comportamiento, rowSelected);
}
</script>

<style>
.q-table {
  color: rgb(26, 25, 24);
  background-color: #f3eb77;
}
</style>
