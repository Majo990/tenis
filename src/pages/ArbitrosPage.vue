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
              label="Ingrese su Nombre arbitro "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="nombresanciones"
              label="Ingrese el Nombre-Sanciones"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre-Sanciones',
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
    <br/>
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="vertical"
      />
<br/>
<br/>

    </div>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getArbitros } from "../services";
const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "id_sanciones",
    align: "center",
    label: "Nombre-Sanciones",
    field: "nombre_sanciones",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getArbitros();
});
</script>
