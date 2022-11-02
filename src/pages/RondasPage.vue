<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getRondas } from "../services";
const columns = [
  { name: "nro", align: "center", label: "Nro", field: "nro", sortable: true },
];
const rows = ref([]);

onMounted(async () => {
  rows.value = await getRondas();
});
</script>
