<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="q-pa-md">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="row">
            <div class="col-6">
              <div class="row justify-between q-gutter-md">
                <q-input
                  filled
                  v-model="nombresancion"
                  label="Ingrese el Nombre-Sancion "
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su NombreJugador',
                  ]"
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
        </q-form>
      </div>

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
import { getSanciones } from "../services";
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

onMounted(async () => {
  rows.value = await getSanciones();
});
</script>

<!--mal -->
