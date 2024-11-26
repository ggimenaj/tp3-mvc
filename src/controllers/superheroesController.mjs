import {
  obtenerSuperheroePorId,
  obtenerSuperheroesMayoresDe30,
  obtenerTodosLosSuperheroe,
  buscarSuperheroePorAtributo,
  crearSuperheroe,
  actualizarSuperheroe,
  eliminarSuperheroe,
  eliminarSuperheroePorNombre,
} from "../services/superheroesService.mjs";

import {
  renderizarSuperheroe,
  renderizarListaSuperheroes,
} from "../views/responseView.mjs";

export async function obtenerSuperheroePorIdController(req, res) {
  const { id } = req.params;
  const superheroes = await obtenerSuperheroePorId(id);
  if (superheroes) {
    res.send(renderizarSuperheroe(superheroes));
  } else {
    res.status(404).send({ mensaje: "Superheroe no encontrado" });
  }
}

export async function obtenerTodosLosSuperheroeController(req, res) {
  const superheroes = await obtenerTodosLosSuperheroe();
  res.send(renderizarListaSuperheroes(superheroes));
}

export async function buscarSuperheroePorAtributoController(req, res) {
  const { atributo, valor } = req.params;
  const superheroes = await buscarSuperheroePorAtributo(atributo, valor);

  if (superheroes.length > 0) {
    res.send(renderizarListaSuperheroes(superheroes));
  } else {
    res
      .status(404)
      .send({ mensaje: "No se encontraron superheroes con ese atributo " });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  const superheroes = await obtenerSuperheroesMayoresDe30();
  res.send(renderizarListaSuperheroes(superheroes));
}

export async function crearSuperheroeController(req, res) {
  try {
    const superheroe = req.body;
    console.log(req.body)
    await crearSuperheroe(superheroe);
    const superheroesActualizados = await obtenerTodosLosSuperheroe();
    res.status(201).json(superheroesActualizados);
  } catch (error) {
    console.log("error al crear superheroe", error)
    res.status(500).json({ error: "Error al crear superheroe" });
  }
}


export async function actualizarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    await actualizarSuperheroe(id, datosActualizados);
    const superheroesActualizados = await obtenerTodosLosSuperheroe();
    res.status(200).json(superheroesActualizados);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar superhéroe" });
  }
}

export async function eliminarSuperheroeController(req, res) {
  try {
    const { id } = req.params;
    const superheroeEliminado = await eliminarSuperheroe(id);
    if (!superheroeEliminado) {
      return res.status(404).json({ error: "Superhéroe no encontrado" });
    }
    res.status(200).json(superheroeEliminado);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar superhéroe" });
  }
}

export async function eliminarSuperheroePorNombreController(req, res) {
  try {
    const { nombreSuperHeroe } = req.params;

    const superheroeEliminado = await eliminarSuperheroePorNombre(nombreSuperHeroe);
    if (superheroeEliminado) {
      res.json({
        mensaje: "Superhéroe eliminado con éxito",
        superheroe: superheroeEliminado, // Devuelve el superhéroe eliminado
      });
    } else {
      res.status(404).json({ mensaje: "Superhéroe no encontrado" });
    }
  } catch (error) {
    res.status(400).json({
      mensaje: "Error al eliminar el superhéroe por nombre",
      error: error.message,
    });
  }
}