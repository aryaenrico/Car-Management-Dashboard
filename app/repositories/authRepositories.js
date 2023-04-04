const {User} = require('../models')
module.exports={

      async register(payload){
            return User.create(payload);
      }
}