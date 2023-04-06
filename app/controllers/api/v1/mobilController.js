const mobileService = require("../../../services/mobileService");
const uploadService = require("../../../services/uploadService");
const uploadMemory = require("../../../../middleware/uploadMemory");
const {cekRole} = require('../../../../utils/file');

 
module.exports={
   async create(req,res){
    
    const role = res.locals.user == undefined ? res.status(401).json({message:"Unautorized"}) :res.locals.user.role;
    console.info(cekRole(role)); 
    
    if (!await cekRole(role)){
            res.status(401).json({
                  message:'Unauthorized'
            })
      }
      const fileBase64 = req.file.buffer.toString("base64")
      const file = `data:${req.file.mimetype};base64,${fileBase64}`
      const url = await uploadService.uploadToCloudinary(file);
      req.body.foto =url.url;
      req.body.id =res.locals.user.email;
      
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

      async carById (req,res){
            let numbers = req.params.id
            if (numbers == undefined){
                  res.status(404).json({message:"missing path number"});
                  return;
            }
            
            mobileService.findCar(numbers).then(carResults=>{
                  carResults == undefined ? res.status(404).json({status:"success",data:"Data Not Found"}) :  res.status(200).json({status:"succses",data :carResults});
                  return;
            }).catch(err =>{
                  res.status(500).json({
                        status:"Error",
                        message:err.message
                  });
                  return;
            })

            


      },
      async delete(req,res){
            const role = res.locals.user == undefined ? res.status(401).json({message:"Unautorized"}) :res.locals.user.role;
            try{
                  if (! await cekRole(role)){
                        res.status(401).json({
                              message:'Unauthorized'
                        });
                        return
                  }
                  carFind = await mobileService.findCar(req.params.id);
                  if (carFind == undefined || carFind.deletedBy != "" ){
                        res.status(404).json({
                              status:"Fail",
                              message:"data not found"
                        })
                        return
                  }else{
                        deletedCar = await mobileService.delete(res.locals.user.email,carFind);
                        res.status(200).json({
                              status:"success",
                              message:"data sudah di hapus"
                        })
                        return
                  }
                  
            }catch(e){
                  res.status(500).json({
                        status:"fail",
                        message:e.message
                  });
                  return
            }
      },
      async update(req,res){
            const role = res.locals.user == undefined ? res.status(401).json({message:"Unautorized"}) :res.locals.user.role;
            if (! await cekRole(role)){
                  res.status(401).json({
                        message:'Unauthorized'
                  })
                  return
            }

            carFind = await mobileService.findCar(req.params.id);
            carFind == undefined ? res.status(404).json({status:"fail",message:"Data Not Found"}) : null;
            
      
            const fileBase64 = req.file.buffer.toString("base64")
            const file = `data:${req.file.mimetype};base64,${fileBase64}`
            const url = await uploadService.uploadToCloudinary(file);
            req.body.foto =url.url;
            const payload={... req.body,
            updatedBy:res.locals.user.email};
            mobileService.update(carFind,payload).then(result=>{
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