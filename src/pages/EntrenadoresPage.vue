
<template>
  <q-page padding >
    <div class="q-pa-md">

<div class="col-6 q-gutter-md text-center items-center">
  <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">

            <q-input
              filled
              v-model="name"
              label="Ingrese su NombreEntrenador "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="nombrejugadores"
              label="Ingrese el NombreJugadores"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese el  Nombre-Jugadores',
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

        </div>
        <br/>
      <q-table :rows="rows" :columns="columns" row-key="name" separator="cell" />
    </div>



  </q-page>
</template>

<script setup>
import {ref,onMounted} from "vue";
import {getEntrenadores} from "../services";
const columns = [
  {
    name: 'nombre',
    required: true,
    label: 'Nombre',
    align: 'left',
    field:"nombre",

    sortable: true
  },
  { name: 'id_jugadores', align: 'center', label: 'Nombre-Jugadores', field:'nombre_jugadores', sortable: true },
]

const rows = ref([]);

onMounted(async () => {
  rows.value = await getEntrenadores();
});

const text=ref(null)
</script>
<style>

.q-table{
color: rgb(128, 128, 128);
background-color:#20b393;

}

</style>
