<template>
  <q-page padding >
    <div class="q-pa-md" >
      <q-table :rows="rows" :columns="columns" row-key="name" />
      <br/>
    <strong>Formulario </strong>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getHistorialPartidas } from "../services";
const columns = [

  { name: 'id_jugadores', align: 'center', label:'Nombre-Jugadores', field:'nombre_jugadores', sortable: true },
  { name: 'fecha_hora', align: 'center', label: 'Fecha-Hora', field:'fecha_hora', sortable: true },
  { name: 'id_rondas', align: 'center', label:'Nro-Rondas', field:'nro_rondas', sortable: true },
  { name: 'puntaje', align: 'center', label:'Puntaje', field:'puntaje', sortable: true },
  { name: 'id_eventos', align: 'center', label:'Nombre-Eventos', field:'nombre_eventos', sortable: true },
  { name: 'id_jueces', align: 'center', label:'Nombre-Jueces', field:'nombre_jueces', sortable: true },
  { name: 'id_premios', align: 'center', label:'Nombre-Premios', field:'nombre_Premios', sortable: true },

];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getHistorialPartidas();
});


</script>
<style>

.q-table{
color: grey;
background-color:hsl(189, 84%, 71%);

}

</style>
