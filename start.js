// start.js
const app = require('./server');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`El servidor esta ejecutandose en el puerto http://localhost:${PORT}`);
});
