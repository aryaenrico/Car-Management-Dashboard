const mobileService = require("../../../services/mobileService");
const uploadService = require("../../../services/uploadService");
const uploadMemory = require("../../../../middleware/uploadMemory");

 
module.exports={
   async create(req,res){
      const fileBase64 = req.file.buffer.toString("base64")
      const file = `data:${req.file.mimetype};base64,${fileBase64}`
      console.info(file);
      const url = await uploadService.uploadToCloudinary(file);
      const{url:url_foto} =url;
      req.body.foto =url_foto;
      
      
      
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

      uploadImage(req,res,next){
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

      }

      
      
      
      
}