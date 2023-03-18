// este es el archivo donde se manda a llamar todos los endpoints y se exportan para utilizarlos en su respectiva area

const productsRouter = require('./products.router');   //se llama a los modulos para poder utilizarlos en un solo archivos para facilitar el mantenimiento
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

//se crea la funcion que va a ser llamada en el modulo principal y es donde se almacenan todos los endpoints
function routerApi(app){
  app.use('/api/products', productsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/categories', categoriesRouter);
}


module.exports = routerApi;                           // se exporta la funcion para utilizarla en el modulo principal
