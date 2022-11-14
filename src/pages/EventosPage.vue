<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              dense
              v-model="nombre"
              label="Ingrese su Nombre Evento "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su NombreEvento',
              ]"
              style="width: 47%"
            />
          </div>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn dense color="primary" label="Crear" type="submit" />
        <q-btn dense color="secondary" label="Leer " />
        <q-btn dense color="amber" label="Actualizar" />
        <q-btn dense color="red" label="Borrar" />
      </div>
      <br />
      <q-table
        :rows="rows"
        dense
        :columns="columns"
        row-key="name"
        separator="cell"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getEventos } from "../services";
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
];

const rows = ref([]);

async function onSubmit(){
  await crearEventos({
    nombre: nombre.value,
  });
}

onMounted(async () => {
  rows.value = await getEventos();
});
</script>
