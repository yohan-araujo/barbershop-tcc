const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '1234',
  database: 'projeto_interdisciplinar',
});

app.post('/api/insertUsuarioCliente', (req, res) => {
  const usu_nomeCompleto = req.body.usu_nomeCompleto;
  const usu_email = req.body.usu_email;
  const usu_senha = req.body.usu_senha;
  const usu_foto = req.body.usu_foto;
  const usu_tipo = 'C';
  const cli_tel = req.body.cli_tel;

  const insertUsuario =
    'INSERT INTO usu_usuarios (usu_nomeCompleto, usu_email, usu_senha, usu_foto, usu_tipo) VALUES (?,?,?,?,?)';
  const insertUsuarioCliente =
    'INSERT INTO cli_clientes (usu_id, cli_tel) VALUES (?,?)';

  db.query(
    insertUsuario,
    [usu_nomeCompleto, usu_email, usu_senha, usu_foto, usu_tipo],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }

      const usu_id = result.insertId;

      db.query(insertUsuarioCliente, [usu_id, cli_tel], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          return;
        }
        res.send('Usuário cadastrado com sucesso');
      });
    }
  );
});

app.post('/api/insertUsuarioProfissional', (req, res) => {
  const usu_nomeCompleto = req.body.usu_nomeCompleto;
  const usu_email = req.body.usu_email;
  const usu_senha = req.body.usu_senha;
  const usu_foto = req.body.usu_foto;
  const usu_tipo = 'P';
  const pro_descricao = req.body.pro_descricao;

  const insertUsuario =
    'INSERT INTO usu_usuarios (usu_nomeCompleto, usu_email, usu_senha, usu_foto, usu_tipo) VALUES (?,?,?,?,?)';
  const insertUsuarioProfissional =
    'INSERT INTO pro_profissionais (usu_id, pro_descricao) VALUES (?,?)';

  db.query(
    insertUsuario,
    [usu_nomeCompleto, usu_email, usu_senha, usu_foto, usu_tipo],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }

      const usu_id = result.insertId;

      db.query(
        insertUsuarioProfissional,
        [usu_id, pro_descricao],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
          }
          res.send('Usuário cadastrado com sucesso');
        }
      );
    }
  );
});

app.listen(3001, () => {
  console.log('Server rodando na porta 3001');
});
