const mongoose = require("mongoose");
const Usuarios = mongoose.model("Usuarios");
const { body, validationResult } = require("express-validator");

exports.formCrearCuenta = (req, res) => {
  res.render("crear-cuenta", {
    nombrePagina: "Crea tu cuenta en devJobs",
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
  await body("confirmar", "Confirmar contraseña no puede ir vacia")
    .notEmpty()
    .escape()
    .run(req);
  await body("confirmar", "La contraseña es diferente")
    .equals(req.body.password)
    .escape()
    .run(req);

  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    req.flash(
      "error",
      //aqui agrego errores.array() para extraer los mensajes especificos de cada error para que los pueda ver req.flash()
      errores.array().map((error) => error.msg)
    );
    res.render("crear-cuenta", {
      nombrePagina: "Crea tu cuenta en devJobs",
      tagline:
        "Comienza a publicar tus vacantes gratis, solo debes crear tu cuenta",
      mensajes: req.flash(),
    });
    return;
  }
  next();
};

exports.crearUsuario = async (req, res, next) => {
  const usuario = new Usuarios(req.body);

  try {
    await usuario.save();
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash("error", error);
    res.redirect("/crear-cuenta");
  }
};
