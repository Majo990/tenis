<template>
  <q-page padding>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="nombrepremio"
                label="Ingrese su Nombre Premio "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Nombre Premio',
                ]"
                style="width: 47%"
              />

              <q-select
                filled
                dense
                v-model="model"
                :options="premio"
                style="width: 47%"
                label="Seleccione el Tipo Premio "
              />
            </div>


            <div class="row justify-between q-gutter-md">
            <q-select
                filled
                dense
                v-model="equipos"
                :options="equipos"
                style="width: 47%"
                label="Seleccione equipos "
              />

              <q-select
                filled
                dense
                v-model="jugadores"
                :options="jugadores"
                style="width: 47%"
                label="Seleccione Jugadores "
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn    dense color="primary" label="Crear" />
    
        <q-btn    dense color="amber" label="Actualizar" />
        <q-btn     dense color="red" label="Borrar" />
      </div>
    </q-form>

    <q-table     dense :rows="rows" :columns="columns" row-key="name" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPremios } from "../services";


const nombrepremio=ref(null);
 const premio= ref(null);
const equipos=ref(null);
const jugadores=ref(null);


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
    name: "tipo",
    align: "center",
    label: "Tipo",
    field: "tipo",
    sortable: true,
  },
  {
    name: "id_equipos",
    align: "center",
    label: "Nombre Equipos",
    field: "nombre_equipos",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },


];
const rows = ref([]);

onMounted(async () => {
  rows.value = await getPremios();
});
</script>
