<template>
  <q-page padding>
    <strong>Formulario </strong>
    <q-page class="q-pa-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">

            <q-input
      v-model.number="model"
      type="number"
      filled
      style="max-width: 200px"
       hint="NroRonda"
      label="Ingrese su Nro Ronda "/>
</div>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">

<q-btn color="primary" label="Crear" />
<q-btn color="secondary" label="Leer " />
<q-btn color="amber" label="Actualizar" />
<q-btn color="red" label="Borrar" />

</div>
      <q-table :rows="rows" :columns="columns" row-key="name" />
      </q-form>
    </q-page>
  </q-page>
    </template>

<script setup>
import { ref, onMounted } from "vue";
import { getRondas } from "../services";
const columns = [
  { name: "nro", align: "center", label: "Nro", field: "nro", sortable: true },
];
const rows = ref([]);

onMounted(async () => {
  rows.value = await getRondas();
});
</script>
