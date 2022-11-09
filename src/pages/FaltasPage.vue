<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Ingrese su Nombre "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 43%"
            />
          </div>
        </div>
      </div>

      <div class="row justify-between q-gutter-md">
        <div class="q-pa-md" style="max-width: 50%">
          <q-input
            filled
            v-model="fecha"
            mask="date"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor ingrese su Nombre',
            ]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="fecha">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn color="primary" label="Crear" />
        <q-btn color="secondary" label="Leer " />
        <q-btn color="amber" label="Actualizar" />
        <q-btn color="red" label="Borrar" />
      </div>
      <br />
      <q-table :rows="rows" :columns="columns" row-key="name"   separator="cell"/>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFaltas } from "../services";

const columns = [
  {
    name: "nro",
    required: true,
    label: "Nro",
    align: "left",
    field: "nro",
    sortable: true,
  },
  {
    name: "fecha_hora",
    align: "center",
    label: "Fecha-Hora",
    field: "fecha_hora",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "id_arbitros",
    align: "center",
    label: "Nombre-Arbitros",
    field: "nombre_arbitros",
    sortable: true,
  },
  {
    name: "id_historial_partidas",
    align: "center",
    label: "Nombre-Historial-Partidas",
    field: "nombre_historial_partidas",
    sortable: true,
  },
  {
    name: "id_partidas",
    align: "center",
    label: "Nombre-Partidas",
    field: "nombre_partidas",
    sortable: true,
  },
];

const fecha = ref(null);

const rows = ref([]);

onMounted(async () => {
  rows.value = await getFaltas();
});
</script>
<style>
.q-table {
  color: rgba(128, 128, 128, 0.993);
  background-color: #f3abe7;
}
</style>
