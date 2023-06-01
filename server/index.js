const express = require('express');
const session = require('express-session');
const cors = require('cors');
const db = require('./database');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'D3m!R7j#K6g@U1wP', // Uma chave secreta para assinar o cookie de sessão (deve ser mantida em segredo)
    resave: false, // Evita regravar a sessão no armazenamento se não houver alterações
    saveUninitialized: false, // Evita salvar uma sessão não inicializada no armazenamento
  })
);

function gerarChaveAleatoria() {
  return crypto.randomBytes(32).toString('hex');
}

// Requisicoes
app.post('/api/insertUsuarioCliente', (req, res) => {
  const {
    usu_nomeCompleto,
    usu_email,
    usu_senha,
    usu_foto,
    usu_tipo,
    cli_tel,
  } = req.body;

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
  const {
    usu_nomeCompleto,
    usu_email,
    usu_senha,
    usu_foto,
    usu_tipo,
    pro_descricao,
  } = req.body;

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

//Inicializando sessoes

app.post('/api/loginUsuario', (req, res) => {
  const { usu_email, usu_senha } = req.body;

  const selectLogin =
    'SELECT usu_id, usu_tipo, usu_nomeCompleto, usu_foto FROM usu_usuarios WHERE usu_email = ? AND usu_senha = ?';

  db.query(selectLogin, [usu_email, usu_senha], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }

    if (result.length > 0) {
      const usuario = result[0];

      const chaveAleatoria = gerarChaveAleatoria();

      app.use(
        session({
          secret: chaveAleatoria,
          resave: false,
          saveUninitialized: false,
        })
      );

      res.json({
        success: true,
        message: 'Login bem-sucedido',
        usuarioId: usuario.usu_id,
        usuarioTipo: usuario.usu_tipo,
        usuarioNome: usuario.usu_nomeCompleto,
        usuarioFoto: usuario.usu_foto,
      });
      req.session.usuarioId = usuario.usu_id;
      req.session.usuarioTipo = usuario.usu_tipo;
      req.session.usuarioNomeCompleto = usuario.usu_nomeCompleto;
      req.session.usuarioFoto = usuario.usu_foto;
    } else {
      res.json({ success: false, message: 'Login falhou' });
    }
  });
});

// Mostrando onde o servidor esta rodando!

app.listen(3001, () => {
  console.log('Server rodando em localhost:3001');
});
