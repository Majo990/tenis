import { Cookies } from "quasar";
import { api } from "./boot/axios";
import { useUserStore } from "stores/auth";

const userStore = useUserStore();

export async function login(usuario, password) {
  try {
    const r = await api.post("/login", {
      usuario,
      password,
    });

    if (r.data.token) {
      Cookies.set("token", r.data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${r.data.token}`;
      userStore.user = r.data.user;
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    userStore.user = null;
  }
}

// api
export async function getJugadores() {
  const r = await api.get("/api/jugadores");
  return r.data;
}

export async function getArbitros() {
  const r = await api.get("/api/arbitros");
  return r.data;
}
//
export async function crearArbitros(params) {
  const r = await api.post("/api/arbitros", params);
  return r.data;
}

export async function updateArbitros(arbitro) {
  const r = await api.put("/api/arbitros/" + arbitro.id, arbitro);
  return r.data;
}

export async function deleteArbitros(params) {
  const r = await api.delete("/api/arbitros/" + params.id, params);
  return r.data;
} //

//

export async function getComportamientos() {
  const r = await api.get("/api/comportamientos");
  return r.data;
}

export async function crearComportamientos(params) {
  const r = await api.post("/api/comportamientos", params);
  return r.data;
}

export async function updateComportamientos(comportamiento) {
  const r = await api.put(
    "/api/comportamientos/" + comportamiento.id,
    comportamiento
  );
  return r.data;
}

export async function deleteComportamientos(params) {
  const r = await api.delete("/api/comportamientos/" + params.id, params);
  return r.data;
}

//

//
export async function getEntrenadores() {
  const r = await api.get("/api/entrenadores");
  return r.data;
}
export async function crearEntrenadores(params) {
  const r = await api.post("/api/entrenadores", params);
  return r.data;
}

export async function updateEntrenadores(entrenador) {
  const r = await api.put("/api/entrenadores/" + entrenador.id, entrenador);
  return r.data;
}

export async function deleteEntrenadores(params) {
  const r = await api.delete("/api/entrenadores/" + params.id, params);
  return r.data;
}

//

//
export async function getEquipos() {
  const r = await api.get("/api/equipos");
  return r.data;
}
export async function crearEquipos(params) {
  const r = await api.post("/api/equipos", params);
  return r.data;
}
export async function updateEquipos(equipo) {
  const r = await api.put("/api/equipos/" + equipo.id, equipo);
  return r.data;
}

export async function deleteEquipos(params) {
  const r = await api.delete("/api/equipos/" + params.id, params);
  return r.data;
}

//
export async function getEstadios() {
  const r = await api.get("/api/estadios");
  return r.data;
}

export async function crearEstadios(params) {
  const r = await api.post("/api/estadios", params);
  return r.data;
}
export async function updateEstadios(estadio) {
  const r = await api.put("/api/estadios/" + estadio.id, estadio);
  return r.data;
}

export async function deleteEstadios(params) {
  const r = await api.delete("/api/estadios/" + params.id, params);
  return r.data;
}
///

export async function getEventos() {
  const r = await api.get("/api/eventos");
  return r.data;
}

export async function crearEventos(params) {
  const r = await api.post("/api/eventos", params);
  return r.data;
}

export async function updateEventos(evento) {
  const r = await api.put("/api/eventos/" + evento.id, evento);
  return r.data;
}

export async function deleteEventos(params) {
  const r = await api.delete("/api/eventos/" + params.id, params);
  return r.data;
}

//

export async function getFaltas() {
  const r = await api.get("/api/faltas");
  return r.data;
}

export async function crearFaltas(params) {
  const r = await api.post("/api/faltas", params);
  return r.data;
}
export async function updateFaltas(falta) {
  const r = await api.put("/api/faltas/" + falta.id, falta);
  return r.data;
}

export async function deleteFaltas(params) {
  const r = await api.delete("/api/faltas/" + params.id, params);
  return r.data;
}

//

export async function getHistorialPartidas() {
  const r = await api.get("/api/historial_partidas");
  return r.data;
}

export async function crearHistorialPartidas(params) {
  const r = await api.post("/api/historial_partidas", params);
  return r.data;
}

export async function updateHistorialPartidas(historial_partida) {
  const r = await api.put(
    "/api/historial_partidas/" + historial_partida.id,
    historial_partida
  );
  return r.data;
}

export async function deleteHistorialPartidas(params) {
  const r = await api.delete("/api/historial_partidas/" + params.id, params);
  return r.data;
}

//

export async function getJueces() {
  const r = await api.get("/api/jueces");
  return r.data;
}

export async function crearJueces(params) {
  const r = await api.post("/api/jueces", params);
  return r.data;
}

export async function updateJueces(juez) {
  const r = await api.put("/api/jueces/" + juez.id, juez);
  return r.data;
}

export async function deleteJueces(params) {
  const r = await api.delete("/api/jueces/" + params.id, params);
  return r.data;
}
///
export async function getHome() {
  const r = await api.get("/api/jugadores");
  return r.data;
}

export async function crearJugadores(params) {
  const r = await api.post("/api/jugadores", params);
  return r.data;
}
export async function updateJugadores(jugador) {
  const r = await api.put("/api/jugadores/" + jugador.id, jugador);
  return r.data;
}

export async function deleteJugadores(params) {
  const r = await api.delete("/api/jugadores/" + params.id, params);
  return r.data;
}
///

export async function getPartidas() {
  const r = await api.get("/api/partidas");
  return r.data;
}

export async function crearPartidas(params) {
  const r = await api.post("/api/partidas", params);
  return r.data;
}

export async function updatePartidas(partida) {
  const r = await api.put("/api/partidas/" + partida.id, partida);
  return r.data;
}

export async function deletePartidas(params) {
  const r = await api.delete("/api/partidas/" + params.id, params);
  return r.data;
}

//
export async function getPartidasJugadores() {
  const r = await api.get("/api/partidas_jugadores");
  return r.data;
}

export async function crearPartidasJugadores(params) {
  const r = await api.post("/api/partidas_jugadores", params);
  return r.data;
}

export async function updatePartidasJugadores(partidajugador) {
  const r = await api.put(
    "/api/partidas_jugadores/" + partidajugador.id,
    partidajugador
  );
  return r.data;
}

export async function deletePartidasJugadores(params) {
  const r = await api.delete("/api/partidas_jugadores/" + params.id, params);
  return r.data;
}
///
export async function getPremios() {
  const r = await api.get("/api/premios");
  return r.data;
}

export async function crearPremios(params) {
  const r = await api.post("/api/premios", params);
  return r.data;
}

export async function updatePremios(premio) {
  const r = await api.put("/api/premios/" + premio.id, premio);
  return r.data;
}

export async function deletePremios(params) {
  const r = await api.delete("/api/premios/" + params.id, params);
  return r.data;
}

///
export async function getRondas() {
  const r = await api.get("/api/rondas");
  return r.data;
}

export async function crearRondas(params) {
  const r = await api.post("/api/rondas", params);
  return r.data;
}

export async function updateRondas(ronda) {
  const r = await api.put("/api/rondas/" + ronda.id, ronda);
  return r.data;
}

export async function deleteRondas(params) {
  const r = await api.delete("/api/rondas/" + params.id, params);
  return r.data;
}

///

export async function getSanciones() {
  const r = await api.get("/api/sanciones");
  return r.data;
}
export async function crearSanciones(params) {
  const r = await api.post("/api/sanciones", params);
  return r.data;
}

export async function updateSanciones(sancion) {
  const r = await api.put("/api/sanciones/" + sancion.id, sancion);
  return r.data;
}

export async function deleteSanciones(params) {
  const r = await api.delete("/api/sanciones/" + params.id, params);
  return r.data;
}
///

export async function getTorneos() {
  const r = await api.get("/api/torneos");
  return r.data;
}
export async function crearTorneos(params) {
  const r = await api.post("/api/torneos", params);
  return r.data;
}
export async function updateTorneos(torneo) {
  const r = await api.put("/api/torneos/" + torneo.id, torneo);
  return r.data;
}

export async function deleteTorneos(params) {
  const r = await api.delete("/api/torneos/" + params.id, params);
  return r.data;
}

///
export async function getUsuarios() {
  const r = await api.get("/api/usuarios");
  return r.data;
}
export async function crearUsuarios(params) {
  const r = await api.post("/api/usuarios", params);
  return r.data;
}

export async function updateUsuarios(usuario) {
  const r = await api.put("/api/usuarios/" + usuario.id, usuario);
  return r.data;
}

export async function deleteUsuarios(params) {
  const r = await api.delete("/api/usuarios/" + params.id, params);
  return r.data;
}

///
export async function getPermisos() {
  const r = await api.get("/api/permisos");
  return r.data;
}
export async function crearPermisos(params) {
  const r = await api.post("/api/permisos", params);
  return r.data;
}

export async function updatePermisos(permiso) {
  const r = await api.put("/api/permisos/" + permiso.id, permiso);
  return r.data;
}

export async function deletePermisos(params) {
  const r = await api.delete("/api/permisos/" + params.id, params);
  return r.data;
}

//

///
export async function getPermisosRoles() {
  const r = await api.get("/api/permisos_roles");
  return r.data;
}
export async function crearPermisosRoles(params) {
  const r = await api.post("/api/permisos_roles", params);
  return r.data;
}

export async function updatePermisosRoles(permisorol) {
  const r = await api.put("/api/permisos_roles/" + permisorol.id, permisorol);
  return r.data;
}

export async function deletePermisosRoles(params) {
  const r = await api.delete("/api/permisos_roles/" + params.id, params);
  return r.data;
}

///

export async function getPerfiles() {
  const r = await api.get("/api/perfiles");
  return r.data;
}

export async function crearPerfiles(params) {
  const r = await api.post("/api/perfiles", params);
  return r.data;
}

export async function updatePerfiles(perfil) {
  const r = await api.put("/api/perfiles/" + perfil.id, perfil);
  return r.data;
}

export async function deletePerfiles(params) {
  const r = await api.delete("/api/perfiles/" + params.id, params);
  return r.data;
}

///
export async function getRoles() {
  const r = await api.get("/api/roles");
  return r.data;
}

export async function crearRoles(params) {
  const r = await api.post("/api/roles", params);
  return r.data;
}

export async function updateRoles(rol) {
  const r = await api.put("/api/roles/" + rol.id, rol);
  return r.data;
}

export async function deleteRoles(params) {
  const r = await api.delete("/api/roles/" + params.id, params);
  return r.data;
}

// deportes

export async function getDeportes() {
  const r = await api.get("/api/deportes");
  return r.data;
}

export async function crearDeportes(params) {
  const r = await api.post("/api/deportes", params);
  return r.data;
}

export async function updateDeportes(deportes) {
  const r = await api.put("/api/deportes/" + deportes.id, deportes);
  return r.data;
}

export async function deleteDeportes(params) {
  const r = await api.delete("/api/deportes/" + params.id, params);
  return r.data;
}

//
export async function getPaises() {
  const r = await api.get("/api/paises");
  return r.data;
}
