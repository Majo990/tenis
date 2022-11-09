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
              label="Ingrese el Nombre Juez "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre Juez',
              ]"
              style="width: 47%"
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
import { getJueces } from "../services";
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    format: "nombre",
    field: "nombre",
    sortable: true,
  },
];
const rows = ref([]);

onMounted(async () => {
  rows.value = await getJueces();
});
</script>
