<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>

      <div class="row justify-between q-gutter-md">
        <q-input
          dense
          filled
          v-model="date"
          mask="date"
          :rules="['date']"
          style="width: 47%"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-select
          filled
          v-model="model"
          dense
          :options="options"
          style="width: 47%"
          label="Seleccione su Estadios "
        />
      </div>

      <div class="row justify-between q-gutter-md">
        <q-input
          filled
          dense
          v-model="nombrearbitro"
          label="Ingrese su Nombre  Torneo "
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Por favor ingrese el Nombre Torneo',
          ]"
          style="width: 47%"
        />

        <q-select
          filled
          v-model="pais"
          dense
          :options="paises"
          map-options
          emit-value
          option-value="country"
          option-label="country"
          label="Seleccione su Pais"
          style="width: 47%"
        />
      </div>

      <div class="row justify-between q-gutter-md">
        <q-select
          filled
          dense
          v-model="ciudad"
          :options="ciudades"
          label="Ingrese su  Ciudad"
          style="width: 47%"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor ingrese su Ciudad',
          ]"
        />
      </div>
    </div>

    <br />

    <div class="col-6 q-gutter-md text-center items-center">
      <q-btn dense color="primary" label="Crear" />

      <q-btn dense color="amber" label="Actualizar" />
      <q-btn dense color="red" label="Borrar" />
    </div>

    <br />
    <q-table
      dense
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted,computed } from "vue";
import { getTorneos ,getPaises} from "../services";

const date = ref("2020/02/01");

const columns = [
  {
    name: "fecha",
    align: "center",
    label: "Fecha",
    field: "fecha",
    sortable: true,
  },
  {
    name: "id_estadios",
    align: "center",
    label: "Nombre-Estadios",
    field: "nombre_estadios",
    sortable: true,
  },
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },

  {
    name: "pais",
    align: "center",
    label: "pais",
    field: "pais",
    sortable: true,
  },
  {
    name: "ciudad",
    align: "center",
    label: "ciudad",
    field: "ciudad",
    sortable: true,
  },
];

const rows = ref([]);
const paises = ref([]);
const pais = ref([]);
const ciudad = ref([]);

const ciudades = computed(
  () => paises.value.find((p) => p.country === pais.value)?.cities
);


onMounted(async () => {
  rows.value = await getTorneos();
  paises.value = await getPaises();
});
</script>
