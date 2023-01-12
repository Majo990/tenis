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
              <label>Ingrese el puntaje <span class="text-red">*</span></label>
              <q-input v-model="puntajes.puntaje" type="number" filled dense />
            </div>

            <div>
              <label
                >Seleccione el Nombre Partida
                <span class="text-red">*</span></label
              >
              <q-select
                filled
                v-model="puntajes.id_partidas"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="partidas"
                dense
                lazy-rules
                @update:model-value="handleUpdatePartida"
              />
            </div>

         <!----<div>
              <label
                >Seleccione el nombre equipos
                <span class="text-red">*</span></label
              >
              <q-select
                filled
                v-model="puntajes.id_equipos"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="equiposFilter"
                dense
                lazy-rules
                @update:model-value="handleUpdateJugador"
              />
            </div>--->

            <div>
              <label
                >Seleccione el Nombre Jugador
                <span class="text-red">*</span></label
              >
              <q-select
                filled
                v-model="puntajes.id_jugadores"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="equipojugadorFilter"
                dense
                lazy-rules
                @update:model-value="handleUpdateJugador"
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
import { ref, onMounted, reactive, computed } from "vue";
import {
  getJugadores,
  getEquipos,
  getPuntajes,
  crearPuntajes,
  updatePuntajes,
  deletePuntajes,
  getPartidas,
} from "../services";
const columns = [
  {
    name: "puntaje",
    align: "center",
    label: "Puntaje",
    field: "puntaje",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre_Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "id_partidas",
    align: "center",
    label: "Nombre_Partidas",
    field: "nombre_partidas",
    sortable: true,
  },
];

const rows = ref([]);
const filter = ref("");
const equipos = ref([]);
const partidas = ref([]);
const selected = ref([]);
const jugadores = ref([]);

const puntajes = reactive({
  puntaje: null,
  id_equipos: null,
  id_jugadores: null,
  id_partidas: null,
});

async function onSubmit() {
  await crearPuntajes(puntajes);
  Object.assign(puntajes, {
    puntaje: null,
    id_equipos: null,
    id_jugadores: null,
    id_partidas: null,
  });
}

async function Actualizar() {
  await updatePuntajes(puntajes);
  Object.assign(puntajes, {
    puntaje: null,
    id_equipos: null,
    id_jugadores: null,
    id_partidas: null,
  });
}

async function Delete() {
  await deletePuntajes(puntajes);
  Object.assign(puntajes, {
    puntaje: null,
    id_equipos: null,
    id_jugadores: null,
    id_partidas: null,
  });
}

onMounted(async () => {
  rows.value = await getPuntajes();
  equipos.value = await getEquipos();
  jugadores.value = await getJugadores();
  partidas.value = await getPartidas();
});

function handleSelection(details) {
  let rowSelected = {
    puntaje: null,
    id_equipos: null,
    id_jugadores: null,
    id_partidas: null,
  };
  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(puntajes, rowSelected);
}

/*const equiposFilter = computed(() =>
  equipos.value.filter((p) => p.id_partidas === puntajes.id_partidas)
);
*/
function handleUpdatePartida() {
  puntajes.id_equipos = null;
}

const equipojugadorFilter = computed(() =>
  jugadores.value.filter((r) => r.id_equipos === puntajes.id_equipos)
);

function handleUpdateJugador() {
  puntajes.id_jugadores = null;
}

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(puntajes).every(
      (key) => puntajes[key] && puntajes[key] !== ""
    ) &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>
<style lang="scss">
.buscador {
  width: 600px;
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
