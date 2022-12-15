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
                  <div>
                    <label
                      >Ingrese su descripcion Rol
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      filled
                      dense
                      v-model="rol.descripcion"
                      lazy-rules
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
          </div>

          <div class="col-6 q-gutter-md text-center items-center">
            <q-btn
              dense
              color="primary"
              label="Crear"
              type="submit"
              icon="fa-solid fa-folder-plus"

            />
            <q-btn
              dense
              color="amber"
              label="Editar"
              @click="Actualizar"
              icon="fa-solid fa-pen-to-square"

            />
            <q-btn
              dense
              color="red"
              label="Borrar"
              @click="Delete"
              icon="fa-solid fa-trash-can"


            />

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
          <q-list
            bordered
            padding
            dense
            style="background-color: aqua"
            class="q-pa-md"
          >
            <q-separator spaced />
            <q-item-label header>Lista Permisos </q-item-label>
            <q-checkbox v-model="selectedAll" dense  label="Seleccionar todos" class="text-bold" @update:model-value="updateAll"/>

            <q-option-group
              v-model="permisosSelected"
              :options="permisos"
              color="primary"
              type="checkbox"
              dense
            />
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import _ from "lodash";
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
const selectedAll = ref(false);
const rows = ref([]);
const permisosSelected = ref([]);
const selected = ref([]);
const permisos = ref([]);
const rolesDB = ref([]);


const rol = reactive({
  descripcion: null,
});

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

  Object.assign(rol, {
    descripcion: null,
  });

}

async function Actualizar() {
  await updateRoles(rol);
  const permisos_roles = rolesDB.value
    .filter((r) => r.id === rol.id)
    .map((p) => {
      return {
        id: p.id_permisos_roles,
        id_roles: rol.id,
        id_permisos: permisosSelected.value.some((ps) => ps === p.id_permisos)
          ? p.id_permisos
          : null,
      };
    });

  for (let i = 0; i < permisos_roles.length; i++) {
    await updatePermisosRoles(permisos_roles[i]);
  }

  Object.assign(rol, {
    descripcion: null,
  });

}

async function Delete() {
  await deleteRoles(rol);
  await deletePermisos(permisos.value);


  Object.assign(rol, {
    descripcion: null,
  });
}

onMounted(async () => {
  rolesDB.value = await getRoles();
  const rolesMap = _.uniqBy(rolesDB.value, "id");
  rows.value = rolesMap;
  const per = await getPermisos();
  permisos.value = per.map((p) => ({
    label: p.descripcion,
    value: p.id,
  }));
});

function handleSelection(details) {
  let rowSelected = {
    id: null,
    descripcion: null,
    descripcion: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }
  Object.assign(rol, rowSelected);
  permisosSelected.value = rolesDB.value
    .filter((p) => p.id === rol.id)
    .map((p) => p.id_permisos);
}

/*function updateAll(val){
 if (val ==this.selectedall.length ){

  this.selectedAll=true ;
 }
 else if (val==0  ) this.selectedAll=false ;{
  this.selectedAll=toggle-indeterminate;
 }

}
*/

</script>

<style></style>
