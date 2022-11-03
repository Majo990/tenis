<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">

            <q-input
              filled
              v-model="nombrearbitro"
              label="Ingrese su Nombre Partida "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre Partida',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="nombresanciones"
              label="Ingrese el Nombre-Jugadores"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre-Jugadores',
              ]"
            />
          </div>
        </div>
      </div>
    </div>

          <div class="col-6 q-gutter-md text-center items-center">

            <q-btn color="primary" label="Crear" />
          <q-btn color="secondary" label="Leer " />
          <q-btn color="amber" label="Actualizar" />
          <q-btn color="red" label="Borrar" />
          </div>
          <br/>
      <q-table :rows="rows" :columns="columns" row-key="name" />


  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPartidasJugadores } from "../services";
const columns = [
  {
    name: "id_partidas",
    align: "center",
    label: "Nombre_Partidas",
    field: "nombre_partidas",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre_Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getPartidasJugadores();
});

</script>
