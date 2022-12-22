const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/home",
      },
      { path: "/login", component: () => import("pages/LoginPage.vue") },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/home",
        component: () => import("pages/HomePage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/formulario",
        component: () => import("pages/FormularioPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/arbitros",
        component: () => import("pages/ArbitrosPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/usuarios",
        component: () => import("pages/UsuariosPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/perfiles",
        component: () => import("pages/PerfilesPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/comportamientos",
        component: () => import("pages/ComportamientosPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/entrenadores",
        component: () => import("pages/EntrenadoresPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/equipos",
        component: () => import("pages/EquiposPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/estadios",
        component: () => import("pages/EstadiosPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/eventos",
        component: () => import("pages/EventosPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/faltas",
        component: () => import("pages/FaltasPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/historial-partidas",
        component: () => import("pages/Historial-PartidasPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/jueces",
        component: () => import("pages/JuecesPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/jugadores",
        component: () => import("pages/JugadoresPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/partidas",
        component: () => import("pages/PartidasPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/partidas-jugadores",
        component: () => import("pages/Partidas-JugadoresPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/premios",
        component: () => import("pages/PremiosPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/rondas",
        component: () => import("pages/RondasPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/sanciones",
        component: () => import("pages/SancionesPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/torneos",
        component: () => import("pages/TorneosPage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/roles",
        component: () => import("pages/RolesPage.vue"),
      },

      {
        meta: {
          requiresAuth: true,
        },
        path: "/usuario",
        component: () => import("pages/UsuarioTablePage.vue"),
      },
      {
        meta: {
          requiresAuth: true,
        },
        path: "/permisos",
        component: () => import("pages/PermisosPage.vue"),
      },
      {
        path: "/permisos_roles",
        meta: {
          requiresAuth: true,
        },
        component: () => import("pages/Permisos-RolesPage.vue"),
      },
//
      {
        path: "/canchas_estadios_partidas",
        meta: {
          requiresAuth: true,
        },
        component: () => import("pages/Estadios-PartidasPage.vue"),
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
