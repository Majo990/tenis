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
                v-model="nombre"
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
                v-model="nombre_jugador"
                :options="nombre_jugadores"
                dense
                style="width: 47%"
                label="Seleccione Nombre Jugadores "
              />

              <q-input
                filled
                v-model="apellido"
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
                v-model="edad"
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

              <div class="q-pa-lg">
                <q-option-group
                  v-model="group"
                  :options="options"
                  color="primary"
                  inline
                />
              </div>
              <q-input
                v-model="fecha_nacimiento"
                filled
                dense
                type="date"
                style="width: 47%"
                hint="seleccione Fecha Nacimiento"
              />

              <q-select
                filled
                v-model="pais"
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
                v-model="ciudad"
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
          <q-btn label="Enviar" type="submit" color="info" />
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
        dense
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="cell"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getEntrenadores, getPaises } from "../services";

const options = ref(null);

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

const rows = ref([]);
const nombre = ref(null);
const edad = ref(null);
const nombre_jugadores = ref(null);
const apellido = ref(null);

const paises = ref([]);
const pais = ref([]);
const ciudad = ref([]);

const fecha_nacimiento = ref("2019-02-01");

const ciudades = computed(
  () => paises.value.find((p) => p.country === pais.value)?.cities
);

onMounted(async () => {
  rows.value = await getEntrenadores();
  paises.value = await getPaises();
});

</script>
<style>
.q-table {
  color: rgb(128, 128, 128);
  background-color: #20b393;
}
</style>
