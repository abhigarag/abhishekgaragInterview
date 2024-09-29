import { EventDocument } from "../types/events";

export const generateEventsData=(data:EventDocument[],id:string="",showVoters=true)=>

data.map((event:Record<string,any>) => ({
    name: event.name,
    description:event.description,
    dates: event.dates.map((date:Record<string,any>) => ({
      date: date.date,
      votes: !showVoters?[]:date.votes.map((vote:any) => vote.email.split("@")[0]),
      voted:id!==""?date.votes.find((voter:any)=>voter.id===id)?true:false:false
      
    })),
    totalVotes:event.totalVotes,
    addVote:id &&id===event.postedBy?.id?false:!showVoters,
    postedBy: event.postedBy?.email,
    id: event._id // Using _id as id

    
  }));

