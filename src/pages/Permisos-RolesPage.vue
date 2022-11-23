<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="permisorol.id_permisos"
                map-options
                emit-value
                option-value="id"
                option-label="descripcion"
                :options="permisos"
                style="width: 47%"
                dense
                lazy-rules
                label="Seleccione Nombre Jugadores "
              />
              <q-select
                filled
                v-model="permisorol.id_roles"
                map-options
                emit-value
                option-value="id"
                option-label="descripcion"
                :options="roles"
                style="width: 47%"
                dense
                lazy-rules
                label="Seleccione Nombre Jugadores "
              />
            </div>
          </div>
        </div>
        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn dense color="primary" label="Crear" type="submit" />
          <q-btn dense color="amber" label="Actualizar" @click="Actualizar" />
          <q-btn dense color="red" label="Borrar" @click="Delete" />
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
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  crearPermisosRoles,
  updatePermisosRoles,
  deletePermisosRoles,
  getRoles,
  getPermisos,
  getPermisosRoles
} from "src/services";

const columns = [
  {
    name: "id_permisos",
    align: "center",
    label: "Permisos",
    field: "nombre_permisos",
    sortable: true,
  },
  {
    name: "id_roles",
    align: "center",
    label: "Roles",
    field: "nombre_roles",
    sortable: true,
  },
];

const selected = ref([]);
const permisos = ref([]);
const rol = ref([]);
const rows = ref([]);

const permisorol = reactive({
  id: null,
  id_permisos: null,
  id_roles: null,
});

async function onSubmit() {
  await crearPermisosRoles(permisorol);
}

async function Actualizar() {
  await updatePermisosRoles(permisorol);
}

async function Delete() {
  await deletePermisosRoles(permisorol);
}

onMounted(async () => {
  rows.value = await getPermisos();
  rol.value = await getRoles();
});


function handleSelection(details) {
  let rowSelected = {
    id_permisos: null,
    id_roles: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(permisorol, rowSelected);
}
</script>
<style>
.q-table {
  color: rgb(128, 128, 128);
  background-color: #20b393;
}
</style>
