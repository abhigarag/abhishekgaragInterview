import { AppBar, Button, Icon, Toolbar, Typography } from "@mui/material"
import React, { FC } from "react"
import "./styles/header.css"
import { ActionDialog } from "./ActionDialog"


interface HeaderProps{
    title:string
}
export const Header:FC<HeaderProps>=({title}:HeaderProps)=>{

    return(
        <AppBar position="sticky" > 
        
            <Toolbar>
                <div className="Header">
        
          <Typography variant="h6" component="div" >
            {title}
          </Typography>
          <Button color="inherit">Login</Button>
          </div>
        </Toolbar>
        </AppBar>
    )
}