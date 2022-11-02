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
    name: "pais",
    align: "center",
    label: "Pais",
    field: "pais",
    sortable: true,
  },
  {
    name: "ciudad",
    align: "center",
    label: "Ciudad",
    field: "ciudad",
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
    label: "cancha",
    field: "cancha",
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
