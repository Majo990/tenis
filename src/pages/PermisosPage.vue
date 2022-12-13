<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="marco">
          <strong>Formulario </strong>
          <div class="row">
            <div class="col-6">
              <div class="row justify-between q-gutter-md">
                <div>
                  <label
                    >Ingrese nombre Permisos
                    <span class="text-red">*</span></label
                  >
                  <q-input
                    filled
                    dense
                    type="text"
                    v-model="permiso.descripcion"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Por favor ingrese su NombreDescripcion',
                    ]"
                    :onkeydown="onkeyDown"
                  />
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
              label="Actualizar"
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
import { ref, onMounted, reactive,computed } from "vue";
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
];

const selected = ref([]);
const rows = ref([]);
const usuario = ref([]);

const permiso = reactive({
  descripcion: null,
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
  usuario.value = await getUsuarios();
});

function handleSelection(details) {
  let rowSelected = {
    id_usuarios: null,
    descripcion: null,
  };

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(permiso, rowSelected);
}

function onkeyDown(evt) {
  if (
    (evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
}

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(permiso).every((key) => permiso[key] && permiso[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>
<style>
.marco {
  border-style: solid;
  border-radius: 5%;
  border-width: 1px;
  padding: 30px;
  padding-right: 150px;
  height: 50%;
  max-width: 54%;
}
</style>
