<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <q-form q-form @submit="onSubmit" class="q-gutter-md">
          <div class="q-pa-md">
            <strong>Formulario </strong>

            <div class="row">
              <div class="col-6">
                <div class="row justify-between q-gutter-md">
                  <q-input
                    filled
                    dense
                    v-model="rol.descripcion"
                    label="Pequeña descipcion "
                    lazy-rules
                    style="width: 47%"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Por favor ingrese su Apellido',
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 q-gutter-md text-center items-center">
            <q-btn dense color="primary" label="Crear" type="submit" />
            <q-btn dense color="amber" label="Actualizar" @click="Actualizar" />
            <q-btn dense color="red" label="Borrar" @click="Delete" />
          </div>
        </q-form>

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

      <div class="col-6">
        <q-scroll-area style="height: 500px; width: 400px">
          <q-list bordered padding dense style="background-color: aqua">
            <q-separator spaced />
            <q-item-label header>Lista Permisos </q-item-label>

            <q-option-group
              v-model="permisosSelected"
              :options="permisos"
              color="primary"
              type="checkbox"
            />
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  getRoles,
  crearRoles,
  updateRoles,
  deleteRoles,
  getPermisos,
  updatePermisos,
  deletePermisos,
  crearPermisosRoles,
  updatePermisosRoles,
  deletePermisosRoles
} from "../services";

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
const permisosSelected = ref([]);
const selected = ref([]);
const permisos = ref([]);

const rol = reactive({
  id: null,
  descripcion: null,
});

//const permisos=reactive({
//id:null,
//descripcionpermiso:null,
//})

async function onSubmit() {
  const r = await crearRoles(rol);

  const permisos_roles = permisosSelected.value.map((p) => {
    return {
      id_roles: rol.id || r.insertId,
      id_permisos: p,
    };
  });

  for (let i = 0; i < permisos_roles.length; i++) {
    await crearPermisosRoles(permisos_roles[i]);
  }
}

async function Actualizar() {
  await updateRoles(rol);
  await updatePermisos(permisos);
}

async function Delete() {
  await deleteRoles(rol);
  await deletePermisos(permisos);
}

onMounted(async () => {
  rows.value = await getRoles();
  const per = await getPermisos();
  permisos.value = per.map((p) => ({
    label: p.descripcion,
    value: p.id,
  }));
});

function handleSelection(details) {
  let rowSelected = {
    descripcionrol: null,
    descripcion: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(rol, rowSelected);
}
</script>

<style></style>
