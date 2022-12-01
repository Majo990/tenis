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
                dense
                v-model="equipo.nombre"
                label="Ingrese su Nombre "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Nombre',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />

              <q-input
                dense
                filled
                v-model="equipo.fecha_fundo"
                style="width: 47%"
                mask="date"
                label="Ingrese la fecha-fundo equipo"
                :rules="['date']"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date">
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
            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="equipo.id_jugadores"
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
              <q-select
                filled
                v-model="equipo.id_entrenadores"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="entrenadores"
                style="width: 47%"
                dense
                lazy-rules
                label="Seleccione Nombre Entrenadores "
              />
            </div>
            <br />
            <div class="row justify-between q-gutter-md">
              <q-input
                v-model="equipo.descripcion"
                filled
                autogrow
                dense
                label="Ingrese descripcion equipo "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese descripcion arbitro',
                ]"
                style="width: 47%"
              />

              <q-file
                dense
                @update:model-value="updateSimbolo"
                v-model="simbolo"
                filled
                style="width: 47%"
                label="Seleccione imagen "
                accept=".png, .jpg, .gif, .tiff,  .jpeg image/*"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                dense
                v-model="equipo.indumentaria_uniforme"
                label="Ingrese su Indumentaria_Uniforme"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su IndumentariaUniforme',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />

              <q-input
                filled
                dense
                v-model="equipo.presidente"
                label="Ingrese su Presidente "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Presidente',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />
            </div>
            <div class="row justify-between q-gutter-md">
              <q-input
                dense
                filled
                v-model="equipo.apodos"
                label="Ingrese su Apodo "
                style="width: 47%"
                :onkeydown="onkeyDown"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Apodos',
                ]"
              />

              <q-select
                filled
                v-model="equipo.id_estadios"
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                :options="estadios"
                style="width: 47%"
                dense
                lazy-rules
                label="Seleccione Nombre Estadio "
              />
            </div>
          </div>

          <q-select
            filled
            v-model="equipo.nombre_paises"
            dense
            :options="paises"
            map-options
            emit-value
            option-value="country"
            option-label="country"
            label="Seleccione su Pais"
            style="width: 20%"
          />

          <q-select
            filled
            dense
            v-model="equipo.nombre_ciudades"
            :options="ciudades"
            label="Seleccione su  Ciudad"
            style="width: 37%"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor ingrese su Ciudad',
            ]"
          />

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
import { ref, onMounted, computed, reactive } from "vue";
import {
  getEquipos,
  getPaises,
  crearEquipos,
  updateEquipos,
  deleteEquipos,
  getJugadores,
  getEstadios,
  getEntrenadores,
} from "src/services";

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
    name: "fecha_fundo",
    align: "center",
    label: "Fecha-Fundo",
    field: "fecha_fundo",
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
    name: "id_entrenadores",
    align: "center",
    label: "Nombre-Entrenadores",
    field: "nombre_entrenadores",
    sortable: true,
  },
  {
    name: "descripcion",
    align: "center",
    label: "Descripcion",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "simbolo",
    align: "center",
    label: "Simbolo",
    field: "simbolo",
    sortable: true,
  },
  {
    name: "indumentaria_uniforme",
    align: "center",
    label: "Indumentaria-Uniforme",
    field: "indumentaria_uniforme",
    sortable: true,
  },
  {
    name: "presidente",
    align: "center",
    label: "Presidente",
    field: "presidente",
    sortable: true,
  },
  {
    name: "apodos",
    align: "center",
    label: "Apodos",
    field: "apodos",
    sortable: true,
  },
  {
    name: "id_estadios",
    align: "center",
    label: "Nombre_estadios",
    field: "nombre_estadios",
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
];

const date = ref("2019-02-01");
const rows = ref([]);
const paises = ref([]);
const jugadores = ref([]);
const entrenadores = ref([]);
const estadios = ref([]);
const simbolo = ref([]);
const selected = ref([]);

const equipo = reactive({
  id: null,
  nombre: null,
  fecha_fundo: null,
  id_jugadores: null,
  id_entrenadores: null,
  descripcion: null,
  simbolo: null,
  indumentaria_uniforme: null,
  presidente: null,
  apodos: null,
  id_estadios: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  await crearEquipos(equipo);
}

async function Actualizar() {
  await updateEquipos(equipo);
}

async function Delete() {
  await deleteEquipos(equipo);
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === equipo.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getEquipos();
  paises.value = await getPaises();
  entrenadores.value = await getEntrenadores();
  jugadores.value = await getJugadores();
  estadios.value = await getEstadios();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    fecha_fundo: null,
    id_jugadores: null,
    id_entrenadores: null,
    descripcion: null,
    simbolo: null,
    indumentaria_uniforme: null,
    presidente: null,
    apodos: null,
    id_estadios: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(equipo, rowSelected);
}

function updateSimbolo(simbolo) {
  equipo.simbolo = simbolo.name;
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
<style>
.q-table {
  color: grey;
  background-color: #1ddf8e;
}

.q-input.label {
  font-size: large;
  text-align: center;
}
</style>
