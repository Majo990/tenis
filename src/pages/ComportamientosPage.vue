
<template>
  <q-page padding >
    <div class="q-pa-md" >
      <q-table :rows="rows" :columns="columns" row-key="name" />

    </div>



<div class="col-6 q-gutter-md text-center items-center">
  <strong>Formulario </strong>
  <br/>
<q-input standout v-model="text" label="Descripcion"   style="width: 30%"  />

<q-input standout v-model="text" label="Nombre-Jugadores" style="width: 30%" />
<q-input standout v-model="text" label="Nombre-Arbitros" style="width: 30%" />

          <q-btn color="primary" label="Crear" />
          <q-btn color="secondary" label="Leer " />
          <q-btn color="amber" label="Actualizar" />
          <q-btn color="red" label="Borrar" />
        </div>

  </q-page>
</template>

<script setup>

import {ref,onMounted} from "vue";
import {getComportamientos} from "../services";
const columns = [
  {
    name: 'descripcion',
    required: true,
    label: 'Descripcion',
    align: 'left',
    field:"descripcion",
    sortable: true
  },
  { name: 'id_jugadores', align: 'center', label: 'Nombre-Jugadores', field:'nombre_jugadores', sortable: true },
  { name: 'id_arbitros', align: 'center', label: 'Nombre-Arbitros', field:'nombre_arbitros', sortable: true },
]


const rows = ref([]);

onMounted(async () => {
  rows.value = await getComportamientos();
});
</script>

<style>

.q-table{
color: grey;
background-color:#f3eb77;

}

</style>
