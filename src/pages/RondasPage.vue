<template>
  <q-page padding>
    <strong>Formulario </strong>
    <q-page class="q-pa-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
              dense
                v-model.number="ronda.nro"
                type="number"
                filled
                style="max-width: 200px"
                hint="NroRonda"
                label="Ingrese su Nro Ronda "
              />
            </div>
          </div>
        </div>
        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn dense color="primary" label="Crear"  type="submit" />
          <q-btn   dense color="amber" label="Actualizar" />
          <q-btn  dense color="red" label="Borrar" />
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
      </q-form>
    </q-page>
  </q-page>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { getRondas } from "../services";
const columns = [
  { name: "nro", align: "center", label: "Nro", field: "nro", sortable: true },
];
const rows = ref([]);
const selected=ref([]);


const ronda=reactive({
   nro:null,
});

async function onSubmit(){
  await crearRondas(ronda);
}

onMounted(async () => {
  rows.value = await getRondas();
});

function handleSelection(details){
  let rowSelected={
    nro:null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(ronda, rowSelected);
}
</script>
