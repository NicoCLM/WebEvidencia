// signup.test.js
const request = require('supertest');
const app = require('./server');
const db = require('./db'); // Importa la configuración de la base de datos

let server;

beforeAll(done => {
  server = app.listen(0, done); // Inicia el servidor en un puerto aleatorio
});

afterAll(done => {
  server.close(() => {
    db.pool.end(err => {
      if (err) {
        console.error('Error closing the database pool:', err);
      }
      done();
    });
  });
});

describe('Ruta de signup', () => {
  it('Formulario de registro', async () => {
    const response = await request(server).get('/signup');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<form'); 
  });

  it('Redireccion a la pantalla de inicio al registrarse exitosamente', async () => {
    const response = await request(server)
      .post('/api/signup')
      .send({
        name: 'Steve Montez',
        email: 'steve.m23@example.com',
        password: 'password123',
        city: 'New York'
      });
    expect(response.status).toBe(302); // Redirección
    expect(response.headers.location).toBe('/'); // Verifica redirección
  });

  it('Si los campos del formulario están vacíos, mostrará error en los campos vacíos.', async () => {
    const response = await request(server)
      .post('/api/signup')
      .send({
        name: '',
        email: '',
        password: '',
        city: ''
      });
    expect(response.status).toBe(200);
  });
});
