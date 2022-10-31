
<template>
  <q-page padding :class="isDark ? 'dark' : 'light'">
    <div class="q-pa-md" :class="isDark ? 'dark' : 'light'">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script>
const columns = [

  { name: 'id_partidas', align: 'center', label: 'Id_Partidas', field:'id_partidas', sortable: true },
  { name: 'id_jugadores', align: 'center', label: 'Id_Jugadores', field:'id_jugadores', sortable: true },
]

const rows = [
  {
    id_partidas: ' ',
    id_jugadores: ''
  },
  {
    id_partidas: ' ',
    id_jugadores: ''
  },
  {
    id_partidas: ' ',
    id_jugadores: ''
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
