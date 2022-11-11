<template>
  <q-page padding>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              dense
              v-model="name"
              label="Ingrese su Nombre "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              dense
              v-model="apellido"
              label="Ingrese su Apellido "
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Apellido',
              ]"
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
                (val) => (val !== null && val !== '') || 'Please type your age',
                (val) => (val > 1 && val < 80) || 'Por favor selecione su edad',
              ]"
            />

            <q-select
              filled
              dense
              v-model="model"
              :options="options"
              style="width: 47%"
              label="Seleccione sexo "
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              ref="inputRef"
              filled
              dense
              v-model="model9"
              label="Ingrese su DNI"
              style="width: 47%"
              :rules="[(val) => val.length <= 8 || 'Por favor ingrse su DNI']"
            />

            <q-input
              filled
              dense
              v-model="nacionalidad"
              label="Ingrese su Nacionalidad "
              style="width: 47%"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su Nacionalidad',
              ]"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              dense
              standout
              v-model="email"
              type="email"
              prefix="Email:"
              suffix="@gmail.com"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
          </div>

          <q-input
            v-model="direccion"
            filled
            type="Direccion"
            hint="Direccion"
            style="width: 47%"
          />
          <q-icon
            name="fa-light fa-location-dot"
            @click="text = ''"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Por favor ingrese su Direccion',
            ]"
          />
        </div>
        <br />
        <div class="row justify-between q-gutter-md">
          <q-input
            filled
            dense
            v-model="phone"
            label="N° Celular"
            mask="(+##) ### - ###- ###"
            hint="Mask: (+##) ### - ###-###"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Por N°Celular',
              (val) =>
                (val > 0 && val < 100) || 'Por favor ingrese su N°Celular',
            ]"
          />

          <q-input
            ref="inputRef"
            filled
            v-model="model"
            label="Ingrese su Cod.Postal"
            style="width: 47%"
            :rules="[
              (val) => val.length <= 8 || 'Por favor ingrese su Cod.Postal',
            ]"
          />
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
              (val) => (val && val.length > 0) || 'Por favor ingrese su Ciudad',
            ]"
          />
        </div>

        <div>
          <q-btn label="Enviar" type="submit" color="info" />
          <q-btn
            label="Restablecer"
            type="reset"
            color="negative"
            flat
            class="q-ml-sm"
          />
          <br />
        </div>
        <br />
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn dense color="primary" label="Crear" />
        <q-btn dense color="secondary" label="Leer " />
        <q-btn dense color="amber" label="Actualizar" />
        <q-btn dense color="red" label="Borrar" />
      </div>
    </q-form>
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
import { useQuasar } from "quasar";

import { ref, onMounted,computed } from "vue";
import { getPerfiles,getPaises } from "../services";

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
    name: "apellido",
    align: "center",
    label: "Apellido",
    field: "apellido",
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
    name: "pais",
    align: "center",
    label: "Pais",
    field: "pais",
    sortable: true,
  },
  {
    name: "ciudad",
    align: "center",
    label: "Ciudad",
    field: "ciudad",
    sortable: true,
  },
  {
    name: "dni",
    align: "center",
    label: "Dni",
    field: "dni",
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
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "direccion",
    align: "center",
    label: "Direccion",
    field: "direccion",
    sortable: true,
  },
  {
    name: "celular",
    align: "center",
    label: "Celular",
    field: "celular",
    sortable: true,
  },
  {
    name: "codigo_postal",
    align: "center",
    label: "Codigo-Postal",
    field: "codigo_postal",
    sortable: true,
  },
  {
    name: "id_usuarios",
    align: "center",
    label: "Nombre-Usuarios",
    field: "nombre_usuarios",
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
  rows.value = await getPerfiles();
  paises.value = await getPaises();
});
</script>

<style>
.modelo {
  background-color: #11f8ff;
}
</style>
