<template>
  <q-page> </q-page>
</template>
<script>
export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);

    return {
      model: ref(null),
      optionsPeru: ["Sullana", "Sechura", "Callao", "Paita", "Talara", "Olmos"],

      modelo: ref(null),
      Ecuador: ["EL oro", "Galapagos", "Esmeraldas"],

      modele: ref(null),
      Bolivia: ["La Paz", "Cochabamba", "Oruco"],

      mode: ref(null),
      Argentina: ["La plata", "Chaco", "Catamarca"],

      mod: ref(null),
      Chile: ["Arica", "La Serena", "Santiago", "Iquique"],

      models: ref(null),
      paises: ["Ecuador", "Peru", "Paris", "Argentina", "Chile", "Bolivia"],
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
