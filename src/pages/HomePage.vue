<template>
  <q-page padding class="bg-fondo">
    <div class="row q-col-gutter-md justify-between">
      <div class="col-6 q-gutter-md">
        <q-banner inline-actions class="text-white bg-light-blue-12">
          Bienvenido a nuestro sitio web
          <template v-slot:action>
            <q-btn flat color="white" label="Ok" />
          </template>
        </q-banner>

        <h5>CAMPEONATO FRONTÓN</h5>

        <q-card flat class="bg-fondo marco">
          <q-card flat class="bg-fondo">
            En juego:
            <q-card-section>
              <div
                class="bg-majo row justify-between items-center q-pa-sm"
                style="width: 100%; height: 45px"
              >
                <div
                  class="bg-fondo rounded-borders"
                  style="width: 50px; height: 30px"
                ></div>

                {{ jugador1 }}

                <div class="text-center">
                  VS
                  <div
                    class="bg-blue-2 text-caption full-height"
                    style="width: 100px"
                  >
                    Cancha 01
                  </div>
                </div>
                {{ jugador2 }}
                <div
                  class="bg-fondo rounded-borders"
                  style="width: 50px; height: 30px"
                ></div>
              </div>
            </q-card-section>
          </q-card>

          <q-card flat class="bg-fondo">
            <q-card-section>
              <div
                class="bg-majo row justify-between items-center q-pa-sm"
                style="width: 100%; height: 45px"
              >
                <div
                  class="bg-fondo rounded-borders"
                  style="width: 50px; height: 30px"
                ></div>

                {{ jugador3 }}

                <div class="text-center">
                  VS
                  <div
                    class="bg-blue-2 text-caption full-height"
                    style="width: 100px"
                  >
                    Cancha 02
                  </div>
                </div>
                {{ jugador4 }}
                <div
                  class="bg-fondo rounded-borders"
                  style="width: 50px; height: 30px"
                ></div>
              </div>
            </q-card-section>
          </q-card>
          <q-card flat class="bg-fondo">
            <q-card-section>
              <div
                class="bg-majo row justify-between items-center q-pa-sm"
                style="width: 100%; height: 45px"
              >
                <div
                  class="bg-fondo rounded-borders"
                  style="width: 50px; height: 30px"
                ></div>

                {{ jugador5 }}

                <div class="text-center">
                  VS
                  <div
                    class="bg-blue-2 text-caption full-height"
                    style="width: 100px"
                  >
                    Cancha 03
                  </div>
                </div>
                {{ jugador6 }}
                <div
                  class="bg-fondo rounded-borders"
                  style="width: 50px; height: 30px"
                ></div>
              </div>
            </q-card-section>
          </q-card>
          <q-card flat class="bg-fondo">
            <q-card-section>
              <div
                class="bg-majo row justify-between items-center q-pa-sm"
                style="width: 100%; height: 45px"
              >
                <div
                  class="bg-fondo rounded-borders"
                  style="width: 50px; height: 30px"
                ></div>

                {{ jugador7 }}

                <div class="text-center">
                  VS
                  <div
                    class="bg-blue-2 text-caption full-height"
                    style="width: 100px"
                  >
                    Cancha 04
                  </div>
                </div>
                {{ jugador8 }}
                <div
                  class="bg-fondo rounded-borders"
                  style="width: 50px; height: 30px"
                ></div>
              </div>
            </q-card-section>
          </q-card>
        </q-card>

        <h6>Proximos Encuentros:</h6>
        <q-table
          dense
          :rows="proximosencuentros"
          class="bg-fondo table1"
          :columns="columns"
          row-key="name"
          separator="none"
        />
      </div>

      <div class="col-6 q-col-gutter-md">
        <div class="row justify-center q-gutter-md">
          <q-avatar
            size="100px"
            font-size="52px"
            text-color="white"
            icon="img:src/assets/img/cristal.png"
          >
          </q-avatar>
          <q-avatar
            size="100px"
            font-size="52px"
            text-color="white"
            icon="img:src/assets/img/f.png"
          >
          </q-avatar>
        </div>

        <div class="cl">
          <h6>Resultados:</h6>

          <q-table
            dense
            :rows="resultados"
            class="bg-fondo table1"
            :columns="columns2"
            row-key="name1"
            separator="none"
          />

          <h6>Juegos:</h6>

          <q-table
            dense
            :rows="juego"
            class="bg-fondo table1"
            :columns="columns5"
            row-key="name1"
            separator="none"
          />
          <!----- <q-table
            :rows="resultados"
            :columns="columns2"
            class="bg-fondo"
            dense
            separator="none"
            row-key="name1"
          />-->
        </div>
      </div>
    </div>
  </q-page>
  <!---$indigo-13-->


</template>

<script setup>



import { ref, onMounted, onUnmounted } from "vue";
import {
  getEquipos,
  getProximosencuentros,
  getPartidas,
  getJugadores,
  getResultados,
  getJuego,
  getEstadioPartida,
  getLogo,
} from "../services";
const columns = [
  {
    name: "id_partidas",
    required: true,
    label: "Hora",
    align: "left",
    field: "tiempo_inicio",
    format: (val) => `${val}`,
    sortable: true,
  },

  {
    name: "id_canchas_estadios_partidas",
    align: "center",
    label: "Cancha",
    field: "nombre",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Jugador1",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "vs",
    align: "center",
    label: "vs",
    field: "vs",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Jugador2",
    field: "nombre_jugadores",
    sortable: true,
  },
];

const columns2 = [
  {
    name: "Hora",
    align: "center",
    label: "Hora-Inicio",
    field: "tiempo_inicio",
    sortable: true,
  },
  {
    name: "Hora ",
    align: "center",
    label: "Hora-Finalizo",
    field: "tiempo_fin",
    sortable: true,
  },

  {
    name: "id_jugadores",
    align: "center",
    label: "Jugador1",
    field: "nombre_jugadores",
    sortable: true,
  },

  {
    name: "vs",
    align: "center",
    label: "VS",
    field: "Vs",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Jugador2",
    field: "nombre_jugadores",
    sortable: true,
  },
];

const columns5 = [
  {
    name: "id_jugadores",
    align: "center",
    label: "Jugador1",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "vs",
    align: "center",
    label: "vs",
    field: "vs",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Jugador2",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "simbolo",
    align: "center",
    label: "simbolo",
    field: "simbolo",
    sortable: true,
  },
];

//const devolucion = function (jugador) {
//console.log("jugadorr");

//}
const jugador1 = ref("JUGADOR 1");
const jugador2 = ref("JUGADOR 2");

const jugador3 = ref("JUGADOR 3");
const jugador4 = ref("JUGADOR 4");

const jugador5 = ref("JUGADOR 5");
const jugador6 = ref("JUGADOR 6");

const jugador7 = ref("JUGADOR 7");
const jugador8 = ref("JUGADOR 8");

//const puntaje = ref([]);

const equipos = ref([]);
const partidas = ref([]);
const jugadores = ref([]);
const proximosencuentros = ref([]);
const resultados = ref([]);
const juego = ref([]);
const cancha = ref([]);
const logo = ref([]);

let i = null;

onMounted(async () => {
  proximosencuentros.value = await getProximosencuentros();
  equipos.value = await getEquipos();
  partidas.value = await getPartidas();
  jugadores.value = await getJugadores();
  resultados.value = await getResultados();
  juego.value = await getJuego();
  cancha.value = await getEstadioPartida();
  logo.value = await getLogo();

  i = setInterval(async function () {
    proximosencuentros.value = await getProximosencuentros();
    equipos.value = await getEquipos();
    partidas.value = await getPartidas();
    jugadores.value = await getJugadores();
    resultados.value = await getResultados();
    juego.value = await getJuego();
    cancha.value = await getEstadioPartida();
    logo.value = await getLogo();
  }, 30000);
});

onUnmounted(() => {
  clearInterval(i);
});
</script>

<style>
col-6 q-col-gutter-md {
  background-color: aquamarine;
}
h2 {
  color: rgb(150, 188, 15);
  text-align: center;
  font-size: 89px;
  -webkit-text-stroke: 1.5px rgb(71, 207, 8);
}

.card-example {
  width: 288px;
}

.q-card.marco {
  border-style: solid;
  border-radius: 6%;
  border-width: 1px;
  padding: 30px;
}

.table1 tr:first-child th {
  border-style: solid;
  border-width: 1px;
}

.cl {
  text-align: center;
}

@media (max-width) {
}

.q-banner {
  height: 10px;
}
</style>
