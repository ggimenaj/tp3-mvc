import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function obtenerSuperheroePorId(id) {
  return await SuperHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroe() {
  return await SuperHeroRepository.obtenerTodos();
}

export async function buscarSuperheroePorAtributo(atributo, valor) {
  return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
  return await SuperHeroRepository.obtenerMayoresDe30();
}

export async function crearSuperheroe(superheroe) {
  return await SuperHeroRepository.crearSuperheroe(superheroe);
}

export async function actualizarSuperheroe(id, datosActualizados) {
  return await SuperHeroRepository.actualizar(id, datosActualizados);
}

export async function eliminarSuperheroe(id) {
  return await SuperHeroRepository.eliminar(id);
}

export async function eliminarSuperheroePorNombre(nombreSuperHeroe) {
  if (!nombreSuperHeroe) {
    throw new Error("El nombre del superhéroe es obligatorio");
  }

  const resultado = await SuperHeroRepository.eliminarPorNombre(nombreSuperHeroe);
  if (!resultado) {
    throw new Error("Superhéroe por nombre no encontrado");
  }

  return resultado;
}