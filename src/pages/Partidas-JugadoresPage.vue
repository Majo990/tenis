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
                >Seleccione su el Nombre Partidas
                <span class="text-red">*</span></label
              >
              <q-select
                filled
                v-model="partidajugador.id_partidas"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                dense
                lazy-rules
               :options="partidas"
              />
            </div>

            <div>
              <label
                >Seleccione el Nombre Jugador
                <span class="text-red">*</span></label
              >
              <q-select
                filled
                v-model="partidajugador.id_jugadores"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                dense
                lazy-rules
                :options="partidajugadorFilter"
                @update:model-value="handleSelectionJugador"
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

import { ref, onMounted, reactive,computed } from "vue";
import {
  getJugadores,
  getPartidas,
  getPartidasJugadores,
  crearPartidasJugadores,
  deletePartidasJugadores,
  updatePartidasJugadores,

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
const jugadores=ref([]);
const partidas = ref([]);
const selected = ref([]);

const partidajugador = reactive({
  id_partidas: null,
  id_jugadores: null,
});

async function onSubmit() {
  await crearPartidasJugadores(partidajugador);
  Object.assign(partidajugador, {
    id_partidas: null,
    id_jugadores: null,
  });
}

async function Actualizar() {
  await updatePartidasJugadores(partidajugador);
  Object.assign(partidajugador, {
    id_partidas: null,
    id_jugadores: null,
  });
}

async function Delete() {
  await deletePartidasJugadores(partidajugador);
  Object.assign(partidajugador, {
    id_partidas: null,
    id_jugadores: null,
  });
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
  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(partidajugador, rowSelected);
}

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(partidajugador).every(
      (key) => partidajugador[key] && partidajugador[key] !== ""
    ) &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);


const partidajugadorFilter= computed(() =>
  jugadores.value.filter((p) => p.id_partidas === partidajugador.id_partidas));


  function handleSelectionJugador(){
    partidajugador.id_jugadores = null;
  }

</script>
<style lang="scss">
.buscador {
  width: 300px;
}

/*.marco {
  border-style: solid;
  border-radius: 5%;
  border-width: 1px;
  padding: 30px;
  padding-right: 100px;
  height: 50%;
  max-width: 70%;
}*/
</style>
