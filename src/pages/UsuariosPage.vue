<template>
  <div class="q-pa-md">
    <div class="marco">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <strong>Formulario </strong>
        <div class="q-gutter-md row items-start">
          <div>
            <label>Ingrese su Usuario <span class="text-red">*</span></label>
            <q-input
              dense
              v-model="usuario.usuarios"
              filled
              type="usuario"
              hint="Usuario"
              :onkeydown="onkeyDown"
            />
          </div>

          <div>
            <label>Ingrese su contraseña <span class="text-red">*</span></label>
            <q-input
              dense
              v-model="usuario.contraseña"
              filled
              type="password"
              hint="Password"
            />
          </div>

          <div>
            <label
              >Verifique su contraseña <span class="text-red">*</span></label
            >
            <q-input
              v-model="usuario.contraseña"
              filled
              dense
              :type="isPwd ? 'password' : 'text'"
              hint="Password with toggle"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <div>
            <label>Seleccion su rol <span class="text-red"></span></label>
            <q-select
              filled
              v-model="usuario.id_roles"
              emit-value
              option-value="id"
              option-label="descripcion"
              :options="rol"
              dense
              lazy-rules
            />
          </div>


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
      />
      <q-btn
        dense
        color="red"
        label="Borrar"
        @click="Delete"
        icon="fa-solid fa-trash-can"
      />
    </div>




        </div>
      </q-form>
    </div>
  </div>



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


</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  crearUsuarios,
  getUsuarios,
  getRoles,
  updateUsuarios,
  deleteUsuarios,
} from "../services";
const columns = [
  {
    name: "usuarios",
    required: true,
    label: "Usuarios",
    align: "center",
    field: "usuarios",
    sortable: true,
  },
  {
    name: "id_roles",
    align: "center",
    label: "Descripcion-Roles",
    field: "descripcion",
    sortable: true,
  },
];

const selected = ref([]);
const rows = ref([]);
const rol = ref([]);
const isPwd = ref([]);

const usuario = reactive({
  usuarios: null,
  contraseña: null,
  id_roles: null,
});

async function onSubmit() {
  await crearUsuarios(usuario);
}

async function Actualizar() {
  await updateUsuarios(usuario);
}

async function Delete() {
  await deleteUsuarios(usuario);
}

onMounted(async () => {
  rows.value = await getUsuarios();
  roles.value = await getRoles();
});

function handleSelection(details) {
  let rowSelected = {
    usuarios: null,
    contraseña: null,
    id_roles: null,
  };

  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(usuario, rowSelected);
}

function onkeyDown(evt) {
  if (
    (evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
}
</script>

<style  lang="scss">
h3 {
  color: rgb(28, 234, 241);
  -webkit-text-stroke: 1.5px rgb(198, 11, 245);
}
.q-gutter-md items-start {
  color: beige;
}

.marco {
  border-style: solid;
  border-radius: 5%;
  border-width: 1px;
  padding: 30px;
  padding-right: 150px;
  height: 50%;
  max-width: 54%;
}
</style>
