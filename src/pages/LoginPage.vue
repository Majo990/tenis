<template>
  <q-page padding>
    <div class="absolute-center text-center">
      <h5>Login Usuario</h5>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-pa-md q-gutter-md login img"
      >
        <q-avatar>
          <img
            src="https://th.bing.com/th/id/R.63884fb3108305aa0824560946fe81c6?rik=ut82%2fXweWRqbZA&pid=ImgRaw&r=0"
          />
        </q-avatar>

        <!---- <q-input square clearable v-model="username" type="text" dense  label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
        </q-input>-->
        <q-input
          v-model="usuario"
          type="text"
          label="Usuario"
          dense
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor ingrese su Usuario',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>

        <q-input
          v-model="password"
          type="password"

          label="Password"
          dense
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Por favor ingrese su Contraseña',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-lock" />
          </template>
        </q-input>

        <q-btn
          class="glossy"
          no_caps
          rounded
          color="light-blue-5"
          label="Login"
          @click="onSubmit"
        />

        <q-btn
          class="glossy"
          no_caps
          rounded
          background-color:black
          color="red"
          label="Cancelar"
          no-caps
          onclick=""
        />

        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { login } from "src/services";
import { Notify } from "quasar";
import { useRouter } from "vue-router";

const usuario = ref(null);
const password = ref(null);
const { replace } = useRouter();

async function onSubmit() {
  console.log("submit");
  const r = await login(usuario.value, password.value);

  Notify.create({
    message: r,
    type: "positive",
  });

  if (r === "Login correcto") {
    replace("/home");
  }
}

function onReset() {
  console.log("reset");
}




</script>
<style lang="scss">
.login {
  border-width: 1px; //1
  border-style: solid; //solid
  border-radius: 10%; //10%
}
.img {
  background-image: url("https://th.bing.com/th/id/OIF.crbBO07hjsfeNXLSspdxjA?pid=ImgDet&rs=1");
}

h5 {
  color: blue;
}

.q-page {
  background-image: url("../assets/img/tenis.jpg");
}

/*
{
  border-style::first-line
}/*
</style>
