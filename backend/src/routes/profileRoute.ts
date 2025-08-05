import  express  from "express";
import { updateUserController } from "../controllers/updateProfileController";
// import { upload } from "../app";
import { protect } from "../middlewares/authMiddleware";
import { getClientController, updateClientController } from "../controllers/clientController";
// import { getCoachController, updateCoachController } from "../controllers/coachController";
import { getAdminController, updateAdminController } from "../controllers/adminController";
import { getCoachController, updateCoachController } from "../controllers/coachRoleController";

const profileRouter = express.Router();

profileRouter.put('/update-user',protect, updateUserController);
profileRouter.put('/admin',protect, updateAdminController);
profileRouter.get('/admin',protect, getAdminController);
profileRouter.put('/client',protect, updateClientController);
profileRouter.get('/client',protect, getClientController);
// profileRouter.post('/coach/certificates',protect,upload.single('file'), updateCertificateController);
// profileRouter.post('/coach/profile-image',protect,upload.single('image'), updateImageController);
profileRouter.put('/coach',protect, updateCoachController);
profileRouter.get('/coach',protect, getCoachController);

export default profileRouter;