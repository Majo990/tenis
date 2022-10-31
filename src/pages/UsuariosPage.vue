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
    </div>
    <br />
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="vertical"
    />
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
  {
    name: "id_sanciones",
    align: "center",
    label: "Nombre-Sanciones",
    field: "nombre_sanciones",
    sortable: true,
  },
];

export default {
  setup() {
    const rows = ref([]);

    onMounted(async () => {
      rows.value = await getArbitros();
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
};
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
