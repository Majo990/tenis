<template>
  <q-page padding>
    <q-page class="q-pa-md">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card flat class="marco">
          <strong>Formulario </strong>
          <div class="row">
            <div class="col-6">
              <div class="row justify-between q-gutter-md">
                <div>
                  <label
                    >Ingrese nombre entrenador
                    <span class="text-red">*</span></label
                  >
                  <q-input
                    dense
                    v-model.number="ronda.nro"
                    type="number"
                    filled
                    hint="NroRonda"
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
        </q-card>
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
    </q-page>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import {
  getRondas,
  crearRondas,
  updateRondas,
  deleteRondas,
} from "../services";
const columns = [
  { name: "nro", align: "center", label: "Nro", field: "nro", sortable: true },
];
const rows = ref([]);
const selected = ref([]);

const ronda = reactive({
  nro: null,
});

async function onSubmit() {
  await crearRondas(ronda);
  Object.assign(ronda, {
    nro: null,
  });
}

async function Actualizar() {
  await updateRondas(ronda);
  Object.assign(ronda, {
    nro: null,
  });
}

async function Delete() {
  await deleteRondas(ronda);
  Object.assign(ronda, {
    nro: null,
  });
}

onMounted(async () => {
  rows.value = await getRondas();
});

function handleSelection(details) {
  let rowSelected = {
    nro: null,
  };

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;

  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(ronda, rowSelected);
}

//

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(ronda).every((key) => ronda[key] && ronda[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>

<style  lang="scss">
.marco {
  border-style: solid;
  border-radius: 5%;
  border-width: 1px;
  padding: 30px;
  height: 50%;
  max-width: 40%;
}
</style>
