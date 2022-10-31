<template>
  <q-page padding :class="isDark ? 'dark' : 'light'">
    <div class="q-pa-md" :class="isDark ? 'dark' : 'light'">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'id_jugadores', align: 'center', label:'IdJugadores', field:'id_jugadores', sortable: true },
  { name: 'fecha_hora', align: 'center', label: 'Fecha_Hora', field:'fecha_hora', sortable: true },
  { name: 'id_rondas', align: 'center', label:'Id_Rondas', field:'id_rondas', sortable: true },
  { name: 'puntaje', align: 'center', label:'Puntaje', field:'puntaje', sortable: true },
  { name: 'id_eventos', align: 'center', label:'Id_Eventos', field:'id_eventos', sortable: true },
  { name: 'id_jueces', align: 'center', label:'Id_Jueces', field:'id_jueces', sortable: true },
  { name: 'id_premios', align: 'center', label:'Id_Premios', field:'id_Premios', sortable: true },

]

const rows = [
  {
    name: ' ',
    id_jugadores:'',
    fecha_hora:'',
    id_rondas: '',
    puntaje:'',
    id_eventos:'',
    id_jueces:'',
    id_premios:''
  },
  {
    name: ' ',
    id_jugadores:'',
    fecha_hora:'',
    id_rondas: '',
    puntaje:'',
    id_eventos:'',
    id_jueces:'',
    id_premios:''
  },

]

export default {
  setup () {
    return {
      columns,
      rows
    }
  }
}
</script>
<style>

.q-table{
color: grey;
background-color:hsl(189, 84%, 71%);

}

</style>
