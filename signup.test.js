const request = require('supertest');
const app = require('./server');  

describe('Pruebas para el registro (signup)', () => {
  
  it('Formulario de registro', async () => {
    const response = await request(app).get('/signup');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<form'); 
  });

  // Se prueba que al registrar redireccione al usuario a la pantalla de inicio.
  it('Redireccion a la pantalla de inicio al registrarse exitosamente', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({
        name: 'Steve Montez',
        email: 'steve.m23@example.com',
        password: 'password123',
        city: 'Miami'
      });
    expect(response.status).toBe(302); 
    expect(response.headers.location).toBe('/'); 
  });

  // Se prueba si al estar vacios los campos debe salir error en cada campo.
  it('Si los campos del formulario estan vacios, mostrara error en los campos vacios.', async () => {
    const response = await request(app)
      .post('/api/signup')
      .send({
        name: '',
        email: '',
        password: '',
        city: ''
      });
    expect(response.status).toBe(200);
    expect(response.text).toContain('All fields are required.');
  });

});

