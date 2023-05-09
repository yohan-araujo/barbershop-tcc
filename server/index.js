const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('oi yohan');
});

app.listen(3001, () => {
  console.log('Server rodando na porta 3001');
});
