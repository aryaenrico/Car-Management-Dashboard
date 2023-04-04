const {User} = require('../models')
module.exports={

      async register(payload){
            return User.create(payload);
      },
      async findUser(email){
            return User.findOne({
                  where:{
                        email:email
                  }
            })
      }
}