const express = require('express')
const routes = express.Router()

//Rutas de la API

//Datos en formato JSON.
routes.get('/usuarios.json',(req, res) =>{
    //Conexion
    req.getConnection((err, conn) =>{
        if(err){
            return res.send(err)
        }
        else{  
            conn.query('SELECT * FROM usuario', (err, rows) =>{
                if(err){
                    return res.send(err)
                }
                else{
                    res.json(rows)
                }
            })
        }

    })
})

//Mostrar el listado por la pagina web
routes.get('/usuarios',(req, res) =>{
    //Conexion
    req.getConnection((err, conn) =>{
        if(err){
            return res.send(err)
        }
        else{  
            conn.query('SELECT * FROM usuario', (err, rows) =>{
                if(err){
                    return res.send(err)
                }
                else{
                    res.render('usuarios', {usuarios: rows, error: false})
                }
            })
        }

    })
})


routes.post('/signup', (req, res) => {
    const { name, email, password, city } = req.body;

    if (!name || !email || !password || !city) {
        return res.render('signup', { error: 'All fields are required.' });
    }

    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err);
        }

        const sql = 'INSERT INTO usuario (nombre, email, clave, ciutdad) VALUES (?, ?, ?, ?)';
        const values = [name, email, password, city];

        conn.query(sql, values, (err, results) => {
            if (err) {
                return res.send(err);
            }

            res.redirect('/'); 
        });
    });
});

module.exports = routes