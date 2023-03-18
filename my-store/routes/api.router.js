const express = require('express');
const router = express.Router();

router.get('/api', (req,res) => {                  // asi se crea una nueva page donde res(response) es la info que se trae del servidor y req(require) es la informacion que se manda al servidor
  res.send('Hola mi server en express');    //  se utilisa res.send() para enviar algo a la url designada
});

module.exports = router;
