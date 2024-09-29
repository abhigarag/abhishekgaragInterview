import React, { FC, useEffect, useState } from "react"
import { Header } from "../components/Header"
import { Box, Fab } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { ActionDialog } from "../components/ActionDialog"
import { EventForm } from "../components/forms/EventForm"
import { TabbedAccordianContainer } from "../components/tabbedContainer"
import { fetchAPI } from "../utilities/fetch.controller"



interface IlayoutProps{
    title:string,
   
}
 const EventScreen:FC<IlayoutProps>=({title}:IlayoutProps)=>{
    const [actionDialog,setActionDialog]=useState<boolean>(false)
    const [data,setData]=useState<any[]|null>(null)
    const[tab,setTab]=useState<string>("My Events")

    const onSubmit=(value:Record<string,any>|null=null)=>{
       if(value!==null){
      fetchAPI("createEvent",{body:value}).then((data)=>
       setData(prevState=>([...prevState||[],data]))).catch(err=>console.log(err))
       setActionDialog(false)
       }else{
        setActionDialog(false)
       }
    } 

    
    useEffect(()=>{
     fetchAPI(tab==="My Events"?"getMyEvent":"getAllEvents",{}).then(res=>
        setData(res)
    ).catch(err=>console.log(err))


    },[tab])

    return(
       <>
       <Header title={title}></Header>
       <div style={{height:"calc(100vh - 100px)",overflow:"auto",position:"relative"}}>
       
       <TabbedAccordianContainer tabs={["My Events","All Events"]} tab={tab} setTab={setTab} data={data}/>
       {data?.length===0?<p style={{textAlign:"center"}}>Click + button to Add a Event</p>:""}
       <Box sx={{ '& > :not(style)': { m: 1 } }} style={{position:"fixed",bottom:10,right:50}}>
        <Fab color="primary" onClick={()=>setActionDialog(true)} >
            <AddOutlined/>
        </Fab>
        </Box>
        </div>
        <ActionDialog open={actionDialog} onSubmit={onSubmit} title="Create Event"  formFields={[
            "name","description","dates"
        ]}>
         <EventForm/>
        </ActionDialog>
       </>
    )
}

export default EventScreen