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
import { getFaltas } from "../services";
const columns = [
  {
    name: "nro",
    required: true,
    label: "Nro",
    align: "left",
    field: "nro",
    sortable: true,
  },
  {
    name: "fecha_hora",
    align: "center",
    label: "Fecha-Hora",
    field: "fecha_hora",
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
    name: "id_arbitros",
    align: "center",
    label: "Nombre-Arbitros",
    field: "nombre_arbitros",
    sortable: true,
  },
  {
    name: "id_historial_partidas",
    align: "center",
    label: "Nombre-Historial-Partidas",
    field: "nombre_historial_partidas",
    sortable: true,
  },
  {
    name: "id_partidas",
    align: "center",
    label: "Nombre-Partidas",
    field: "nombre_partidas",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getFaltas();
});
</script>
<style>
.q-table {
  color: rgba(128, 128, 128, 0.993);
  background-color: #f3abe7;
}
</style>
