<template>
  <q-page padding>
    <div class="row q-col-gutter-md justify-between">
      <div class="col-6 q-gutter-md">
        <h6>CAMPEONATO FRONTON</h6>

        <q-card flat>
          <q-card-section>
            <div
              class="bg-majo row justify-between items-center q-pa-sm"
              style="width: 100%; height: 45px"
            >
              <div
                class="bg-white rounded-borders"
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
                class="bg-white rounded-borders"
                style="width: 50px; height: 30px"
              ></div>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat>
          <q-card-section>
            <div
              class="bg-majo row justify-between items-center q-pa-sm"
              style="width: 100%; height: 45px"
            >
              <div
                class="bg-white rounded-borders"
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
                class="bg-white rounded-borders"
                style="width: 50px; height: 30px"
              ></div>
            </div>
          </q-card-section>
        </q-card>
        <q-card flat>
          <q-card-section>
            <div
              class="bg-majo row justify-between items-center q-pa-sm"
              style="width: 100%; height: 45px"
            >
              <div
                class="bg-white rounded-borders"
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
                class="bg-white rounded-borders"
                style="width: 50px; height: 30px"
              ></div>
            </div>
          </q-card-section>
        </q-card>
        <q-card flat>
          <q-card-section>
            <div
              class="bg-majo row justify-between items-center q-pa-sm"
              style="width: 100%; height: 45px"
            >
              <div
                class="bg-white rounded-borders"
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
                class="bg-white rounded-borders"
                style="width: 50px; height: 30px"
              ></div>
            </div>
          </q-card-section>
        </q-card>

        <h6>Proximos Encuentros:</h6>
        <q-table
          dense
          :rows="rows"
          :columns="columns"
          row-key="name"
          separator="cell"
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

        <q-table
          :rows="rows2"
          :columns="columns2"
          dense
          row-key="name1"
          separator="cell"
        />
      </div>
    </div>
  </q-page>
  <!---$indigo-13-->
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getHome } from "../services";
const columns = [
  {
    name: "descripcion",
    required: true,
    label: "Hora",
    align: "left",
    field: "descripcion ",
    format: (val) => `${val}`,
    sortable: true,
  },

  {
    name: "id_jugadores",
    align: "center",
    label: "Cancha",
    field: "",
    sortable: true,
  },
  {
    name: "id_arbitros",
    align: "center",
    label: "Jugador1",
    field: "jugador1",
    sortable: true,
  },
  {
    name: "id_arbitros",
    align: "center",
    label: "VS",
    field: "nombre_arbitros",
    sortable: true,
  },
  {
    name: "id_arbitros",
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
    label: "Hora",
    field: "hora",
    sortable: true,
  },

  {
    name: "id_jugador",
    align: "center",
    label: "Jugador1",
    field: "jugador1",
    sortable: true,
  },

  {
    name: "id_arbitros",
    align: "center",
    label: "VS",
    field: "nombre_arbitros",
    sortable: true,
  },
  {
    name: "id_jugador",
    align: "center",
    label: "Jugador2",
    field: "jugador2",
    sortable: true,
  },
];

const rows = ref([]);
const rows2 = ref([]);

const jugador1 = ref("JUGADOR 1");
const jugador2 = ref("JUGADOR 2");

const jugador3 = ref("JUGADOR 3");
const jugador4 = ref("JUGADOR 4");

const jugador5 = ref("JUGADOR 5");
const jugador6 = ref("JUGADOR 6");

const jugador7 = ref("JUGADOR 7");
const jugador8 = ref("JUGADOR 8");

onMounted(async () => {
  rows.value = await getHome();
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
q-page {
  background-color: #4fb4c8;
}

.card-example {
  width: 288px;
}
</style>
