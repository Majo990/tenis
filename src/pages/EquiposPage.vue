<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              dense
              v-model="nombre"
              label="Ingrese su Nombre "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 47%"
            />

            <q-input dense filled v-model="date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              dense
              v-model="model"
              :options="options"
              style="width: 47%"
              label="Seleccione Nombre Jugadores "
            />

            <q-select
              filled
              v-model="model"
              dense
              :options="options"
              style="width: 47%"
              label="Seleccione Nombre Entrenadores "
            />
          </div>
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="descripcion"
              label="Ingrese su Simbolo"
              lazy-rules
              dense
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Simbolo',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              dense
              v-model="descripcion"
              label="Ingrese su Indumentaria_Uniforme"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su IndumentariaUniforme',
              ]"
              style="width: 30%"
            />
          </div>
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              dense
              v-model="nombre"
              label="Ingrese su Presidente "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Presidente',
              ]"
              style="width: 47%"
            />

            <q-input
              dense
              filled
              v-model="descripcion"
              label="Ingrese su Apodo "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Apodos',
              ]"
            />
          </div>
        </div>

        <q-select
          filled
          dense
          v-model="model"
          :options="nombreestadios"
          style="width: 47%"
          label="Seleccione Nombre Estadios"
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

    <div class="col-6 q-gutter-md text-center items-center">
      <q-btn dense color="primary" label="Crear" />
      <q-btn dense color="secondary" label="Leer " />
      <q-btn dense color="amber" label="Actualizar" />
      <q-btn dense color="red" label="Borrar" />
    </div>
    <br />
    <q-table :rows="rows" :columns="columns" row-key="name" separator="cell" />
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getEquipos, getPaises } from "src/services";
import { useQuasar } from "quasar";

const $q = useQuasar();
const name = ref(null);
const age = ref(null);
const accept = ref(false);

const model = ref(null);

const date = ref("2019-02-01");

const nombreestadios = ref(null);
const options = ref(null);
const descripcion = ref(null);
const nombre = ref(null);
const text = ref(null);

function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
}

function onReset() {
  name.value = null;
  age.value = null;
  accept.value = false;
}

const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "fecha_fundo",
    align: "center",
    label: "Fecha-Fundo",
    field: "fecha_fundo",
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
    name: "id_entrenadores",
    align: "center",
    label: "Nombre-Entrenadores",
    field: "nombre_entrenadores",
    sortable: true,
  },
  {
    name: "descripcion",
    align: "center",
    label: "Descripcion",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "simbolo",
    align: "center",
    label: "Simbolo",
    field: "simbolo",
    sortable: true,
  },
  {
    name: "indumentaria_uniforme",
    align: "center",
    label: "Indumentaria-Uniforme",
    field: "indumentaria_uniforme",
    sortable: true,
  },
  {
    name: "presidente",
    align: "center",
    label: "Presidente",
    field: "presidente",
    sortable: true,
  },
  {
    name: "apodos",
    align: "center",
    label: "Apodos",
    field: "apodos",
    sortable: true,
  },
  {
    name: "id_estadios",
    align: "center",
    label: "Nombre_estadios",
    field: "nombre_estadios",
    sortable: true,
  },
  {
    name: "id_paises",
    align: "center",
    label: "Nombre-Paises",
    field: "nombre_paises",
    sortable: true,
  },
  {
    name: "id_ciudades",
    align: "center",
    label: "Nombre-Ciudades",
    field: "nombre_ciudades",
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
  //rows.value = await getEquipos();
  //paises.value = await getPaises();
});
</script>
<style>
.q-table {
  color: grey;
  background-color: #1ddf8e;
}
</style>
