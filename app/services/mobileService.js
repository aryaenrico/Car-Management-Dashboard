
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
     async update(olddata,payload){
            const payloadUpdate ={
                  id:olddata.id,
                  nama_mobil:payload.nama_mobil,
                  harga_sewa:payload.harga_sewa,
                  ukuran:payload.ukuran,
                  foto:payload.foto,
                  createdBy:olddata.createdBy,
                  createdAt:olddata.createdAt,
                  updatedBy:payload.updatedBy,
                  updatedAt: new Date()
            };
            console.info(payloadUpdate);
            return repositories.updateCar(payloadUpdate);
      },
      async allCars(){
            return repositories.car();
      },
      async delete(id,payload){
            const payloadDelete ={
                  id:payload.id,
                  nama_mobil:payload.nama_mobil,
                  harga_sewa:payload.harga_sewa,
                  ukuran:payload.ukuran,
                  foto:payload.foto,
                  createdBy:payload.createdBy,
                  createdAt:payload.createdAt,
                  modifiedBy:id,
                  deletedBy:id,
                  updatedBy:id,
                  updatedAt: new Date()
            };
           

            return repositories.deleteCar(payloadDelete);
           
      },
      async findCar(id){
            return repositories.findCar(id);
      }
}