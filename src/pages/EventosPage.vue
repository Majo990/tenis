<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>

    <br />
    <strong>Formulario </strong>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getEventos } from "../services";
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getEventos();
});
</script>
