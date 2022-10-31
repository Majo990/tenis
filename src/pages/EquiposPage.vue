
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
  { name: 'fecha', align: 'center', label: 'Fecha', field:'fecha', sortable: true },
  { name: 'id_jugadores', align: 'center', label: 'Id_Jugadores', field:'id_jugadores', sortable: true },
  { name: 'id_entrenadores', align: 'center', label: 'Id_Entrenadores', field:'id_entrenadores', sortable: true },
]

const rows = [
  {
    name: ' ',
    fecha: '',
    id_jugadores:'',
    id_entrenadores:''
  },
  {
    name: ' ',
    fecha: '',
    id_jugadores:'',
    id_entrenadores:''
  },
  {
    name: ' ',
    fecha: '',
    id_jugadores:'',
    id_entrenadores:''
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
background-color:#1ddf8e;

}

</style>
