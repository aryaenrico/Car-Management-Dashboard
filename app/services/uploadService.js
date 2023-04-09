
const cloudinary = require("../../config/cloudinary");

module.exports={
      async uploadToCloudinary (file)  {
            let url;
           url =  cloudinary.uploader.upload(file, (err, result) => {
                  if(!!err){
                      console.log(err)
                      return res.status(400).json({
                          message: "Gagal upload file"
                      })
                  }
                 return result.url;
            })
            

            return url;
}
}
          

