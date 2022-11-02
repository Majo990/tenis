<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getRoles} from "../services";
const columns = [
  {
    name: "descripcion",
    required: true,
    label: "Descripcion",
    align: "left",
    field: "descripcion",
    sortable: true,
  },
];
const rows = ref([]);

onMounted(async () => {
  rows.value = await getRoles();
});
</script>
