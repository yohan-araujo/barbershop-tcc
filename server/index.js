const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Funcoes mais importantes
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

app.post('/api/insertAgendamento', (req, res) => {
  const { data, hora, profissionalID, servicoID } = req.body;
  const clienteID = 1;

  const insertAgendamento =
    'INSERT INTO age_agendamento (age_data, age_hora, cli_id, pro_id, ser_id) VALUES (?,?,?,?,?)';

  db.query(
    insertAgendamento,
    [data, hora, clienteID, profissionalID, servicoID],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }

      res
        .status(200)
        .json({ success: true, message: 'Agendamento inserido com sucesso!' });
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

app.get('/api/getProfissionais', (req, res) => {
  const selectProfissionais =
    'SELECT p.pro_id, u.usu_nomeCompleto, u.usu_foto, p.pro_descricao FROM usu_usuarios u JOIN pro_profissionais p ON p.usu_id = u.usu_id; ';
  db.query(selectProfissionais, (err, result) => {
    res.send(result);
  });
});

app.get('/api/getServicos', (req, res) => {
  const selectServicos = 'SELECT * FROM ser_servicos';
  db.query(selectServicos, (err, result) => {
    res.send(result);
  });
});

app.post('/api/loginUsuario', (req, res) => {
  const { usu_email, usu_senha } = req.body;

  const selectLogin =
    'SELECT usu_email, usu_senha FROM usu_usuarios WHERE usu_email = ? AND usu_senha = ?';

  db.query(selectLogin, [usu_email, usu_senha], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }

    if (result.length > 0) {
      res.json({ success: true, message: 'Foi' });
    } else {
      res.json({ success: false, message: 'Falhou' });
    }
  });
});

// Mostrando onde o servidor esta rodando!

app.listen(3001, () => {
  console.log('Server rodando em localhost:3001');
});
