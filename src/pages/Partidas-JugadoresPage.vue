<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
    <br />
    <br />

    <strong>Formulario </strong>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPartidasJugadores } from "../services";
const columns = [
  {
    name: "id_partidas",
    align: "center",
    label: "Nombre_Partidas",
    field: "nombre_partidas",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre_Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getPartidasJugadores();
});

</script>
