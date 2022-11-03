
<template>
  <q-page padding >
    <div class="q-pa-md" >
      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">

            <q-input
              filled
              v-model="nombre"
              label="Ingrese su Nombre "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="fecha"
              label="Ingrese su Fecha ver "
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Fecha ',
              ]"
            />
          </div>

          <div class="row justify-between q-gutter-md">
            <q-input
              filled
              v-model="nombrejugadores"
              label="Ingrese su Nombre-Jugadores"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre-Jugadores',
              ]"
            />

            <q-input
              filled
              v-model="nombreentrenadores"
              label="Ingrese su Nombre-Entrenadores"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre-Entrenadores',
              ]"
            />
          </div>
        </div>
      </div>

      <div class="col-6 q-gutter-md text-center items-center">

<q-btn color="primary" label="Crear" />
  <q-btn color="secondary" label="Leer " />
  <q-btn color="amber" label="Actualizar" />
  <q-btn color="red" label="Borrar" />

</div>
<br/>
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </div>

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
