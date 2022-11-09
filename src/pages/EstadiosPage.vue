<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Ingrese su Nombre "
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
              :options="os"
              style="width: 47%"
              label="Seleccione Nombre Jugadores "
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="model"
              :options="p"
              style="width: 47%"
              label="Seleccione su Cancha "
            />

            <q-select
              filled
              v-model="model"
              :options="ns"
              style="width: 47%"
              label="Seleccione Departamento "
            />
            </div>
<br/>
          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="model"
              :options="ops"
              style="width: 47%"
              label="Seleccione cesped "
            />

            <q-input
              filled
              v-model="name"
              label="Ingrese su Administrador "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su NombreAdminsitra',
              ]"
              style="width: 47%"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Ingrese el Nombre Propietario "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su NombrePropietario',
              ]"
              style="width: 47%"
            />

            <q-input
              ref="inputRef"
              filled
              v-model="model9"
              label="Ingrese su Ubigeo"
              style="width: 47%"
              :rules="[
                (val) => val.length <= 8 || 'Por favor ingrse su Ubigeo',
              ]"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Ingrese su Direccion  "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Direccion',
              ]"
              style="width: 47%"
            />

            <q-select
              filled
              v-model="model"
              :options="options"
              style="width: 47%"
              label="Seleccione su Pais "
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="model"
              :options="options"
              style="width: 47%"
              label="Seleccione su Ciudades "
            />

            <q-select
              filled
              v-model="model"
              :options="options"
              style="width: 47%"
              label="Seleccione su Provincia "
            />
          </div>
<br/>
          <div class="col-6 q-gutter-md text-center items-center">
            <q-btn color="primary" label="Crear" />
            <q-btn color="secondary" label="Leer " />
            <q-btn color="amber" label="Actualizar" />
            <q-btn color="red" label="Borrar" />
          </div>
        </div>
      </div>
    </div>
    <br />
    <q-table :rows="rows" :columns="columns" row-key="name" separator="cell" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getEstadios } from "../services";

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
    name: "cancha",
    align: "center",
    label: "Cancha",
    field: "cancha",
    sortable: true,
  },
  {
    name: "cancha",
    align: "center",
    label: "Cancha",
    field: "cancha",
    sortable: true,
  },

  {
    name: "cesped",
    align: "center",
    label: "Cesped",
    field: "cesped",
    sortable: true,
  },
  {
    name: "administrador",
    align: "center",
    label: "Administradores",
    field: "adminsitrador",
    sortable: true,
  },
  {
    name: "propietario",
    align: "center",
    label: "Propietario",
    field: "propietario",
    sortable: true,
  },
  {
    name: "ubigeo",
    align: "center",
    label: "Ubigeo",
    field: "ubigeo",
    sortable: true,
  },
  {
    name: "direccion",
    align: "center",
    label: "Direccion",
    field: "direccion",
    sortable: true,
  },
  {
    name: "id_paises",
    align: "center",
    label: "Nombre-Paises",
    field: "id_paises",
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
    name: "id_provincia",
    align: "center",
    label: "Nombre-Provincia",
    field: "nombre_provincia",
    sortable: true,
  },

];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getEstadios();
});
</script>
<style>
.q-table {
  color: grey;
  background-color: #77d6f3;
}
</style>
