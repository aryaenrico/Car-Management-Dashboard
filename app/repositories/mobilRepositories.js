const {Mobil} = require('../models');


module.exports ={

      create(createArgs){
            return Mobil.create(createArgs);
      },

      async car(){
           
           
            return Mobil.findAll(
                  {
                        where:{
                              deletedBy:""
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
           
            return Mobil.update(payload,{
                  where:{
                        id:payload.id
                  }
            });
      },

      updateCar(payload){
            return Mobil.update(payload,{
                  where:{
                        id:payload.id
                  }
            });
      }
      
     
      
}