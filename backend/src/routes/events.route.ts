import { Router } from 'express';
import { 
    getAllEvents, 
    getEventById, 
    createEvent,
    toggleVote,
    deleteEvent,
    getMyEvents
    
} from '../controllers/events.controller';
import { protect } from '../middlewares/authMiddleWare';

const router = Router();

// Route to get all events
router.get('/',protect, getAllEvents);
router.get('/myEvents',protect, getMyEvents);

// Route to get a specific event by ID
router.get('/:eventId',protect, getEventById);

// Route to create a new event
router.post('/',protect, createEvent);

// Route to toggle votes for an event by ID
router.put('/vote/:eventId',protect,toggleVote);

// Route to delete an event by ID
router.delete('/:eventId',protect, deleteEvent);

export default router;