
<template>
  <q-page padding >
    <div class="q-pa-md">


      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">

            <q-input
              filled
              v-model="descripcion"
              label="Ingrese su Descripcion "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Descripcion',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="nombrejugadores"
              label="Ingrese el Nombre-Jugadores"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre-Jugadores',
              ]"
            />
          </div>

          <q-input
              filled
              v-model="nombrearbitros"
              label="Ingrese el Nombre-Arbitros"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre-Arbitros',
              ]"
            />
          </div>
        </div>
        <div class="col-6 q-gutter-md text-center items-center">

          <q-btn color="primary" label="Crear" />
          <q-btn color="secondary" label="Leer " />
          <q-btn color="amber" label="Actualizar" />
          <q-btn color="red" label="Borrar" />

        </div>

      <q-table :rows="rows" :columns="columns" row-key="name" />
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
