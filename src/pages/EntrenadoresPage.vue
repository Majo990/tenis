<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="col-6 q-gutter-md text-center items-center">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="entrenador.nombre"
                label="Ingrese su Nombre "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Nombre',
                ]"
                style="width: 47%"
              />

              <q-select
                filled
                v-model="entrenador.id_jugadores"
                :options="jugadores"
                dense
                style="width: 47%"
                label="Seleccione Nombre Jugadores "
              />

              <q-input
                filled
                v-model="entrenador.apellido"
                label="Ingrese su Apellido Entrenador "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Nombre',
                ]"
                style="width: 47%"
              />
              <q-input
                filled
                type="edad"
                v-model="entrenador.edad"
                dense
                label="Selecione Edad"
                style="width: 47%"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your age',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione su edad',
                ]"
              />

              <q-select
                filled
                v-model="entrenador.sexo"
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

              <q-input
                filled
                v-model="entrenador.fecha_nacimiento"
                mask="date"
                dense
                :rules="['date']"
                style="width: 47%"
                lazy-rules
                label="Ingrese su Fecha Nacimiento"
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
                v-model="entrenador.nombre_paises"
                dense
                :options="paises"
                emit-value
                option-value="country"
                option-label="country"
                label="Seleccione su Pais"
                style="width: 47%"
              />

              <q-select
                filled
                dense
                v-model="entrenador.nombre_ciudades"
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
          <q-btn dense color="primary" label="Crear" />
          <q-btn dense color="secondary" label="Leer " />
          <q-btn dense color="amber" label="Actualizar" />
          <q-btn dense color="red" label="Borrar" />
        </div>

        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn
            label="Restablecer"
            type="reset"
            color="negative"
            flat
            class="q-ml-sm"
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
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { getEntrenadores, getPaises, crearEntrenadores } from "../services";

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
const date = ref("2019-02-01");
const sexos = ["Femenino", "Masculino"];
const rows = ref([]);
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

const ciudades = computed(
  () => paises.value.find((p) => p.country === entrenador.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getEntrenadores();
  paises.value = await getPaises();
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

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(entrenador, rowSelected);
}
</script>
<style>
.q-table {
  color: rgb(128, 128, 128);
  background-color: #20b393;
}
</style>
