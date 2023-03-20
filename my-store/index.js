// llamadas a los paquetes necesarios
//libreria express
const express = require('express');
const routerApi = require('./routes');
const { errorHandler, logErrors }  = require('./middleware/error.handler');

const app = express();              // aqui se cran las constantes para poder activar express
const port = 3000;                // constante que tiene el port que vamos a utilizar
const IP = '192.168.100.211';   // const donde tenemos la IP de nuestro router para poder ver la pagina en todos los dispositivos

app.use(express.json());

/* app.get('/', (req,res) => {                  // asi se crea una nueva page donde res(response) es la info que se trae del servidor y req(require) es la informacion que se manda al servidor
  res.send('Hola mi server en express');    //  se utilisa res.send() para enviar algo a la url designada
});

app.get('/nueva-ruta', (req,res) => {   //creando nueva ruta
  res.send('Hola soy una nueva ruta');
}); */

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('http://'+ IP +':' + port + '/');
});
