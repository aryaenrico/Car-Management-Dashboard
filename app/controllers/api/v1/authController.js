
const authServices = require('../../../services/authServices');
const {encryptPassword} = require('../../../../utils/file');
module.exports={
      async register (req,res){
       const { email, password } = await req.body;
       console.info(password);
    
        const encryptedPassword = await encryptPassword(password);
        const payload ={
            email:email,
            password:encryptedPassword,
            role:"member"
        }
        authServices.register(payload).then(result=>{
            res.status(201).json({
                  status: "OK",
                  data: result,
                })
        }).catch(e=>{
            res.status(400).json({
                  status: "FAIL",
                  message: e.message,
                });
        })
      },
      
}