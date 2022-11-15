<template>
  <div class="q-pa-md">
    <strong>Formulario </strong>
    <div class="q-gutter-md row items-start">
      <q-input dense v-model="usuario" filled type="usuario" hint="Usuario" />

      <q-input
        dense
        v-model="password"
        filled
        type="password"
        hint="Password"
      />

      <q-input
        dense
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Password with toggle"
      >
        <template v-slot:append> </template>
      </q-input>
      <q-select
        filled
        v-model="rol"
        dense
        label="Seleccione su sexo"
        :options="roles"
        style="width: 47%"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor seleccione su pais',
        ]"
      />

      <q-btn dense color="primary" label="Crear" />
      <q-btn dense color="secondary" label="Leer " />
      <q-btn dense color="amber" label="Actualizar" />
      <q-btn dense color="red" label="Borrar" />
    </div>
    <br />
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
  </div>
</template>

<script setup>

 // import { isAsyncFunction } from "util/types";
import { ref, onMounted, computed,reactive } from "vue";
import { crearUsuarios, getUsuarios } from "../services";
const columns = [
  {
    name: "usuarios",
    required: true,
    label: "Usuarios",
    align: "left",
    field: "usuarios",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "id_roles",
    align: "center",
    label: "Descripcion-Roles",
    field: "descripcion_roles",
    sortable: true,
  },
];

const selected = ref([]);
const rows = ref([]);
const roles = ["Usuario", "Administrador"];

const usuario =reactive( {

    usuarios: null,
    contraseña: null,
    id_roles: null,
  });

async function onSubmit(){
  await crearUsuarios(usuario);
}
onMounted(async () => {
  rows.value = await getUsuarios();
});

function handleSelection(details) {
  let rowSelected = {
    usuarios: null,
    contraseña: null,
    id_roles: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(usuario, rowSelected);
}
</script>

<style>
h3 {
  color: rgb(28, 234, 241);
  -webkit-text-stroke: 1.5px rgb(198, 11, 245);
}
.q-gutter-md row items-start {
  color: beige;
}
</style>
