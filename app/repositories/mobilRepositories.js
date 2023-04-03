const {Mobil} = require('../models');

module.exports ={

      create(createArgs){
            return Mobil.create(createArgs);
      }
}