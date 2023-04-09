const express =require ('express');
const controller =require ("../app/controllers/");
const apiRouter = express.Router();
const appRouter =express.Router();
const uploadMemory =require('../middleware/uploadMemory');

apiRouter.post("/api/v1/cars",[controller.api.v1.authController.authorize,uploadMemory.single("foto")],controller.api.v1.mobilController.create);
apiRouter.get("/api/v1/cars",controller.api.v1.mobilController.allCar);
apiRouter.get("/api/v1/cars/:id",controller.api.v1.mobilController.carById);
apiRouter.post("/api/v1/register",controller.api.v1.authController.register);
apiRouter.post("/api/v1/login",controller.api.v1.authController.login);
apiRouter.post("/api/v1/register/admin",controller.api.v1.authController.authorize,controller.api.v1.authController.registerAdmin);
apiRouter.get("/api/v1/whoami", controller.api.v1.authController.authorize, controller.api.v1.authController.whoami);
apiRouter.delete("/api/v1/cars/:id",controller.api.v1.authController.authorize,controller.api.v1.mobilController.delete);
apiRouter.put("/api/v1/cars/:id",[controller.api.v1.authController.authorize,uploadMemory.single("foto")],controller.api.v1.mobilController.update);

appRouter.use(apiRouter);
module.exports =appRouter;