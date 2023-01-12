<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="!$route.path.includes('login')">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-btn
          @click="$q.dark.set(!$q.dark.mode)"
          flat
          round
          :icon="$q.dark.mode ? 'fa-regular fa-moon' : 'fa-solid fa-moon'"
        />

        <q-toolbar-title> {{ $route.path.replace("/", "") }} </q-toolbar-title>

        <div class="row q-gutter-md justify-center items-center text-center">

       <!---muestra usuarios el nombre del usuario  que se a logueado -->
          <span>
            {{ user.usuarios }}
          </span>

          <q-btn flat round dense icon="logout" @click="logout" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="!$route.path.includes('login')"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list dense>
        <q-item-label header> Seleccione </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useUserStore } from "src/stores/auth";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Home",
    icon: "mdi-align-horizontal-right",
    link: "/Home",
  },

  {
    title: "Arbitros",
    icon: "mdi-account-tie-outline",
    link: "/Arbitros",
  },
  {
    title: "Comportamientos",
    icon: "mdi-account-edit",
    link: "/Comportamientos",
  },
  {
    title: "Entrenadores",
    icon: "mdi-account-cowboy-hat",
    link: "/Entrenadores",
  },

  {
    icon: "mdi-account-group",
    title: "Equipos",
    link: "/Equipos",
  },

  {
    title: "Estadios",
    icon: "mdi-crop-landscape",
    link: "/Estadios",
  },
  {
    title: "Eventos",
    icon: "mdi-alpha-e-box",
    link: "/Eventos",
  },

  {
    title: "Faltas",
    icon: "mdi-alert-circle",
    link: "/Faltas",
  },

  {
    title: "Historial-Partidas",
    icon: "mdi-book-search-outline",
    link: "/Historial-Partidas",
  },

  {
    title: "Jueces",
    icon: "mdi-account-tie",
    link: "/Jueces",
  },

  {
    title: "Jugadores",
    icon: "mdi-tennis",
    link: "/Jugadores",
  },

  {
    title: "Partidas",
    icon: "mdi-gamepad",
    link: "/Partidas",
  },

  {
    title: "Partidas-Jugadores",
    icon: "mdi-tennis-ball",
    link: "/Partidas-Jugadores",
  },

  {
    title: "Estadios-Partidas",
    icon: "mdi-square-rounded-outline",
    link: "/estadios_partidas",
  },

  {
    title: "Puntajes",
    icon: "mdi-numeric-3-box",
    link: "/Puntajes",
  },

  {
    title: "Premios",
    icon: "fa-solid fa-trophy",
    link: "/Premios",
  },

  {
    title: "Rondas",
    icon: "mdi-alpha-r-circle",
    link: "/Rondas",
  },

  {
    title: "Sanciones",
    icon: "mdi-alpha-s-box",
    link: "/Sanciones",
  },
  {
    title: "Torneos",
    icon: "mdi-alpha-t-circle",
    link: "/Torneos",
  },

  {
    title: "Usuarios",
    icon: "mdi-account",
    link: "/Usuarios",
  },

  {
    title: "Permisos",
    icon: "mdi-page-layout-body",
    link: "/Permisos",
  },

  {
    title: "Perfiles",
    icon: "mdi-badge-account",
    link: "/Perfiles",
  },

  {
    title: "Roles",
    icon: "mdi-hail",
    link: "/Roles",
  },  
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const userStore = useUserStore();

    const user = computed(() => userStore.user);

    function logout() {
      userStore.logout();
      router.replace("/login");
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
      user,
    };
  },
});
</script>
<style>
.equipos-icon {
  text-align: right;
  margin: 100px, 10, 50, 20;
  text-align: left;
}
</style>
