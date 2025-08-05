
import { Request, Response } from 'express';
import CoachInfo from '../models/coachInfo';
import TimeSlot from '../models/timeSlots';
import UserInfo from '../models/userInfo';
import mongoose from 'mongoose';
export const searchCoaches = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, date, time, coachName, page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const skip = (pageNum - 1) * limitNum;

    // Debug the incoming parameters
    console.log('Search parameters:', { type, date, time, coachName, page, limit });

    // Step 1: Find coaches by name if provided, otherwise get all coaches
    let coachQuery: any = {};
    
    // Get all coaches initially (don't filter by specialization)
    let coaches = await CoachInfo.find(coachQuery).populate('userId').lean();
    console.log(`Found ${coaches.length} coaches initially`);
    
    // Filter by coach name if provided
    if (coachName && coachName !== '') {
      const nameRegex = new RegExp(String(coachName), 'i');
      coaches = coaches.filter(coach => {
        const user = coach.userId as any;
        if (!user) return false;
        
        const fullName = `${user.firstName} ${user.lastName}`;
        return nameRegex.test(user.firstName) || 
               nameRegex.test(user.lastName) || 
               nameRegex.test(fullName);
      });
      console.log(`After name filter: ${coaches.length} coaches remaining`);
    }
    
    // Get coach IDs for time slot filtering
    const coachIds = coaches.map(coach => coach._id);
    
    // Step 2: Filter by type, date, and time in the TimeSlot model
    // Use any[] to avoid TypeScript issues with ObjectId vs string
    let filteredCoachIds: any[] = [...coachIds];
    
    // Build the time slot query
    let timeSlotQuery: any = {
      coachId: { $in: coachIds }
    };
    
    // Add date filter if provided
    if (date && date !== '') {
      const searchDate = new Date(date as string);
      const startOfDay = new Date(searchDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(searchDate);
      endOfDay.setHours(23, 59, 59, 999);
      
      timeSlotQuery.date = {
        $gte: startOfDay,
        $lte: endOfDay
      };
    } else {
      // If no date provided, only show future time slots
      timeSlotQuery.date = { $gte: new Date() };
    }
    
    // Add type filter if provided - use regex for case-insensitive matching
    if (type && type !== '') {
      timeSlotQuery.type = { $regex: new RegExp(String(type), 'i') };
    }
    
    // Add time filter if provided
    if (time && time !== '') {
      timeSlotQuery['timeSlots'] = {
        $elemMatch: {
          startTime: time,
          isBooked: false
        }
      };
    }
    
    // Find time slots matching the criteria
    const availableSlots = await TimeSlot.find(timeSlotQuery).lean();
    console.log(`Found ${availableSlots.length} time slots matching criteria`);
    
    // If we have filters but no matching slots, we should return empty results
    if ((type || date || time) && availableSlots.length === 0) {
      console.log('No time slots found for the given criteria');
      res.status(200).json({
        content: [],
        pagination: {
          total: 0,
          page: pageNum,
          limit: limitNum,
          pages: 0
        }
      });
      return;
    }
    
    // Update filtered coach IDs based on time slots
    filteredCoachIds = availableSlots.map(slot => slot.coachId);
    console.log(`Filtered to ${filteredCoachIds.length} coaches with matching time slots`);
    
    // Step 3: Get the final list of coaches after all filters
    const finalCoaches = coaches.filter(coach => 
      filteredCoachIds.some(id => {
        // Compare ObjectIds by converting both to strings
        return id.toString() === coach._id.toString();
      })
    );
    console.log(`Final coaches count after all filters: ${finalCoaches.length}`);
    
    // Step 4: Apply pagination
    const total = finalCoaches.length;
    const paginatedCoaches = finalCoaches.slice(skip, skip + limitNum);
    
    // Step 5: Format the response data
    const coachData = await Promise.all(
      paginatedCoaches.map(async (coach) => {
        const user = coach.userId as any;
        
        // Get available time slots
        let formattedTimeSlots: any[] = [];
        
        // Build query for time slots for this coach
        let slotQuery: any = {
          coachId: coach._id
        };
        
        // Add date filter if provided
        if (date && date !== '') {
          const searchDate = new Date(date as string);
          const startOfDay = new Date(searchDate);
          startOfDay.setHours(0, 0, 0, 0);
          
          const endOfDay = new Date(searchDate);
          endOfDay.setHours(23, 59, 59, 999);
          
          slotQuery.date = {
            $gte: startOfDay,
            $lte: endOfDay
          };
        } else {
          // If no date provided, only show future time slots
          slotQuery.date = { $gte: new Date() };
        }
        
        // Add type filter if provided
        if (type && type !== '') {
          slotQuery.type = { $regex: new RegExp(String(type), 'i') };
        }
        
        // Find time slots for this coach
        const slots = await TimeSlot.find(slotQuery).sort({ date: 1 }).lean();
        
        // Process each time slot document
        for (const slot of slots) {
          if (slot.timeSlots && Array.isArray(slot.timeSlots)) {
            const slotDate = slot.date.toISOString().split('T')[0];
            
            // Check if this slot is for today
            const now = new Date();
            const slotDateObj = new Date(slot.date);
            const isSlotToday = 
              now.getFullYear() === slotDateObj.getFullYear() &&
              now.getMonth() === slotDateObj.getMonth() &&
              now.getDate() === slotDateObj.getDate();
            
            // Filter and format time slots
            const availableSlots = slot.timeSlots.filter(t => {
              // Filter out booked slots
              if (t.isBooked) return false;
              
              // For today, filter out past time slots
              if (isSlotToday) {
                const [hours, minutes] = t.startTime.split(':').map(Number);
                const slotTime = new Date();
                slotTime.setHours(hours, minutes, 0, 0);
                
                // Only include future time slots
                return slotTime > now;
              }
              
              // Filter by specific time if provided
              if (time && time !== '' && t.startTime !== time) {
                return false;
              }
              
              return true;
            });
            
            // Format available slots
            availableSlots.forEach(t => {
              // Calculate duration
              const [startHours, startMinutes] = t.startTime.split(':').map(Number);
              const [endHours, endMinutes] = t.endTime.split(':').map(Number);
              
              const startTotalMinutes = startHours * 60 + startMinutes;
              const endTotalMinutes = endHours * 60 + endMinutes;
              
              const durationMinutes = endTotalMinutes - startTotalMinutes;
              let duration = '';
              
              if (durationMinutes > 0) {
                const hours = Math.floor(durationMinutes / 60);
                const minutes = durationMinutes % 60;
                
                duration = hours > 0 
                  ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
                  : `${minutes}m`;
              }
              
              formattedTimeSlots.push({
                start: t.startTime,
                end: t.endTime,
                date: slotDate,
                isBooked: t.isBooked,
                duration: duration,
                type: slot.type
              });
            });
          }
        }
        
        // Get the first available time slot for display
        const firstSlot = formattedTimeSlots.length > 0 ? formattedTimeSlots[0] : null;
        
        // Return formatted coach data
        return {
          id: coach._id.toString(),  // Convert ObjectId to string
          name: user ? `${user.firstName} ${user.lastName}` : '',
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          title: coach.title || '',
          about: coach.about || '',
          imageUrl: coach.profileImage || user?.profileImage || '',
          rating: coach.rating || 0,
          type: firstSlot?.type || '',  // Only use type from time slots
          specializations: coach.specializations || [],
          date: firstSlot?.date || '',
          duration: firstSlot?.duration || '',
          timeSlots: formattedTimeSlots
        };
      })
    );
    
    // Filter out coaches with no available time slots
    const coachesWithTimeSlots = coachData.filter(coach => coach.timeSlots.length > 0);
    console.log(`Final response: ${coachesWithTimeSlots.length} coaches with available time slots`);
    
    // Step 6: Send the response
    res.status(200).json({
      content: coachesWithTimeSlots,
      pagination: {
        total: coachesWithTimeSlots.length,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(coachesWithTimeSlots.length / limitNum)
      }
    });
    
  } catch (error) {
    console.error('Error searching coaches:', error);
    res.status(500).json({ 
      message: 'Failed to search coaches',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

