<template>
  <q-page padding>
    <strong>Formulario </strong>
    <div class="q-pa-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Ingrese el Nombre-Jugador "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su NombreJugador',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="nacionalidad"
              label="Ingrese su Nacionalidad"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nacionalidad',
              ]"
            />
          </div>
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              type="number"
              v-model="age"
              label="Ingrese Nombre Entrenadores"
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su NombreEntrenadores',
              ]"
            />


          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="models"
              :options="pais"
              label="Seleccione su Pais"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="ciudad"
              label="Ingrese su  "
              style="width: 47%"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Ciudad',
              ]"
            />
          </div>

          <div class="row justify-between q-gutter-md">

          <q-input
            ref="inputRef"
            filled
            v-model="model9"
            label="Ingrese su DNI"
            style="width: 47%"
            :rules="[(val) => val.length <= 8 || 'Por favor ingrse su DNI']"
          />

          <q-input
            filled
            v-model="sancion"
            label="Ingrese su NombreSancion "
            style="width: 47%"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor ingrese su NombreSancion',
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
        <br/>
      </div>
      <q-table :rows="rows" :columns="columns" row-key="name"  separator="cell"/>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getJugadores } from "../services";

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
    name: "nacionalidad",
    align: "center",
    label: "Nacionalidad",
    field: "nacionalidad",
    sortable: true,
  },
  {
    name: "id_entrenadores",
    align: "center",
    label: "Entrenador",
    field: "nombre_entrenador",
    sortable: true,
  },
  {
    name: "sejuego",
    align: "center",
    label: "Sejuego",
    field: "sejuego",
    sortable: true,
  },
  {
    name: "id_torneo",
    align: "center",
    label: "Torneo",
    field: "nombre_torneo",
    sortable: true,
  },
  {
    name: "edad",
    align: "center",
    label: "Edad",
    field: "edad",
    sortable: true,
  },
  {
    name: "sexo",
    align: "center",
    label: "Sexo",
    field: "sexo",
    sortable: true,
  },
  {
    name: "id_arbitros",
    align: "center",
    label: "Arbitro",
    field: "nombre_arbitro",
    sortable: true,
  },
  {
    name: "id_equipos",
    align: "center",
    label: "Equipo",
    field: "nombre_equipos",
    sortable: true,
  },
  {
    name: "id_sanciones",
    align: "center",
    label: "Sancion",
    field: "nombre_sanciones",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getJugadores();
});
</script>
