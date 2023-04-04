const authRepositories = require('../repositories/authRepositories');

module.exports={
      async register (payload){
            return authRepositories.register(payload);
      }
}