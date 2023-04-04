const mobileService = require("../../../services/mobileService");
const uploadService = require("../../../services/uploadService");
const uploadMemory = require("../../../../middleware/uploadMemory");
const {cekRole} = require('../../../../utils/file');

 
module.exports={
   async create(req,res){
      const {role,id} = req.user;
     
      if (!cekRole(role)){
            res.status(401).json({
                  message:'Unauthorized'
            })
      }
      const fileBase64 = req.file.buffer.toString("base64")
      const file = `data:${req.file.mimetype};base64,${fileBase64}`
      const url = await uploadService.uploadToCloudinary(file);
      req.body.foto =url.url;
      req.body.id =id;
      
      mobileService.create(req.body).then(result=>{
                  res.status(201).json({
                        status:"created",
                        data:result
                  });
            }) .catch((err) => {
                  res.status(422).json({
                    status: "FAIL",
                    message: err.message,
                  });
                }); 
      },

      async uploadImage(req,res,next){
      const fileBase64 = req.file.buffer.toString("base64")
      const file = `data:${req.file.mimetype};base64,${fileBase64}`
      uploadService.uploadToCloudinary(file).then(data=>{
            req.body.foto = data;
            next();
      }).catch(e=>{
            res.status(500).json({
                  status:"internal server error",
                  message:e
            })
      })

      },

       cek(req,res,next){
            const data =req.get('token');
           if (data != undefined){
            console.info(data);
            console.info(req.body)
            next();
            return 
           }
           res.status(400).json({
            data: data
           });
            
      },
     async allCar(req,res){
            mobileService.allCars().then(data=>{
                  res.status(200).json({
                        status:"success",
                        data:data
                  })
            }).catch(e=>{
                  res.status(500).json({
                        status:"fail",
                        message:e.message
                  });
            })
      },
      async delete(req,res){
            const {role,id} = req.user;
            try{
                  if (!cekRole(role)){
                        res.status(401).json({
                              message:'Unauthorized'
                        });
                  }
                  carIsExist = await mobileService.findCar(req.params.id);
                  console.log(carIsExist);
                  if (carIsExist == undefined || carIsExist.deletedBy != 0 ){
                        res.status(404).json({
                              status:"Fail",
                              message:"data not found"
                        })
                  }else{
                        deletedCar = await mobileService.delete(id,carIsExist);
                        res.status(200).json({
                              status:"success",
                              message:"data sudah di hapus"
                        })
                  }
                  
            }catch(e){
                  res.status(500).json({
                        status:"fail",
                        message:e.message
                  });
            }
      },
      async update(req,res){
            const {role,id} = req.user;
            console.info(`angka: ${id}`);
            if (!cekRole(role)){
                  res.status(401).json({
                        message:'Unauthorized'
                  })
            }

            carIsExist = await mobileService.findCar(req.params.id);
            if (carIsExist == undefined){
                  res.status(404).json({
                        status:"Fail",
                        message:"data not found"
                  })
            }
      
            const fileBase64 = req.file.buffer.toString("base64")
            const file = `data:${req.file.mimetype};base64,${fileBase64}`
            const url = await uploadService.uploadToCloudinary(file);
            const payload={... req.body,
            updatedBy:id};
            mobileService.update(carIsExist,payload).then(result=>{
                        res.status(200).json({
                              status:"updated"
                        });
                  }) .catch((err) => {
                        res.status(422).json({
                          status: "FAIL",
                          message: err.message,
                        });
                      }); 
      }

      
      
      
      
}