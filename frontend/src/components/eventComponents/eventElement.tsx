import { FC, useEffect, useState } from "react";
import { EventObj } from "../../constants/types";
import {  Favorite, FavoriteBorder, People } from "@mui/icons-material";
import { Checkbox, Tooltip } from "@mui/material";
import { fetchAPI } from "../../utilities/fetch.controller";

interface EventElementProps{data:EventObj}

const EventElement:FC<EventElementProps>=({data}:EventElementProps)=>{
    const {id,dates,totalVotes,description,addVote}=data
    const [votedDates,setVotedDates]=useState<Record<string,boolean>>({})

    useEffect(()=>{
        const voted=dates.reduce((a:Record<string,boolean>,b:any)=>
        ({...a,[b.date.toString()]:b.voted})
        ,{})
        setVotedDates({...voted})
    },[dates])
   //TODO:Multi voting can be implemented with submit vote button as api designed for multiple votes at a time
    const toggleVote=(date:Date,id:string,checked:boolean)=>{
        
        

        fetchAPI("vote",{body:{votes:[{date}]},param:id}).then(res=>setVotedDates((prevState)=>({
           ...prevState,[date.toString()]:checked}))
        ).catch(err=>console.log(err))
    }
    return(
        <>
        <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>{description}</div>
        <div>
        </div>
        </div>
        {dates.map((item,key)=>
        <div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:10}}>
            {new Date(item.date).toLocaleDateString('en-GB',{
            weekday: 'short', 
            day:'2-digit',
            month: 'short',   
            year: 'numeric'   
          })}
          {addVote?<Checkbox 
          checked={votedDates[item.date.toString()]}
          icon={<FavoriteBorder/>} 
          checkedIcon={<Favorite/>} 
          onChange={(e:any)=>toggleVote(item.date,id,e.target.checked)} />:
           <Tooltip title={item.votes.join(",")}>
            <div style={{display:"flex",alignItems:"center"}}>
                <People/> &nbsp;{item.votes.length}
            </div>
            </Tooltip>
            }
             
           
        </div>

        )}
        
        </>
    )
}

export default EventElement