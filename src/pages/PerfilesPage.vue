<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">
            <div>
              <label>Ingrese nombre <span class="text-red">*</span></label>
              <q-input
                filled
                dense
                v-model="perfil.nombre"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Nombre',
                ]"
                :onkeydown="onkeyDown"
              />
            </div>

            <div>
              <label>Ingrese apellido <span class="text-red">*</span></label>
              <q-input
                filled
                dense
                v-model="perfil.apellido"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Apellido',
                ]"
                :onkeydown="onkeyDown"
              />
            </div>

            <div>
              <label>Selecione Edad <span class="text-red">*</span></label>
              <q-input
                filled
                dense
                type="number"
                v-model="perfil.edad"
                :rules="[
                  (val) =>
                    (val && val.length > 0 && val >= 18) || 'Edad incorrecta',
                  'Edad correcta',
                ]"
              />
            </div>
          </div>

          <div class="row justify-between q-gutter-md">
            <div>
              <label>Selecione sexo <span class="text-red">*</span></label>

              <q-select filled dense v-model="perfil.sexo" :options="sexos" />
            </div>

            <div>
              <label>Selecione su pais <span class="text-red">*</span></label>
              <q-select
                filled
                v-model="perfil.nombre_paises"
                dense
                :options="paises"
                map-options
                emit-value
                option-value="country"
                option-label="country"
              />
            </div>

            <div>
              <label>Selecione su ciudad <span class="text-red">*</span></label>
              <q-select
                filled
                dense
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="perfil.nombre_ciudades"
                :options="ciudades"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su Ciudad',
                ]"
                :disable="!ciudades || !ciudades.length"
              />
            </div>

            <div>
              <label>Ingrese su DNI <span class="text-red">*</span></label>
              <q-input
                ref="inputRef"
                filled
                dense
                v-model="perfil.dni"
                :rules="[(val) => val.length <= 8 || 'Por favor ingrse su DNI']"
                mask="########"
              />
            </div>
          </div>
          <br />
          <div class="row justify-between q-gutter-md"></div>

          <div class="row justify-between q-gutter-md">
            <div>
              <label
                >Ingrese su Nacionalidad <span class="text-red">*</span></label
              >

              <q-input
                filled
                dense
                v-model="perfil.nacionalidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Nacionalidad',
                ]"
                :onkeydown="onkeyDown"
              />
            </div>

            <div>
              <label>Ingrese su email <span class="text-red">*</span></label>
              <q-input dense standout v-model="email" type="email">
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </div>

            <div>
              <label
                >Ingrese su direccion <span class="text-red">*</span></label
              >
              <q-input
                dense
                standout
                bottom-slots
                v-model="perfil.direccion"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su direccion ',
                ]"
              />
            </div>
          </div>

          <div class="row justify-between q-gutter-md">
            <div>
              <label
                >Ingrese su N° Celular <span class="text-red">*</span></label
              >
              <q-input
                filled
                dense
                v-model="perfil.celular"
                mask=" ### - ###- ###"
              />
            </div>

            <div>
              <label
                >Ingrese su Cod.Postal <span class="text-red">*</span></label
              >
              <q-input
                filled
                dense
                v-model="perfil.codigo_postal"
                mask=" #####"
                :rules="[
                  (val) => val.length <= 5 || 'Por favor ingrese su Cod.Postal',
                ]"
              />
            </div>

            <!----<div>
              <label
                >Seleccione Nombre usuarios
                <span class="text-red">*</span></label
              >

              <q-select
                filled
                v-model="perfil.id_usuarios"
                map-options
                emit-value
                option-value="id"
                option-label="usuario"
                :options="usuarios"
                dense
                lazy-rules
              />
            </div>-->
          </div>
        </div>
      </div>
      <br />

      <div class="col-6 q-gutter-md text-center items-center">
        <q-btn
          dense
          color="primary"
          label="Crear"
          type="submit"
          icon="fa-solid fa-folder-plus"
        
        />
        <q-btn
          dense
          color="amber"
          label="Editar"
          @click="Actualizar"
          icon="fa-solid fa-pen-to-square"
          :disable="botonbloqueoactualizar"
        />
        <q-btn
          dense
          color="red"
          label="Borrar"
          @click="Delete"
          icon="fa-solid fa-trash-can"
          :disable="botonbloqueoeliminar"
        />
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
import {
  getPerfiles,
  getPaises,
  crearPerfiles,
  getUsuarios,
  updatePerfiles,
  deletePerfiles,
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
];
const selected = ref([]);
const rows = ref([]);
const paises = ref([]);
const usuarios = ref([]);
const email = ref([]);

const sexos = ["Femenino", "Masculino"];
const perfil = reactive({
  nombre: null,
  apellido: null,
  edad: null,
  sexo: null,
  dni: null,
  nacionalidad: null,
  email: null,
  direccion: null,
  celular: null,
  codigo_postal: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  await crearPerfiles(perfil);
   Object.assign(perfil, {
    nombre: null,
  apellido: null,
  edad: null,
  sexo: null,
  dni: null,
  nacionalidad: null,
  email: null,
  direccion: null,
  celular: null,
  codigo_postal: null,
  nombre_paises: null,
  nombre_ciudades: null,
  });
}

async function Actualizar() {
  await updatePerfiles(perfil);
  Object.assign(perfil, {
    nombre: null,
    apellido: null,
    edad: null,
    sexo: null,
    dni: null,
    nacionalidad: null,
    email: null,
    direccion: null,
    celular: null,
    codigo_postal: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

async function Delete() {
  await deletePerfiles(perfil);
  Object.assign(perfil, {
    nombre: null,
    apellido: null,
    edad: null,
    sexo: null,
    dni: null,
    nacionalidad: null,
    email: null,
    direccion: null,
    celular: null,
    codigo_postal: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
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
    dni: null,
    nacionalidad: null,
    email: null,
    direccion: null,
    celular: null,
    codigo_postal: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(perfil, rowSelected);
}

function onkeyDown(evt) {
  if (
    (evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
}

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(perfil).every((key) => perfil[key] && perfil[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>

<style>
/*.modelo {
  background-color: #11f8ff;
}*/
</style>
