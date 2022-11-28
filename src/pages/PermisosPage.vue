<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                dense
                v-model="permiso.descripcionpermiso"
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
              v-model="permiso.id_usuarios"
              map-options
              emit-value
              option-value="id"
              option-label="nombre"
              :options="usuario"
              style="width: 47%"
              dense
              lazy-rules
              label="Seleccione Nombre Usuarios "
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

      <br />

  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  getPermisos,
  crearPermisos,
  deletePermisos,
  updatePermisos,
  getUsuarios,
} from "src/services";

const columns = [
  {
    name: "descripcion",
    align: "center",
    label: "Descripcion",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "id_usuario",
    align: "center",
    label: "Usuario",
    field: "usuario_usuario",
    sortable: true,
  },
];


const selected = ref([]);
const rows = ref([]);
const usuario=ref([]);

const permiso = reactive({
  id: null,
  id_usuarios: null,
  descripcionpermiso: null,
});


async function onSubmit() {
  await crearPermisos(permiso);
}

async function Actualizar() {
  await updatePermisos(permiso);
}

async function Delete() {
  await deletePermisos(permiso);
}

onMounted(async () => {
  rows.value = await getPermisos();
  usuario.value=await getUsuarios();
});

function handleSelection(details) {
  let rowSelected = {
    id_usuarios: null,
    descripcionpermiso: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(permiso,rowSelected);
}
</script>
<style></style>
