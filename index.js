const express = require('express');
const app = express();
app.use(express.json());

let usuarios = [
  { id: 1, nombre: 'usuario1' },
  { id: 2, nombre: 'usuario2' },
  { id: 3, nombre: 'spollnet'}
];

app.get('/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  res.status(200).json(usuario);
});
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = { id: usuarios.length + 1, nombre: req.body.nombre };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});
app.put('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  
  usuario.nombre = req.body.nombre;
  res.status(200).json(usuario);
});

// DELETE eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  
  usuarios = usuarios.filter(u => u.id !== usuario.id);
  res.status(200).json(usuario);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
