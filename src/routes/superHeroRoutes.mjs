import express from "express";
import { validarSuperheroe } from "../validations/superheroeValidations.mjs";
import {
  obtenerSuperheroePorIdController,
  buscarSuperheroePorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  obtenerTodosLosSuperheroeController,
  crearSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroeController,
  eliminarSuperheroePorNombreController,
} from "../controllers/superheroesController.mjs";

const router = express.Router();

router.get("/heroes", obtenerTodosLosSuperheroeController);
router.get("/heroes/:id", obtenerSuperheroePorIdController);
router.get("/heroes/buscar/:atributo/:valor", buscarSuperheroePorAtributoController);
router.get("/heroes/mayores/30", obtenerSuperheroesMayoresDe30Controller);
router.post("/heroes",validarSuperheroe, crearSuperheroeController);
router.put("/heroes/:id", validarSuperheroe, actualizarSuperheroeController);
router.delete("/heroes/:id", eliminarSuperheroeController);
router.delete("/heroes/nombre/:nombreSuperHeroe", eliminarSuperheroePorNombreController);

export default router;
