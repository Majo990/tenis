<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <q-card flat class="marco">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese descrip comportamiento
                  <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  v-model="comportamiento.descripcion"
                  lazy-rules
                  dense
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Descripcion',
                  ]"
                />
              </div>


              <div>
                <label
                  >Seleccione Nombre Jugadores <span class="text-red">*</span
                ></label>
                <q-select
                  filled
                  v-model="comportamiento.id_jugadores"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="jugadores"
                  dense
                  lazy-rules
                />
              </div>
         </div>

            <div class="row justify-between q-gutter-md">


              <div>
                <label
                  >Seleccione  Arbitro
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="comportamiento.id_arbitros"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="arbitro"
                  dense
                  lazy-rules
                />
              </div>

              <div>
                <label
                  >Seleccione sancion  <span class="text-red">*</span
                ></label>
                <q-select
                  filled
                  v-model="comportamiento.id_sanciones"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="sancion"
                  dense
                  lazy-rules
                />
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>
        </q-form>
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

  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
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
    field: "nombre_sanciones",
    sortable: true,
  },
];

const selected = ref([]);
const rows = ref([]);
const jugadores = ref([]);
const arbitro = ref([]);
const sancion = ref([]);

const comportamiento = reactive({
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

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(comportamiento, rowSelected);
}

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(comportamiento).every(
      (key) => comportamiento[key] && comportamiento[key] !== ""
    ) &&
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
  color: rgb(26, 25, 24);
  background-color: #f3eb77;
}

.marco {
  border-style: solid;
  border-radius: 5%;
  border-width: 1px;
  padding: 30px;
  padding-right: 150px;
  height: 50%;
  max-width:48%;
}
</style>
