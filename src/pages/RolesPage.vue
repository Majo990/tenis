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
              :disable="botonbloqueocrear"
            />
            <q-btn
              dense
              color="amber"
              label="Editar"
              @click="Actualizar"
              icon="fa-solid fa-pen-to-square"
              :disable="botonbloqueoactualizar"
            />
            <q-btn
              dense
              color="red"
              label="Borrar"
              @click="Delete"
              icon="fa-solid fa-trash-can"
              :disable="botonbloqueoeliminar"
            />
          </div>
         <br/>
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
import { ref, onMounted, reactive, computed } from "vue";
import {
  getRoles,
  crearRoles,
  updateRoles,
  deleteRoles,
  getPermisos,
  updatePermisos,
  deletePermisos,
  crearPermisosRoles,
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
  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(rol, rowSelected);
}

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(rol).every((key) => rol[key] && rol[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>

<style></style>
