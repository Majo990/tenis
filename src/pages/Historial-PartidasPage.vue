<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="q-gutter-md">
        <div class="buscador">
          <q-input v-model="filter" debounce="500" filled placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <!-- <q-badge color="teal">Model: "{{ search }}"</q-badge>--->
        </div>
      </div>
      <br />

      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione jugador"
              style="width: 47%"
            />

            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su fecha-hora"
              style="width: 47%"
            />
          </div>
          <br/>

          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione Nombre ronda"
              style="width: 47%"
            />
            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su Puntaje"
              style="width: 47%"
            />
          </div>
          <br/>
          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su evento"
              style="width: 47%"
            />
            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su Nombre Juez"
              style="width: 47%"
            />
          </div>
          <br/>
          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su Nombre Premio"
              style="width: 47%"
            />

            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su Nombre Faltas"
              style="width: 47%"
            />
          </div>
          <br/>

          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su Nombre Partidas"
              style="width: 47%"
            />

            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su Nombre Arbitros "
              style="width: 47%"
            />
          </div>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn color="primary" label="Crear" />
        <q-btn color="secondary" label="Leer " />
        <q-btn color="amber" label="Actualizar" />
        <q-btn color="red" label="Borrar" />
      </div>
      <br />

      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="cell"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getHistorialPartidas } from "../services";
const columns = [
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "fecha_hora",
    align: "center",
    label: "Fecha-Hora",
    field: "fecha_hora",
    sortable: true,
  }, //ya esta
  {
    name: "id_rondas",
    align: "center",
    label: "Nro-Rondas",
    field: "nro_rondas",
    sortable: true,
  },
  {
    name: "puntaje",
    align: "center",
    label: "Puntaje",
    field: "puntaje",
    sortable: true,
  }, //ya esta
  {
    name: "id_eventos",
    align: "center",
    label: "Nombre-Eventos",
    field: "nombre_eventos",
    sortable: true,
  },
  {
    name: "id_jueces",
    align: "center",
    label: "Nombre-Jueces",
    field: "nombre_jueces",
    sortable: true,
  },
  {
    name: "id_premios",
    align: "center",
    label: "Nombre-Premios",
    field: "nombre_Premios",
    sortable: true,
  },
  {
    name: "id_faltas",
    align: "center",
    label: "Nombre-Faltas",
    field: "nombre_Faltas",
    sortable: true,
  },
  {
    name: "id_partidas",
    align: "center",
    label: "Nombre-Partidas",
    field: "nombre_Partidas",
    sortable: true,
  },
  {
    name: "id_arbitros",
    align: "center",
    label: "Nombre-Arbitros",
    field: "nombre_Arbitros",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getHistorialPartidas();
});
</script>
<style>
.q-table {
  color: grey;
  background-color: hsl(189, 84%, 71%);
}
.buscador {
  width: 600px;
}
</style>
