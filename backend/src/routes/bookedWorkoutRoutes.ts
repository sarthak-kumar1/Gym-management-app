// // routes/bookedWorkoutRoutes.js
// import express from 'express';
// import { getAllBookedWorkouts } from '../controllers/bookedWorkoutController';
// // import { authenticateUser } from '../middleware/auth'; // Import authentication middleware

// const router = express.Router();

// // Protect the route with authentication middleware
// router.get('/booked-workouts', getAllBookedWorkouts);

// export default router;
// routes/bookedWorkoutRoutes.ts
import express from 'express';
import { getAllBookedWorkouts } from '../controllers/bookedWorkoutController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', protect, getAllBookedWorkouts);


export default router;

