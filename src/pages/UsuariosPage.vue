<template>
  <div class="q-pa-md">
    <strong>Formulario </strong>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-gutter-md row items-start">
        <q-input
          dense
          v-model="usuario.usuarios"
          style="width: 20%"
          filled
          type="usuario"
          hint="Usuario"
          :onkeydown="onkeyDown"
        />

        <q-input
          dense
          v-model="usuario.contraseña"
          filled
          style="width: 20%"
          type="password"
          hint="Password"
        />

        <q-input
          dense
          style="width: 20%"
          v-model="usuario.contraseña"
          filled
          :type="isPwd ? 'password' : 'text'"
          hint="Password with toggle"
        >
          <template v-slot:append> </template>
        </q-input>
        <q-select
          filled
          v-model="usuario.id_roles"
          emit-value
          option-value="id"
          option-label="descripcionrol"
          :options="roles"
          style="width: 47%"
          dense
          lazy-rules
          label="Seleccione el Rol"
        />
        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn dense color="primary" label="Crear" type="submit" />
          <q-btn dense color="amber" label="Actualizar" @click="Actualizar" />
          <q-btn dense color="red" label="Borrar" @click="Delete" />
        </div>
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
    </q-form>
  </div>
</template>

<script setup>
// import { isAsyncFunction } from "util/types";
import { ref, onMounted, reactive } from "vue";
import {
  crearUsuarios,
  getUsuarios,
  getRoles,
  updateUsuarios,
  deleteUsuarios
} from "../services";
const columns = [
  {
    name: "usuarios",
    required: true,
    label: "Usuarios",
    align: "left",
    field: "usuarios",
    sortable: true,
  },
  {
    name: "id_roles",
    align: "center",
    label: "Descripcion-Roles",
    field: "descripcion_rol",
    sortable: true,
  },
];

const selected = ref([]);
const rows = ref([]);
const roles = ref([]);

const usuario = reactive({
  id: null,
  usuarios: null,
  contraseña: null,
  id_roles: null,
});

async function onSubmit() {
  await crearUsuarios(usuario);
}

async function Actualizar() {
  await updateUsuarios(usuario);
}

async function Delete() {
  await deleteUsuarios(usuario);
}

onMounted(async () => {
  rows.value = await getUsuarios();
  roles.value = await getRoles();
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

  Object.assign(usuario,rowSelected);
}

function onkeyDown(evt) {
  if (
    (evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
}

</script>

<style>
h3 {
  color: rgb(28, 234, 241);
  -webkit-text-stroke: 1.5px rgb(198, 11, 245);
}
.q-gutter-md  items-start {
  color: beige;
}
</style>
