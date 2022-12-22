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
  const r = await login(usuario.value, password.value);
  console.log({ r });
  if (r) {
    replace({ path: "/home" });
  } else {
    Notify.create({
      message: "Credenciales incorrectas",
      type: "negative",
    });
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
  padding: 2rem;
}
.img {
  background-color: $yellow-6;
}

h5 {
  color: blue;
}

.q-page {
  background-image: url("../assets/img/tenis.jpg");
}

.q-form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(5, 238, 219, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

.form-label {
  margin-top: 2rem;
  color: white;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-submit {
  background: #1ab188;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0b9185;
  }
}

.q-avatar {
  text-align: center;
  max-width: 300px;
}
</style>
