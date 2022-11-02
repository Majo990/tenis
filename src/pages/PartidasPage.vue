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
import { getPartidas } from "../services";
const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field:"nombre",
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
    name: "id_jugadores",
    align: "center",
    label: "Nombre_Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "id_torneos",
    align: "center",
    label: "Nombre-Torneos",
    field: "nombre_torneos",
    sortable: true,
  },
  {
    name: "fecha",
    align: "center",
    label: "Fecha",
    field: "fecha",
    sortable: true,
  },
  {
    name: "tiempo_inicio",
    align: "center",
    label: "Tiempo_Inicio",
    field: "tiempo_inicio",
    sortable: true,
  },
  {
    name: "tiempo_duracion",
    align: "center",
    label: "Tiempo_Duracion",
    field: "tiempo_duracion",
    sortable: true,
  },
  {
    name: "tiempo_fin",
    align: "center",
    label: "Tiempo_Fin",
    field: "tiempo_fin",
    sortable: true,
  },
  {
    name: "id_rondas",
    align: "center",
    label: "Nro-Rondas",
    field: "nro_rondas",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getPartidas();
});
</script>
