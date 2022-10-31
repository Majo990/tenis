
<template>
  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">

      <q-select filled v-model="model" :options="options" label="Filled" />

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      model: ref(null),
      options: [
        'Piura', 'Lima', 'Chiclayo', 'Sullana', 'Talara','Chiclayo'
      ]
    }
  }
}
</script>
