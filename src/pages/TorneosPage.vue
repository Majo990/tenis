
<template>
  <q-page padding :class="isDark ? 'dark' : 'light'">
    <div class="q-pa-md" :class="isDark ? 'dark' : 'light'">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script>
const columns = [
  
  { name: 'fecha', align: 'center', label: 'Fecha', field:'fecha', sortable: true },
  { name: 'id_estadios', align: 'center', label: 'Id_Jugadores', field:'id_jugadores', sortable: true },
  { name: 'pais', align: 'center', label: 'Id_Entrenadores', field:'id_entrenadores', sortable: true },
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'ciudad', align: 'center', label: 'Id_Entrenadores', field:'id_entrenadores', sortable: true },
]

const rows = [
  {

    fecha: '',
    id_estadios:'',
    pais:'',
    name:'',
    ciudad:''
  },

  {

    fecha: '',
   id_estadios:'',
   pais:'',
   name:'',
   ciudad:''
},

{

  fecha: '',
  id_estadios:'',
  pais:'',
  name:'',
  ciudad:''
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
