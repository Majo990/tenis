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
  { name: 'fecha-hora', align: 'center', label: 'Fecha-Hora', field:'fecha-hora', sortable: true },
  { name: 'id_jugadores', align: 'center', label: 'IdJugadores', field:'id_jugadores', sortable: true },
  { name: 'id_arbitros', align: 'center', label: 'IdArbitros', field:'id_arbitros', sortable: true },

]

const rows = [
{
    name: ' ',
    fecha_hora: '',
    id_jugadores: '',
    id_arbitros: ''
  },

  {
    name: ' ',
    fecha_hora: '',
    id_jugadores: '',
    id_arbitros: ''
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
color: rgba(128, 128, 128, 0.993);
background-color:#f3abe7;

}

</style>
