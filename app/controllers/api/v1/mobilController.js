const mobileService = require("../../../services/mobileService");
const uploadService = require("../../../services/uploadService");
const uploadMemory = require("../../../../middleware/uploadMemory");
const {cekRole} = require('../../../../utils/file');

 
module.exports={
   async create(req,res){
      const {role,id} = req.user;
      console.info(id);
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
            const {role} = req.user;
            try{
                  if (!cekRole(role)){
                        res.status(401).json({
                              message:'Unauthorized'
                        });
                  }
                  dataMobil = await mobileService.allCars();

                  res.status(200).json({
                        status:"success",
                        data:dataMobil
                  })
            }catch(e){
                  res.status(500).json({
                        status:"fail",
                        message:e.message
                  });
            }
            
            
           

      }

      
      
      
      
}