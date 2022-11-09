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

        <div class="row q-gutter-md justify-center text-center">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>

          <span> usuario1 </span>

          <q-btn
            flat
            round
            dense
            icon="logout"
            @click="$router.replace('/login')"
          />
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
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

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
    icon: "mdi-account-group",
    title: "Equipos",
    link: "/Equipos",
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

  {
    title: "Paises",
    icon: "fa-solid fa-earth-americas",
    link: "/Paises",
  },

  {
    title: "Ciudades",
    icon: "fa-solid fa-city",
    link: "/Ciudades",
  },

  {
    title: "Provincia",
    icon: "fa-solid fa-flag"


  },

];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
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
