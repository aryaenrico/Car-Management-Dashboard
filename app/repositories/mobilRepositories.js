const {Mobil} = require('../models');

module.exports ={

      create(createArgs){
            return Mobil.create(createArgs);
      },

      car(){
            return Mobil.findAll(
                  {
                        where:{
                              deletedBy:0
                        }
                  }
            );
      }

      
}