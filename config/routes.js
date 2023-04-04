const express =require ('express');
const controller =require ("../app/controllers/");
var bodyParser = require('body-parser')  
const apiRouter = express.Router();
const appRouter =express.Router();
const uploadMemory =require('../middleware/uploadMemory');

apiRouter.post("/api/v1/cars",[controller.api.v1.mobilController.cek,uploadMemory.single("foto")],controller.api.v1.mobilController.create);
apiRouter.post("/api/v1/register",controller.api.v1.authController.register);
apiRouter.post("/api/v1/login",controller.api.v1.authController.login);
apiRouter.get("/api/v1/auth/whoami", controller.api.v1.authController.authorize, controller.api.v1.authController.whoami);
appRouter.use(apiRouter);
module.exports =appRouter;