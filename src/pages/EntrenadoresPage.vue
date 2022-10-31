
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
  { name: 'id_jugadores', align: 'center', label: 'Id_Jugadores', field:'id_jugadores', sortable: true },
]

const rows = [
  {
    name: ' ',
    id_jugadores: ''
  },

  {
    name: ' ',
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
<style>

.q-table{
color: rgb(128, 128, 128);
background-color:#20b393;

}

</style>
