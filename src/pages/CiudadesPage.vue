<template>
  <q-page> </q-page>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);

    return {
      model: ref(null),
      optionsPeru: ["Piura", "Lima", "Chiclayo", "Tumbes", "Trujillo", "Tacna"],

      modelo: ref(null),
      Ecuador: ["Quito", "Guayaquil", "Cuenca", "Manta"],

      modele: ref(null),
      Bolivia: ["La Paz", "SantaCruz", "Sucre"],

      mode: ref(null),
      Argentina: ["Buenos Aires", "Mar del Plata", "Ciudad Cordova"],

      mod: ref(null),
      Chile: [
        "Punta Arenas",
        "Puerto Varas",
        "Gran Santiago",
        "Gran Valparaiso",
      ],

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },
      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<style></style>
