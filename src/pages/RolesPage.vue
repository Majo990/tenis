<template>
  <q-page padding>
    <q-form q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>

        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                dense
                v-model="apellido"
                label="Pequeña descipcion "
                lazy-rules
                style="width: 47%"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Apellido',
                ]"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn dense color="primary" label="Crear" />
        <q-btn dense color="amber" label="Actualizar" />
        <q-btn dense color="red" label="Borrar" />
      </div>
    </q-form>
    <br />
    <q-table
              :rows="rows"
              :columns="columns"
              separator="cell"
              dense
              row-key="id"
              selection="single"
              v-model:selected="selected"
              @selection="handleSelection"
            >
            </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getRoles } from "../services";

const columns = [
  {
    name: "descripcion",
    required: true,
    label: "Descripcion",
    align: "left",
    field: "descripcion",
    sortable: true,
  },
];
const rows = ref([]);

onMounted(async () => {
  rows.value = await getRoles();
});
</script>
