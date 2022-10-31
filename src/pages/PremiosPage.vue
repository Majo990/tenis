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
  { name: 'tipo', align: 'center', label: 'Tipo', field:'Tipo', sortable: true },
  { name: 'stock', align: 'center', label: 'Stock', field:'stock', sortable: true },


]

const rows = [
{
    name: ' ',
    tipo:'',
    stock:''
  },
  {
    name: ' ',
    tipo:'',
    stock:''
  },
  {
    name: ' ',
    tipo:'',
    stock:''
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
