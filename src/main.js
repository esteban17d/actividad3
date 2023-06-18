const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/explorar', (req, res) => {
  res.render('explorar');
});

app.get('/mislibros', (req, res) => {
  res.render('mislibros');
});

app.get('/amigos', (req, res) => {
  res.render('amigos');
});

app.get('/perfil', (req, res) => {
  res.render('perfil');
});

app.get('/registrarse', (req, res) => {
  res.render('registrarse');
});

app.get('/iniciarsesion', (req, res) => {
  res.render('iniciarsesion');
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'actividad3',
  password: '1234',
  database: 'red_social'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conexión exitosa a MySQL');
});

const userTable = 'users';
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/registrarse', (req, res) => {
  const { email, password } = req.body;

  const sql = `INSERT INTO ${userTable} (username, password) VALUES (?, ?)`;
  const values = [email, password];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      res.render('registrarse.ejs', { error: 'Error al registrar usuario' });
      return;
    }
    console.log('Usuario registrado correctamente');
    res.redirect('/iniciarsesion');
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
