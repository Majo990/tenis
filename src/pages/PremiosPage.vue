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
                v-model="premio.nombre"
                label="Ingrese el NombrePremio "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su NombrePremio',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />

              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="premio.tipo"
                dense
                :options="tipo"
                style="width: 47%"
                label="Seleccione Tipo Premio "
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="premio.id_equipos"
                dense
                :options="equipos"
                style="width: 47%"
                label="Seleccione su Nombre Equipos "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su pais',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su Equipo',
                ]"
              />
              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="premio.id_jugadores"
                dense
                :options="jugadores"
                style="width: 47%"
                label="Seleccione su Nombre Jugadores "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su pais',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su jugador',
                ]"
              />
            </div>
          </div>
        </div>
      </div>
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
</template>

<script setup>
import { ref, onMounted, reactive ,computed} from "vue";
import {
  getEquipos,
  getJugadores,
  getPremios,
  crearPremios,
  updatePremios,
  deletePremios,
} from "../services";

const rows = ref([]);
const selected = ref([]);
const equipos = ref([]);
const jugadores = ref([]);
const tipo = [
  "Medallas Oro",
  "Medallas Plata",
  "Medallas Bronce",
  "Trofeo",
  "Viajes",
  "Dinero",
];

const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "tipo",
    align: "center",
    label: "Tipo",
    field: "tipo",
    sortable: true,
  },
  {
    name: "id_equipos",
    align: "center",
    label: "Nombre Equipos",
    field: "nombre_equipos",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
];

const premio = reactive({
  nombre: null,
  tipo: null,
  id_equipos: null,
  id_jugadores: null,
});

async function onSubmit() {
  await crearPremios(premio);
}

async function Actualizar() {
  await updatePremios(premio);
}

async function Delete() {
  await deletePremios(premio);
}

onMounted(async () => {
  rows.value = await getPremios();
  jugadores.value = await getJugadores();
  equipos.value = await getEquipos();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    tipo: null,
    id_equipos: null,
    id_jugadores: null,
  };
  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;

  if (details.added) {

    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(premio, rowSelected);
}

function onkeyDown(evt) {
  if (
    (evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
}

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(premio).every((key) => premio[key] && premio[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);


</script>
