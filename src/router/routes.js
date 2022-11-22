const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/login",
        component: () => import("pages/IndexPage.vue"),
      },
      { path: "/login", component: () => import("pages/LoginPage.vue") },
      { path: "/home", component: () => import("pages/HomePage.vue") },
      {
        path: "/formulario",
        component: () => import("pages/FormularioPage.vue"),
      },
      { path: "/arbitros", component: () => import("pages/ArbitrosPage.vue") },
      { path: "/usuarios", component: () => import("pages/UsuariosPage.vue") },
      { path: "/perfiles", component: () => import("pages/PerfilesPage.vue") },
      {
        path: "/comportamientos",
        component: () => import("pages/ComportamientosPage.vue"),
      },
      {
        path: "/entrenadores",
        component: () => import("pages/EntrenadoresPage.vue"),
      },
      { path: "/equipos", component: () => import("pages/EquiposPage.vue") },
      { path: "/estadios", component: () => import("pages/EstadiosPage.vue") },
      { path: "/eventos", component: () => import("pages/EventosPage.vue") },
      { path: "/faltas", component: () => import("pages/FaltasPage.vue") },
      {
        path: "/historial-partidas",
        component: () => import("pages/Historial-PartidasPage.vue"),
      },
      { path: "/jueces", component: () => import("pages/JuecesPage.vue") },
      {
        path: "/jugadores",
        component: () => import("pages/JugadoresPage.vue"),
      },
      { path: "/partidas", component: () => import("pages/PartidasPage.vue") },
      {
        path: "/partidas-jugadores",
        component: () => import("pages/Partidas-JugadoresPage.vue"),
      },
      { path: "/premios", component: () => import("pages/PremiosPage.vue") },
      { path: "/rondas", component: () => import("pages/RondasPage.vue") },
      {
        path: "/sanciones",
        component: () => import("pages/SancionesPage.vue"),
      },
      { path: "/torneos", component: () => import("pages/TorneosPage.vue") },
      { path: "/roles", component: () => import("pages/RolesPage.vue") },

      {
        path: "/usuario",
        component: () => import("pages/UsuarioTablePage.vue"),
      },
      { path: "/permisos", component: () => import("pages/PermisosPage.vue") },
      {
        path: "/permisos-roles",
        component: () => import("pages/Permisos-RolesPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
