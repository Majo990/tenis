<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">

            <q-input
              filled
              v-model="name"
              label="Ingrese su Nombre "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="pais"
              label="Ingrese su Pais"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Pais',
              ]"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="ciudad"
              label="Ingrese su Ciudad"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Ciudad',
              ]"
            />

            <q-input
              filled
              v-model="nombrejugador"
              label="Ingrese su Nombre-Jugador"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre-Jugador',
              ]"
            />

            <q-input
              filled
              v-model="cancha"
              label="Ingrese su Cancha"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Cancha',
              ]"
            />

          </div>

            <div class="col-6 q-gutter-md text-center items-center">
          <q-btn color="primary" label="Crear" />
          <q-btn color="secondary" label="Leer " />
          <q-btn color="amber" label="Actualizar" />
          <q-btn color="red" label="Borrar" />
            </div>
          </div>
        </div>
      </div>
    <br/>

      <q-table :rows="rows" :columns="columns"  row-key="name"  separator="cell" />

  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getEstadios } from "../services";


const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "pais",
    align: "center",
    label: "Pais",
    field: "pais",
    sortable: true,
  },
  {
    name: "ciudad",
    align: "center",
    label: "Ciudad",
    field: "ciudad",
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
    name: "cancha",
    align: "center",
    label: "cancha",
    field: "cancha",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getEstadios();
});
</script>
<style>
.q-table {
  color: grey;
  background-color: #77d6f3;
}
</style>
