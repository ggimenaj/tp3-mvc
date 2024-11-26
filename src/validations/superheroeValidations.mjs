import { body, validationResult } from "express-validator";

export const validarSuperheroe = [
  body("nombreSuperHeroe")
    .trim()
    .notEmpty()
    .withMessage("El nombre del superhéroe es requerido")
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre debe tener entre 3 y 60 caracteres"),

  body("nombreReal")
    .trim()
    .notEmpty()
    .withMessage("El nombre del superhéroe es requerido")
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre debe tener entre 3 y 60 caracteres"),

  body("edad")
    .notEmpty()
    .withMessage("La edad es requerida")
    .isNumeric()
    .withMessage("La edad debe ser un número")
    .custom((value) => value >= 0)
    .withMessage("La edad no puede ser negativa"),

  body("poderes")
    .isArray({ min: 1 }).withMessage("Debe tener al menos un poder")
    .custom(
        (poderes) => {
        for(const poder of poderes){
            if(typeof poder !== 'string' || poder.trim().lenght < 3 || poder.trim().length > 60){
                throw new Error('Los poderes deben ser de tipo string entre 3 y 60 caracteres')
            }
        }
        return true;
    }),

    //manejo de errores de validacion
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();//si no hay errores, se llama al controlador para insertar el superheroe
  },
];
