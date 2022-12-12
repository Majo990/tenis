<template>
  <q-page padding>
    <div class="q-pa-md">

        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-card flat >
          <div class="col-6 q-gutter-md text-center items-center">
            <strong>Formulario </strong>
            <div class="row">
              <div class="col-6">
                <div class="row justify-between q-gutter-md">
                  <div>
                    <label
                      >Ingrese nombre entrenador
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      filled
                      v-model="entrenador.nombre"
                      lazy-rules
                      dense
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese su Nombre',
                      ]"
                      :onkeydown="onkeyDown"
                    />
                  </div>
                  <div>
                    <label
                      >Ingrese Apellido Entrenador
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      filled
                      v-model="entrenador.apellido"
                      lazy-rules
                      dense
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese el Apellido entrenador',
                      ]"
                      :onkeydown="onkeyDown"
                    />
                  </div>

                  <div>
                    <label
                      >Seleccione nombre jugador
                      <span class="text-red">*</span></label
                    >
                    <q-select
                      filled
                      v-model="entrenador.id_jugadores"
                      map-options
                      emit-value
                      option-value="id"
                      option-label="nombre"
                      :options="jugadores"
                      dense
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor seleccione nombre jugadores',
                      ]"
                    />
                  </div>
                </div>

                <div class="row justify-between q-gutter-md">
                  <div>
                    <label
                      >Ingrese Edad Entrenador
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      filled
                      type="number"
                      v-model="entrenador.edad"
                      dense
                      :rules="[
                        (val) =>
                          (val && val.length > 0 && val >= 18) ||
                          'Edad incorrecta',
                        'Edad correcta',
                      ]"
                    />
                  </div>

                  <div>
                    <label
                      >Seleccione su sexo Entrenador
                      <span class="text-red">*</span></label
                    >
                    <q-select
                      filled
                      v-model="entrenador.sexo"
                      dense
                      :options="sexos"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor seleccione el sexo ',
                      ]"
                    />
                  </div>

                  <div>
                    <label
                      >Ingrese Fecha-Nacimiento Entrenador
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      filled
                      v-model="entrenador.fecha_nacimiento"
                      mask="date"
                      dense
                      :rules="['date']"
                      lazy-rules
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="entrenador.fecha_nacimiento"
                              mask="YYYY-MM-DD"
                            >
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
                    <div>
                      <label
                        >Ingrese su Pais <span class="text-red">*</span></label
                      >
                      <q-select
                        filled
                        v-model="entrenador.nombre_paises"
                        dense
                        :options="paises"
                        map-options
                        emit-value
                        option-value="country"
                        option-label="country"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Por favor seleccione su pais',
                        ]"
                      />
                    </div>
                    <div>
                      <label
                        >Ingrese su Ciudad
                        <span class="text-red">*</span></label
                      >
                      <q-select
                        filled
                        dense
                        v-model="entrenador.nombre_ciudades"
                        :options="ciudades"
                        lazy-rules
                        :rules="[
                          (val) =>
                            (val && val.length > 0) ||
                            'Por favor ingrese su Ciudad',
                        ]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card>
        </q-form>


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
import { ref, onMounted, computed, reactive } from "vue";
import {
  getEntrenadores,
  getPaises,
  crearEntrenadores,
  getJugadores,
  updateEntrenadores,
  deleteEntrenadores,
} from "../services";


import {date}from 'quasar'

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
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "apellido",
    align: "center",
    label: "Apellido",
    field: "apellido",
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
    name: "fecha_nacimiento",
    align: "center",
    label: "Fecha-Nacimiento",
    field: "fecha_nacimiento",
    format:(val,row) => date.formatDate(val,'DD/MM/YYYY'),
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
const selected = ref([]);

const sexos = ["Femenino", "Masculino"];
const rows = ref([]);
const jugadores = ref([]);
const paises = ref([]);

const entrenador = reactive({
  nombre: null,
  id_jugadores: null,
  apellido: null,
  edad: null,
  sexo: null,
  altura: null,
  peso: null,
  fecha_nacimiento: null,
  nombre_paises: null,
  nombre_ciudades: null,
});
async function onSubmit() {
  await crearEntrenadores(entrenador);
}

async function Actualizar() {
  await updateEntrenadores(entrenador);
}

async function Delete() {
  await deleteEntrenadores(entrenador);
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === entrenador.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getEntrenadores();
  paises.value = await getPaises();
  jugadores.value = await getJugadores();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    id_jugadores: null,
    apellido: null,
    edad: null,
    sexo: null,
    altura: null,
    peso: null,
    fecha_nacimiento: null,
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

  Object.assign(entrenador, rowSelected);
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
    Object.keys(entrenador).every(
      (key) => entrenador[key] && entrenador[key] !== ""
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
  color: rgb(128, 128, 128);
  background-color: #20b393;
}

</style>
