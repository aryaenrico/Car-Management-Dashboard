
const authServices = require('../../../services/authServices');
const {encryptPassword,checkPassword,createToken} = require('../../../../utils/file');
const jwt = require('jsonwebtoken');
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

      async login(req,res){
            const {email,password} = req.body;
            const user = await authServices.findUser(email);

            if (user != undefined){
                  isPasswordValid = await checkPassword(password,user.password);
                  if ( !isPasswordValid){
                        res.status(404).json({
                              status:"Not Found",
                              message:"Wrong Password"
                        })
                  }else{
                        const tempUser = {
                              id:user.id,
                              email:user.email,
                              role:user.email,
                              createdAt:user.createdAt,
                              updatedAt:user.updatedAt
                           }
                     const token = await createToken(tempUser);
                      
                  res.status(200).json({
                        status:"Success",
                        data:{
                          ... tempUser,
                          token:token
                        }
                      })  
                  }
            }else{
                  res.status(404).json({
                        status:"Not Found",
                        message:"email is not registered"
                  })
            }
      },

      async whoami(req,res){
        res.status(200).json(req.user)
      },

      async authorize(req,res,next){
            try{
            const bearertoken = req.headers.authorization;
            if (bearertoken == undefined){
                  res.status(401).json({
                        message:"Unauthorized cok"
                  });
            }
            const token = bearertoken.split("Bearer ")[1];
            const tokenPayload =jwt.verify(token,process.env.JWT_SIGNATURE_KEY || "arya enrico");

            req.user = await authServices.findUser(tokenPayload.email);
            next();
            } catch(e){
                  res.status(401).json({
                        message:"Unauthorized"
                  });
            }
      }
      
}