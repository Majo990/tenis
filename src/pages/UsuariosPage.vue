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
              :onkeydown="onkeyDown"
            />
          </div>

          <div>
            <label>Ingrese su contraseña <span class="text-red">*</span></label>
            <q-input
              dense
              v-model="usuario.contrasenia"
              filled
              type="password"

            />
          </div>

          <div>
            <label
              >Verifique su contraseña <span class="text-red">*</span></label
            >
            <q-input
              v-model="usuario.contrasenia"
              filled
              dense
              :type="isPwd ? 'password' : 'text'"

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

          <div class="col-6 q-gutter-md text-center items-center">
            <q-btn
              dense
              color="primary"
              label="Crear"
              type="submit"
              icon="fa-solid fa-folder-plus"
              :disable="botonbloqueocrear"
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
        </div>
      </q-form>
    </div>
  </div>
  

</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import {
  crearUsuarios,
  getUsuarios,
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
];

const selected = ref([]);
const rows = ref([]);
const isPwd = ref([]);

const usuario = reactive({
  usuarios: null,
  contrasenia: null,
});

async function onSubmit() {
  await crearUsuarios(usuario);
  Object.assign(usuario, {
    usuario: null,
  });
}

async function Actualizar() {
  await updateUsuarios(usuario);
  Object.assign(usuario, {
    usuario: null,
  });
}

async function Delete() {
  await deleteUsuarios(usuario);

  Object.assign(usuario, {
    usuario: null,
  });
}

onMounted(async () => {
  rows.value = await getUsuarios();
});

function handleSelection(details) {
  let rowSelected = {
    usuarios: null,
    contrasenia: null,
  };
  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;

  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
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

const botonbloqueocrear = computed(() => {
  if (
    Object.keys(usuario).every((key) => usuario[key] && usuario[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>

<style lang="scss">
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
