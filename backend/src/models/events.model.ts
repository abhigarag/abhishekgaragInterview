import  { Schema, model } from "mongoose";
import { eventSchema } from "../schemas/events.schema";
import { EventDocument } from "../types/events";


eventSchema.virtual('id').get(function () {
    return this._id.toString(); // Convert ObjectId to string
});



//
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });
export const Event = model<EventDocument>('Event', eventSchema);