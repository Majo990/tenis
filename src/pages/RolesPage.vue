<template>
  <q-page padding>
<q-form  q-form  @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <div class="q-pa-md">
      <strong>Formulario </strong>

<div class="row">
  <div class="col-6">
    <div class="row justify-between q-gutter-md">

      <q-input v-model="tel" filled type="tel"
      label="Ingrese su Descripcion Rol"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese la Descricion Rol',
              ]"
              style="width: 47%"
      />
    </div>
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
<br/>
<q-table :rows="rows" :columns="columns" row-key="name"  separator="cell"/>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getRoles} from "../services";
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
