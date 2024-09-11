// server.js
const express = require('express');
const db = require('./db'); // Importa la configuración de la base de datos
const app = express();
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Middleware para usar la conexión de la base de datos en las rutas
const connectionMiddleware = (req, res, next) => {
  req.getConnection = (cb) => {
    db.pool.getConnection((err, connection) => {
      if (err) return cb(err);
      cb(null, connection);
    });
  };
  next();
};

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(connectionMiddleware); // Usa el middleware de conexión

// Rutas de la API
app.get('/', (req, res) => {
  res.render('index', { error: false });
});
app.get('/signup', (req, res) => {
  res.render('signup', { error: false });
});
app.get('/admin', (req, res) => {
  res.render('admin', { error: false });
});
app.use('/api', routes);

module.exports = app;
