const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UserService{

  constructor(){
    this.users = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for( let i = 0; i < limit; i++ ){
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });
    }
  }

  async create(data){
    const newUser= {
      id: faker.datatype.uuid(),
      ...data
    };
    this.users.push(newUser);
    return newUser;
  }

  find(){
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        resolve(this.users);
      },5000);
    });
  }

  async findOne(id){
    const user = this.users.find(item => item.id === id);
    if(!user){
      throw boom.notFound('Product not found');
    }
    return user;
  }

  async update(id, changes){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id){
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.users.splice(index, 1);
    return {id, message: 'successfully deleted'};
  }
}

module.exports = UserService;
