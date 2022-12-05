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
                v-model="juez.nombre"
                label="Ingrese el Nombre Juez "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Nombre Juez',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />

              <q-input
                filled
                v-model="juez.apellido"
                label="Ingrese su Apellido "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Apellido',
                ]"
                style="width: 47%"
                :onkeydown="onkeyDown"
              />
            </div>
            <div class="row justify-between q-gutter-md">
              <q-input
                dense
                filled
                type="number"
                v-model="juez.edad"
                label="Selecione Edad"
                style="width: 47%"
                :rules="[
                        (val) =>
                          (val && val.length >  0 && val>=18) ||
                          'Edad incorrecta',
                          'Edad correcta',
                      ]"
              />
              <q-select
                filled
                v-model="juez.sexo"
                dense
                label="Seleccione su sexo"
                :options="sexos"
                style="width: 47%"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor seleccione su pais',
                ]"
              />
              <!-- <div  class="q-pa-md" style="max-width: 300px">-->
            </div>
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="juez.fecha_nacimiento"
                mask="date"
                dense
                :rules="['date']"
                style="width: 47%"
                lazy-rules
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

              <q-select
                filled
                v-model="juez.nombre_paises"
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
                v-model="juez.nombre_ciudades"
                :options="ciudades"
                label="Ingrese su  Ciudad"
                style="width: 47%"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Ciudad',
                ]"
              />
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
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {
  getJueces,
  getPaises,
  crearJueces,
  updateJueces,
  deleteJueces,
} from "../services";

const date = ref("2019/02/01");
const rows = ref([]);
const paises = ref([]);
const sexos = ["Femenino", "Masculino"];
const selected = ref([]);

const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "center",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellido",
    required: true,
    label: "Apellido",
    align: "center",
    field: "apellido",
    sortable: true,
  },
  {
    name: "fecha_nacimiento",
    required: true,
    label: "Fecha-Nacimiento",
    align: "center",
    field: "fecha_nacimiento",
    sortable: true,
  },
  {
    name: "edad",
    required: true,
    label: "Edad",
    align: "center",
    field: "edad",
    sortable: true,
  },
  {
    name: "sexo",
    required: true,
    label: "Sexo",
    align: "center",
    field: "sexo",
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

const juez = reactive({
  nombre: null,
  apellido: null,
  fecha_nacimiento: null,
  edad: null,
  sexo: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  await crearJueces(juez);
}

async function Actualizar() {
  await updateJueces(juez);
}

async function Delete() {
  await deleteJueces(juez);
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === juez.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getJueces();
  paises.value = await getPaises();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    apellido: null,
    fecha_nacimiento: null,
    edad: null,
    sexo: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };
  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(juez, rowSelected);
}

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(juez).every((key) => juez[key] && juez[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);

function onkeyDown(evt) {
  if (
    (evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
}
</script>
