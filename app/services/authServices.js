const authRepositories = require('../repositories/authRepositories');

module.exports={
      async register (payload){
            return authRepositories.register(payload);
      },

      async findUser(email){
            return authRepositories.findUser(email);
      }
}