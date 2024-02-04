const mongoose = require("mongoose");
require("./config/db.js");

const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./routes");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const flash = require('connect-flash')

require("dotenv").config({ path: "variables.env" });

const app = express();

//Habilitando body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//validacion  de campos
const { check, validationResult } = require('express-validator');

//Aqui estamos habilitando handlebars como template engine
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "layout",
    helpers: require("./helpers/handlebars"),
    allowProtoPropertiesByDefault: true, 
  })
);

app.set("view engine", "handlebars");

//definimos los archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

//
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE }),
  })
);

//Alertas y flash mensajes
app.use(flash())

//crear nuestro porpio middleware
app.use((req, res, next) => {
  res.locals.mensajes = req.flash()
  next()
})

app.use("/", router());

app.listen(process.env.PUERTO);
