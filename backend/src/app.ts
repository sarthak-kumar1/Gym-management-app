// import express from 'express';
// import cors from 'cors';

// import workoutRoutes from './routes/workoutRoutes';
// import timeSlotRoutes from './routes/timeSlotRoutes'; 
// import bookedWorkoutRoutes from './routes/bookedWorkoutRoutes'; 

// // import multer from 'multer';
// import authRouter from './routes/authRoute';
// import searchRouter from './routes/searchRoutes';  // ✅ updated to match the workout route file I gave you
// import profileRouter from './routes/profileRoute';
// import fs from 'fs';
// import coachProfile from './routes/coachProfileRoute';

// import coachRouter from './routes/coachRoutes';
// import coachesRouter from './routes/coachesRoute';
// import cancelWot from './routes/cancelWotRoute';
// import timeSlotModifyRoutes from './routes/timeSlotModificationRoute';



// const app = express();



// // Middlewares
// app.use(cors({
//     origin: "http://localhost:5173",  // ✅ frontend origin
// }));
// app.use(express.json());

// // Routes
// // Health check route
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

// // API routes
// app.use('/auth', authRouter);
// app.use('/coach', coachProfile);
// app.use('/find', searchRouter);        // ✅ this points to /find/workouts from searchRoutes.ts
// app.use('/profile', profileRouter);
// // app.use('/coaches', coachRouter);
// app.use('/coaches', coachesRouter);   // ⚠️ Note: consider combining these two to avoid double /coaches

// app.use('/api/workouts', workoutRoutes);
// app.use('/api/timeslots', timeSlotRoutes);
// app.use('/api/bookedworkouts', bookedWorkoutRoutes);
// app.use('/api',cancelWot);
// app.use('/api/modifytimeslots', timeSlotModifyRoutes);


// export default app;
import express from 'express';
import cors from 'cors';

import workoutRoutes from './routes/workoutRoutes';
import timeSlotRoutes from './routes/timeSlotRoutes'; 
import bookedWorkoutRoutes from './routes/bookedWorkoutRoutes'; 

// import multer from 'multer';
import authRouter from './routes/authRoute';
import searchRouter from './routes/searchRoutes';  // ✅ updated to match the workout route file I gave you
import profileRouter from './routes/profileRoute';
import fs from 'fs';
import coachProfile from './routes/coachProfileRoute';

import coachRouter from './routes/coachRoutes';
import coachesRouter from './routes/coachesRoute';
import cancelWot from './routes/cancelWotRoute';
import timeSlotModifyRoutes from './routes/timeSlotModificationRoute'; 
import finishWorkoutRouter from './routes/finishWorkoutRoute';
import feedbackRouter from './routes/feedbackRoutes';
import reportRoute from './routes/report.routes';
const app = express();



// Middlewares
app.use(cors({
    origin: "http://localhost:5174",  // ✅ frontend origin
}));
app.use(express.json());



// Health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use('/api/workouts', workoutRoutes);
app.use('/api/timeslots', timeSlotRoutes);
app.use('/api/bookedworkouts', bookedWorkoutRoutes);
app.use('/api',cancelWot);
app.use('/api/modifytimeslots', timeSlotModifyRoutes);
app.use('/api/reports', reportRoute);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api', finishWorkoutRouter);


// API routes
app.use('/auth', authRouter);
app.use('/coach', coachProfile)
app.use('/find', searchRouter);        // ✅ this points to /find/workouts from searchRoutes.ts
app.use('/profile', profileRouter);
// app.use('/coaches', coachRouter);
app.use('/coaches', coachesRouter);   // ⚠️ Note: consider combining these two to avoid double /coaches


export default app;
