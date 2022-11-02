<template>
  <div class="q-pa-md">
    <strong>Formulario </strong>
    <div class="q-gutter-md row items-start">
      <q-input v-model="usuario" filled type="usuario" hint="Usuario" />

      <q-input v-model="password" filled type="password" hint="Password" />

      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Password with toggle"
      >
        <template v-slot:append> </template>
      </q-input>
      <q-btn color="primary" label="Crear" />
      <q-btn color="secondary" label="Leer " />
      <q-btn color="amber" label="Actualizar" />
      <q-btn color="red" label="Borrar" />
    </div>
    <br />
    <br/>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="vertical"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
/*
export default {
  setup() {
    const rows = ref([]);

    onMounted(async () => {
      rows.value = await getUsuarios();
    });
    return {
      columns,
      rows,
      password: ref(""),
      isPwd: ref(true),

      usuario: ref(""),
      search: ref(""),
      tel: ref(""),
      url: ref(""),
      time: ref(""),
      date: ref(""),
    };
  },
};*/
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
