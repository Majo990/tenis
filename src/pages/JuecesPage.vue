<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>

      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="nombre"
              label="Ingrese el Nombre Juez "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre Juez',
              ]"
              style="width: 47%"
            />

            <q-input
                filled
                v-model="nombrearbitro"
                label="Ingrese su Apellido "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Apellido',
                ]"
                style="width: 47%"
              />
            </div>
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                type="number"
                v-model="age"
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
                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  style="width: 348px"
                  label="Seleccione sexo "
                  lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor seleccione su sexo',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor selecione su sexo',
                ]"
                />
              <!-- <div  class="q-pa-md" style="max-width: 300px">-->

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
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your age',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor ingrese altura',
                ]"
                    ></q-input>
                    <q-input
                      filled
                      v-model="price"
                      style="width: 47%"
                      label="Ingrese su Peso"
                      mask="#.##"
                      fill-mask="0"
                      reverse-fill-mask
                      input-class="text-right"
                      suffix="kg"
                      lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor ingrese su peso',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor ingrese su peso',
                ]"
                >
                    </q-input>


                <!----<q-input
                  standout
                  v-model="email"
                  type="email"
                  prefix="Email:"
                  suffix="@gmail.com"
                  lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor seleccione su email',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor ingrese su email',
                ]"
                >
                  <template v-slot:prepend>
                     <q-icon name="mail" /
                  </template>
                </q-input>-->
              </div>
              <div class="row justify-between q-gutter-md">
                <q-input
                  v-model="date"
                  filled
                  type="date"
                  style="width: 47%"
                  hint="seleccione Fecha Nacimiento"
                  lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor seleccione su Fecha',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su Fecha',
                ]"
                />

                <q-select
                  filled
                  v-model="models"
                  :options="pais"
                  style="width: 47%"
                  label="Seleccione su Pais "
                  lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor seleccione su pais',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su pais',
                ]"
                />
              </div>

            <div class="row justify-between q-gutter-md">
                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  style="width: 47%"
                  label="Seleccione su Ciudades "
                  lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Por favor seleccione su ciudad',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su ciudad',
                ]"
                />

          </div>
        </div>
      </div>
      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn color="primary" label="Crear" />
        <q-btn color="secondary" label="Leer " />
        <q-btn color="amber" label="Actualizar" />
        <q-btn color="red" label="Borrar" />
      </div>
      <br />

      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="cell"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getJueces } from "../services";
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    format: "nombre",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellido",
    required: true,
    label: "Apellido",
    align: "left",
    format: "apellido",
    field: "apellido",
    sortable: true,
  },
  {
    name: "fecha_nacimiento",
    required: true,
    label: "Fecha-Nacimiento",
    align: "left",
    format: "fecha_nacimiento",
    field: "fecha_nacimiento",
    sortable: true,
  },
  {
    name: "edad",
    required: true,
    label: "Edad",
    align: "left",
    format: "edad",
    field: "edad",
    sortable: true,
  },
  {
    name: "sexo",
    required: true,
    label: "Sexo",
    align: "left",
    format: "sexo",
    field: "sexo",
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

onMounted(async () => {
  rows.value = await getJueces();
});
</script>
