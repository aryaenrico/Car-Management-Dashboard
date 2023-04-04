const mobileService = require("../../../services/mobileService");
const uploadService = require("../../../services/uploadService");
const uploadMemory = require("../../../../middleware/uploadMemory");

 
module.exports={
   async create(req,res){
      const fileBase64 = req.file.buffer.toString("base64")
      const file = `data:${req.file.mimetype};base64,${fileBase64}`
      const url = await uploadService.uploadToCloudinary(file);
      req.body.foto =url.url;
      
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
            
      }

      
      
      
      
}