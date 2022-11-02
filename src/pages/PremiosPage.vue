<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPremios} from "../services";

const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
     field:"nombre",
    sortable: true,
  },
  {
    name: "tipo",
    align: "center",
    label: "Tipo",
    field: "tipo",
    sortable: true,
  },
  {
    name: "stock",
    align: "center",
    label: "Stock",
    field: "stock",
    sortable: true,
  },
];
const rows = ref([]);

onMounted(async () => {
  rows.value = await getPremios();
});
</script>
