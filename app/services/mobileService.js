
const repositories = require ('../repositories/mobilRepositories');


module.exports ={
      create({nama_mobil,ukuran,foto,harga_sewa,id}){
            const payload={
                  nama_mobil:nama_mobil,
                  ukuran:ukuran,
                  foto:foto,
                  harga_sewa:harga_sewa,
                  createdBy:id,
                  updatedBy:id,
                  deletedBy:0
            };
            return repositories.create(payload);
 
     
      },
      allCars(){
            return repositories.car();
      }
}