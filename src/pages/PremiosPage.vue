<template>
  <q-page padding>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="nombrepremio"
                label="Ingrese su Nombre Premio "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Nombre Premio',
                ]"
                style="width: 47%"
              />

              <q-select
                filled
                v-model="model"
                :options="premio"
                style="width: 47%"
                label="Seleccione el Tipo Premio "
              />
                        </div>
          </div>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn color="primary" label="Crear" />
        <q-btn color="secondary" label="Leer " />
        <q-btn color="amber" label="Actualizar" />
        <q-btn color="red" label="Borrar" />
      </div>
    </q-form>

    <q-table :rows="rows" :columns="columns" row-key="name" />
  </q-page>
</template>

<script >
import { ref, onMounted } from "vue";
import { getPremios } from "../services";

export default{
  setup() {
return {
  model: ref(null),
  premio: ["Viaje", "Medallas","Dolares","Soles"],

  models: ref(null),
  pais: ["Ecuador", "Peru", "Paris", "Argentina", "Chile", "Bolivia"],
};
  },
}




const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "tipo",
    align: "center",
    label: "Tipo",
    field: "tipo",
    sortable: true,
  },
  {
    name: "stock",
    align: "center",
    label: "Stock",
    field: "stock",
    sortable: true,
  },
];
const rows = ref([]);

onMounted(async () => {
  rows.value = await getPremios();
});
</script>
