<template>
  <q-page padding :class="isDark ? 'dark' : 'light'">
    <div class="q-pa-md" :class="isDark ? 'dark' : 'light'">
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>
  </q-page>
</template>

<script>
const columns = [

  { name: 'nro', align: 'center', label: 'Nro', field:'nro', sortable: true },

]

const rows = [
{
    nro: ' '

  },
  {
    nro: ' '

  },
  {
    nro: ' ',

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
