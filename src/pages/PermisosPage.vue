<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script setup>
import{ref,onMounted} from "vue";
import {getPermisos} from "src/services";

const columns = [
  {
    name: "id_usuarios",
    required: true,
    label: "Nombre-Usuarios",
    align: "left",
    field: "usuarios_usuarios",
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
    name: "id_roles",
    align: "center",
    label: "Nombre-Roles",
    field: "descripcion_roles",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getPermisos();
});
</script>
<style>
.q-table {
  color: rgb(128, 128, 128);
  background-color: #20b393;
}
</style>
