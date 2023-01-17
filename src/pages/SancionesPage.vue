<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="q-pa-md">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="q-pa-md">
            <strong>Formulario </strong>
            <div class="row">
              <div class="col-6">
                <div class="row justify-between q-gutter-md">
                  <div>
                    <label
                      >Ingrese nombre sancion
                      <span class="text-red">*</span></label
                    >

                    <q-input
                      filled
                      v-model="sancion.nombre"
                      lazy-rules
                      dense
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese su NombreJugador',
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
import { ref, onMounted, reactive, computed } from "vue";
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
  nombre: null,
});

async function onSubmit() {
  await crearSanciones(sancion);
  Object.assign(sancion, {
    nombre: null,
  });
}

async function Actualizar() {
  await updateSanciones(sancion);
  Object.assign(sancion, {
    nombre: null,
  });
}

async function Delete() {
  await deleteSanciones(sancion);
  Object.assign(sancion, {
    nombre: null,
  });
}

onMounted(async () => {
  rows.value = await getSanciones();
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

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(sancion).every((key) => sancion[key] && sancion[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>

<style lang="scss" scoped>
/*.marco {
  border-style: solid;
  border-radius: 5%;
  border-width: 1px;
  padding: 30px;
  height: 50%;
  max-width: 40%;
}*/
</style>
