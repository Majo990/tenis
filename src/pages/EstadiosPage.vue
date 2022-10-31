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
  { name: 'pais', align: 'center', label: 'Pais', field:'pais', sortable: true },
  { name: 'ciudad', align: 'center', label: 'Ciudad', field:'ciudad', sortable: true },

]

const rows = [
  {
    name: ' ',
    pais: '',
    ciudad: ''
  },

  {
    name: ' ',
    pais: '',
    ciudad: ''
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
background-color:#77d6f3;

}

</style>
