<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>

      <div class="row justify-between q-gutter-md">
        <q-input v-model="date" filled type="date" hint="seleccione Fecha" />
        <q-select
          filled
          v-model="model"
          :options="options"
          style="width: 47%"
          label="Seleccione Nombre Estadios"
        />
      </div>

      <div class="row justify-between q-gutter-md">
        <q-input
          filled
          v-model="nombrearbitro"
          label="Ingrese su Nombre  Torneo "
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Por favor ingrese el Nombre Torneo',
          ]"
          style="width: 47%"
        />
      </div>

      <div class="row justify-between q-gutter-md">
        <q-select
          filled
          v-model="model"
          :options="options"
          style="width: 47%"
          label="Seleccione su Pais "
        />
        <q-input
          filled
          v-model="nombrearbitro"
          label="Ingrese su Nombre arbitro "
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Por favor ingrese su NombreArbitr',
          ]"
          style="width: 47%"
        />

        <q-select
          filled
          v-model="model"
          :options="options"
          style="width: 47%"
          label="Seleccione su Ciudades "
        />

        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn color="primary" label="Crear" />
          <q-btn color="secondary" label="Leer " />
          <q-btn color="amber" label="Actualizar" />
          <q-btn color="red" label="Borrar" />
        </div>
      </div>

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
import { getTorneos } from "../services";

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
    name: "pais",
    align: "center",
    label: "pais",
    field: "pais",
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
    name: "ciudad",
    align: "center",
    label: "ciudad",
    field: "ciudad",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getTorneos();
});
</script>
