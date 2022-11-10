<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="row">
        <div  class="col-6">
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
            <q-select
                  filled
                  v-model="model"
                  :options="jugadores"
                  style="width: 47%"
                  label="Seleccione Nombre Jugadores "
                />
          </div>

          <div class="row justify-between q-gutter-md">

          <q-select
                  filled
                  v-model="model"
                  :options="arbitro"
                  style="width: 47%"
                  label="Seleccione Nombre Arbitro"
                />
                <q-select
                  filled
                  v-model="model"
                  :options="sancion"
                  style="width: 47%"
                  label="Seleccione Nombre Sancion"
                />
                <br/>
          </div>
        </div>
      </div>
      <br/>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn color="primary" label="Crear" />
        <q-btn color="secondary" label="Leer " />
        <q-btn color="amber" label="Actualizar" />
        <q-btn color="red" label="Borrar" />
        <br/>

         <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="cell"
      />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getComportamientos } from "../services";
const columns = [
  {
    name: "descripcion",
    required: true,
    label: "Descripcion",
    align: "left",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "id_arbitros",
    align: "center",
    label: "Nombre-Arbitros",
    field: "nombre_arbitros",
    sortable: true,
  },
  {
    name: "id_sanciones",
    align: "center",
    label: "Nombre-Sancion",
    field: "nombre_sancion",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getComportamientos();
});
</script>

<style>
.q-table {
  color: rgb(26, 25, 24);
  background-color: #f3eb77;
}
</style>
