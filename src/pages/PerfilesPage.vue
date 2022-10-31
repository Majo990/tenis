<template>
  <div class="modelo">
  <div class="q-pa-md" style="max-width: 200px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="name"
        label="*"
        hint="Ingrese su Nombre "
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor ingrese su Nombre']"
      />

      <q-input
        filled
        v-model="apellido"
        label="*"
        hint="Ingrese su Apellido "
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor ingrese su Apellido']"
      />

      <q-input
        filled
        type="number"
        v-model="age"
        label="Selecione Edad"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your age',
          val => val > 0 && val < 100 || 'Por favor selecione su edad'
        ]"
      />
      <div class="q-gutter-md">

<q-select filled v-model="model" :options="options" label="Seleccione sexo " />

  </div>

  <q-select filled v-model="models" :options="options" label="Seleccione su Pais" />

  <q-input
        filled
        v-model="ciudad"
        label="*"
        hint="Ingrese su Ciudad "
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor ingrese su Ciudad']"
      />

      <q-input
      ref="inputRef"
      filled
      v-model="model"
      label="Ingrese su DNI"
      :rules="[ val => val.length <= 8 || 'Por favor ingrse su DNI']"
    />

      <q-input
        filled
        v-model="nacionalidad"
        label="*"
        hint="Ingrese su Nacionalidad "
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor ingrese su Nacionalidad']"
      />

      <q-input v-model="email" filled type="email" hint="Email" />

      <q-input dark standout bottom-slots v-model="text" label="Ingrese Direccion " counter :readonly="readonly" :disable="disable">
        <template v-slot:prepend>
          <q-icon name="place" />
        </template>
        <template v-slot:append>
          <q-icon name="close" @click="text = ''" class="cursor-pointer" />
        </template>
        </q-input>

      <q-input
        filled
        v-model="phone"
        label="N° Celular"
        mask="(+##) ### - ###- ###"
        hint="Mask: (+##) ### - ###-###"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Por N°Celular',
          val => val > 0 && val < 100 || 'Por favor ingrese su N°Celular'
        ]"

      />


      <q-input
      ref="inputRef"
      filled
      v-model="model"
      label="Ingrese su Cod.Postal"
      :rules="[ val => val.length <= 8 || 'Por favor ingrse su Cod.Postal']"
    />


      <q-toggle v-model="accept" label="Acepte terminos y condiciones " />

      <div>
        <q-btn label="Enviar" type="submit" color="info"/>
        <q-btn label="Restablecer" type="reset" color="negative" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)

    return {
      model: ref(null),
      options: [
        'Femenino', 'Masculino'],

        models:ref(null),
        pais: [
          'Ecuador','Peru','Paris','Argentina','Chile','Bolivia'],


      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        name.value = null
        age.value = null
        accept.value = false
      }

    }

  }

  }

</script>

<style>
.modelo{
  background-color:#fff67f;
}
</style>
nombre,
apellido
,edad,sexo,
pais,ciudad
,dni
 ,nacionalidad,email,
direccion ,
celular codigo
postal
id
_usuarios
