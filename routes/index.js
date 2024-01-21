const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController.js");
const vacantesController = require("../controllers/vacantesController.js");
const usuarioController = require("../controllers/usuarioController.js");

module.exports = () => {
  router.get("/", homeController.mostrarTrabajos);

  //Crear vacantes
  router.get("/vacantes/nueva", vacantesController.formularioNuevaVacante);
  router.post("/vacantes/nueva", vacantesController.agregarVacante);

  //Mostrar Vacante singular
  router.get("/vacantes/:url", vacantesController.mostrarVacante);

  //Editar vacante
  router.get("/vacantes/editar/:url", vacantesController.formEditarVacante);
  router.post("/vacantes/editar/:url", vacantesController.editarVacante);

  //crear Cuentas
  router.get("/crear-cuenta", usuarioController.formCrearCuenta);
  router.post("/crear-cuenta",usuarioController.validarRegistro,usuarioController.crearUsuario);

  return router;
};
