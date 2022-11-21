<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              dense
              v-model="perfil.nombre"
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
              v-model="perfil.apellido"
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
              v-model="perfil.edad"
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
              v-model="perfil.sexo"
              :options="sexos"
              style="width: 47%"
              label="Seleccione sexo "
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-select
              filled
              v-model="perfil.nombre_paises"
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
              map-options
              emit-value
              option-value="id"
              option-label="nombre"
              v-model="perfil.nombre_ciudades"
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

          <div class="row justify-between q-gutter-md">
            <q-input
              ref="inputRef"
              filled
              dense
              v-model="perfil.dni"
              label="Ingrese su DNI"
              style="width: 47%"
              :rules="[(val) => val.length <= 8 || 'Por favor ingrse su DNI']"
            />

            <q-input
              filled
              dense
              v-model="perfil.nacionalidad"
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
              v-model="perfil.email"
              type="email"
              prefix="Email:"
              suffix="@gmail.com"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
            <q-input
              dense
              standout
              bottom-slots
              v-model="perfil.direccion"
              label="Ingrese su direccion"
              style="width: 47%"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su direccion ',
              ]"
            />
            <q-input
              filled
              dense
              v-model="perfil.celular"
              label="N° Celular"
              mask="(+##) ### - ###- ###"
              style="width: 47%"
            />
            <q-input
              filled
              dense
              v-model="perfil.codigo_postal"
              label="Ingrese su Cod.Postal"
              style="width: 47%"
              :rules="[
                (val) => val.length <= 8 || 'Por favor ingrese su Cod.Postal',
              ]"
            />

            <q-input
              filled
              dense
              map-options
              emit-value
              option-value="id"
              option-label="usuarios"
              v-model="perfil.id_usuarios"
              label="Ingrese su Nombre usuario "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor ingrese su Nombre usuario',
              ]"
              style="width: 47%"
            />
          </div>
        </div>
      </div>
      <br />

      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn
          label="Restablecer"
          type="reset"
          color="negative"
          flat
          class="q-ml-sm"
        />
        <q-btn dense color="primary" label="Crear" type="submit"  />
        <q-btn dense color="amber" label="Actualizar" />
        <q-btn dense color="red" label="Borrar" />
      </div>
    </q-form>
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
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {
  getPerfiles,
  getPaises,
  crearPerfiles,
  getUsuarios,
} from "../services";

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
const selected = ref([]);
const rows = ref([]);
const paises = ref([]);
const usuarios=ref([]);

const sexos = ["Femenino", "Masculino"];
const perfil = reactive({
  nombre: null,
  apellido: null,
  edad: null,
  sexo: null,
  pais: null,
  ciudad: null,
  dni: null,
  nacionalidad: null,
  email: null,
  direccion: null,
  celular: null,
  codigo_postal: null,
  id_usuarios: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  await crearPerfiles(perfil);
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === perfil.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getPerfiles();
  paises.value = await getPaises();
  usuarios.value = await getUsuarios();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    apellido: null,
    edad: null,
    sexo: null,
    pais: null,
    ciudad: null,
    dni: null,
    nacionalidad: null,
    email: null,
    direccion: null,
    celular: null,
    codigo_postal: null,
    id_usuarios: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(perfil, rowSelected);
}
</script>

<style>
.modelo {
  background-color: #11f8ff;
}
</style>
