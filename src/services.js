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
