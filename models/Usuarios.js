const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bcrypt = require("bcrypt");

const usuariosSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    require: "Agrega tu nombre",
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: String,
  expira: Date,
});

//metodo para hashear las contraseñas
usuariosSchema.pre("save", async function (next) {
  //Si las contraseña ya esta haseada no se hace nada
  if (!this.isModified("password")) {
    return next();
  }
  //si no esta haseado
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
});

usuariosSchema.post("save", function (error, doc, next) {
  //Para acceder a el error se le tiene que agregar el .name de mongo
  //En esta parte el error que estamos poniendo es que si un usuario intruce un correo ya registrado anterior mente pues se le mande un mensaje para informarle
  if (error.name === "MongoServerError" && error.code === 11000) {
    next("Ese correo ya esta registrado");
  }
  //este else sirve para que atrapar otro error de mongo ya que queremos que se siga ejecutando el programa 
  else {
    next(error)
  }
});

module.exports = mongoose.model("Usuarios", usuariosSchema);
