<template>
  <div class="q-pa-md">
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese nombre Juez <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  v-model="juez.nombre"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Nombre Juez',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>

              <div>
                <label
                  >Ingrese apellido Juez <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  v-model="juez.apellido"
                  lazy-rules
                  dense
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Apellido',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>

            <!----  <div>
                <label
                  >Seleccione la edad del Juez
                  <span class="text-red">*</span></label
                >
                <q-input
                  dense
                  filled
                  type="number"
                  v-model="juez.edad"
                  :rules="[
                    (val) => (val && val > 0 && val >= 18) || 'Edad incorrecta',
                  ]"
                />
              </div>

                 <div>
                <label
                  >Seleccione su sexo del Juez
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="juez.sexo"
                  dense
                  :options="sexos"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor seleccione su sexo',
                  ]"
                />
              </div>-->
            </div>

            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione su Fecha-Nacimiento Juez
                  <span class="text-red">*</span></label
                >

                <q-input
                  filled
                  dense
                  v-model="juez.fecha_nacimiento"
                  mask="date"
                  :rules="[
                    'date',
                    (val) => edad(val) >= 18 || 'Edad incorrecta',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="juez.fecha_nacimiento">
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

              <div>
                <label
                  >Seleccione su Pais del Juez <span class="text-red"></span
                ></label>
                <q-select
                  filled
                  v-model="juez.nombre_paises"
                  dense
                  :options="paises"
                  map-options
                  emit-value
                  option-value="country"
                  option-label="country"
                />
              </div>

              <div>
                <label
                  >Seleccione su ciudad del Juez <span class="text-red"></span
                ></label>
                <q-select
                  filled
                  dense
                  v-model="juez.nombre_ciudades"
                  :options="ciudades"
                  :disable="!ciudades || !ciudades.length"
                />

                <div>
                  <label
                    >Seleccione su sexo del Juez
                    <span class="text-red">*</span></label
                  >
                  <q-select
                    filled
                    v-model="juez.sexo"
                    dense
                    :options="sexos"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Por favor seleccione su sexo',
                    ]"
                  />
                </div>
              </div>
            </div>

            <div class="row justify-between q-gutter-md">
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
                :rows-per-page-options="[5,10,20,50,80,100]"
              >
              </q-table>
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
  </div>
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

import { date } from "quasar";

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
    format: (val, row) => date.formatDate(val, "DD/MM/YYYY"),
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
  Object.assign(juez, {
    nombre: null,
    apellido: null,
    fecha_nacimiento: null,
    edad: null,
    sexo: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

async function Actualizar() {
  await updateJueces(juez);
  Object.assign(juez, {
    nombre: null,
    apellido: null,
    fecha_nacimiento: null,
    edad: null,
    sexo: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

async function Delete() {
  await deleteJueces(juez);
  Object.assign(juez, {
    nombre: null,
    apellido: null,
    fecha_nacimiento: null,
    edad: null,
    sexo: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
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
    Object.keys(juez)
      .filter((k) => !["nombre_paises", "nombre_ciudades"].includes(k))
      .every((key) => juez[key] && juez[key] !== "") &&
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

function edad(fecha_nacimiento) {
  let Nacimiento = new Date(fecha_nacimiento);
  let hoy = new Date();
  let edad = 0;
  if (Nacimiento < hoy) {
    edad = date.getDateDiff(hoy, Nacimiento, "years");
  } else {
    console.error("la fecha de nacimiento no puede ser superior ala actual");
  }
  return edad;
}
</script>

<style scoped ></style>
