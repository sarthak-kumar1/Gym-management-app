// // src/controllers/coachSearchController.ts
// import { Request, Response } from 'express';
// import UserInfo from '../models/userInfo';
// import TimeSlot from '../models/timeSlots';
// import CoachInfo from '../models/coachInfo';
// import mongoose from 'mongoose';

// interface TimeSlotItem {
//   startTime: string;
//   endTime: string;
//   isBooked: boolean;
//   _id?: any;
// }

// interface TimeSlotDocument {
//   _id: mongoose.Types.ObjectId;
//   coachId: mongoose.Types.ObjectId;
//   timeSlots: TimeSlotItem[];
//   type: string;
//   date: Date;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export const searchCoaches = async (req: Request, res: Response) => {
//   try {
//     const { name, date, type, time, page = 1, limit = 10 } = req.query;
//     const pageNum = Number(page);
//     const limitNum = Number(limit);
//     const skip = (pageNum - 1) * limitNum;

//     // Step 1: Start with coaches (role = 'Coach')
//     let userQuery: any = { role: 'Coach' };

//     // Apply name filter if provided
//     if (name && String(name).trim() !== '') {
//       const nameRegex = new RegExp(String(name), 'i');
//       userQuery.$or = [
//         { firstName: nameRegex },
//         { lastName: nameRegex },
//         {
//           $expr: {
//             $regexMatch: {
//               input: { $concat: ['$firstName', ' ', '$lastName'] },
//               regex: nameRegex,
//             }
//           }
//         }
//       ];
//     }

//     // Get coaches based on user query
//     const coaches = await UserInfo.find(userQuery)
//       .select('_id firstName lastName profileImage')
//       .lean();

//     // Get their IDs for further filtering
//     let filteredCoachIds = coaches.map(coach => coach._id);

//     // Step 2: Build time slot query for filtering by type, date, and time
//     let timeSlotQuery: any = {
//       coachId: { $in: filteredCoachIds }
//     };

//     // Add type filter if provided
//     if (type && String(type).trim() !== '') {
//       timeSlotQuery.type = String(type);
//     }

//     // Add date filter if provided
//     if (date && String(date).trim() !== '') {
//       const searchDate = new Date(String(date));
//       // Set hours to 0 to match the beginning of the day
//       searchDate.setHours(0, 0, 0, 0);
      
//       // Create a date for the end of the day
//       const endDate = new Date(searchDate);
//       endDate.setHours(23, 59, 59, 999);
      
//       timeSlotQuery.date = {
//         $gte: searchDate,
//         $lte: endDate
//       };
//     }

//     // Add time filter if provided
//     if (time && String(time).trim() !== '') {
//       timeSlotQuery['timeSlots'] = {
//         $elemMatch: {
//           startTime: String(time),
//           isBooked: false
//         }
//       };
//     }

//     // Find time slots matching all the provided filters
//     const matchingTimeSlots = await TimeSlot.find(timeSlotQuery).lean() as TimeSlotDocument[];
    
//     // Extract coach IDs from matching time slots
//     const coachIdsWithMatchingSlots = [...new Set(matchingTimeSlots.map(slot => 
//       slot.coachId.toString()
//     ))];
    
//     // Step 3: If type, date, or time filters were applied, update the filtered coach IDs
//     if (type || date || time) {
//       filteredCoachIds = filteredCoachIds.filter(id => 
//         coachIdsWithMatchingSlots.includes(id.toString())
//       );
//     }

//     // Step 4: Get total count for pagination
//     const total = filteredCoachIds.length;
    
//     // Apply pagination
//     const paginatedIds = filteredCoachIds.slice(skip, skip + limitNum);

//     // Step 5: Get detailed information for the paginated coaches
//     const finalCoaches = await Promise.all(
//       paginatedIds.map(async (coachId) => {
//         // Get basic user info
//         const userInfo = await UserInfo.findById(coachId)
//           .select('firstName lastName profileImage')
//           .lean();
        
//         if (!userInfo) return null;

//         // Get coach details
//         const coachDetails = await CoachInfo.findOne({ userId: coachId })
//           .select('rating about title specializations')
//           .lean();
        
//         // Get available time slots
//         // If filters were applied, only return matching time slots
//         let timeSlotFilter: any = { coachId: coachId };
        
//         if (type && String(type).trim() !== '') {
//           timeSlotFilter.type = String(type);
//         }
        
//         if (date && String(date).trim() !== '') {
//           const searchDate = new Date(String(date));
//           searchDate.setHours(0, 0, 0, 0);
          
//           const endDate = new Date(searchDate);
//           endDate.setHours(23, 59, 59, 999);
          
//           timeSlotFilter.date = {
//             $gte: searchDate,
//             $lte: endDate
//           };
//         }
        
//         const timeSlots = await TimeSlot.find(timeSlotFilter).lean() as TimeSlotDocument[];
        
//         // Process time slots
//         const availableTimeSlots = timeSlots.flatMap(ts => {
//           // Create a new array from the timeSlots array to avoid type issues
//           const slotsArray: TimeSlotItem[] = [...ts.timeSlots];
          
//           // If time filter was applied, only include matching time slots
//           let filteredSlots = slotsArray;
//           if (time && String(time).trim() !== '') {
//             filteredSlots = slotsArray.filter(slot => slot.startTime === String(time));
//           }
          
//           return filteredSlots
//             .filter(slot => !slot.isBooked)
//             .map(slot => ({
//               startTime: slot.startTime,
//               endTime: slot.endTime,
//               type: ts.type,
//               date: ts.date // Include the date
//             }));
//         });
        
//         // Return formatted coach data
//         return {
//           id: coachId,
//           firstName: userInfo.firstName,
//           lastName: userInfo.lastName,
//           imageUrl: userInfo.profileImage || 'default-profile.jpg',
//           rating: coachDetails?.rating || 0,
//           about: coachDetails?.about || '',
//           title: coachDetails?.title || '',
//           specializations: coachDetails?.specializations || [],
//           availableTimeSlots: availableTimeSlots
//         };
//       })
//     );

//     // Filter out any null values
//     const validCoaches = finalCoaches.filter(coach => coach !== null);

//     res.json({
//       coaches: validCoaches,
//       pagination: {
//         total,
//         page: pageNum,
//         limit: limitNum,
//         pages: Math.ceil(total / limitNum)
//       }
//     });
//   } catch (error) {
//     console.error('Error searching coaches:', error);
//     res.status(500).json({ 
//       message: 'Server Error', 
//       error: error instanceof Error ? error.message : 'Unknown error'
//     });
//   }
// };

// src/controllers/coachSearchController.ts
// returns all the coaches

import { Request, Response } from 'express';
import UserInfo from '../models/userInfo';
import BookedWorkout from '../models/bookedWorkouts';
import TimeSlot from '../models/timeSlots';
import mongoose from 'mongoose';
import CoachInfo from '../models/coachInfo';

export const searchCoaches = async (req: Request, res: Response) => {
  try {
    const { name, date, type, time, page = 1, limit = 10 } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // 1. Build the base query for coaches
    const nameRegex = name ? new RegExp(String(name), 'i') : null;
    
    // Find coaches by role (note: using 'Coach' with capital C as per your schema)
    const userQuery: any = { role: 'Coach' };

    if (nameRegex) {
      userQuery.$or = [
        { firstName: nameRegex },
        { lastName: nameRegex },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstName', ' ', '$lastName'] },
              regex: nameRegex,
            }
          }
        }
      ];
    }

    // Get all coaches matching the name criteria
    const coaches = await UserInfo.find(userQuery)
      .select('_id firstName lastName email profileImage')
      .lean();

    const coachIds = coaches.map(c => c._id);
    
    // Initialize filtered coach IDs with all coach IDs
    let filteredCoachIds = [...coachIds];

    // 2. Filter by workout type if specified
    if (type) {
      // Find coaches that offer the specified workout type
      const coachesWithType = await CoachInfo.find({
        userId: { $in: coachIds },
        specializations: type
      }).select('userId').lean();
      
      filteredCoachIds = coachesWithType.map(c => c.userId);
    }

    // 3. Filter by date and time if specified
    if (date) {
      const searchDate = new Date(date as string);
      const startOfDay = new Date(searchDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(searchDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Find time slots for the specified date
      const timeSlotQuery: any = {
        coachId: { $in: filteredCoachIds }
      };

      // Add time filter if specified
      if (time) {
        timeSlotQuery['timeSlots'] = {
          $elemMatch: {
            startTime: time,
            isBooked: false
          }
        };
      }

      const availableTimeSlots = await TimeSlot.find(timeSlotQuery).lean();
      filteredCoachIds = availableTimeSlots.map(slot => slot.coachId);
    }

    // 4. Get the final list of coaches after all filters
    const finalCoaches = coaches.filter(coach => 
      filteredCoachIds.some(id => id.toString() === coach._id.toString())
    );

    // 5. Apply pagination
    const total = finalCoaches.length;
    const paginatedCoaches = finalCoaches.slice(skip, skip + limitNum);

    // 6. Fetch additional details for the paginated coaches
    const response = await Promise.all(
      paginatedCoaches.map(async (coach) => {
        // Get coach details
        const coachDetails = await CoachInfo.findOne({ userId: coach._id }).lean();
        
        // Get available time slots
        const timeSlots = await TimeSlot.find({ 
          coachId: coach._id,
          'timeSlots.isBooked': false
        }).lean();
        
        const availableSlots = timeSlots.flatMap(ts => 
          ts.timeSlots.filter(slot => !slot.isBooked)
        );
        
        return {
          id: coach._id,
          name: `${coach.firstName} ${coach.lastName}`,
          email: coach.email,
          profileImage: coach.profileImage || 'default-profile.jpg',
          specialties: coachDetails?.specializations || [],
          rating: coachDetails?.rating || 0,
          title: coachDetails?.title || '',
          about: coachDetails?.about || '',
          availableTimeSlots: availableSlots.map(slot => ({
            startTime: slot.startTime,
            endTime: slot.endTime
          }))
        };
      })
    );

    res.json({
      coaches: response,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error searching coaches:', error);
    res.status(500).json({ message: 'Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};