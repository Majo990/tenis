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

export async function crearArbitros(params) {
  const r = await api.post("/arbitros", params);
  return r.data;
}

export async function getComportamientos() {
  const r = await api.get("/comportamientos");
  return r.data;
}

export async function getEntrenadores() {
  const r = await api.get("/entrenadores");
  return r.data;
}

export async function getEquipos() {
  const r = await api.get("/equipos");
  return r.data;
}

export async function getEstadios() {
  const r = await api.get("/estadios");
  return r.data;
}

export async function getEventos() {
  const r = await api.get("/eventos");
  return r.data;
}

export async function getFaltas() {
  const r = await api.get("/faltas");
  return r.data;
}

export async function getHistorialPartidas() {
  const r = await api.get("/historial_partidas");
  return r.data;
}

export async function getJueces() {
  const r = await api.get("/jueces");
  return r.data;
}

export async function getHome() {
  const r = await api.get("/jugadores");
  return r.data;
}

export async function getPartidas() {
  const r = await api.get("/partidas");
  return r.data;
}

export async function getPartidasJugadores() {
  const r = await api.get("/partidas_jugadores");
  return r.data;
}

export async function getPremios() {
  const r = await api.get("/premios");
  return r.data;
}

export async function getRondas() {
  const r = await api.get("/rondas");
  return r.data;
}

export async function getSanciones() {
  const r = await api.get("/sanciones");
  return r.data;
}

export async function getTorneos() {
  const r = await api.get("/torneos");
  return r.data;
}

export async function getUsuarios() {
  const r = await api.get("/usuarios");
  return r.data;
}

export async function getPermisos() {
  const r = await api.get("/permisos");
  return r.data;
}

export async function getPerfiles() {
  const r = await api.get("/perfiles");
  return r.data;
}

export async function getRoles() {
  const r = await api.get("/roles");
  return r.data;
}

export async function getPaises() {
  const r = await api.get("/paises");
  return r.data;
}
