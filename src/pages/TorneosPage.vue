<template>
  <q-page padding>
    <strong>Formulario </strong>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
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
            v-model="torneo.id_estadios"
            dense
            map-options
            emit-value
            option-value="id"
            option-label="nombre"
            :options="estadio"
            style="width: 348px"
            label="Seleccione el Estadio "
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor seleccione su estadio',
              (val) =>
                (val > 1 && val < 80) || 'Por favor selecione su estadio',
            ]"
          />
        </div>

        <div class="row justify-between q-gutter-md">
          <q-input
            filled
            dense
            v-model="torneo.nombre"
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
            v-model="torneo.nombre_paises"
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
            v-model="torneo.nombre_ciudades"
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
        <q-btn dense color="primary" label="Crear" type="submit" />
        <q-btn dense color="amber" label="Actualizar" />
        <q-btn dense color="red" label="Borrar" />
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
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import { getTorneos, getPaises, getEstadios, crearTorneos } from "../services";

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

const estadio=ref([]);
const rows = ref([]);
const paises = ref([]);
const date = ref("2020/02/01");

const torneo = reactive({
  fecha: null,
  id_estadios: null,
  nombre: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  await crearTorneos(torneo);
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === torneo.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getTorneos();
  paises.value = await getPaises();
  estadio.value = await getEstadios();
});

function handleSelection(details) {
  let rowSelected = {
    fecha: null,
    id_estadios: null,
    nombre: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }
  Object.assign(torneo, rowSelected);
}
</script>
