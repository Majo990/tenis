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
  { name: 'descripcion', align: 'center', label: 'Descripcion', field:'descripcion', sortable: true },
  { name: 'id_jugadores', align: 'center', label: 'Id_Jugadores', field:'id_jugadores', sortable: true },
  { name: 'id_torneos', align: 'center', label: 'Torneos', field:'torneos', sortable: true },
  { name: 'fecha', align: 'center', label: 'Fecha', field:'fecha', sortable: true },
  { name: 'tiempo_inicio', align: 'center', label: 'Tiempo_Inicio', field:'tiempo_inicio', sortable: true },
  { name: 'tiempo_duracion', align: 'center', label: 'Tiempo_Duracion', field:'tiempo_duracion', sortable: true },
  { name: 'tiempo_fin', align: 'center', label: 'Tiempo_Fin', field:'tiempo_fin', sortable: true },
  { name: 'id_rondas', align: 'center', label: 'Id_Rondas', field:'id_rondas', sortable: true },

]

const rows = [
  {
    name: ' ',
    descripcion:'',
    id_jugadores:'',
    id_torneos:'',
    fecha:'',
    tiempo_inicio:'',
    tiempo_duracion:'',
    tiempo_fin:'',
    id_rondas:''
  },

  {
    name: ' ',
    descripcion:'',
    id_jugadores:'',
    id_torneos:'',
    fecha:'',
    tiempo_inicio:'',
    tiempo_duracion:'',
    tiempo_fin:'',
    id_rondas:''
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
