<template>
  <q-page padding>
    <div class="absolute-center text-center">
      <!---<q-img
        class="ims"  src="https://png.pngtree.com/thumb_back/fw800/background/20190223/ourmid/pngtree-fresh-tennis-sports-advertising-background-backgroundhand-paintedmotiontennis-racketfreshpaintedbranchsimple-image_73519.jpg"

        />-->

      <h5>Login Usuario</h5>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-pa-md q-gutter-md login img"
      >
        <q-icon name="mdi-account" size="md" color="blue" />
        <q-input v-model="usuario" type="text" dark label="Usuario" dense />
        <!--<q-icon name="lock"--><q-input
          v-model="password"
          type="password"
          dark
          label="Password"
          dense
        />
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
  border-width: 1px;
  border-style: solid;
  border-radius: 10%;
}
.img {
  background-image: url("https://imagenesfrasesbonitas.net/wp-content/uploads/2018/08/FondosPantalla53.jpg");
}
h5 {
  color: blue;
}
</style>
