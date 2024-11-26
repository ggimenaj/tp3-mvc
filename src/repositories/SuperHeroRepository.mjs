import SuperHero from "../models/SuperHero.mjs";
import IRepository from "../repositories/IRepository.mjs";
import mongoose from "mongoose";

class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    if (mongoose.isValidObjectId(id)) {
      return await SuperHero.findById(id);
    }
  }

  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async buscarPorAtributo(atributo, valor) {
    const query = { [atributo]: new RegExp(valor, "i") };
    return await SuperHero.find(query);
  }

  async obtenerMayoresDe30() {
    return await SuperHero.find({ edad: { $gt: 30 } });
  }

  async crearSuperheroe(superheroe) {
    const nuevoSuperheroe = new SuperHero(superheroe);
    return await nuevoSuperheroe.save();
  }

  async actualizar(id, datosActualizados) {
    if (mongoose.isValidObjectId(id)) {
      return await SuperHero.findByIdAndUpdate(id, datosActualizados, {new: true,});
    } else {
      throw new Error("ID no válido");
    }
  }

  async eliminar(id) {
    if (mongoose.isValidObjectId(id)) {
      return await SuperHero.findByIdAndDelete(id);
    } else {
      throw new Error("ID no válido");
    }
  }

  async eliminarPorNombre(nombreSuperHeroe) {
    return await SuperHero.findOneAndDelete({ nombreSuperHeroe }).exec();
  }  
}

export default new SuperHeroRepository();

// Criterios de busqueda
//  planetaOrigen: "Tierra",
// poderes: { $size: { $gte: 2 } },
