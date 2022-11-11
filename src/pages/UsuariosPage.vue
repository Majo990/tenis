<template>
  <div class="q-pa-md">
    <strong>Formulario </strong>
    <div class="q-gutter-md row items-start">
      <q-input dense v-model="usuario" filled type="usuario" hint="Usuario" />

      <q-input dense v-model="password" filled type="password" hint="Password" />

      <q-input
      dense
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Password with toggle"
      >
        <template v-slot:append> </template>
      </q-input>
      <q-btn dense color="primary" label="Crear" />
      <q-btn  dense color="secondary" label="Leer " />
      <q-btn dense color="amber" label="Actualizar" />
      <q-btn dense color="red" label="Borrar" />
    </div>
    <br />
    <br />
    <q-table dense :rows="rows" :columns="columns" row-key="name" separator="cell" />
  </div>
</template>

<script setup>
import { ref,onMounted} from "vue";
import { getUsuarios} from "../services";
const columns = [
  {
    name: "usuarios",
    required: true,
    label: "Usuarios",
    align: "left",
    field: "usuarios",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "id_roles",
    align: "center",
    label: "Descripcion-Roles",
    field: "descripcion_roles",
    sortable: true,
  },
];
const rows = ref([]);

onMounted(async () => {
  rows.value = await getUsuarios();
});

</script>

<style>
h3 {
  color: rgb(28, 234, 241);
  -webkit-text-stroke: 1.5px rgb(198, 11, 245);
}
.q-gutter-md row items-start {
  color: beige;
}
</style>
