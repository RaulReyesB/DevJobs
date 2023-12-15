const express = require('express')
const exphbs = require('express-handlebars')
const router = require('./routes');
const path = require('path')

const app = express();

//Aqui estamos habilitando handlebars como template engine 
app.engine('handlebars', exphbs.engine({ defaultLayout: 'layout' }));


app.set('view engine', 'handlebars')

//definimos los archivos estaticos 
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', router())

app.listen(5000);