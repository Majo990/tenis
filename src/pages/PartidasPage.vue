<template>
  <div class="q-pa-md">
    <q-page padding>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese nombre Partida <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  v-model="partida.nombre"
                  lazy-rules
                  dense
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Nombre Partida',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>

              <div class="fecha">
                <label
                  >Ingrese la fecha partida
                  <span class="text-red">*</span></label
                >

                <q-input
                  filled
                  dense
                  v-model="partida.fecha"
                  mask="date"
                  :rules="['date']"
                  format24h
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="partida.fecha">
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

              <div>
                <label
                  >Seleccione su Ronda <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nro"
                  v-model="partida.id_rondas"
                  dense
                  :options="rondas"
                />
              </div>

              <div class="equipoa">
                <label
                  >Seleccione su equipo A<span class="text-red">*</span></label
                >
                <q-select
                  filled
                  map-options
                  multiple
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  v-model="partida.jugadoresa"
                  dense
                  :options="jugadoresA"
                  selection="multiple"
                  max-values="2"
                />
              </div>
            </div>

            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Ingrese descripcion Partida
                  <span class="text-red">*</span></label
                >
                <q-input
                  v-model="partida.descripcion"
                  filled
                  clearable
                  type="textarea"
                  autogrow
                  lazy-rules
                  dense
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Por favor ingrese su Descripcion',
                  ]"
                  :onkeydown="onkeyDown"
                />
              </div>

              <div>
                <label
                  >Ingrese tiempo_inicio Partda
                  <span class="text-red">*</span></label
                >
                <q-input
                  filled
                  dense
                  v-model="partida.tiempo_inicio"
                  mask="fulltime"
                  :rules="['fulltime']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="partida.tiempo_inicio"
                          with-seconds
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div>
                <label
                  >Seleccione su estadio <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="estadiopartida"
                  map-options
                  emit-value
                  option-label="nombre"
                  :options="estadios"
                  dense
                  lazy-rules
                />
              </div>
              <div class="equipob">
                <label
                  >Seleccione su equipo B<span class="text-red">*</span></label
                >
                <q-select
                  filled
                  map-options
                  multiple
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  v-model="partida.jugadoresb"
                  dense
                  :options="jugadoresB"
                  selection="multiple"
                  max-values="2"
                />
              </div>
            </div>

            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione Deporte Partida
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  v-model="partida.nombre_deportes"
                  dense
                  :options="deportes"
                  lazy-rules
                />
              </div>

              <div class="cancha">
                <label
                  >Ingrese tiempo_duracion Partida <span class="text-red"></span
                ></label>

                <q-input
                  filled
                  dense
                  v-model="partida.tiempo_duracion"
                  format24h
                  mask="fulltime"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="partida.tiempo_duracion" with-seconds>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="cancha1">
                <label
                  >Seleccione su Cancha <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  v-model="estadios"
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  :options="canchas"
                  dense
                  lazy-rules
                />
              </div>
            </div>

            <div class="row justify-between q-gutter-md">
              <div>
                <label
                  >Seleccione Nombre Torneo
                  <span class="text-red">*</span></label
                >
                <q-select
                  filled
                  map-options
                  emit-value
                  option-value="id"
                  option-label="nombre"
                  v-model="partida.id_torneos"
                  dense
                  :options="torneos"
                />
              </div>

              <div class="move">
                <label
                  >Ingrese tiempo finalizo Partida <span class="text-red"></span
                ></label>
                <q-input
                  filled
                  dense
                  v-model="partida.tiempo_fin"
                  format24h
                  mask="fulltime"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time v-model="partida.tiempo_fin" with-seconds>
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="row justify-between q-gutter-md"></div>
            </div>
          </div>
        </div>

        <!----arriba es el formulario -->
        <!---Botoness crud abajo  -->
        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn
            dense
            color="primary"
            label="Crear"
            type="submit"
            icon="fa-solid fa-folder-plus"
            :disable="botonbloqueocrear"
            guardejugadorespartida
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
      </q-form>

      <br />
      <!--tabla-->
      <q-table
        :rows="rows"
        :columns="columns"
        separator="cell"
        dense
        row-key="id"
        selection="single"
        v-model:selected="selected"
        @selection="handleSelection"
        :rows-per-page-options="[5, 10, 20, 50, 80, 100]"
      >
      </q-table>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import {
  getPartidas,
  getRondas,
  crearPartidas,
  getDeportes,
  getTorneos,
  updatePartidas,
 // crearEstadioPartida,
  crearPartidasJugadores,
  deletePartidas,
  getJugadores,
  getEstadioPartida,
  getEstadios,
  getPartidajugador,
  getCampoestadiojugador,

  //getPuntaje,
  //
} from "../services";

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
    name: "descripcion",
    align: "center",
    label: "Descripcion",
    field: "descripcion",
    sortable: true,
  },

  {
    name: "nombre_deportes",
    align: "center",
    label: "Nombre-Deportes",
    field: "nombre_deportes",
    sortable: true,
  },

  {
    name: "id_torneos",
    align: "center",
    label: "Nombre-Torneos",
    field: "nombre_torneos",
    sortable: true,
  },
  {
    name: "fecha",
    align: "center",
    label: "Fecha",
    field: "fecha",
    format: (val, row) => date.formatDate(val, "DD/MM/YYYY"),
    sortable: true,
  },
  {
    name: "tiempo_inicio",
    align: "center",
    label: "Tiempo_Inicio",
    field: "tiempo_inicio",
    format24h: (val, row) => date.format24h(val, "HH:mm:ss"),

    sortable: true,
  },
  {
    name: "tiempo_duracion",
    align: "center",
    label: "Tiempo_Duracion",
    field: "tiempo_duracion",
    format24h: (val, row) => date.format24h(val, "HH:mm:ss"),
    sortable: true,
  },
  {
    name: "tiempo_fin",
    align: "center",
    label: "Tiempo_Fin",
    field: "tiempo_fin",
    format24h: (val, row) => date.format24h(val, "HH:mm:ss"),
    sortable: true,
  },
  {
    name: "id_rondas",
    align: "center",
    label: "Nro-Rondas",
    field: "nro_rondas",
    sortable: true,
  },
];

const selectedAll = ref(false);
const rows = ref([]);
const torneos = ref([]);
const selected = ref([]);
const rondas = ref([]);
const jugadores = ref([]);
const estadiospartida = ref([]);
const estadiopartida = ref([]);
const estadios = ref([]);

const campoestadiopartida = ref([]);
const cancha = ref([]);
const campo = ref([]);

const deportes = [
  "Tenis",
  "Fútbol",
  "Voleibol",
  "Baloncesto",
  "Natación",
  "Golf",
  "Béisbol",
  "Hockey",
];

const partida = reactive({
  nombre: null,
  descripcion: null,
  nombre_deportes: null,
  id_torneos: null,
  fecha: null,
  tiempo_inicio: null,
  tiempo_duracion: null,
  tiempo_fin: null,
  id_rondas: null,
  jugadoresa: [],
  jugadoresb: [],
});

async function onSubmit() {
  await crearPartidas(partida);
  //await creacionestadiopartida();
  //await crearpartidajugador(partidajugador);
  //await crearcancha(cancha);
  Object.assign(partida, {
    id: null,
    nombre: null,
    descripcion: null,
    nombre_deportes: null,
    id_torneos: null,
    fecha: null,
    tiempo_inicio: null,
     tiempo_duracion: null,
    tiempo_fin: null,
    id_rondas: null,
  });
}



async function crearpartidajugador() {
  await crearPartidasJugadores(partidajugador);
  Object.assign(partidajugador, {
    id_partidas: null,
    id_jugadores: null,
  });


const partidajugador = reactive({
  id_partidas: null,
  id_jugadores: null,
});


const partidas = partidaSelected.value.map((p) => {
    return {
      id_partidas: partida.id || r.insertId,
      id_jugadores: p,
    };
  });

  for (let i = 0; i < partidas.length; i++) {
    await crearPartidas(partidas[i]);
  }

  Object.assign(partida,{
    id:null,
  })
}


/*async function creacionestadiopartida() {
  await crearEstadioPartida(estadiopartida);
  Object.assign(estadiopartida, {
    nombre: null,
    id_partidas: null,
    id_estadios: null,
  });

 const estadiopartida = reactive({
   nombre: null,
   id_partidas: null,
  id_estadios: null,
  });
}
*/
/*async function crearcancha() {
  await crearEstadios(estadio);
  Object.assign(estadio, {
    nombre: null,
    id_jugadores: null,
    id_canchas_estadios_partidas: null,
    cesped: null,
    administrador: null,
    propietario: null,
    ubigeo: null,
    direccion: null,
    nombre_paises: null,
    nombre_ciudades: null,
    id_partidas: null,
  });
}

const estadio = reactive({
  nombre: null,
  id_jugadores: null,
  id_canchas_estadios_partidas: null,
  cesped: null,
  administrador: null,
  propietario: null,
  ubigeo: null,
  direccion: null,
  nombre_paises: null,
  nombre_ciudades: null,
  id_partidas: null,
});
*/
async function Actualizar() {
  await updatePartidas(partida);
  Object.assign(partida, {
    nombre: null,
    descripcion: null,
    nombre_deportes: null,
    id_torneos: null,
    fecha: null,
    tiempo_inicio: null,
    tiempo_duracion: null,
    tiempo_fin: null,
    id_rondas: null,
  });
}

async function Delete() {
  await deletePartidas(partida);

  Object.assign(partida, {
    nombre: null,
    descripcion: null,
    nombre_deportes: null,
    id_torneos: null,
    fecha: null,
    tiempo_inicio: null,
    tiempo_duracion: null,
    tiempo_fin: null,
    id_rondas: null,
  });
}

onMounted(async () => {
  rows.value = await getPartidas();
  deportes.value = await getDeportes();
  rondas.value = await getRondas();
  torneos.value = await getTorneos();
  estadiospartida.value = await getEstadioPartida();
  estadios.value = await getEstadios();
 // partidajugador.value = await getPartidajugador();
  jugadores.value = await getJugadores();
  campoestadiopartida.value = await getCampoestadiojugador();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    descripcion: null,
    nombre_deportes: null,
    id_torneos: null,
    fecha: null,
    tiempo_inicio: null,
    tiempo_duracion: null,
    tiempo_fin: null,
    id_rondas: null,
  };

  botonbloqueoactualizar.value = true;
  botonbloqueoeliminar.value = true;
  if (details.added) {
    botonbloqueoactualizar.value = false;
    botonbloqueoeliminar.value = false;
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(partida, rowSelected);
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
    Object.keys(partida)
      .filter((k) => !["tiempo_duracion", "tiempo_fin"].includes(k))
      .every((key) => partida[key] && partida[key] !== "") &&
    botonbloqueoactualizar.value
  )
    return false;
  return true;
});

const botonbloqueoactualizar = ref(true);

const botonbloqueoeliminar = ref(true);

const jugadoresA = computed(() => {
  return jugadores.value.filter(
    (jugador) => !partida.jugadoresb.includes(jugador.id)
  );
});

const jugadoresB = computed(() => {
  return jugadores.value.filter(
    (jugador) => !partida.jugadoresa.includes(jugador.id)
  );
});
</script>

<style scoped>
.move {
  position: relative;
  padding-right: 37%;
}
.eq {
  position: relative;
}

.dura {
  position: relative;
  padding-right: 18%;
}

.cancha {
  position: relative;
  position: center;
  margin-left: 50px;
}

.cancha1 {
  margin-left: -50px;
}

.equipoa {
  margin: -40px;
  margin-top: 17px;
  margin-left: 50px;
  margin-right: -350px;
}
.equipob {
  margin: -40px;
  margin-top: 17px;
  margin-left: 50px;
  margin-right: -350px;
}
</style>
<!-- margin-left: 900px;-128px-->
