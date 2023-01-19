<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese nombre equipo <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  v-model="equipo.nombre"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor ingrese su Nombre',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>

              <div>
                <label
                  >Ingrese fecha equipos <span class="text-red">*</span></label
                >

                <q-input
                  filled
                  dense
                  v-model="equipo.fecha_fundo"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="equipo.fecha_fundo">
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

        <!-----      <div>
                <label
                  >Seleccione nombre Jugadores
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="equipo.id_jugadores"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="jugadores"
                  dense
                  lazy-rules
                />
              </div>-->


            </div>
            <div class="col-6"></div>

            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione entrenadores
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="equipo.id_entrenadores"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="entrenadores"
                  dense
                  lazy-rules
                />
              </div>

              <div>
                <label
                  >Ingrese su descripcion <span class="text-red">*</span></label
                >
                <q-input
                  v-model="equipo.descripcion"
                  filled
                  autogrow
                  dense
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese descripcion arbitro',
                  ]"
                />
              </div>

              <div>
                <label
                  >Seleccione su img del equipo
                  <span class="text-red">*</span></label
                >
                <q-file
                  dense
                  @update:model-value="updateSimbolo"
                  v-model="simbolo"
                  filled
                  accept=".png, .jpg, .gif, .tiff, .jpeg image/*"
                />
              </div>
            </div>
            <br />
            <div class="row justify-between q-gutter-md"></div>

            <div class="col-6"></div>
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese su uniforme equipo
                  <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  v-model="equipo.indumentaria_uniforme"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su IndumentariaUniforme',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>

              <div>
                <label>Ingrese su apodo <span class="text-red">*</span></label>
                <q-input
                  dense
                  filled
                  v-model="equipo.apodos"
                  :onkeydown="onkeyDown"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Por favor ingrese su Apodos',
                  ]"
                />
              </div>

              <div>
                <label
                  >Ingrese su presidente del equipo
                  <span class="text-red">*</span></label
                >

                <q-input
                  filled
                  dense
                  v-model="equipo.presidente"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Presidente',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>
            </div>

            <div class="col-6"></div>
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione nombre estadios
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="equipo.id_estadios"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="estadios"
                  dense
                  lazy-rules
                />
              </div>

              <div>
                <label>Seleccione su pais <span class="text-red"></span></label>

                <q-select
                  filled
                  v-model="equipo.nombre_paises"
                  dense
                  :options="paises"
                  map-options
                  emit-value
                  option-value="country"
                  option-label="country"
                />
              </div>

              <div>
                <label>Seleccione ciudad <span class="text-red"></span></label>
                <q-select
                  filled
                  dense
                  v-model="equipo.nombre_ciudades"
                  :options="ciudades"
                  :disable="!ciudades || !ciudades.length"
                />
              </div>
            </div>
<br/>
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
        </div>
      </div>
    </q-form>
    <q-table
      :rows="rows"
      :columns="columns"
      separator="cell"
      dense
      row-key="id"
      selection="single"
      v-model:selected="selected"
      @selection="handleSelection"
      :rows-per-page-options="[5,10,20,50,80,100]"
    >
      <template v-slot:body-cell-simbolo="props">
        <q-td :props="props">
          <q-img
            :src="`http://localhost:3000/img/${props.value}`"
            width="25px"
            height="25px"
          />
          <div class="my-table-details">
            {{ props.row.simbolo }}
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {
  getEquipos,
  getPaises,
  crearEquipos,
  updateEquipos,
  deleteEquipos,
  getJugadores,
  getEstadios,
  getEntrenadores,
} from "src/services";

import { date } from "quasar";

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
    name: "fecha_fundo",
    align: "center",
    label: "Fecha-Fundo",
    field: "fecha_fundo",
    format: (val, row) => date.formatDate(val, "DD/MM/YYYY"),
    sortable: true,
  },
  /*{
    name: "id_jugadores",
    align: "center",
    label: "Nombre-Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },*/
  {
    name: "id_entrenadores",
    align: "center",
    label: "Nombre-Entrenadores",
    field: "nombre_entrendores",
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
const jugadores = ref([]);
const entrenadores = ref([]);
const estadios = ref([]);
const simbolo = ref([]);
const selected = ref([]);

const equipo = reactive({
  nombre: null,
  fecha_fundo: null,
 // id_jugadores: null,
  id_entrenadores: null,
  descripcion: null,
  simbolo: null,
  indumentaria_uniforme: null,
  presidente: null,
  apodos: null,
  id_estadios: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  const datos = new FormData();
  datos.append("nombre", equipo.nombre);
  datos.append("fecha_fundo", equipo.fecha_fundo);
 // datos.append("id_jugadores", equipo.id_jugadores);
  datos.append("id_entrenadores", equipo.id_entrenadores);
  datos.append("descripcion", equipo.descripcion);
  datos.append("simbolo", equipo.simbolo);
  datos.append("indumentaria_uniforme", equipo.indumentaria_uniforme);
  datos.append("presidente", equipo.presidente);
  datos.append("apodos", equipo.apodos);
  datos.append("id_estadios", equipo.id_estadios);
  datos.append("nombre_paises", equipo.nombre_paises);
  datos.append("nombre_ciudades", equipo.nombre_ciudades);

  await crearEquipos(datos);
  Object.assign(equipo, {
    nombre: null,
    fecha_fundo: null,
  //  id_jugadores: null,
    id_entrenadores: null,
    descripcion: null,
    simbolo: null,
    indumentaria_uniforme: null,
    presidente: null,
    apodos: null,
    id_estadios: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

async function Actualizar() {
  const datos = new FormData();
  datos.append("nombre", equipo.nombre);
  datos.append("fecha_fundo", equipo.fecha_fundo);
  //datos.append("id_jugadores", equipo.id_jugadores);
  datos.append("id_entrenadores", equipo.id_entrenadores);
  datos.append("descripcion", equipo.descripcion);
  datos.append("simbolo", equipo.simbolo);
  datos.append("indumentaria_uniforme", equipo.indumentaria_uniforme);
  datos.append("presidente", equipo.presidente);
  datos.append("apodos", equipo.apodos);
  datos.append("id_estadios", equipo.id_estadios);
  datos.append("nombre_paises", equipo.nombre_paises);
  datos.append("nombre_ciudades", equipo.nombre_ciudades);

  await updateEquipos({ id: equipo.id, datos });
  Object.assign(equipo, {
    nombre: null,
    fecha_fundo: null,
    //id_jugadores: null,
    id_entrenadores: null,
    descripcion: null,
    simbolo: null,
    indumentaria_uniforme: null,
    presidente: null,
    apodos: null,
    id_estadios: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

async function Delete() {
  const datos = new FormData();
  datos.append("nombre", equipo.nombre);
  datos.append("fecha_fundo", equipo.fecha_fundo);
 // datos.append("id_jugadores", equipo.id_jugadores);
  datos.append("id_entrenadores", equipo.id_entrenadores);
  datos.append("descripcion", equipo.descripcion);
  datos.append("simbolo", equipo.simbolo);
  datos.append("indumentaria_uniforme", equipo.indumentaria_uniforme);
  datos.append("presidente", equipo.presidente);
  datos.append("apodos", equipo.apodos);
  datos.append("id_estadios", equipo.id_estadios);
  datos.append("nombre_paises", equipo.nombre_paises);
  datos.append("nombre_ciudades", equipo.nombre_ciudades);

  await deleteEquipos(datos);
  Object.assign(equipo, {
    nombre: null,
    fecha_fundo: null,
  //  id_jugadores: null,
    id_entrenadores: null,
    descripcion: null,
    simbolo: null,
    indumentaria_uniforme: null,
    presidente: null,
    apodos: null,
    id_estadios: null,
    nombre_paises: null,
    nombre_ciudades: null,
  });
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === equipo.nombre_paises)?.cities
);
let i = null;

onMounted(async () => {
  rows.value = await getEquipos();
  i = setInterval(async function () {
    rows.value = await getEquipos();
  }, 30000);
  clearInterval(i);
  paises.value = await getPaises();
  entrenadores.value = await getEntrenadores();
  jugadores.value = await getJugadores();
  estadios.value = await getEstadios();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    fecha_fundo: null,
  //  id_jugadores: null,
    id_entrenadores: null,
    descripcion: null,
    simbolo: null,
    indumentaria_uniforme: null,
    presidente: null,
    apodos: null,
    id_estadios: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
    simbolo.value = [new File([], details.rows[0].simbolo)];
  }

  Object.assign(equipo, rowSelected);
}

function updateSimbolo(simbolo) {
  equipo.simbolo = simbolo;
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
    Object.keys(equipo)
      .filter((k) => !["nombre_paises", "nombre_ciudades"].includes(k))
      .every((key) => equipo[key] && equipo[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);
</script>
<style lang="scss" scoped>
/*.q-table {
  color: grey;
  background-color: #1ddf8e;
}*/

.q-input.label {
  font-size: large;
  text-align: center;
}

.marco {
  border-style: solid;
  border-radius: 5%;
  border-width: 1px;
  padding: 30px;
  padding-right: 150px;
  height: 50%;
  max-width: 55%;
}
</style>
