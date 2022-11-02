<template>
  <q-page padding>
    <div class="row q-col-gutter-md justify-between">
      <div class="col-6 q-gutter-md">
        <h6>CAMPEONATO FRONTON</h6>

        <q-card class="my-card" >




          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </q-card-section>
        </q-card>

        <h6>Proximos Encuentros:</h6>
        <q-table :rows="rows" :columns="columns" row-key="name" />
      </div>

      <div class="col-6 q-col-gutter-md">
        <div class="row justify-center q-gutter-md">
          <q-avatar
            size="100px"
            font-size="52px"
            color="teal"
            text-color="white"
            icon="directions"
          />
          <q-avatar
            size="100px"
            font-size="52px"
            color="teal"
            text-color="white"
            icon="directions"
          />
        </div>
        <h8>Resultados</h8>

        <q-table :rows="rows2" :columns="columns2" row-key="name1" />
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

onMounted(async () => {
  rows.value = await getHome();
});


</script>

<style>
h2 {
  color: rgb(150, 188, 15);
  text-align: center;
  font-size: 89px;
  -webkit-text-stroke: 1.5px rgb(71, 207, 8);
}
q-page {
  background-color: aqua;
}


.card-example{
  width: 288px,

}

</style>
