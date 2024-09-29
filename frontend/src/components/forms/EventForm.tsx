import React, { useState } from 'react';
import {
    FormControl,
  FormLabel,
  InputAdornment,
  TextField,
 
} from '@mui/material';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import Icon from 'react-multi-date-picker/components/icon';



export const EventForm: React.FC = () => {
    const [dates,setDates]=useState<DateObject[]>([])
  
 
  return (
    < div style={{width:"600px"}}>
      <TextField
        label="Name"
        id="name"
        name="name"
        fullWidth
        required
      />
     <br/>
<br/>

      {/* Event Description */}
      <TextField
        label="Event Description"
        name="description"
        multiline
        rows={4}
        fullWidth
       
      />
<br/><br/>
        
      
        
            <TextField  label="Pick a Date" value={dates} name='dates' contentEditable={false} slotProps={{input:{endAdornment: <DatePicker 
      multiple
      name='dates'
      value={dates} 
      minDate={new Date()}
      onChange={setDates}
      render={<Icon/>}
    
    />   }}}/>
     
   
     </div>
  )
}