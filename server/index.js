const express = require('express');
const session = require('express-session');
const cors = require('cors');
const db = require('./database');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

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
app.use('/uploads', express.static('uploads'));

const storageGaleria = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/Galeria');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const storagePerfilClientes = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const diretorio = 'uploads/Clientes/';

      if (!fs.existsSync(diretorio)) {
        fs.mkdirSync(diretorio, { recursive: true });
      }

      cb(null, diretorio);
    } catch (error) {
      cb(error, '');
    }
  },

  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const storagePerfilProfissionais = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const diretorio = `./uploads/Profissionais/`;

      if (!fs.existsSync(diretorio)) {
        fs.mkdirSync(diretorio, { recursive: true });
      }

      cb(null, diretorio);
    } catch (error) {
      cb(error, '');
    }
  },

  filename: function (req, file, cb) {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const uploadFotoCliente = multer({ storage: storagePerfilClientes }).single(
  'usu_foto'
);

const uploadFotoProfissional = multer({
  storage: storagePerfilProfissionais,
}).single('usu_foto');

app.post('/api/redefinicaoDeSenha', async (req, res) => {
  const { email } = req.body;

  try {
    const query = 'SELECT usu_email FROM usu_usuarios WHERE usu_email = ?';

    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res
          .status(500)
          .json({ message: 'Ocorreu um erro ao verificar o e-mail.' });
      } else {
        if (results.length > 0) {
          // O e-mail existe no banco de dados
          const token = crypto.randomBytes(20).toString('hex');
          const expiracaoToken = new Date(Date.now() + 3600000); // Data de expiração (1 hora)

          // Salvar o token no banco de dados
          salvarToken(email, token, expiracaoToken);

          // Enviar e-mail com o link de redefinição de senha
          enviarEmailRedefinicaoSenha(email, token);

          res
            .status(200)
            .json({ message: 'Token gerado e e-mail enviado com sucesso.' });
        } else {
          res.status(404).json({ message: 'E-mail não encontrado.' });
        }
      }
    });
  } catch (error) {
    console.log('Erro ao processar a solicitação:', error);
    res
      .status(500)
      .json({ message: 'Ocorreu um erro ao processar a solicitação.' });
  }
});

function salvarToken(email, token, expiracaoToken) {
  const insertQuery =
    'INSERT INTO tr_tokensReset (tr_email, tr_token, tr_expiracao) VALUES (?, ?, ?)';
  db.query(insertQuery, [email, token, expiracaoToken], (err, result) => {
    if (err) {
      console.error('Erro ao salvar o token:', err);
    } else {
      console.log('Token salvo com sucesso:', result);
    }
  });
}

function enviarEmailRedefinicaoSenha(email, token) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth: {
      user: 'barbershopContato@outlook.com',
      pass: 'barbershop123',
    },
  });

  const opcoesEmail = {
    from: 'barbershopContato@outlook.com',
    to: email,
    subject: 'Redefinição de senha',
    html: `<h1>Olá ${email},</h1> <br> <h3>Para redefinir sua senha, clique no link abaixo:</h3> <br> <a href="http://localhost:3000/api/redefinicaoDeSenha?token=${token}">Redefinir senha</a>`,
  };

  transporter.sendMail(opcoesEmail, (error, info) => {
    if (error) {
      console.log('Erro ao enviar o e-mail:', error);
    } else {
      console.log('E-mail enviado:', info.response);
    }
  });
}

app.post('/api/definirNovaSenha', async (req, res) => {
  const { token, novaSenha } = req.body;
  try {
    const query =
      'SELECT tr_email, tr_expiracao FROM tr_tokensReset WHERE tr_token = ?';
    db.query(query, [token], (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        res
          .status(500)
          .json({ message: 'Ocorreu um erro ao verificar o token.' });
      } else {
        if (results.length > 0) {
          const { tr_email, tr_expiracao } = results[0];
          const now = new Date();

          if (tr_expiracao > now) {
            // Criptografar a nova senha antes de atualizar no banco de dados
            const salt = crypto.randomBytes(16).toString('hex');
            const hash = crypto
              .pbkdf2Sync(novaSenha, salt, 100000, 64, 'sha512')
              .toString('hex');

            // Token válido, atualizar a senha do usuário na tabela usu_usuarios
            const updateQuery =
              'UPDATE usu_usuarios SET usu_senha = ?, usu_salt = ? WHERE usu_email = ?';
            db.query(updateQuery, [hash, salt, tr_email], (err, result) => {
              if (err) {
                console.error('Erro ao atualizar a senha:', err);
                res
                  .status(500)
                  .json({ message: 'Ocorreu um erro ao atualizar a senha.' });
              } else {
                console.log('Senha atualizada com sucesso:', result);
                res
                  .status(200)
                  .json({ message: 'Senha atualizada com sucesso.' });
              }
            });
          } else {
            res.status(400).json({
              message:
                'Token expirado. Solicite novamente a redefinição de senha.',
            });
          }
        } else {
          res.status(404).json({ message: 'Token inválido.' });
        }
      }
    });
  } catch (error) {
    console.log('Erro ao processar a solicitação:', error);
    res
      .status(500)
      .json({ message: 'Ocorreu um erro ao processar a solicitação.' });
  }
});
// Requisicoes
app.post('/api/insertUsuarioCliente', uploadFotoCliente, (req, res) => {
  const { usu_nomeCompleto, usu_email, usu_senha, cli_tel } = req.body;
  const usu_tipo = 'C';
  const usu_foto = req.file.filename;
  const caminhoImagem = req.file.path;

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(usu_senha, salt, 100000, 64, 'sha512')
    .toString('hex');

  const insertUsuario =
    'INSERT INTO usu_usuarios (usu_nomeCompleto, usu_email, usu_senha, usu_salt, usu_foto, usu_caminhoFoto, usu_tipo) VALUES (?,?,?,?,?,?,?)';
  const insertUsuarioCliente =
    'INSERT INTO cli_clientes (usu_id, cli_tel) VALUES (?,?)';
  const insertCartaoFidelidade =
    'INSERT INTO cf_cartoesFidelidade (cli_id, cf_pontos,cf_resgatavel) VALUES (?, 0, false)';

  const updateCaminhoFoto =
    'UPDATE usu_usuarios SET usu_caminhoFoto = ? WHERE usu_id = ?';

  db.beginTransaction((err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }

    db.query(
      insertUsuario,
      [usu_nomeCompleto, usu_email, hash, salt, usu_foto, '', usu_tipo],
      (err, result) => {
        if (err) {
          console.log(err);
          return db.rollback(() => {
            res.status(500).send(err);
          });
        }

        const usu_id = result.insertId;
        const diretorio = `uploads\\Clientes\\${usu_id}`;

        if (!fs.existsSync(diretorio)) {
          fs.mkdirSync(diretorio, { recursive: true });
        }

        const newFilePath = `${diretorio}\\${usu_foto}`;

        fs.rename(caminhoImagem, newFilePath, (err) => {
          if (err) {
            console.log(err);
            return db.rollback(() => {
              res.status(500).send(err);
            });
          }

          db.query(updateCaminhoFoto, [newFilePath, usu_id], (err, result) => {
            if (err) {
              console.log(err);
              return db.rollback(() => {
                res.status(500).send(err);
              });
            }

            db.query(insertUsuarioCliente, [usu_id, cli_tel], (err, result) => {
              if (err) {
                console.log(err);
                return db.rollback(() => {
                  res.status(500).send(err);
                });
              }

              const cli_id = result.insertId;

              db.query(insertCartaoFidelidade, [cli_id], (err, result) => {
                if (err) {
                  console.log(err);
                  return db.rollback(() => {
                    res.status(500).send(err);
                  });
                }

                db.commit((err) => {
                  if (err) {
                    console.log(err);
                    return db.rollback(() => {
                      res.status(500).send(err);
                    });
                  }

                  res.send('Usuário cadastrado com sucesso');
                });
              });
            });
          });
        });
      }
    );
  });
});

const uploadGaleria = multer({ storage: storageGaleria });

app.get('/api/getImagens', (req, res) => {
  const query = 'SELECT gal_nomeImagem FROM gal_galeria';
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ Message: 'Erro' });
    }
    return res.json(result);
  });
});

app.post(
  '/api/uploadImagens',
  uploadGaleria.array('images', 10),
  (req, res) => {
    const imagens = req.files;

    // Verifique se há imagens
    if (!imagens || imagens.length === 0) {
      return res.status(400).json({ Message: 'Nenhuma imagem enviada.' });
    }

    // Processar cada imagem
    imagens.forEach((imagem) => {
      const nomeImagem = imagem.originalname;
      const caminhoImagem = imagem.path;
      const proId = req.body.pro_id;

      const sql = 'INSERT INTO gal_galeria SET ?';

      const values = {
        gal_nomeImagem: nomeImagem,
        gal_caminhoImagem: caminhoImagem,
        pro_id: proId,
      };

      db.query(sql, values, (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ Message: 'Erro ao processar imagens.' });
        }
      });
    });

    return res.json({
      Status: 'success',
      Message: 'Imagens cadastradas com sucesso.',
    });
  }
);

app.get('/api/getImagensPerfis/:usu_id', (req, res) => {
  const usuId = req.params.usu_id;

  const query =
    'SELECT usu_foto, usu_caminhoFoto FROM usu_usuarios WHERE usu_id = ?';

  db.query(query, [usuId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      if (result.length > 0) {
        let caminhoFotoUsuario = result[0].usu_caminhoFoto;

        caminhoFotoUsuario = caminhoFotoUsuario.replace(/\\/g, '/');

        const urlCompleta = `http://localhost:3001/${caminhoFotoUsuario}`;

        res.status(200).send(urlCompleta);
      } else {
        res.status(404).send('Usuário não encontrado');
      }
    }
  });
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

app.post('/api/insertAgendamentoGratuito', (req, res) => {
  const { data, hora, profissionalID, clienteID } = req.body;

  const selectServicoGratuitoQuery =
    'SELECT ser_id FROM ser_servicos WHERE ser_tipo = ? AND ser_gratuito = ?';
  const tipoServicoCorteCabelo = 'Corte';
  const isGratuito = true;

  db.query(
    selectServicoGratuitoQuery,
    [tipoServicoCorteCabelo, isGratuito],
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }

      if (results.length > 0) {
        const servicoCorteCabeloGratuitoId = results[0].ser_id;

        const insertAgendamentoGratuito =
          'INSERT INTO age_agendamento (age_data, age_hora, cli_id, pro_id, ser_id, age_status) VALUES (?,?,?,?,?,?)';

        db.query(
          insertAgendamentoGratuito,
          [
            data,
            hora,
            clienteID,
            profissionalID,
            servicoCorteCabeloGratuitoId,
            false,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
              return;
            }

            // Se o agendamento foi inserido com sucesso, então atualize os campos no cartão de fidelidade
            const updateCartaoFidelidadeQuery =
              'UPDATE cf_cartoesFidelidade SET cf_pontos = 0, cf_resgatavel = false WHERE cli_id = ?';

            db.query(
              updateCartaoFidelidadeQuery,
              [clienteID],
              (err, updateResult) => {
                if (err) {
                  console.log(err);
                  res.status(500).send(err);
                  return;
                }

                // Envie uma resposta apenas depois de ambas as operações terem sido concluídas com sucesso
                res.status(200).json({
                  success: true,
                  message:
                    'Agendamento gratuito inserido com sucesso e campos atualizados no cartão de fidelidade!',
                });
              }
            );
          }
        );
      } else {
        res.status(404).json({
          success: false,
          message: 'Serviço gratuito de corte de cabelo não encontrado!',
        });
      }
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

app.post(
  '/api/insertUsuarioProfissional',
  uploadFotoProfissional,
  (req, res) => {
    const { usu_nomeCompleto, usu_email, usu_senha, pro_descricao } = req.body;
    const usu_tipo = 'P';
    const usu_foto = req.file.filename;
    const caminhoImagem = req.file.path;
    console.log(caminhoImagem);

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(usu_senha, salt, 100000, 64, 'sha512')
      .toString('hex');

    const insertUsuario =
      'INSERT INTO usu_usuarios (usu_nomeCompleto, usu_email, usu_senha, usu_salt, usu_foto, usu_caminhoFoto, usu_tipo) VALUES (?,?,?,?,?,?,?)';
    const insertUsuarioProfissional =
      'INSERT INTO pro_profissionais (usu_id, pro_descricao) VALUES (?,?)';

    const updateCaminhoFoto =
      'UPDATE usu_usuarios SET usu_caminhoFoto = ? WHERE usu_id = ?';

    db.beginTransaction((err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }

      db.query(
        insertUsuario,
        [
          usu_nomeCompleto,
          usu_email,
          hash,
          salt,
          usu_foto,
          '', // Empty usu_caminhoFoto for now
          usu_tipo,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            return db.rollback(() => {
              res.status(500).send(err);
            });
          }

          const usu_id = result.insertId;
          const diretorio = `uploads\\Profissionais\\${usu_id}`;

          if (!fs.existsSync(diretorio)) {
            fs.mkdirSync(diretorio, { recursive: true });
          }

          const newFilePath = `${diretorio}\\${usu_foto}`;

          fs.rename(caminhoImagem, newFilePath, (err) => {
            if (err) {
              console.log(err);
              return db.rollback(() => {
                res.status(500).send(err);
              });
            }

            db.query(
              updateCaminhoFoto,
              [newFilePath, usu_id],
              (err, result) => {
                if (err) {
                  console.log(err);
                  return db.rollback(() => {
                    res.status(500).send(err);
                  });
                }

                db.query(
                  insertUsuarioProfissional,
                  [usu_id, pro_descricao],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                      return db.rollback(() => {
                        res.status(500).send(err);
                      });
                    }

                    const pro_id = result.insertId;

                    db.commit((err) => {
                      if (err) {
                        console.log(err);
                        return db.rollback(() => {
                          res.status(500).send(err);
                        });
                      }

                      res.send({ pro_id });
                    });
                  }
                );
              }
            );
          });
        }
      );
    });
  }
);

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
    'SELECT p.pro_id, u.usu_id, u.usu_nomeCompleto, u.usu_foto, u.usu_caminhoFoto, p.pro_descricao FROM usu_usuarios u JOIN pro_profissionais p ON p.usu_id = u.usu_id; ';
  db.query(selectProfissionais, (err, result) => {
    res.send(result);
  });
});

app.get('/api/getServicosCadastrados', (req, res) => {
  const selectServicos = `
    SELECT ser_id, ser_tipo, ser_preco FROM ser_servicos WHERE ser_gratuito = false;
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
  SELECT a.age_id, a.age_data, a.age_hora, u.usu_nomeCompleto, s.ser_tipo, a.age_status, a.pro_id
  FROM age_agendamento a
  JOIN cli_clientes c ON a.cli_id = c.cli_id
  JOIN usu_usuarios u ON c.usu_id = u.usu_id
  JOIN ser_servicos s ON a.ser_id = s.ser_id
  JOIN pro_profissionais p ON a.pro_id = p.pro_id
  WHERE a.pro_id = ? `;
  db.query(selectAgendamento, [profissionalID], (err, result) => {
    res.send(result);
  });
});

app.get('/api/getAgendamentosAtivosInativos/:clienteID', (req, res) => {
  const clienteID = req.params.clienteID;
  const selectAgendamento = `
  SELECT age.age_id, age.age_data, age.age_hora, usu.usu_nomeCompleto, s.ser_tipo, s.ser_preco, age.age_status
  FROM age_agendamento AS age
  JOIN pro_profissionais AS pro ON age.pro_id = pro.pro_id
  JOIN usu_usuarios AS usu ON pro.usu_id = usu.usu_id
  JOIN ser_servicos AS s ON age.ser_id = s.ser_id
  WHERE age.cli_id = 1
  ORDER BY  age.age_data DESC;`;
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

app.get('/api/getPontosCartao/:cli_id', (req, res) => {
  const cli_id = req.params.cli_id;
  const query =
    'SELECT cf_id, cf_pontos FROM cf_cartoesFidelidade WHERE cli_id = ?;';

  db.query(query, [cli_id], (error, results) => {
    if (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'Error fetching services' });
    } else {
      res.json(results);
    }
  });
});

app.put('/api/atualizarStatusEPagamentoAgendamento', (req, res) => {
  const { agendamentoSelecionado, formaPagamento } = req.body;

  // Passo 1: Atualize o status e a forma de pagamento do agendamento selecionado
  const updateAgendamentoQuery = `
    UPDATE age_agendamento
    SET age_status = true,
        age_pagamento = ?
    WHERE age_id = ?;
  `;

  db.query(
    updateAgendamentoQuery,
    [formaPagamento, agendamentoSelecionado],
    (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send('Erro ao atualizar o status e pagamento do agendamento.');
      } else {
        // Passo 2: Consulte o cli_id e ser_id a partir do agendamento selecionado
        const getAgendamentoInfoQuery = `
          SELECT cli_id, ser_id, age_status FROM age_agendamento
          WHERE age_id = ${agendamentoSelecionado};
        `;

        db.query(getAgendamentoInfoQuery, (err, agendamentoInfo) => {
          if (err) {
            console.error(err);
            res.status(500).send('Erro ao obter informações do agendamento.');
            return;
          }

          if (agendamentoInfo.length === 0) {
            res.status(400).send('Agendamento não encontrado.');
            return;
          }

          const { cli_id, ser_id, age_status } = agendamentoInfo[0];

          // Passo 3: Atualize cf_pontos na tabela cf_cartoesFidelidade se o serviço não for gratuito
          if (!age_status) {
            const updatePontosQuery = `
              UPDATE cf_cartoesFidelidade
              SET cf_pontos = cf_pontos + 1
              WHERE cli_id = ${cli_id} 
                AND EXISTS (
                  SELECT 1 
                  FROM ser_servicos 
                  WHERE ser_id = ${ser_id} AND ser_gratuito = false
                );
            `;

            db.query(updatePontosQuery, (err, result) => {
              if (err) {
                console.error(err);
                res
                  .status(500)
                  .send('Erro ao atualizar os pontos de fidelidade.');
              } else {
                res
                  .status(200)
                  .send(
                    'Status e pagamento do agendamento atualizados com sucesso.'
                  );
              }
            });
          } else {
            res
              .status(200)
              .send(
                'Status do agendamento atualizado com sucesso. O agendamento é gratuito, portanto, nenhum ponto foi adicionado.'
              );
          }
        });
      }
    }
  );
});

app.delete('/api/deleteAgendamentos', (req, res) => {
  const { agendamentosSelecionados } = req.body;

  const deleteAgendamentosQuery = `
    DELETE FROM age_agendamento
    WHERE age_id IN (${agendamentosSelecionados.join(',')});
  `;

  db.query(deleteAgendamentosQuery, (err, result) => {
    if (err) {
      // Tratar o erro de exclusão
      console.error(err);
      res.status(500).send('Erro ao excluir os agendamentos.');
    } else {
      // Agendamentos excluídos com sucesso
      res.status(200).send('Agendamentos excluídos com sucesso.');
    }
  });
});

app.get('/api/getFaturamento', (req, res) => {
  const query = `
  SELECT DATE(age_data) AS data, SUM(ser_preco) AS ganho_diario
  FROM age_agendamento
  JOIN ser_servicos ON age_agendamento.ser_id = ser_servicos.ser_id
  WHERE age_status = 1
  GROUP BY data
  ORDER BY data;
`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Erro: ', error);
      res.status(500).json({ error: 'Erro ao recuperar faturamento' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/getFaturamento/:pro_id', (req, res) => {
  const pro_id = req.params.pro_id;
  const query = `
  SELECT DATE(age_data) AS data, SUM(ser_preco) AS ganho_diario
  FROM age_agendamento
  JOIN ser_servicos ON age_agendamento.ser_id = ser_servicos.ser_id
  WHERE age_status = 1 AND pro_id = ?
  GROUP BY data
  ORDER BY data;
`;

  db.query(query, [pro_id], (error, results) => {
    if (error) {
      console.error('Erro: ', error);
      res.status(500).json({ error: 'Erro ao recuperar faturamento' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/getProjecaoFaturamento/:pro_id', (req, res) => {
  const pro_id = req.params.pro_id;
  const query = `
  SELECT p.pro_id, p.pro_descricao, SUM(s.ser_preco) AS faturamento_profissional
  FROM age_agendamento a
  JOIN pro_profissionais p ON a.pro_id = p.pro_id
  JOIN ser_servicos s ON a.ser_id = s.ser_id
  WHERE a.pro_id = ?
  GROUP BY p.pro_id, p.pro_descricao;
`;

  db.query(query, [pro_id], (error, results) => {
    if (error) {
      console.error('Erro: ', error);
      res.status(500).json({ error: 'Erro ao recuperar faturamento' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/getProjecaoFaturamento', (req, res) => {
  const query = `
  SELECT DATE(age_data) AS data, SUM(ser_preco) AS ganho_diario
  FROM age_agendamento
  JOIN ser_servicos ON age_agendamento.ser_id = ser_servicos.ser_id
  GROUP BY data
  ORDER BY data;
`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Erro: ', error);
      res.status(500).json({ error: 'Erro ao recuperar faturamento' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/getServicosQtd', (req, res) => {
  const query = `
  SELECT ser_tipo, COUNT(*) as quantidade
    FROM age_agendamento
    INNER JOIN ser_servicos ON age_agendamento.ser_id = ser_servicos.ser_id
    GROUP BY ser_tipo;
`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Erro: ', error);
      res
        .status(500)
        .json({ error: 'Erro ao recuperar quantidade de servicos' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/getServicosQtd/:pro_id', (req, res) => {
  const pro_id = req.params.pro_id;
  const query = `
  SELECT p.pro_id, p.pro_descricao, s.ser_tipo, COUNT(*) as quantidade
  FROM age_agendamento a
  INNER JOIN pro_profissionais p ON a.pro_id = p.pro_id
  INNER JOIN ser_servicos s ON a.ser_id = s.ser_id
  WHERE p.pro_id = ?
  GROUP BY p.pro_id, p.pro_descricao, s.ser_tipo
  ORDER BY p.pro_id, quantidade DESC;
`;

  db.query(query, [pro_id], (error, results) => {
    const pro_id = req.params.pro_id;
    if (error) {
      console.error('Erro: ', error);
      res
        .status(500)
        .json({ error: 'Erro ao recuperar quantidade de servicos' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/getCartaoResgatavel/:cli_id', (req, res) => {
  const cli_id = req.params.cli_id;
  const query =
    'SELECT cf_resgatavel FROM cf_cartoesFidelidade WHERE cli_id = ?';

  db.query(query, [cli_id], (error, results) => {
    if (error) {
      console.error('Error fetching cf_resgatavel:', error);
      res.status(500).json({ error: 'Error fetching cf_resgatavel' });
    } else {
      if (results.length > 0) {
        const cf_resgatavel = results[0].cf_resgatavel;
        res.json({ cf_resgatavel });
      } else {
        // Cliente não encontrado, você pode retornar um valor padrão ou tratar isso de acordo com a lógica do seu aplicativo.
        res.status(404).json({ error: 'Cliente not found' });
      }
    }
  });
});

app.get('/api/getAgendamentos/:data/:pro_id', (req, res) => {
  const data = req.params.data;
  const pro_id = req.params.pro_id;

  const query =
    'SELECT * FROM age_agendamento a JOIN ser_servicos s ON a.ser_id = s.ser_id WHERE age_data = ? AND pro_id = ?';
  db.query(query, [data, pro_id], (error, results) => {
    if (error) {
      console.error('Erro ao consultar agendamentos:', error);
      res.status(500).json({ error: 'Erro ao consultar agendamentos' });
      return;
    }

    res.json(results);
  });
});

app.get('/api/getCliente/:cli_id', (req, res) => {
  const cli_id = req.params.cli_id; // Corrigido para req.params.cli_id
  const query =
    'SELECT * FROM cli_clientes c JOIN usu_usuarios u ON c.usu_id = u.usu_id WHERE cli_id = ?;';
  db.query(query, [cli_id], (error, results) => {
    if (error) {
      console.error('Erro ao consultar cliente:', error);
      res.status(500).json({ error: 'Erro ao consultar cliente' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Cliente não encontrado' });
      return;
    }

    res.json(results[0]);
  });
});

//Inicializando sessoes

app.post('/api/loginUsuario', (req, res) => {
  const { usu_email, usu_senha } = req.body;

  const selectLogin = `
    SELECT u.usu_id, u.usu_tipo, u.usu_nomeCompleto, u.usu_senha,u.usu_salt, u.usu_foto, 
      c.cli_id, a.adm_id, p.pro_descricao, p.pro_id
    FROM usu_usuarios u
    LEFT JOIN cli_clientes c ON c.usu_id = u.usu_id
    LEFT JOIN adm_administradores a ON a.usu_id = u.usu_id
    LEFT JOIN pro_profissionais p ON p.usu_id = u.usu_id
    WHERE u.usu_email = ?;
  `;

  db.query(selectLogin, [usu_email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: 'O email não está registrado no sistema',
      });
      return;
    }

    if (result.length > 0) {
      const usuario = result[0];
      const senhaArmazenada = usuario.usu_senha;
      const salt = usuario.usu_salt;

      const hashSenhaFornecida = crypto
        .pbkdf2Sync(usu_senha, salt, 100000, 64, 'sha512')
        .toString('hex');

      if (hashSenhaFornecida === senhaArmazenada) {
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
      }
      // Senha correta
    } else {
      res.status(401).json({
        success: false,
      });
    }
  });
});

// Mostrando onde o servidor esta rodando!

app.listen(3001, () => {
  console.log('Server rodando em localhost:3001');
});
