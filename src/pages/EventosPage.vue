<template>
    <div class="q-pa-md">
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese nombre evento <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  v-model="evento.nombre"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su NombreEvento',
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
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
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
  Object.assign(evento, {
    nombre: null,
  });
}

async function Actualizar() {
  await updateEventos(evento);

  Object.assign(evento, {
    nombre: null,
  });
}

async function Delete() {
  await deleteEventos(evento);
  Object.assign(evento, {
    nombre: null,
  });
}

onMounted(async () => {
  rows.value = await getEventos();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
  };

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
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

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(evento).every((key) => evento[key] && evento[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>

<style scoped>
</style>
