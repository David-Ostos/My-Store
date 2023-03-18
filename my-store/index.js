// llamadas a los paquetes necesarios
//libreria express
const express = require('express');
const { faker } = require('@faker-js/faker');     //libreri faker new



const app = express();              // aqui se cran las constantes para poder activar express
const port = 3000;                // constante que tiene el port que vamos a utilizar
const IP = '192.168.100.211';   // const donde tenemos la IP de nuestro router para poder ver la pagina en todos los dispositivos


app.get('/', (req,res) => {                  // asi se crea una nueva page donde res(response) es la info que se trae del servidor y req(require) es la informacion que se manda al servidor
  res.send('Hola mi server en express');    //  se utilisa res.send() para enviar algo a la url designada
});

app.get('/nueva-ruta', (req,res) => {   //creando nueva ruta
  res.send('Hola soy una nueva ruta');
});

app.get('/products', (req, res) => {     //creando ruta de productos y agregando contenido fake para testeo
  const products = [];                 // se crea un array vacio de productos para cargarlos proximamente
  const { size } = req.query;         // esto es un filtro que se manda desde la url para tener un numero de productos a mostrar
  const limit = size || 10;       // se crea la constante limit para pasar el parametro en el ciclo for, y se le pone un valor por defecto por si no se manda nada

  for(let index = 0; index < limit; index++){       // con el ciclo for se y la lib faker se van creando nuevos productos
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    });
  }
  res.json(products);
});

//endpoint especifico
app.get('/products/filter', (req, res) => {    // los endpoints especificos tienen que estar declarados antes de los dinamicos
  res.send('Yo soy un filter');
});

//endpoint dinamico
app.get('/products/:id', (req,res) => { // este endpoint es para obtener el id en este caso de la url y es dinamico
  const { id } = req.params;
  res.json( {
    id,
    name: 'producto 2',
    price: 2000
  });
});



app.get('/users',(req,res) => {
  const { limit, offset } = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    });
  }else{
    res.send('No hay parametros');
  }
});

app.get('/categories/:categoryId/products/:productId', (req,res) => {
  const {categoryId, productId} = req.params;
  res.json( {
    categoryId,
    productId
  });
});



app.listen(port, () => {
  console.log('http://'+ IP +':' + port + '/');
});
