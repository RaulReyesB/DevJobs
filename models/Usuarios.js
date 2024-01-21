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
usuariosSchema.pre('save', async function(next){
  //Si las contraseña ya esta haseada no se hace nada 
  if(!this.isModified('password')){
    return next();
  }
  //si no esta haseado
  const hash = await bcrypt.hash(this.password, 12)
  this.password =hash;
  next();
})

module.exports = mongoose.model("Usuarios", usuariosSchema);
