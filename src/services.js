import { api } from "./boot/axios";

export async function login(usuario, password) {
  const r = await api.post("/login", {
    usuario,
    password,
  });

  // const r = await fetch("http://localhost:3000/login", {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   mode: "cors",
  //   cache: "no-cache",
  //   body: { usuario, password },
  //   method: "POST",
  // });
  console.log(r);
  return r.data;
}

export async function getJugadores() {
  const r = await api.get("/jugadores");
  return r.data;
}

export async function getArbitros() {
  const r = await api.get("/arbitros");
  return r.data;
}
//
export async function crearArbitros(params) {
  const r = await api.post("/arbitros", params);
  return r.data;
}

export async function updateArbitros(arbitro) {
  const r = await api.put("/arbitros/" + arbitro.id, arbitro);
  return r.data;
}

export async function deleteArbitros(params) {
  const r = await api.delete("/arbitros/" + params.id, params);
  return r.data;
} //

//

export async function getComportamientos() {
  const r = await api.get("/comportamientos");
  return r.data;
}

export async function crearComportamientos(params) {
  const r = await api.post("/comportamientos", params);
  return r.data;
}

export async function updateComportamientos(comportamiento) {
  const r = await api.put(
    "/comportamientos/" + comportamiento.id,
    comportamiento
  );
  return r.data;
}

export async function deleteComportamientos(params) {
  const r = await api.delete("/comportamientos/" + params.id, params);
  return r.data;
}

//

//
export async function getEntrenadores() {
  const r = await api.get("/entrenadores");
  return r.data;
}
export async function crearEntrenadores(params) {
  const r = await api.post("/entrenadores", params);
  return r.data;
}

export async function updateEntrenadores(entrenador) {
  const r = await api.put("/entrenadores/" + entrenador.id, entrenador);
  return r.data;
}

export async function deleteEntrenadores(params) {
  const r = await api.delete("/entrenadores/" + params.id, params);
  return r.data;
}

//

//
export async function getEquipos() {
  const r = await api.get("/equipos");
  return r.data;
}
export async function crearEquipos(params) {
  const r = await api.post("/equipos", params);
  return r.data;
}
export async function updateEquipos(equipo) {
  const r = await api.put("/equipos/" + equipo.id, equipo);
  return r.data;
}

export async function deleteEquipos(params) {
  const r = await api.delete("/equipos/" + params.id, params);
  return r.data;
}

//
export async function getEstadios() {
  const r = await api.get("/estadios");
  return r.data;
}

export async function crearEstadios(params) {
  const r = await api.post("/estadios", params);
  return r.data;
}
export async function updateEstadios(estadio) {
  const r = await api.put("/estadios/" + estadio.id, estadio);
  return r.data;
}

export async function deleteEstadios(params) {
  const r = await api.delete("/estadios/" + params.id, params);
  return r.data;
}
///

export async function getEventos() {
  const r = await api.get("/eventos");
  return r.data;
}

export async function crearEventos(params) {
  const r = await api.post("/eventos", params);
  return r.data;
}

export async function updateEventos(evento) {
  const r = await api.put("/eventos/" + evento.id, evento);
  return r.data;
}

export async function deleteEventos(params) {
  const r = await api.delete("/eventos/" + params.id, params);
  return r.data;
}

//

export async function getFaltas() {
  const r = await api.get("/faltas");
  return r.data;
}

export async function crearFaltas(params) {
  const r = await api.post("/faltas", params);
  return r.data;
}
export async function updateFaltas(falta) {
  const r = await api.put("/faltas/" + falta.id, falta);
  return r.data;
}

export async function deleteFaltas(params) {
  const r = await api.delete("/faltas/" + params.id, params);
  return r.data;
}

//

export async function getHistorialPartidas() {
  const r = await api.get("/historial_partidas");
  return r.data;
}

export async function crearHistorialPartidas(params) {
  const r = await api.post("/historial_partidas", params);
  return r.data;
}

export async function updateHistorialPartidas(historial_partida) {
  const r = await api.put(
    "/historial_partidas/" + historial_partida.id,
    historial_partida
  );
  return r.data;
}

export async function deleteHistorialPartidas(params) {
  const r = await api.delete("/historial_partidas/" + params.id, params);
  return r.data;
}

//

export async function getJueces() {
  const r = await api.get("/jueces");
  return r.data;
}

export async function crearJueces(params) {
  const r = await api.post("/jueces", params);
  return r.data;
}

export async function updateJueces(juez) {
  const r = await api.put("/jueces/" + juez.id, juez);
  return r.data;
}

export async function deleteJueces(params) {
  const r = await api.delete("/jueces/" + params.id, params);
  return r.data;
}
///
export async function getHome() {
  const r = await api.get("/jugadores");
  return r.data;
}

export async function crearJugadores(params) {
  const r = await api.post("/jugadores", params);
  return r.data;
}
export async function updateJugadores(jugador) {
  const r = await api.put("/jugadores/" + jugador.id, jugador);
  return r.data;
}

export async function deleteJugadores(params) {
  const r = await api.delete("/jugadores/" + params.id, params);
  return r.data;
}
///

export async function getPartidas() {
  const r = await api.get("/partidas");
  return r.data;
}

export async function crearPartidas(params) {
  const r = await api.post("/partidas", params);
  return r.data;
}

export async function updatePartidas(partida) {
  const r = await api.put("/partidas/" + partida.id, partida);
  return r.data;
}

export async function deletePartidas(params) {
  const r = await api.delete("/partidas/" + params.id, params);
  return r.data;
}

//
export async function getPartidasJugadores() {
  const r = await api.get("/partidas_jugadores");
  return r.data;
}

export async function crearPartidasJugadores(params) {
  const r = await api.post("/partidas_jugadores", params);
  return r.data;
}

export async function updatePartidasJugadores(partidajugador) {
  const r = await api.put(
    "/partidas_jugadores/" + partidajugador.id,
    partidajugador
  );
  return r.data;
}

export async function deletePartidasJugadores(params) {
  const r = await api.delete("/partidas_jugadores/" + params.id, params);
  return r.data;
}
///
export async function getPremios() {
  const r = await api.get("/premios");
  return r.data;
}

export async function crearPremios(params) {
  const r = await api.post("/premios", params);
  return r.data;
}

export async function updatePremios(premio) {
  const r = await api.put("/premios/" + premio.id, premio);
  return r.data;
}

export async function deletePremios(params) {
  const r = await api.delete("/premios/" + params.id, params);
  return r.data;
}

///
export async function getRondas() {
  const r = await api.get("/rondas");
  return r.data;
}

export async function crearRondas(params) {
  const r = await api.post("/rondas", params);
  return r.data;
}

export async function updateRondas(ronda) {
  const r = await api.put("/rondas/" + ronda.id, ronda);
  return r.data;
}

export async function deleteRondas(params) {
  const r = await api.delete("/rondas/" + params.id, params);
  return r.data;
}

///

export async function getSanciones() {
  const r = await api.get("/sanciones");
  return r.data;
}
export async function crearSanciones(params) {
  const r = await api.post("/sanciones", params);
  return r.data;
}

export async function updateSanciones(sancion) {
  const r = await api.put("/sanciones/" + sancion.id, sancion);
  return r.data;
}

export async function deleteSanciones(params) {
  const r = await api.delete("/sanciones/" + params.id, params);
  return r.data;
}
///

export async function getTorneos() {
  const r = await api.get("/torneos");
  return r.data;
}
export async function crearTorneos(params) {
  const r = await api.post("/torneos", params);
  return r.data;
}
export async function updateTorneos(torneo) {
  const r = await api.put("/torneos/" + torneo.id, torneo);
  return r.data;
}

export async function deleteTorneos(params) {
  const r = await api.delete("/torneos/" + params.id, params);
  return r.data;
}

///
export async function getUsuarios() {
  const r = await api.get("/usuarios");
  return r.data;
}
export async function crearUsuarios(params) {
  const r = await api.post("/usuarios", params);
  return r.data;
}

export async function updateUsuarios(usuario) {
  const r = await api.put("/usuarios/" + usuario.id, usuario);
  return r.data;
}

export async function deleteUsuarios(params) {
  const r = await api.delete("/usuarios/" + params.id, params);
  return r.data;
}

///
export async function getPermisos() {
  const r = await api.get("/permisos");
  return r.data;
}
export async function crearPermisos(params) {
  const r = await api.post("/permisos", params);
  return r.data;
}

export async function updatePermisos(permiso) {
  const r = await api.put("/permisos/" + permiso.id, permiso);
  return r.data;
}

export async function deletePermisos(params) {
  const r = await api.delete("/permisos/" + params.id, params);
  return r.data;
}

//

///
export async function getPermisosRoles() {
  const r = await api.get("/permisos_roles");
  return r.data;
}
export async function crearPermisosRoles(params) {
  const r = await api.post("/permisos_roles", params);
  return r.data;
}

export async function updatePermisosRoles(permisorol) {
  const r = await api.put("/permisos_roles/" + permisorol.id, permisorol);
  return r.data;
}

export async function deletePermisosRoles(params) {
  const r = await api.delete("/permisos_roles/" + params.id, params);
  return r.data;
}

///

export async function getPerfiles() {
  const r = await api.get("/perfiles");
  return r.data;
}

export async function crearPerfiles(params) {
  const r = await api.post("/perfiles", params);
  return r.data;
}

export async function updatePerfiles(perfil) {
  const r = await api.put("/perfiles/" + perfil.id, perfil);
  return r.data;
}

export async function deletePerfiles(params) {
  const r = await api.delete("/perfiles/" + params.id, params);
  return r.data;
}

///
export async function getRoles() {
  const r = await api.get("/roles");
  return r.data;
}

export async function crearRoles(params) {
  const r = await api.post("/roles", params);
  return r.data;
}

export async function updateRoles(rol) {
  const r = await api.put("/roles/" + rol.id, rol);
  return r.data;
}

export async function deleteRoles(params) {
  const r = await api.delete("/roles/" + params.id, params);
  return r.data;
}

//
export async function getPaises() {
  const r = await api.get("/paises");
  return r.data;
}
