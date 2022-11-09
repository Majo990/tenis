<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="nombre"
              label="Ingrese su Nombre "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 47%"
            />

            <q-input
              v-model="date"
              filled
              type="date"
              hint="seleccione Fecha_Fundo"
            />
          </div>
        </div>

        <div class="row justify-between q-gutter-md">
          <q-select
            filled
            v-model="model"
            :options="options"
            style="width: 47%"
            label="Seleccione Nombre Jugadores "
          />
          <q-select
            filled
            v-model="model"
            :options="options"
            style="width: 47%"
            label="Seleccione Nombre Entrenadores "
          />
        </div>
      </div>

      <div class="row justify-between q-gutter-md">
        <div class="q-pa-md" style="max-width: 300px">
       <q-input
      v-model="text"
      filled
      type="textarea"
    />
     </div>

        <q-input
          filled
          v-model="descripcion"
          label="Ingrese su Simbolo"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor ingrese su Simbolo',
          ]"
          style="width: 47%"
        />

        <div class="row justify-between q-gutter-md">
          <q-input
            filled
            v-model="descripcion"
            label="Ingrese su Indumentaria_Uniforme"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor ingrese su IndumentariaUniforme',
            ]"
            style="width: 47%"
          />
          <q-input
            filled
            v-model="nombre"
            label="Ingrese su Presidente "
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor ingrese su Presidente',
            ]"
            style="width: 47%"
          />
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="descripcion"
              label="Ingrese su Apodo "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Apodos',
              ]"
            />
            <q-select
              filled
              v-model="model"
              :options="options"
              style="width: 47%"
              label="Seleccione Nombre Estadios"
            />
            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="model"
                :options="options"
                style="width: 47%"
                label="Seleccione Nombre Paises"
              />
              <q-select
                filled
                v-model="model"
                :options="options"
                style="width: 47%"
                label="Seleccione Nombre Ciudades"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-6 q-gutter-md text-center items-center">
      <q-btn color="primary" label="Crear" />
      <q-btn color="secondary" label="Leer " />
      <q-btn color="amber" label="Actualizar" />
      <q-btn color="red" label="Borrar" />
    </div>
    <br />
    <q-table :rows="rows" :columns="columns" row-key="name" separator="cell" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getEquipos } from "src/services";
const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
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
  },  {
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

const rows = ref([]);

onMounted(async () => {
  rows.value = await getEquipos();
});
</script>
<style>
.q-table {
  color: grey;
  background-color: #1ddf8e;
}
</style>
