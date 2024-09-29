import { AppBar, Icon, Tab, Tabs, Typography } from "@mui/material"
import React, { FC, useEffect, useState } from "react"
import "./styles/header.css"
import AccordionList from "./AccordionList"
import { fetchAPI } from "../utilities/fetch.controller"
import { EventObj } from "../constants/types"


interface ITabbedAccordianContainer{
   tabs:string[],
   data?:any[]|null
   setTab:(tab:string)=>void
   tab:string
}




export const TabbedAccordianContainer:FC<ITabbedAccordianContainer>=({tabs,setTab,tab,data=null}:ITabbedAccordianContainer)=>{
    
   
    return(
      <>
      <div style={{position:"sticky",top:"0px",zIndex:100,backgroundColor:"white"}}>
      <Tabs value={tab} onChange={(e,value)=>setTab(value)} >
      {tabs.map((item:string)=><Tab key ={item} value={item} label={item}></Tab>)}
      </Tabs>
      </div>
      {data!==null?
      <AccordionList data={data} childElement={"EventElement"}/>:""}
    
      </>
    )
}