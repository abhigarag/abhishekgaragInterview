export type DynamicObject=Record<string,any>

export interface EventObj{
    id:string
    name: string;
    description?:string;
    dates: {
        date: Date;
        votes: string[];
        voted:boolean
    }[];
    postedBy?:string;
    totalVotes: number;
    addVote:boolean;
}