const { faker } = require('@faker-js/faker');

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
    return new Promise((resolve, reject) => {
      try{
        setTimeout(()=> {
          resolve(this.users);
        },5000);
      }catch(e){
        throw new Error(e,reject);
      }
    });
  }

  async findOne(id){
    // eslint-disable-next-line no-unused-vars
    const name = this.getTotal();
    return this.users.find(item => item.id === id);
  }

  async update(id, changes){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('User not found');
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
      throw new Error('User ' + id + ' does not exist');
    }
    this.users.splice(index, 1);
    return {id, message: 'successfully deleted'};
  }
}

module.exports = UserService;
