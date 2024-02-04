const mongoose = require("mongoose");
const Usuarios = mongoose.model("Usuarios");
const { body, validationResult } = require("express-validator");

exports.formCrearCuenta = (req, res) => {
  res.render("crear-cuenta", {
    nombrepagina: "Crea tu cuenta en devJobs",
    tagline:
      "Comienza a publicar tus vacantes gratis, solo debes crear tu cuenta",
  });
};

exports.validarRegistro = async (req, res, next) => {
  //para satinitzar en express ^7.0.1 se debe de ocupar la funcion escape()
  //sanitizando datos del usuario  y validando los datos del mismo
  await body("nombre", "El Nombre es obligatorio").notEmpty().escape().run(req);
  await body("email", "El email es obligatorio").isEmail().escape().run(req);
  await body("password", "La contraseña no puede ir vacia")
    .notEmpty()
    .escape()
    .run(req);
  await body("confirmar", "Confirmarme su contraseña")
    .notEmpty()
    .escape()
    .run(req);
  await body("confirmar", "La contraseña es diferente")
    .equals(req.body.password)
    .escape()
    .run(req);

  const errores = validationResult(req);

  if (errores) {
    req.flash(
      "error",
      //aqui agrego errores.array() para extraer los mensajes especificos de cada error para que los pueda ver req.flash()
      errores.array().map((error) => error.msg)
    );
    res.render("crear-cuenta", {
      nombrepagina: "Crea tu cuenta en devJobs",
      tagline:
        "Comienza a publicar tus vacantes gratis, solo debes crear tu cuenta",
      mensajes: req.flash(),
    });
    return;
  }
  next();
};
/*//TODO:sanitizar
  req.sanitizeBody('nombre').escape();
  //console.log(req.body)

  const { nombre, email, password, confirmar } = req.body;
  await check("nombre")
    .notEmpty()
    .withMessage("Este campo es OBLIGATORIO: NOMBRE")
    .isLength({ min: 4 })
    .withMessage("El nombre debe contener 4 caracteres como minimo")
    .isLength({ max: 15 })
    .withMessage("El nombre debe contener 15 caracteres maximo")
    .run(req);

  await check("email")
    .notEmpty()
    .withMessage("Este campo es OBLIGATORIO: EMAIL")
    .isEmail()
    .withMessage("El valor debe estar en formato User@domain.ext")
    .run(req);

  await check("password")
    .notEmpty()
    .withMessage("Este campo es OBLIGATORIO: Contraseña")
    .isLength({ min: 8 })
    .withMessage("la contraseña debe contener al menos 8 caracteres")
    .isLength({ max: 20 })
    .withMessage("Password must contain less than 20 characters")
    .equals(req.body.confirmar)
    .withMessage("Ambas contraseñas deben ser iguales")
    .run(req);
    let errores = req.validationErrors();
    
    if (errores) {
      //Si hay errores
      req.flash(
        "error",
        errores.map(error => error.msg)
        );
        
        res.render("crear-cuenta", {
          nombrepagina: "Crea tu cuenta en devJobs",
          tagline:
          "Comienza a publicar tus vacantes gratis, solo debes crear tu cuenta",
          mensajes: req.flash(),
        });
        return;
      }
      // Si toda la validacion es correcta se hace lo siguiente
      next();
      */

exports.crearUsuario = async (req, res) => {
  const usuario = new Usuarios(req.body);

  const nuevoUsuario = await usuario.save();
  if (!nuevoUsuario) return next;

  res.redirect("/iniciar-sesion");
};
