const express =require ('express');
const controller =require ("../app/controllers/");
var bodyParser = require('body-parser')  
var jsonParser = bodyParser.json(); 
const apiRouter = express.Router();
const appRouter =express.Router();
const uploadMemory =require('../middleware/uploadMemory');

apiRouter.post("/api/v1/cars",[controller.api.v1.mobilController.cek,uploadMemory.single("foto")],controller.api.v1.mobilController.create);
apiRouter.post("/api/v1/register",controller.api.v1.authController.register);
appRouter.use(apiRouter);
module.exports =appRouter;