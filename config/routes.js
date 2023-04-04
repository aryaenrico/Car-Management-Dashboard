const express =require ('express');
const controller =require ("../app/controllers/");
var bodyParser = require('body-parser')  
const apiRouter = express.Router();
const appRouter =express.Router();
const uploadMemory =require('../middleware/uploadMemory');

apiRouter.post("/api/v1/cars",[controller.api.v1.authController.authorize,uploadMemory.single("foto")],controller.api.v1.mobilController.create);
apiRouter.get("/api/v1/cars",controller.api.v1.mobilController.allCar);
apiRouter.post("/api/v1/register",controller.api.v1.authController.register);
apiRouter.post("/api/v1/login",controller.api.v1.authController.login);
apiRouter.post("/api/v1/register/admin",controller.api.v1.authController.authorize,controller.api.v1.authController.register);
apiRouter.get("/api/v1/auth/whoami", controller.api.v1.authController.authorize, controller.api.v1.authController.whoami);
apiRouter.delete("/api/v1/cars/:id",controller.api.v1.authController.authorize,controller.api.v1.mobilController.delete);
apiRouter.put("/api/v1/cars/:id",[controller.api.v1.authController.authorize,uploadMemory.single("foto")],controller.api.v1.mobilController.update);

appRouter.use(apiRouter);
module.exports =appRouter;