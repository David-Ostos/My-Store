// se extrae y se separa todo lo que tenga que ver con la seccion products en un aerchivo idependiente
const express = require('express');

const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middleware/validator.handler.js');
const {   createProductSchemas,
  updateProductSchemas,
  getProductSchemas
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

//endpoint especifico mostrar productos
router.get('/', async (req, res) => {                                            //creando ruta de productos y agregando contenido fake para testeo
  const products = await service.find();
  res.json(products);
});

//endpoint especifico encontrar producto por filtro
router.get('/filter', async (req, res) => {                                 // los endpoints especificos tienen que estar declarados antes de los dinamicos
  res.send('Yo soy un filter');
});

//endpoint especifico encontrar producto por id
router.get('/:id',
  validatorHandler(getProductSchemas,'params'),
  async (req,res,next) => {                                 // este endpoint es para obtener el id en este caso de la url y es dinamico
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// endpoint para crear un producto
/*
  el metodo post es para crear y se mandan peticiones o datos a la base de datos
  de la manera siguiente
      // nota: para poder mostrar los datos correctamente hay que utilizaz un middleware en el index.js
 */
router.post('/',
  validatorHandler(createProductSchemas,'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  });

//endpoint para modificar un producto
/*
  patch es el metodo que se encarga de modificar los archivos parcialmente ( por partes ) y el PUT se utiliza para modificar todo el archo completo
  esto no es obligatorio ya que es por convencion y es para poder tener una buena practica
*/
router.patch('/:id',
  validatorHandler(getProductSchemas,'params'),
  validatorHandler(updateProductSchemas,'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

//enpoint para eliminar un producto
/*
 Delete es para eliminar
*/
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
