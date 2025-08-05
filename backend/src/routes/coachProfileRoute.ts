import  express  from "express";
import { getFeedbackController } from "../controllers/coachProfileController";
import { protect } from "../middlewares/authMiddleware";

const coachProfile = express.Router();


coachProfile.get('/feedback/:id',protect, getFeedbackController);

export default coachProfile;