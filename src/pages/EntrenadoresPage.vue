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
                v-model="name"
                label="Ingrese su NombreEntrenador "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Nombre',
                ]"
                style="width: 47%"
              />

              <q-select
                filled
                v-model="model"
                :options="options"
                style="width: 47%"
                label="Seleccione Nombre Jugadores "
              />

                <q-input
                  filled
                  v-model="name"
                  label="Ingrese su Apellido Entrenador "
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor ingrese su Nombre',
                  ]"
                  style="width: 47%"
                />
                <q-input
                  filled
                  type="number"
                  v-model="age"
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
                  v-model="model"
                  :options="options"
                  style="width: 47%"
                  label="Seleccione sexo "
                />
                <q-input
                  v-model="date"
                  filled
                  type="date"
                  style="width: 47%"
                  hint="seleccione Fecha Nacimiento"
                />

                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  style="width: 47%"
                  label="Seleccione Paises "
                />

                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  style="width: 47%"
                  label="Seleccione Ciudades"
                />
            </div>
          </div>
        </div>

        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn color="primary" label="Crear" />
          <q-btn color="secondary" label="Leer " />
          <q-btn color="amber" label="Actualizar" />
          <q-btn color="red" label="Borrar" />
        </div>
      </div>
      <br />
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="cell"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getEntrenadores } from "../services";
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

onMounted(async () => {
  rows.value = await getEntrenadores();
});

const text = ref(null);
</script>
<style>
.q-table {
  color: rgb(128, 128, 128);
  background-color: #20b393;
}
</style>
