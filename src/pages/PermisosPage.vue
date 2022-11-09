<template>
  <q-page padding>
    <div class="q-pa-md">
      <q-form  @submit="onSubmit" @reset="onReset" class="q-gutter-md">

      <strong>Formulario </strong>
      <div class="row">
        <div class="col-6">
          <div class="row justify-between q-gutter-md">

            <q-input
              filled
              v-model="nombreusuarios"
              label="Ingrese el Nombre-Usuarios"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre-Usuarios',
              ]"
            />


            <q-input
              filled
              v-model="descripcion"
              label="Ingrese su Descripcion "
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Descripcion',
              ]"
              style="width: 47%"
            />

            <q-input
              filled
              v-model="nombreroles"
              label="Ingrese el Nombre-Roles"
              lazy-rules
              style="width: 47%"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor ingrese su Nombre-Roles',
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

      </q-form>

<br/>
      <q-table :rows="rows" :columns="columns" row-key="name"  separator="cell"/>
    </div>
  </q-page>
</template>

<script setup>
import{ref,onMounted} from "vue";
import {getPermisos} from "src/services";

const columns = [
  {
    name: "id_usuarios",
    required: true,
    label: "Nombre-Usuarios",
    align: "left",
    field: "usuarios_usuarios",
    sortable: true,
  },
  {
    name: "descripcion",
    align: "center",
    label: "Descripcion",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "id_roles",
    align: "center",
    label: "Nombre-Roles",
    field: "descripcion_roles",
    sortable: true,
  },
];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getPermisos();
});
</script>
<style>
.q-table {
  color: rgb(128, 128, 128);
  background-color: #20b393;
}
</style>
