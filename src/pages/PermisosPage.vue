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
                v-model="permiso.id_usuarios"
                map-options
                emit-value
                option-value="id"
                option-label="usuarios"
                :options="usuario"
                style="width: 47%"
                dense
                lazy-rules
                label="Seleccione Nombre Usuarios"
              />

              <q-input
                filled
                dense
                v-model="permiso.descripcion"
                label="Ingrese su Descripcion "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Descripcion',
                ]"
                style="width: 47%"
              />

              <q-select
                filled
                v-model="permiso.id_roles"
                map-options
                emit-value
                option-value="id"
                option-label="descripcion"
                :options="rol"
                style="width: 47%"
                dense
                lazy-rules
                label="Seleccione su rol "
              />
            </div>
          </div>
        </div>
        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn dense color="primary" label="Crear" type="submit" />
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
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  getPermisos,
  getRoles,
  crearPermisos,
  getUsuarios,
} from "src/services";

const columns = [
  {
    name: "id_usuarios",
    required: true,
    label: "Nombre-Usuarios",
    align: "left",
    field: "usuarios",
    sortable: true,
  },
  {
    name: "descripcion",
    align: "center",
    label: "Descripcion",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "id_roles",
    align: "center",
    label: "Nombre-Roles",
    field: "descripcion_roles",
    sortable: true,
  },
];

const selected = ref([]);
const usuario = ref([]);
const rol = ref([]);
const rows =ref([]);

const permiso = reactive({
  id_usuarios: null,
  descripcion: null,
  id_roles: null,
});

async function onSubmit() {
  await crearPermisos(permiso);
}

onMounted(async () => {
  rows.value = await getPermisos();
  rol.value = await getRoles();
  usuario.value = await getUsuarios();
});

function handleSelection(details) {
  let rowSelected = {
    id_usuarios: null,
    descripcion: null,
    id_roles: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(permiso, rowSelected);
}
</script>
<style>
.q-table {
  color: rgb(128, 128, 128);
  background-color: #20b393;
}
</style>
