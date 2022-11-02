<template>
  <q-page padding :class="isDark ? 'bg-black' : 'light'">
    <div  class="q-pa-md">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="vertical"
      />
<br/>
<br/>


<div class="col-6 q-gutter-md text-center items-center">
  <strong>Formulario </strong>
<q-input standout v-model="text" label="Nombre"   style="width: 30%"  />

<q-input standout v-model="text" label="Nombre-Sanciones" style="width: 30%" />

          <q-btn color="primary" label="Crear" />
          <q-btn color="secondary" label="Leer " />
          <q-btn color="amber" label="Actualizar" />
          <q-btn color="red" label="Borrar" />
        </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getArbitros } from "../services";
const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "id_sanciones",
    align: "center",
    label: "Nombre-Sanciones",
    field: "nombre_sanciones",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getArbitros();
});
</script>
