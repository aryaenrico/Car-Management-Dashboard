const express =require ('express');
const controller =require ("../app/controllers/");
const apiRouter = express.Router();
const appRouter =express.Router();
const uploadMemory =require('../middleware/uploadMemory');

apiRouter.post("/api/v1/cars",uploadMemory.single("foto"),controller.api.v1.mobilController.create);

appRouter.use(apiRouter);
module.exports =appRouter;