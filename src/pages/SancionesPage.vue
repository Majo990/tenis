<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="q-pa-md">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row">
            <div class="col-6">
              <div class="row justify-between q-gutter-md">
                <q-input
                  filled
                  v-model="sancion.nombre"
                  label="Ingrese el Nombre-Sancion "
                  lazy-rules
                  dense
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su NombreJugador',
                  ]"
                  style="width: 47%"
                  :onkeydown="onkeyDown"
                />
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
      </div>
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
  getSanciones,
  crearSanciones,
  updateSanciones,
  deleteSanciones,
} from "../services";
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
];

const selected = ref([]);
const rows = ref([]);

const sancion = reactive({
  nombe: null,
});

async function onSubmit() {
  await crearSanciones(sancion);
}

async function Actualizar() {
  await updateSanciones(sancion);
}

async function Delete() {
  await deleteSanciones(sancion);
}

onMounted(async () => {
  rows.value = await getSanciones();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(sancion, rowSelected);
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

<!--mal -->
