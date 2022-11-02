
<template>
  <q-page padding >
    <div class="q-pa-md" >
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>

    <br/>
    <strong>Formulario </strong>

  </q-page>
</template>

<script setup >
import{ref,onMounted} from "vue";
import { getEquipos} from "src/services";
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
  { name: 'id_jugadores', align: 'center', label: 'Nombre-Jugadores', field:'nombre_jugadores', sortable: true },
  { name: 'id_entrenadores', align: 'center', label: 'Nombre-Entrenadores', field:'nombre_entrenadores', sortable: true },
]

const rows = ref([]);

onMounted(async () => {
  rows.value = await getEquipos();
});
</script>
<style>

.q-table{
color: grey;
background-color:#1ddf8e;

}

</style>
