//libreri faker new
const { faker } = require('@faker-js/faker');

class ProductService{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;       // se crea la constante limit para pasar el parametro en el ciclo for, y se le pone un valor por defecto por si no se manda nada
    for(let index = 0; index < limit; index++){       // con el ciclo for se y la lib faker se van creando nuevos productos
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      });
    }
  }
  //endpoint
  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,                                // se utiliza el spread operation (...) para concatenar los otros parametros del objeto
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve, reject) => {
      try{
        setTimeout(()=> {
          resolve(this.products);
        },5000);
      }catch(e){
        throw new Error(e,reject);
      }
    });
  }

  async findOne(id){
    // eslint-disable-next-line no-unused-vars
    const name = this.getTotal();
    return this.products.find(item => item.id === id);  //.find() regresa el objeto encontrado por el id
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id); // findIndex() regresa la posiocion del objeto encontrado
    if(index === -1){                                             // se crea esta condicional para saber si existe el id el -1 refiere a que no existe
      throw new Error('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };                              // se aplican los cambios
    return this.products[index];                                // se devuelve el objeto modificado
  }
  async delete(id){
    const index = this.products.findIndex(item => item.id === id); // findIndex() regresa la posiocion del objeto encontrado
    if(index === -1){                                             // se crea esta condicional para saber si existe el id el -1 refiere a que no existe
      throw new Error('Product not found');
    }
    this.products.splice(index, 1);                                        // el termino splice es para poder eliminar apartir de 2 parametros 1ero la posicion 2do para saber cuantos va a eliminar
    return {id , mesasge: 'successfully deleted'};
  }
}

module.exports = ProductService;
