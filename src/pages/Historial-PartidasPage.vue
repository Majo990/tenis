<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>

      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="nombre"
              label="Ingrese el Nombre Jugador "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su Nombre Jugador',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="fechahora"
              label="Ingrese su Fecha hora ver "
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Fecha-Hora ',
              ]"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="nombrejugadores"
              label="Ingrese su Nro Ronda"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nro Ronda',
              ]"
            />

            <q-input
              filled
              v-model="nombreentrenadores"
              label="Ingrese el Puntaje"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese el Puntage',
              ]"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="nombreeventos"
              label="Ingrese su Nombre-Eventos"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su NombreEvento',
              ]"
            />

            <q-input
              filled
              v-model="nombrejuez"
              label="Ingrese el Nombre Juez"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su NombreJueces',
              ]"
            />

            <q-input
              filled
              v-model="nombrejuez"
              label="Ingrese el Nombre Premios"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese el Nombre Premios',
              ]"
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

      <q-table :rows="rows" :columns="columns" row-key="name"  separator="cell"/>
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
  },
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
  },
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
</style>
