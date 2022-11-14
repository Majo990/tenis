<template>
  <q-page padding>
    <strong>Formulario </strong>
    <div class="q-pa-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="name"
                label="Ingrese el Nombre-Jugador "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su NombreJugador',
                ]"
                style="width: 47%"
              />

              <q-input
                filled
                v-model="nacionalidad"
                label="Ingrese su Nacionalidad"
                lazy-rules
                dense
                style="width: 47%"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Nacionalidad',
                ]"
              />
            </div>
            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="models"
                dense
                :options="pais"
                style="width: 47%"
                label="Seleccione su Nombre Entrenador "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su pais',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su pais',
                ]"
              />

              <q-input
                filled
                type="number"
                v-model="age"
                dense
                label="Selecione Edad"
                style="width: 47%"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your age',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione su edad',
                ]"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="sexo"
                :options="sexo"
                dense
                style="width: 348px"
                label="Seleccione sexo "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su sexo',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione su sexo',
                ]"
              />

              <q-select
                filled
                v-model="model"
                :options="options"
                style="width: 348px"
                label="Seleccione Arbitros "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su arbitro',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione arbitro',
                ]"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="model"
                :options="options"
                style="width: 348px"
                label="Seleccione equipos "
                dense
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su equipos',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione su equipos',
                ]"
              />
              <q-select
                filled
                v-model="model"
                :options="options"
                dense
                style="width: 348px"
                label="Seleccione torneos "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su torneos',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione su torneos',
                ]"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                v-model="model"
                dense
                :options="options"
                style="width: 348px"
                label="Seleccione NombreSancion "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su nombresancion',
                  (val) =>
                    (val > 1 && val < 80) ||
                    'Por favor selecione su nombre-sancion',
                ]"
              />
              <q-input
                filled
                v-model="price"
                style="width: 47%"
                label="Ingrese su Altura"
                mask="#.##"
                fill-mask="0"
                reverse-fill-mask
                input-class="text-right"
                suffix="m"
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your age',
                  (val) => (val > 1 && val < 80) || 'Por favor ingrese altura',
                ]"
              ></q-input>
            </div>

            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="price"
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
                    (val !== null && val !== '') || 'Por favor ingrese su peso',
                  (val) => (val > 1 && val < 80) || 'Por favor ingrese su peso',
                ]"
              >
              </q-input>
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
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Ciudad',
                ]"
              />

              <q-input
                filled
                v-model="name"
                dense
                label="Ingrese posicion "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su posicion',
                ]"
                style="width: 47%"
              />
            </div>

            <!---    <div class="row justify-between q-gutter-md">
                <q-input
                  ref="inputRef"
                  filled
                  v-model="model9"
                  label="Ingrese su DNI"
                  style="width: 47%"
                  :rules="[
                    (val) => val.length <= 8 || 'Por favor ingrse su DNI',
                  ]"
                />
        -->
            <br />

            <div class="col-6 q-gutter-md text-center items-center">
              <q-btn dense color="primary" label="Crear" />
              <q-btn dense color="secondary" label="Leer " />
              <q-btn dense color="amber" label="Actualizar" />
              <q-btn dense color="red" label="Borrar" />

              <br />
            </div>
            <br />
            <q-table
              dense
              :rows="rows"
              :columns="columns"
              row-key="name"
              separator="cell"
            />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getJugadores, getPaises } from "../services";

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
    name: "nacionalidad",
    align: "center",
    label: "Nacionalidad",
    field: "nacionalidad",
    sortable: true,
  },
  {
    name: "id_entrenadores",
    align: "center",
    label: "Entrenador",
    field: "nombre_entrenador",
    sortable: true,
  },
  {
    name: "sejuego",
    align: "center",
    label: "Sejuego",
    field: "sejuego",
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
    name: "id_arbitros",
    align: "center",
    label: "Arbitro",
    field: "nombre_arbitro",
    sortable: true,
  },
  {
    name: "id_equipos",
    align: "center",
    label: "Equipo",
    field: "nombre_equipos",
    sortable: true,
  },
  {
    name: "id_torneo",
    align: "center",
    label: "Torneo",
    field: "nombre_torneo",
    sortable: true,
  },
  {
    name: "id_sanciones",
    align: "center",
    label: "Sancion",
    field: "nombre_sanciones",
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
    label: "Peso",
    field: "Peso",
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
  {
    name: "posicion",
    align: "center",
    label: "Posicon",
    field: "posicion",
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
  rows.value = await getJugadores();
  paises.value = await getPaises();
});
</script>
