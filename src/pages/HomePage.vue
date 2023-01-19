<template>
  <q-page padding class="bg-fondo">
  <!----  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">-->
  <!----- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">-->
    <div class="row q-col-gutter-md justify-between">
      <div class="col-6 q-gutter-md">
        <!----- <q-banner inline-actions class="text-white bg-light-blue-12">
          Bienvenido a nuestro sitio web
        <template v-slot:action>
            <q-btn
            dense
            label="Ok"
            @click="onSubmit"
            :disable="botonbloqueo"
          />


          </template>
        </q-banner>-->

        <h5>CAMPEONATO FRONTÓN</h5>

        <q-card flat class="bg-fondo marco ">
          En juego:
          <q-card
            flat
            class="bg-fondo"
            v-for="partida in partidasActuales"
            :key="partida.id"
          >
            <q-card-section>
              <div
                class="bg-majo row justify-between items-center q-pa-sm"
                style="width: 100%; height: 45px"
              >
                <div
                  class="bg-fondo rounded-borders text-home"
                  style="width: 50px; height: 30px"
                >
                  {{ partida.puntaje1 }}
                </div>

                {{ partida.jugador1 }}

                <div class="text-center">
                  VS
                  <div
                    class="bg-blue-2 text-caption full-height"
                    style="width: 100px"
                  >
                    {{ partida.nombre_cancha }}
                  </div>
                </div>
                {{ partida.jugador2 }}
                <div
                  class="bg-fondo rounded-borders"
                  style="width: 50px; height: 30px"
                >
                  {{ partida.puntaje2 }}
                </div>
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
          <!-- <q-avatar
            size="100px"
            font-size="52px"
            icon="`http://localhost:3000/img/download.jpg`"
          >
          </q-avatar> -->

          <q-img
            src="http://localhost:3000/img/tgi.png"
            width="150px"
            height="150px"
            style="border-radius: 80px"
          />

          <q-img
            src="http://localhost:3000/img/club.png"
            width="150px"
            height="150px"
            style="border-radius: 80px"
          />
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
          <!-- <h6>Juegos:</h6>

          <q-table
            dense
            :rows="partidasActuales"
            class="bg-fondo table1"
            :columns="columns5"
            row-key="name1"
            separator="none"
          /> -->
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
import _ from "lodash";

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
  getPuntaje,
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
    field: "nombre_cancha",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Jugador1",
    field: "jugador1",
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
    field: "jugador2",
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
    field: "jugador1",
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
    field: "jugador2",
    sortable: true,
  },
];

///tabla momentanea

/*const columns5 = [
  {
    name: "puntaje",
    align: "center",
    label: "Puntaje",
    field: "puntaje1",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Jugador1",
    field: "jugador1",
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
    name: "id_canchas_estadios_partidas",
    align: "center",
    label: "Cancha",
    field: "nombre_cancha",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Jugador2",
    field: "jugador2",
    sortable: true,
  },
  {
    name: "puntaje",
    align: "center",
    label: "Puntaje",
    field: "puntaje2",
    sortable: true,
  },
]; */

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
const partidasActuales = ref([]);
const cancha = ref([]);
const logo = ref([]);
const puntaje = ref([]);
const juegosactuamente = ref([]);

let i = null;

onMounted(async () => {
  const pr = await getProximosencuentros();
  const proxi = _.groupBy(pr, "nombre");

  proximosencuentros.value = Object.keys(proxi)
    .filter((key) => proxi[key].length > 1)
    .map((nombre) => {
      return {
        tiempo_inicio: proxi[nombre][0].tiempo_inicio,
        nombre_cancha: proxi[nombre][0].nombre_cancha,
        jugador1: proxi[nombre][0].nombre_jugadores,
        Vs: null,
        jugador2: proxi[nombre][1].nombre_jugadores,
      };
    });

  ///
  obtenerPartidasActuales();

  //
  equipos.value = await getEquipos();
  partidas.value = await getPartidas();
  jugadores.value = await getJugadores();
  const r = await getResultados();

  cancha.value = await getEstadioPartida();
  logo.value = await getLogo();
  /// puntaje.value = await getPuntaje();
  // juego.value = await getJuego();

  const rgroup = _.groupBy(r, "nombre");

  resultados.value = Object.keys(rgroup)
    .filter((key) => rgroup[key].length > 1)
    .map((nombre) => {
      return {
        tiempo_inicio: rgroup[nombre][0].tiempo_inicio,
        tiempo_fin: rgroup[nombre][0].tiempo_fin,
        jugador1: rgroup[nombre][0].nombre_jugadores,
        Vs: null,
        jugador2: rgroup[nombre][1].nombre_jugadores,
      };
    });

  i = setInterval(async function () {
    const pr = await getProximosencuentros();

    const proxi = _.groupBy(pr, "nombre");

    proximosencuentros.value = Object.keys(proxi)
      .filter((key) => proxi[key].length > 1)
      .map((nombre) => {
        return {
          tiempo_inicio: proxi[nombre][0].tiempo_inicio,
          nombre_cancha: proxi[nombre][0].nombre_cancha,
          jugador1: proxi[nombre][0].nombre_jugadores,
          Vs: null,
          jugador2: proxi[nombre][1].nombre_jugadores,
        };
      });
    equipos.value = await getEquipos();
    partidas.value = await getPartidas();
    jugadores.value = await getJugadores();

    const r = await getResultados();

    const rgroup = _.groupBy(r, "nombre");

    resultados.value = Object.keys(rgroup)
      .filter((key) => rgroup[key].length > 1)
      .map((nombre) => {
        return {
          tiempo_inicio: rgroup[nombre][0].tiempo_inicio,
          tiempo_fin: rgroup[nombre][0].tiempo_fin,
          jugador1: rgroup[nombre][0].nombre_jugadores,
          Vs: null,
          jugador2: rgroup[nombre][1].nombre_jugadores,
        };
      });

    cancha.value = await getEstadioPartida();
    logo.value = await getLogo();
    puntaje.value = await getPuntaje();

    obtenerPartidasActuales();
  }, 30000);
});

onUnmounted(() => {
  clearInterval(i);
});

async function obtenerPartidasActuales() {
  const listaPartidasActuales = await getJuego();
  const listaAgrupadaPartidasActuales = _.groupBy(
    listaPartidasActuales,
    "id",
    "id_jugador"
  );

  partidasActuales.value = Object.keys(listaAgrupadaPartidasActuales)
    .filter((key) => listaAgrupadaPartidasActuales[key].length > 1)
    .map((key) => {
      const [jugador1, jugador2] = listaAgrupadaPartidasActuales[key];

      return {
        id_partida: jugador1.id,
        puntaje1: jugador1.puntaje,
        jugador1: jugador1.nombre_jugador,
        nombre_cancha: jugador1.nombre_cancha,
        jugador2: jugador2.nombre_jugador,
        puntaje2: jugador2.puntaje,
      };
    });

  // console.log(partidasActuales.value);
}
</script>

<style scoped>
.col-6 .q-col-gutter-md {
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

@media (min-width: 980px) {
  .text-home {
    font-size: 2em;
  }
}

@media (min-width: 1921px) {
  .text-home {
    font-size: 30px;
  }
}

@media (min-width: 0px) {
  .text-home {
    font-size: 5px;
  }
}

@media (max-width: 599.99px) {
  .text-home {
    font-size: 7px;
  }
}

@media (min-width: 600px) {
  .text-home {
    font-size: 10px;
  }
}

@media (max-width: 1023.99px) {
  .text-home {
    font-size: 12px;
  }
}

@media (min-width: 1024px) {
  .text-home {
    font-size: 10px;
  }
}

@media (max-width: 1043.99px) {
  .text-home {
    font-size: 12px;
  }
}

@media (min-width: 1440px) {
  .text-home {
    font-size: 10px;
  }
}

@media (max-width: 1919.99px) {
  .text-home {
    font-size: 12px;
  }
}

@media (min-width: 1920px) {
  .text-home {
    font-size: 20px;
  }
}

@media (max-width: 200000px) {
  .text-home {
    font-size: 40px;
  }
}


/*@media all and (max-width: 2500px){
  .text-home{
    font-size: small;
  }
  .table1{
    width: 400px ;
  }
  .h5{
    font-size: 50px;
  }
  .letra{
    font-size: 20px;
  }
}
.q-banner {
  height: 10px;
}



@media all and (min-width: 7680px){
  .text-home{
    font-size: 20px;
  }
  .letra{
    font-size: 80px;
  }
  .q-banner {
  height: 50px;
}
}
*/



</style>
