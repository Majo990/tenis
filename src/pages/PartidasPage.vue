<template>
  <q-page padding>
    <div class="q-pa-md">
      <strong>Formulario </strong>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="partida.nombre"
                label="Ingrese el Nombre Partida "
                lazy-rules
                dense
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Nombre Partida',
                ]"
                style="width: 47%"
              />

              <q-input
                v-model="partida.descripcion"
                filled
                clearable
                type="textarea"
                autogrow
                label="Ingrese la Descripcion Partida"
                lazy-rules
                dense
                style="width: 47%"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Descripcion',
                ]"
                :shadow-text="textareaShadowText"
                @keydown="processTextareaFill"
                @focus="processTextareaFill"
              />
            </div>

            <div class="row justify-between q-gutter-md">
              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="partida.id_jugadores"
                dense
                :options="jugadores"
                style="width: 47%"
                label="Seleccione su Nombre Jugadores "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su jugadores',
                  (val) =>
                    (val > 1 && val < 80) ||
                    'Por favor seleccione su jugadores',
                ]"
              />
              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="partida.id_torneos"
                dense
                :options="torneos"
                style="width: 47%"
                label="Seleccione su Nombre Torneo "
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su pais',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su torneo',
                ]"
              />
            </div>
            <br />
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                dense
                label="Ingrese la fecha partida"
                v-model="fecha"
                style="width: 47%"
                mask="date"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Por favor ingrese su fecha',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="fecha">
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

              <q-input
                filled
                dense
                style="width: 47%"
                v-model="tiempoinicio"
                mask="finalizacion"
                label="Ingrese tiempo inicia partida"
                :rules="['tiempoduracion']"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                filled
                dense
                style="width: 47%"
                v-model="tiempo"
                mask="fulltime"
                label="Ingrese la duracion partida"
                :rules="['fulltime']"
              >
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                filled
                dense
                style="width: 47%"
                label="Ingrese la finalizo partida"
                v-model="timeWithSeconds"
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
                      <q-time v-model="timeWithSeconds" with-seconds format24h>
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

              <q-select
                filled
                map-options
                emit-value
                option-value="id"
                option-label="nombre"
                v-model="partida.id_rondas"
                dense
                :options="rondas"
                style="width: 47%"
                label="Seleccione su Ronda"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor seleccione su ronda',
                  (val) =>
                    (val > 1 && val < 80) || 'Por favor seleccione su ronda',
                ]"
              />
            </div>
          </div>
        </div>
        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn dense color="primary" label="Crear" type="submit" />
          <q-btn dense color="amber" label="Actualizar" />
          <q-btn dense color="red" label="Borrar" />
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
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import {
  getPartidas,
  getRondas,
  crearPartidas,
  getJugadores,
  getTorneos,
} from "../services";

const fecha = ref("2020-02-01");
const tiempoinicio = ref(null);
const nombretorneo = ref(null);
const descriparti = ref(null);
const selected = ref([]);

const tiempoinicios = ref("04:00:00");
const tiempoduraciones = ref("00:30:00");
const finalizaciones = ref("4:30:00");

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
    name: "id_jugadores",
    align: "center",
    label: "Nombre_Jugadores",
    field: "nombre_jugadores",
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
    sortable: true,
  },
  {
    name: "tiempo_inicio",
    align: "center",
    label: "Tiempo_Inicio",
    field: "tiempo_inicio",
    sortable: true,
  },
  {
    name: "tiempo_duracion",
    align: "center",
    label: "Tiempo_Duracion",
    field: "tiempo_duracion",
    sortable: true,
  },
  {
    name: "tiempo_fin",
    align: "center",
    label: "Tiempo_Fin",
    field: "tiempo_fin",
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

const rows = ref([]);
const jugadores = ref([]);
const torneos = ref([]);
const rondas = ref([]);

const partida = reactive({
  nombre: null,
  descripcion: null,
  id_jugadores: null,
  id_torneos: null,
  fecha: null,
  tiempo_inicio: null,
  tiempo_duracion: null,
  tiempo_fin: null,
  id_rondas: null,
});

async function onSubmit() {
  await crearPartidas(partida);
}

onMounted(async () => {
  rows.value = await getPartidas();
  jugadores.value = await getJugadores();
  rondas.value = await getRondas();
  torneos.value = await getTorneos();
});

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    descripcion: null,
    id_jugadores: null,
    id_torneos: null,
    fecha: null,
    tiempo_inicio: null,
    tiempo_duracion: null,
    tiempo_fin: null,
    id_rondas: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.row[0]);
  }

  Object.assign(partida, rowSelected);
}
</script>
