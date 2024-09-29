import React, { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import zIndex from '@mui/material/styles/zIndex';

interface IActionDialogProps{
    open:boolean;
    onSubmit:(value:Record<string,any>|null)=>void;
    title:string
    children:ReactElement,
    formFields:string[]
}

export const ActionDialog:FC<IActionDialogProps>= ({open,title,children,formFields,onSubmit}:IActionDialogProps) =>{


 
const SubmitAction= (event: React.FormEvent<HTMLFormElement>)=>{
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            console.log(formData)
            const formJson = Object.fromEntries((formData as any).entries());
            const value=formFields.reduce((prevField:Record<string,any>,currField:string)=>({
                ...prevField,[currField]:formJson[currField]
            }),{})
            
            
            onSubmit(value)
}


  return (
    <React.Fragment>
      <Dialog
      maxWidth={"lg"}
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: (event:React.FormEvent<HTMLFormElement>)=>SubmitAction(event)
           
        }}
      >
        <DialogTitle style={{zIndex:1 }}>{title}</DialogTitle>
        
        <DialogContent style={{paddingTop:60}}>
         {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>onSubmit(null)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}