<template>
  <q-page padding>
    <div class="q-pa-md">
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
    </div>
    <strong>Formulario </strong>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su Nombre Partidas"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 55%"
            />

            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione el Nombre Jugadores"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 55%"
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
    </q-form>
    <br />
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      separator="cell"
    />
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
const filter = ref("");

onMounted(async () => {
  rows.value = await getPartidasJugadores();
});
</script>
<style>
.buscador {
  width: 600px;
}
</style>
