<template>
  <q-page padding>
    <q-form>
      <div class="q-pa-md">
        <strong>Formulario </strong>
        <div class="row">
          <div class="col-6">
            <div class="row justify-between q-gutter-md">
              <q-input
                filled
                v-model="nombrepartida"
                label="Ingrese el Nombre Partida "
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Nombre Partida',
                ]"
                style="width: 47%"
              />

              <q-input
                filled
                v-model="descriparti"
                label="Ingrese la Descripcion Partida"
                lazy-rules
                style="width: 47%"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su Descripcion',
                ]"
              />

              <div class="row justify-between q-gutter-md">
                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  style="width:80%"
                  label="Seleccione Nombre Jugadores "
                />
                <q-select
                  filled
                  v-model="model"
                  :options="options"
                  style="width: 80%"
                  label="Seleccione Nombre Torneo"
                />
              </div>

              <div class="row justify-between q-gutter-md">
              <div class="q-gutter-sm row">
                <q-input
                  filled
                  v-model="timeWithSeconds"
                  mask="fulltime"
                  hint="Tiempo-Inicio"
                  :rules="['fulltime']"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="timeWithSeconds"
                          with-seconds
                          format24h
                        >
                          <q-input
                            v-model="time"
                            filled
                            type="time"
                            hint="Tiempo-Duracion"
                          />
                        </q-time>

                          <q-input
                            filled
                            v-model="timeWithSeconds"
                            mask="fulltime"
                            hint="Tiempo-Finalizacion"
                            :rules="['fulltime']"
                          >
                            <template v-slot:append>
                              <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy
                                  cover
                                  transition-show="scale"
                                  transition-hide="scale"
                                >
                                  <q-time
                                    v-model="timeWithSeconds"
                                    with-seconds
                                    format24h
                                  >
                                  </q-time>

                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                    />
                                  </div>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </q-time>
                    </div>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPartidas } from "../services";
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
    name: "descripcion",
    align: "center",
    label: "Descripcion",
    field: "descripcion",
    sortable: true,
  },
  {
    name: "id_jugadores",
    align: "center",
    label: "Nombre_Jugadores",
    field: "nombre_jugadores",
    sortable: true,
  },
  {
    name: "id_torneos",
    align: "center",
    label: "Nombre-Torneos",
    field: "nombre_torneos",
    sortable: true,
  },
  {
    name: "fecha",
    align: "center",
    label: "Fecha",
    field: "fecha",
    sortable: true,
  },
  {
    name: "tiempo_inicio",
    align: "center",
    label: "Tiempo_Inicio",
    field: "tiempo_inicio",
    sortable: true,
  },
  {
    name: "tiempo_duracion",
    align: "center",
    label: "Tiempo_Duracion",
    field: "tiempo_duracion",
    sortable: true,
  },
  {
    name: "tiempo_fin",
    align: "center",
    label: "Tiempo_Fin",
    field: "tiempo_fin",
    sortable: true,
  },
  {
    name: "id_rondas",
    align: "center",
    label: "Nro-Rondas",
    field: "nro_rondas",
    sortable: true,
  },

];

const rows = ref([]);

onMounted(async () => {
  rows.value = await getPartidas();
});
</script>
