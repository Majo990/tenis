<template>
  <q-page padding>
    <strong>Formulario </strong>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <div class="row justify-between q-gutter-md">
          <q-input
            dense
            filled
            v-model="torneo.fecha"
            mask="date"
            :rules="['date']"
            style="width: 47%"
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
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            filled
            v-model="torneo.id_estadios"
            dense
            map-options
            emit-value
            option-value="id"
            option-label="nombre"
            :options="estadio"
            style="width: 348px"
            label="Seleccione el Estadio "
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor seleccione su estadio',
              (val) =>
                (val > 1 && val < 80) || 'Por favor selecione su estadio',
            ]"
          />
        </div>

        <div class="row justify-between q-gutter-md">
          <q-input
            filled
            dense
            v-model="torneo.nombre"
            label="Ingrese su Nombre  Torneo "
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor ingrese el Nombre Torneo',
            ]"
            style="width: 47%"
            :onkeydown="onkeyDown"
          />

          <q-select
            filled
            v-model="torneo.nombre_paises"
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
            v-model="torneo.nombre_ciudades"
            :options="ciudades"
            label="Seleccione  su  Ciudad"
            style="width: 47%"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor ingrese su Ciudad',
            ]"
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
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {
  getTorneos,
  getPaises,
  getEstadios,
  crearTorneos,
  updateTorneos,
  deleteTorneos,
} from "../services";

const columns = [
  {
    name: "fecha",
    align: "center",
    label: "Fecha",
    field: "fecha",
    sortable: true,
  },
  {
    name: "id_estadios",
    align: "center",
    label: "Nombre-Estadios",
    field: "nombre_estadios",
    sortable: true,
  },
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
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
    name: "nombre_ciudades",
    align: "center",
    label: "Nombre-Ciudades",
    field: "nombre_ciudades",
    sortable: true,
  },
];

const estadio = ref([]);
const rows = ref([]);
const paises = ref([]);
const date = ref("2020/02/01");
const selected = ref([]);

const torneo = reactive({
  
  fecha: null,
  id_estadios: null,
  nombre: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  await crearTorneos(torneo);
}

async function Actualizar() {
  await updateTorneos(torneo);
}

async function Delete() {
  await deleteTorneos(torneo);
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === torneo.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getTorneos();
  paises.value = await getPaises();
  estadio.value = await getEstadios();
});

function handleSelection(details) {
  let rowSelected = {
    fecha: null,
    id_estadios: null,
    nombre: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }
  Object.assign(torneo, rowSelected);
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
