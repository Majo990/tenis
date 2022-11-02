<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getTorneos} from "../services";

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
