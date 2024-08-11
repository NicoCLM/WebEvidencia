const express = require('express')
const mysql = require('mysql')
const mycon = require('express-myconnection')
const app = express()
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser');

//La base de datos utilizada es MySQL
const dbConf = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'tests'
}

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080)
app.use(mycon(mysql,dbConf, 'single'))


//Rutas de la API
app.get('/', (req,res) => {
    res.render('index', {error: false})
})
app.get('/signup', (req,res) => {
    res.render('signup', {error: false})
}) 

app.get('/admin', (req,res) => {
    res.render('admin', {error: false})
})
app.use('/api', routes)

//Ejecucion del servidor
app.listen(app.get('port'), () => {
    console.log(`El servidor esta ejecutandose en el puerto http://localhost:${app.get('port')}`)
})