<template>
  <q-page padding>
    <strong>Formulario </strong>
    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="jugador.nombre"
                label="Ingrese el Nombre-Jugador "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su NombreJugador',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />

              <q-input
                filled
                v-model="jugador.nacionalidad"
                label="Ingrese su Nacionalidad"
                lazy-rules
                dense
                style="width: 47%"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Nacionalidad',
                ]"
                 :onkeydown="onkeyDown"
              />
            </div>
            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="jugador.id_entrenadores"
                dense
                :options="entrenadores"
                style="width: 47%"
                label="Seleccione su Nombre Entrenador "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su pais',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su pais',
                ]"
              />

              <q-input
                filled
                type="number"
                v-model="jugador.edad"
                dense
                label="Selecione Edad"
                style="width: 47%"
                :rules="[
                        (val) =>
                          (val && val.length >  0 && val>=18) ||
                          'Edad incorrecta',
                          'Edad correcta',
                      ]"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="jugador.sexo"
                :options="sexos"
                dense
                style="width: 348px"
                label="Seleccione sexo "

              />

              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="jugador.id_arbitros"
                :options="arbitros"
                style="width: 348px"
                label="Seleccione Arbitros "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su arbitro',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione arbitro',
                ]"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="jugador.id_equipos"
                :options="equipos"
                style="width: 348px"
                label="Seleccione equipos "
                dense

              />
              <q-select
                filled
                v-model="jugador.id_torneos"
                :options="torneos"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                dense
                style="width: 348px"
                label="Seleccione torneos "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su torneos',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione su torneos',
                ]"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="jugador.id_sanciones"
                dense
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="sanciones"
                style="width: 348px"
                label="Seleccione NombreSancion "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su nombresancion',
                  (val) =>
                    (val > 1 && val < 80) ||
                    'Por favor selecione su nombre-sancion',
                ]"
              />
              <q-input
                filled
                v-model="jugador.altura"
                style="width: 47%"
                label="Ingrese su Altura"
                mask="#.##"
                fill-mask="0"
                reverse-fill-mask
                input-class="text-right"
                suffix="m"
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your age',
                  (val) => (val > 1 && val < 80) || 'Por favor ingrese altura',
                ]"
              ></q-input>
            </div>

            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="jugador.peso"
                style="width: 47%"
                label="Ingrese su Peso"
                mask="#.##"
                dense
                fill-mask="0"
                reverse-fill-mask
                input-class="text-right"
                suffix="kg"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor ingrese su peso',
                  (val) => (val > 1 && val < 80) || 'Por favor ingrese su peso',
                ]"
              >
              </q-input>
              <q-select
                filled
                v-model="jugador.nombre_paises"
                dense
                :options="paises"
                map-options
                emit-value
                option-value="country"
                option-label="country"
                label="Seleccione su Pais"
                style="width: 47%"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                dense
                v-model="jugador.nombre_ciudades"
                :options="ciudades"
                label="Ingrese su  Ciudad"
                style="width: 47%"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Ciudad',
                ]"
              />

              <q-input
                filled
                v-model="jugador.posicion"
                dense
                label="Ingrese posicion "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su posicion',
                ]"
                style="width: 47%"
              />
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

              <br />
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
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {
  crearJugadores,
  deleteJugadores,
  updateJugadores,
  getArbitros,
  getEntrenadores,
  getEquipos,
  getJugadores,
  getPaises,
  getSanciones,
  getTorneos,
} from "../services";

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
    name: "nacionalidad",
    align: "center",
    label: "Nacionalidad",
    field: "nacionalidad",
    sortable: true,
  },
  {
    name: "id_entrenadores",
    align: "center",
    label: "Entrenador",
    field: "nombre_entrenadores",
    sortable: true,
  },
  {
    name: "edad",
    align: "center",
    label: "Edad",
    field: "edad",
    sortable: true,
  },
  {
    name: "sexo",
    align: "center",
    label: "Sexo",
    field: "sexo",
    sortable: true,
  },
  {
    name: "id_arbitros",
    align: "center",
    label: "Arbitro",
    field: "nombre_arbitros",
    sortable: true,
  },
  {
    name: "id_equipos",
    align: "center",
    label: "Equipo",
    field: "nombre_equipos",
    sortable: true,
  },
  {
    name: "id_torneo",
    align: "center",
    label: "Torneo",
    field: "nombre_torneos",
    sortable: true,
  },
  {
    name: "id_sanciones",
    align: "center",
    label: "Sancion",
    field: "nombre_sanciones",
    sortable: true,
  },
  {
    name: "altura",
    align: "center",
    label: "Altura",
    field: "altura",
    sortable: true,
  },
  {
    name: "peso",
    align: "center",
    label: "Peso",
    field: "peso",
    sortable: true,
  },
  {
    name: "id_paises",
    align: "center",
    label: "Nombre-Paises",
    field: "nombre_paises",
    sortable: true,
  },
  {
    name: "id_ciudades",
    align: "center",
    label: "Nombre-Ciudades",
    field: "nombre_ciudades",
    sortable: true,
  },
  {
    name: "posicion",
    align: "center",
    label: "Posicon",
    field: "posicion",
    sortable: true,
  },
];

const rows = ref([]);
const paises = ref([]);
const entrenadores=ref([]);
const equipos=ref([]);
const arbitros=ref([]);
const torneos=ref([]);
const sanciones=ref([]);
const selected=ref([]);
const sexos = ["Femenino", "Masculino"];

const jugador = reactive({

  nombre: null,
  nacionalidad: null,
  id_entrenadores: null,
  sejuego: null,
  edad: null,
  sexo: null,
  id_arbitros: null,
  id_equipos: null,
  id_torneos: null,
  id_sanciones: null,
  altura: null,
  peso: null,
  nombre_paises: null,
  nombre_ciudades: null,
  posicion: null,
});

async function onSubmit() {
  await crearJugadores(jugador);
}

async function Actualizar() {
  await updateJugadores(jugador);
}

async function Delete() {
  await deleteJugadores(jugador);
}


const ciudades = computed(
  () => paises.value.find((p) => p.country === jugador.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getJugadores();
  paises.value = await getPaises();
  entrenadores.value = await getEntrenadores();
  equipos.value = await getEquipos();
  arbitros.value = await getArbitros();
  torneos.value = await getTorneos();
  sanciones.value=await getSanciones();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    nacionalidad: null,
    id_entrenadores: null,
    sejuego: null,
    edad: null,
    sexo: null,
    id_arbitros: null,
    id_equipos: null,
    id_torneos: null,
    id_sanciones: null,
    altura: null,
    peso: null,
    nombre_paises: null,
    nombre_ciudades: null,
    posicion: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(jugador, rowSelected);
}

function onkeyDown(evt) {
  if (
    (evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
}

</script>
