import { Request, Response } from 'express';
import { Event } from '../models/events.model';
import { Types } from 'mongoose';
import { AuthenticatedRequest } from '../types/request';
import { checkIfValidObjectId } from '../utilities/dbconnect.utils';
import { generateEventsData } from '../utilities/dataFormatter.utils';

// Get all events
export const getAllEvents = async (req: AuthenticatedRequest, res: Response) => {
    const id=req.user?.id
    try {
        const events = await Event.find({},{
            name:1,
            description:1,
            dates:1,
            postedBy:1,
            id:1,
            totalVotes:1
        }) .populate([{
            path: 'dates.votes', 
            select: 'email'
        },{path:'postedBy',select:'email'}]);

        res.status(200).json(generateEventsData(events,id,false));
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

export const getMyEvents = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const id=req.user?.id
        const { name,description, dates } = req.body;
        if(id&&checkIfValidObjectId(id)){
  
        const events = await Event.find({postedBy:id},{
            name:1,
            dates:1,
            description:1,
            id:1,
            totalVotes:1
        }) .populate([{
            path: 'dates.votes', 
            select: 'email'
        }]);

       
        res.status(200).json(generateEventsData(events));
    }else{
        res.send(403)
    }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

//get Event By Id
export const getEventById = async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;

        // Check if the provided ID is a valid ObjectId
        if (!Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        // Find the event by its _id
        const event = await Event.findById(eventId).populate({
            path: 'dates.votes',
            select: 'name'
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error });
    }
};

// Create a new event
export const createEvent = async (req: AuthenticatedRequest, res: Response) => {
   
    
    try {
        const id=req.user?.id
        const { name,description, dates } = req.body;
        if(id&&checkIfValidObjectId(id)){
        const newEvent = new Event({
            name,
            description,
            dates:dates.split(",").map((item:Date)=>({date:new Date(item)})),
            postedBy:id,
            totalVotes: 0
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({name,dates:dates.split(",").map((date:Date)=>({date,votes:[]})),id:savedEvent.id,addVote:false});
    }else{
        res.status(403)
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating event', error });
    }
};

export const deleteEvent = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {eventId}=req.params
        const id=req.user?.id
 
        if(id && checkIfValidObjectId(id)){
        // Check if the provided ID is a valid ObjectId
        if (!Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid event ID' });
        }

        const eventToDelete = await Event.findById(eventId);
        if (!eventToDelete) {
            return res.status(404).json({ message: 'Event not found' });
        }else if(eventToDelete?.postedBy.toString()!==id){
            res.status(403).json({message:"You are not authorised to delete"})
        }else {
            await Event.deleteOne({id:eventId})
         res.status(204).send();
        }
    }else{
        res.status(403)
    }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};


export const toggleVote = async (req: AuthenticatedRequest, res: Response) => {
    
    
    try {
        const {eventId}=req.params
        const { votes } = req.body;
        const id=req.user?.id
       
        if(id && checkIfValidObjectId(id)){
        // Find the event by eventId
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        


        // Loop through each vote in the request
        votes.forEach(({ date }: { date: Date }) => {
            // Find the index of the date in the event's dates array
            const dateIndex = event.dates.findIndex(d => new Date(d.date).toUTCString() === new Date(date).toUTCString());
           
            if (dateIndex !== -1) {
                const selectedDate = event.dates[dateIndex];
                
                const voteIndex = selectedDate.votes.indexOf(new Types.ObjectId(id));

                if (voteIndex === -1) {
                    // Add vote if user hasn't voted 
                    selectedDate.votes.push(new Types.ObjectId(id));
                    event.totalVotes++;
                } else if ( voteIndex !== -1) {
                    // Remove vote if user has already voted
                    selectedDate.votes.splice(voteIndex, 1);
                    event.totalVotes--;
                }
            }
        });
        
       
                  await event.save();

        res.status(200).json({
            message: 'Votes updated successfully',
        });
        }else{
            res.send(403)
        }
    } catch (error) {
        
        res.status(500).json({ message: 'Error updating votes', error });
    }
};