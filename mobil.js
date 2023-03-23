
 const {Mobil} =require("./models");
 class MobilController{
    
      constructor(nama_mobil,ukuran,foto,harga_sewa){
            this.nama_mobil = nama_mobil;
            this.ukuran =ukuran;
            this.foto =foto;
            this.harga_sewa = harga_sewa;
      }

      static create({nama_mobil,ukuran,foto,harga_sewa}){
            const objCar = new MobilController(nama_mobil,ukuran,foto,harga_sewa);
            const result = Mobil.create(objCar);
            return result;
            
      }

      static findAll(){
            return Mobil.findAll();
      }


      static findById(param){
            return Mobil.findOne({
                  where:{
                        id:param,
                  }
            })
      }

      static findbySize(param){
            return Mobil.findAll({
                  where:{
                        ukuran:param,
                  }
                  
 
             });
      }

      static deleteCar(param){
            Mobil.destroy({
                  where:{
                        id:param
                  }
            })
      }
}
module.exports = MobilController;