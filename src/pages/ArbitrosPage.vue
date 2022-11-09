
<template>
  <div class="q-pa-md">
    <q-page padding>
    <div class="q-pa-md">

      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">

            <q-input
              filled
              v-model="nombrearbitro"
              label="Ingrese su Nombre arbitro "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre',
              ]"
              style="width: 47%"
            />


          </div>


          <div class="col-6 q-gutter-md text-center items-center">

            <q-btn color="primary" label="Crear" />
          <q-btn color="secondary" label="Leer " />
          <q-btn color="amber" label="Actualizar" />
          <q-btn color="red" label="Borrar" />

          </div>
        </div>
      </div>
    <br/>
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        separator="cell"

      />
<br/>
<br/>

    </div>
    </q-page>
  </div>
  </template>

<script>
import { ref, onMounted } from "vue";
import { getArbitros } from "../services";
const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'id_jugadores', align: 'center', label: 'Nombre-Jugadores', field:'nombre_jugadores', sortable: true },
]

export default {
  setup () {
    return {
      separator: ref('vertical'),
      separatorOptions: [
        { label: 'Cell', value: 'cell' },
      ]
    }
  }
}
</script>

