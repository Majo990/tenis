<template>
  <div class="q-pa-md">
    <q-page padding>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="q-pa-md">
          <strong>Formulario </strong>
          <div class="row">
            <div class="col-6">
              <div class="row justify-between q-gutter-md">
                <q-input
                  filled
                  dense
                  v-model="nombrearbitro"
                  label="Ingrese su Nombre arbitro "
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su NombreArbitr',
                  ]"
                  style="width: 47%"
                />
                <q-input
                  dense
                  filled
                  v-model="apellidoarbitro"
                  label="Ingrese su Apellido "
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Apellido',
                  ]"
                  style="width: 47%"
                />
              </div>
              <div class="row justify-between q-gutter-md">
                <q-input
                  filled
                  dense
                  type="number"
                  v-model="age"
                  label="Selecione Edad"
                  style="width: 47%"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') || 'Por favor ingrese edad',
                    (val) =>
                      (val > 1 && val < 80) || 'Por favor selecione su edad',
                  ]"
                />

                <!-- <div  class="q-pa-md" style="max-width: 300px">-->

                <q-input
                  filled
                  v-model="altura"
                  style="width: 47%"
                  label="Ingrese su Altura"
                  mask="#.##"
                  fill-mask="0"
                  dense
                  reverse-fill-mask
                  input-class="text-right"
                  suffix="m"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Por favor ingrese altura',
                    (val) =>
                      (val > 1 && val < 80) || 'Por favor ingrese altura',
                  ]"
                ></q-input>
              </div>
              <div class="row justify-between q-gutter-md">
                <q-input
                  filled
                  v-model="peso"
                  style="width: 47%"
                  label="Ingrese su Peso"
                  mask="#.##"
                  dense
                  fill-mask="0"
                  reverse-fill-mask
                  input-class="text-right"
                  suffix="kg"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Por favor ingrese su peso',
                    (val) =>
                      (val > 1 && val < 80) || 'Por favor ingrese su peso',
                  ]"
                >
                </q-input>
                <q-input
                  filled
                  v-model="date"
                  mask="date"
                  dense
                  :rules="['date']"
                  style="width: 47%"
                  lazy-rules
                  label="Ingrese su Fecha Nacimiento"
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
                  v-model="pais"
                  dense
                  :options="paises"
                  map-options
                  emit-value
                  option-value="country"
                  option-label="country"
                  label="Seleccione su Pais"
                  style="width: 47%"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor seleccione su pais',
                  ]"
                />

                <q-select
                  filled
                  dense
                  v-model="ciudad"
                  :options="ciudades"
                  label="Ingrese su  Ciudad"
                  style="width: 47%"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor ingrese su Ciudad',
                  ]"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn dense color="primary" label="Crear" type="submit" />
          <q-btn dense color="secondary" label="Leer " />
          <q-btn dense color="amber" label="Actualizar" />
          <q-btn dense color="red" label="Borrar" />
        </div>
        <br />
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          separator="cell"
          dense
        />
      </q-form>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getArbitros, getPaises, crearArbitros } from "../services";
import { useQuasar } from "quasar";

// import { ref } from "vue";

// eslint-disable-next-line vue/no-export-in-script-setup

// eslint-disable-next-line vue/no-export-in-script-setup

const $q = useQuasar();
const name = ref(null);
const age = ref(null);
const accept = ref(false);

const date = ref("2019-02-01");

const altura = ref(null);
const peso = ref(null);
const nombrearbitro = ref(null);
const apellidoarbitro = ref(null);
const sexo = ref(null);


async function onSubmit() {
  await crearArbitros({
    nombre: name.value,
    apellido: apellidoarbitro.value,
    edad: age.value,
    sexo: sexo.value,
    altura: altura.value,
    peso: peso.value,
    fecha_nacimiento: date.value,
    nombre_paises:pais.value,
    nombre_ciudades: ciudad.value,
  });
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
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellido",
    align: "center",
    label: "Apellido",
    field: "apellido_arbitros",
    sortable: true,
  },
  {
    name: "edad",
    align: "center",
    label: "Edad",
    field: "edad",
    sortable: true,
  },
  {
    name: "sexo",
    align: "center",
    label: "Sexo",
    field: "sexo",
    sortable: true,
  },
  {
    name: "altura",
    align: "center",
    label: "Altura",
    field: "altura",
    sortable: true,
  },
  {
    name: "peso",
    align: "center",
    label: "peso",
    field: "Peso",
    sortable: true,
  },
  {
    name: "fecha_nacimiento",
    align: "center",
    label: "Fecha_Nacimiento",
    field: "fecha_nacimiento",
    sortable: true,
  },
  {
    name: "nombre_paises",
    align: "center",
    label: "Nombre-Paises",
    field: "nombre_paises",
    sortable: true,
  },
  {
    name: "nombre_ciudades",
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
  rows.value = await getArbitros();
  paises.value = await getPaises();
});
</script>
<style></style>
