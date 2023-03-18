// se extrae y se separa todo lo que tenga que ver con la seccion products en un aerchivo idependiente

const express = require('express');
const { faker } = require('@faker-js/faker');     //libreri faker new

const router = express.Router();


router.get('/', (req, res) => {     //creando ruta de productos y agregando contenido fake para testeo
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
router.get('/filter', (req, res) => {    // los endpoints especificos tienen que estar declarados antes de los dinamicos
  res.send('Yo soy un filter');
});

//endpoint dinamico
router.get('/:id', (req,res) => { // este endpoint es para obtener el id en este caso de la url y es dinamico
  const { id } = req.params;
  res.json( {
    id,
    name: 'producto 2',
    price: 2000
  });
});

/*
  el metodo post se utiliza para recibir peticiones o datos que se envian a la base de datos
  de la manera siguiente
      // nora: para poder mostrar los datos corrextamente hay que utilizaz un middleware en el index.js
 */
router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created',
    data: body
  });
});

/*
  patch es el metodo que se encarga de modificar los archivos parcialmente ( por partes ) y el PUT se utiliza para modificar todo el archo completo
  esto no es obligatorio ya que es por convencion y es para poder tener una buena practica
*/
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

/*
 Delete es para eliminar
*/
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id,
  });
});

module.exports = router;
