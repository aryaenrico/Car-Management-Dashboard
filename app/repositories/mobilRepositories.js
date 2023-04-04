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
      },


      findCar(id){
            return Mobil.findOne({
                  where:{
                        id:id
                  }
            });
      },

      deleteCar (payload){
            console.log(payload);
            return Mobil.update(payload,{
                  where:{
                        id:payload.id
                  }
            });
      }

      
}