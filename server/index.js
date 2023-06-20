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
  const { usu_nomeCompleto, usu_email, usu_senha, usu_foto, cli_tel } =
    req.body;
  const usu_tipo = 'C';
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
  const { data, hora, profissionalID, servicoID, clienteID } = req.body;

  const insertAgendamento =
    'INSERT INTO age_agendamento (age_data, age_hora, cli_id, pro_id, ser_id, age_status) VALUES (?,?,?,?,?,?)';

  db.query(
    insertAgendamento,
    [data, hora, clienteID, profissionalID, servicoID, false],
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

app.post('/api/insertServico', (req, res) => {
  const { tipo, preco } = req.body;

  const insertServico =
    'INSERT INTO ser_servicos (ser_tipo, ser_preco) VALUES (?,?)';

  db.query(insertServico, [tipo, preco], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res
      .status(200)
      .json({ success: true, message: 'Servico inserido com sucesso' });
  });
});

app.post('/api/insertUsuarioProfissional', (req, res) => {
  const {
    usu_nomeCompleto,
    usu_email,
    usu_senha,
    usu_foto,
    pro_descricao,
    pro_cor,
  } = req.body;
  usu_tipo = 'P';

  const insertUsuario =
    'INSERT INTO usu_usuarios (usu_nomeCompleto, usu_email, usu_senha, usu_foto, usu_tipo) VALUES (?,?,?,?,?)';
  const insertUsuarioProfissional =
    'INSERT INTO pro_profissionais (usu_id, pro_descricao, pro_cor) VALUES (?,?,?)';

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
        [usu_id, pro_descricao, pro_cor],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
          }

          const pro_id = result.insertId; // Obtenha o pro_id do resultado da query
          console.log([pro_id]);
          res.send({ pro_id }); // Retorne o pro_id como parte da resposta
        }
      );
    }
  );
});

app.post('/api/insertServicosProfissional', (req, res) => {
  const { servicos, pro_id } = req.body;

  const insertServicosProfissional =
    'INSERT INTO sp_servicoProfissional (pro_id, ser_id) VALUES ?';

  const values = servicos.map((servico) => [pro_id, servico.ser_id]);

  db.query(insertServicosProfissional, [values], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }
    res.send('Serviços inseridos com sucesso');
  });
});

app.get('/api/getProfissionais', (req, res) => {
  const selectProfissionais =
    'SELECT p.pro_id, u.usu_nomeCompleto, u.usu_foto, p.pro_descricao, p.pro_cor FROM usu_usuarios u JOIN pro_profissionais p ON p.usu_id = u.usu_id; ';
  db.query(selectProfissionais, (err, result) => {
    res.send(result);
  });
});

app.get('/api/getProfissionaisImagens', (req, res) => {
  const selectProfissionais =
    'SELECT p.pro_id, u.usu_foto FROM usu_usuarios u JOIN pro_profissionais p ON p.usu_id = u.usu_id; ;';
  db.query(selectProfissionais, (err, result) => {
    res.send(result);
  });
});

app.get('/api/getServicosCadastrados', (req, res) => {
  const selectServicos = `
    SELECT ser_id, ser_tipo FROM ser_servicos;
  `;
  db.query(selectServicos, (err, result) => {
    if (err) {
      console.error('Erro ao obter serviços:', err);
      res.status(500).send('Erro ao obter serviços');
    } else {
      res.send(result);
    }
  });
});

app.get('/api/getServicos/:profissionalID', (req, res) => {
  const profissionalID = req.params.profissionalID;
  const selectServicos = `
    SELECT ser.*
    FROM ser_servicos AS ser
    INNER JOIN sp_servicoProfissional AS sp ON ser.ser_id = sp.ser_id
    WHERE sp.pro_id = ?
  `;
  db.query(selectServicos, [profissionalID], (err, result) => {
    if (err) {
      console.error('Erro ao obter serviços:', err);
      res.status(500).send('Erro ao obter serviços');
    } else {
      res.send(result);
    }
  });
});

app.get('/api/getAgendamentos/:profissionalID', (req, res) => {
  const profissionalID = req.params.profissionalID;
  const selectAgendamento = `
  SELECT a.age_id, a.age_data, a.age_hora, u.usu_nomeCompleto, s.ser_tipo, a.age_status, a.pro_id, p.pro_cor
  FROM age_agendamento a
  JOIN cli_clientes c ON a.cli_id = c.cli_id
  JOIN usu_usuarios u ON c.usu_id = u.usu_id
  JOIN ser_servicos s ON a.ser_id = s.ser_id
  JOIN pro_profissionais p ON a.pro_id = p.pro_id
  WHERE a.pro_id = ?;`;
  db.query(selectAgendamento, [profissionalID], (err, result) => {
    res.send(result);
  });
});

app.get('/api/getAgendamentosAtivos/:clienteID', (req, res) => {
  const clienteID = req.params.clienteID;
  const selectAgendamento = `
  SELECT age.age_id, age.age_data, age.age_hora, usu.usu_nomeCompleto AS nome_profissional
  FROM age_agendamento AS age
  JOIN pro_profissionais AS pro ON age.pro_id = pro.pro_id
  JOIN usu_usuarios AS usu ON pro.usu_id = usu.usu_id
  WHERE age.cli_id = ? AND age.age_status = FALSE;`;
  db.query(selectAgendamento, [clienteID], (err, result) => {
    res.send(result);
  });
});

app.get('/api/getAgendamentosInativos/:clienteID', (req, res) => {
  const clienteID = req.params.clienteID;
  const selectAgendamento = `
  SELECT age.age_id, age.age_data, age.age_hora, usu.usu_nomeCompleto AS nome_profissional
  FROM age_agendamento AS age
  JOIN pro_profissionais AS pro ON age.pro_id = pro.pro_id
  JOIN usu_usuarios AS usu ON pro.usu_id = usu.usu_id
  WHERE age.cli_id = ? AND age.age_status = TRUE;`;
  db.query(selectAgendamento, [clienteID], (err, result) => {
    res.send(result);
  });
});

app.get('/api/getSkills/:pro_id', (req, res) => {
  const pro_id = req.params.pro_id;
  const query =
    'SELECT sp_id, ser_tipo FROM sp_servicoProfissional JOIN ser_servicos ON sp_servicoProfissional.ser_id = ser_servicos.ser_id WHERE pro_id = ?;';

  db.query(query, [pro_id], (error, results) => {
    if (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Error fetching services' });
    } else {
      res.json(results);
    }
  });
});

app.put('/api/atualizarStatusAgendamentos', (req, res) => {
  const { agendamentosSelecionados } = req.body;

  if (agendamentosSelecionados.length === 0) {
    // Tratar caso o array esteja vazio
    res.status(400).send('Nenhum agendamento selecionado.');
    return;
  }

  const updateStatusQuery = `
    UPDATE age_agendamento
    SET age_status = true
    WHERE age_id IN (${agendamentosSelecionados.join(',')});
  `;

  db.query(updateStatusQuery, (err, result) => {
    if (err) {
      // Tratar o erro de atualização
      console.error(err);
      res.status(500).send('Erro ao atualizar o status dos agendamentos.');
    } else {
      // Agendamentos atualizados com sucesso
      res.status(200).send('Status dos agendamentos atualizado com sucesso.');
    }
  });
});

//Inicializando sessoes

app.post('/api/loginUsuario', (req, res) => {
  const { usu_email, usu_senha } = req.body;

  const selectLogin = `
    SELECT u.usu_id, u.usu_tipo, u.usu_nomeCompleto, u.usu_foto, 
      c.cli_id, a.adm_id, p.pro_descricao, p.pro_cor, p.pro_id
    FROM usu_usuarios u
    LEFT JOIN cli_clientes c ON c.usu_id = u.usu_id
    LEFT JOIN adm_administradores a ON a.usu_id = u.usu_id
    LEFT JOIN pro_profissionais p ON p.usu_id = u.usu_id
    WHERE u.usu_email = ? AND u.usu_senha = ?;
  `;

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

      req.session.usuarioId = usuario.usu_id;
      req.session.usuarioTipo = usuario.usu_tipo;
      req.session.usuarioNomeCompleto = usuario.usu_nomeCompleto;
      req.session.usuarioFoto = usuario.usu_foto;

      res.json({
        success: true,
        message: 'Login bem-sucedido',
        usuarioId: usuario.usu_id,
        usuarioTipo: usuario.usu_tipo,
        usuarioNome: usuario.usu_nomeCompleto,
        usuarioFoto: usuario.usu_foto,
        clienteID: usuario.cli_id || null,
        proDesc: usuario.pro_descricao || null,
        proCor: usuario.pro_cor || null,
        proId: usuario.pro_id || null,
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Credenciais inválidas',
      });
    }
  });
});

// Mostrando onde o servidor esta rodando!

app.listen(3001, () => {
  console.log('Server rodando em localhost:3001');
});
