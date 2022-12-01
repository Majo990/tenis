<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                dense
                v-model="evento.nombre"
                label="Ingrese su Nombre Evento "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su NombreEvento',
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
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  getEventos,
  crearEventos,
  updateEventos,
  deleteEventos,
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

const rows = ref([]);
const nombre = ref([]);
const selected = ref([]);

const evento = reactive({
  id: null,
  nombre: null,
});

/*async function onSubmit() {
  await crearEventos({
    nombre: nombre.value,
  });
}
*/
async function onSubmit() {
  await crearEventos(evento);
}

async function Actualizar() {
  await updateEventos(evento);
}

async function Delete() {
  await deleteEventos(evento);
}

onMounted(async () => {
  rows.value = await getEventos();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(evento, rowSelected);
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
