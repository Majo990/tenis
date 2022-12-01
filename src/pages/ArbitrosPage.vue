<template>
  <div class="q-pa-md">
    <q-page padding>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="q-pa-md">
          <q-card flat class="marco col-6">
            <strong>Formulario </strong>
            <div class="row">
              <div class="col-6">
                <div class="row justify-between q-gutter-md">
                  <div>
                    <label
                      >Ingrese nombre arbitro
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      filled
                      dense
                      type="text"
                      v-model="arbitro.nombre"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese su NombreArbitr',
                      ]"
                      :onkeydown="onkeyDown"
                    />
                  </div>

                  <div>
                    <label
                      >Ingrese apellido arbitro
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      dense
                      filled
                      v-model="arbitro.apellido"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese su ApellidoArbitr',
                      ]"
                      :onkeydown="onkeyDown"
                    />
                  </div>
                  <div>
                    <label
                      >Ingrese su edad Arbitro
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      filled
                      dense
                      type="number"
                      v-model="arbitro.edad"
                    />
                  </div>
                </div>

                <div class="row justify-between q-gutter-md">
                  <div>
                    <label
                      >Ingrese su sexo Arbitro
                      <span class="text-red">*</span></label
                    >
                    <q-select
                      filled
                      v-model="arbitro.sexo"
                      dense
                      :options="sexos"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor seleccione su sexo',
                      ]"
                    />
                  </div>

                  <div>
                    <label
                      >Ingrese su Altura Arbitro
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      filled
                      v-model="arbitro.altura"
                      mask="#.##"
                      fill-mask="0"
                      dense
                      reverse-fill-mask
                      input-class="text-right"
                      suffix="m"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Por favor ingrese altura',
                        (val) =>
                          (val > 1 && val < 80) || 'Por favor ingrese altura',
                      ]"
                    ></q-input>
                  </div>

                  <div>
                    <label
                      >Ingrese su Peso Arbitro
                      <span class="text-red">*</span></label
                    >

                    <q-input
                      filled
                      v-model="arbitro.peso"
                      mask="#.##"
                      dense
                      fill-mask="0"
                      reverse-fill-mask
                      input-class="text-right"
                      suffix="kg"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val !== null && val !== '') ||
                          'Por favor ingrese su peso',
                        (val) =>
                          (val > 1 && val < 80) || 'Por favor ingrese su peso',
                      ]"
                    >
                    </q-input>
                  </div>
                </div>

                <div class="row justify-between q-gutter-md">
                  <div>
                    <label
                      >Ingrese su Fecha Arbitro
                      <span class="text-red">*</span></label
                    >
                    <q-input
                      filled
                      v-model="arbitro.fecha_nacimiento"
                      mask="date"
                      dense
                      :rules="['date']"
                      style="width: 47%"
                      lazy-rules
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date">
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>

                  <div>
                    <label
                      >Ingrese su Pais <span class="text-red">*</span></label
                    >
                    <q-select
                      filled
                      v-model="arbitro.nombre_paises"
                      dense
                      :options="paises"
                      map-options
                      emit-value
                      option-value="country"
                      option-label="country"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor seleccione su pais',
                      ]"
                    />
                  </div>
                  <div>
                    <label
                      >Ingrese su Ciudad <span class="text-red"></span
                    ></label>
                    <q-select
                      filled
                      dense
                      v-model="arbitro.nombre_ciudades"
                      :options="ciudades"
                      label="Seleccione  su  Ciudad"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) ||
                          'Por favor ingrese su Ciudad',
                      ]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>

        <div class="col-6 q-gutter-md text-center items-center">
          <q-btn
            dense
            color="primary"
            label="Crear"
            type="submit"
            icon="fa-solid fa-folder-plus"
          />
          <q-btn
            dense
            color="amber"
            label="Editar"
            @click="Actualizar"
            icon="fa-solid fa-pen-to-square"
          />
          <q-btn
            dense
            color="red"
            label="Borrar"
            @click="Delete"
            icon="fa-solid fa-trash-can"
          />
        </div>

        <br />

        <q-table
          :rows="rows"
          :columns="columns"
          separator="cell"
          dense
          row-key="id"
          selection="single"
          v-model:selected="selected"
          @selection="handleSelection"
        >
        </q-table>
      </q-form>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";
import {
  getArbitros,
  getPaises,
  crearArbitros,
  updateArbitros,
  deleteArbitros,
} from "../services";

const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "apellido",
    align: "center",
    label: "Apellido",
    field: "apellido",
    sortable: true,
  },
  {
    name: "edad",
    align: "center",
    label: "Edad",
    field: "edad",
    sortable: true,
  },
  {
    name: "sexo",
    align: "center",
    label: "Sexo",
    field: "sexo",
    sortable: true,
  },
  {
    name: "altura",
    align: "center",
    label: "Altura",
    field: "altura",
    sortable: true,
  },
  {
    name: "peso",
    align: "center",
    label: "peso",
    field: "Peso",
    sortable: true,
  },
  {
    name: "fecha_nacimiento",
    align: "center",
    label: "Fecha_Nacimiento",
    field: "fecha_nacimiento",
    sortable: true,
  },
  {
    name: "nombre_paises",
    align: "center",
    label: "Nombre-Paises",
    field: "nombre_paises",
    sortable: true,
  },
  {
    name: "nombre_ciudades",
    align: "center",
    label: "Nombre-Ciudades",
    field: "nombre_ciudades",
    sortable: true,
  },
];
const selected = ref([]);
const date = ref("2019/02/01");
const sexos = ["Femenino", "Masculino"];
const rows = ref([]);
const paises = ref([]);

const arbitro = reactive({
  id: null,
  nombre: null,
  apellido: null,
  edad: null,
  sexo: null,
  altura: null,
  peso: null,
  fecha_nacimiento: null,
  nombre_paises: null,
  nombre_ciudades: null,
});

async function onSubmit() {
  await crearArbitros(arbitro);
}

async function Actualizar() {
  await updateArbitros(arbitro);
}

async function Delete() {
  await deleteArbitros(arbitro);
}

const ciudades = computed(
  () => paises.value.find((p) => p.country === arbitro.nombre_paises)?.cities
);

onMounted(async () => {
  rows.value = await getArbitros();
  paises.value = await getPaises();
});

function onkeyDown(evt) {
  if (
    (evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105)
  ) {
    evt.preventDefault();
  }
}

function handleSelection(details) {
  let rowSelected = {
    nombre: null,
    apellido: null,
    edad: null,
    sexo: null,
    altura: null,
    peso: null,
    fecha_nacimiento: null,
    nombre_paises: null,
    nombre_ciudades: null,
  };
  if (details.added) {
    Object.assign(rowSelected, details.rows[0]);
  }

  Object.assign(arbitro, rowSelected);
}

/*const $btn = document.querySelector("q-btn"),
$form=document.querySelector("form");

 $form.addEventListener("keyup", e =>{
  let disable =false ;

  if($form.nombre.value === "") disable=true ;
  if($form.apellido.value === "") disable=true ;
  if($form.edad.value === "") disable=true ;
  if($form.sexo.value === "") disable=true ;
  if($form.altura.value === "") disable=true ;
  if($form.peso.value === "") disable=true ;
  if($form.fecha_nacimiento.value === "") disable=true ;
  if($form.nombre_paises.value === "") disable=true ;
  if($form.nombre_ciudades.value === "") disable=true;

  (disable ===true)
  ?$btn.disable = true
  :$btn.disable = false;
 })*/
</script>
<style lang="scss">
.marco {
  border-style: solid;
  border-radius: 5%;
  border-width: 1px;
  padding: 30px;
  padding-right: 150px;
  height: 50%;
}
</style>
