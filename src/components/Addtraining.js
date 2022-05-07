import React, {useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DateTimePicker, MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment'; 





export default function Addtraining(props) {
   const [newDate, handleNewDate] = useState(new Date());
   const [open, setOpen] = React.useState(false);
   const [training, setTraining] = React.useState({
      date: "", duration: "", activity: "", customer: props.customerId 
   })

   const handleClickOpen = () => {
      setOpen(true);
   }

   const handleClose = () => {
      setOpen(false);
   };

   const handleSave = () => {
      props.addTraining(training);
      setOpen(false);
   }

   const handleInputChange = (event) => {
      setTraining({...training, [event.target.name]: event.target.value});
   }

   // Tämän kanssa oli isoja ongelmia saada datetimepicker toimimaan. Stackoverflowsta löysin onneksi apua ja ohjeet miten ratkaista ongelma.
   // Kun yrittää palauttaa ajankohdan, joka datetimepickerissä on defaultina, niin Date kohtaan traininglistissä tulostuu "Invalid Date", tähän en löytänyt ratkaisua.
     
   const approveDate = (date) => {
      handleNewDate(date);
      setTraining({...training, date: date});
   }

   

   return(
      <div>
         <Button style={{margin: '10px'}} variant="outlined" onClick={handleClickOpen}>
            Add Training
         </Button>
         <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle >New Training</DialogTitle>
            <DialogContent>
               <MuiPickersUtilsProvider utils={MomentUtils}>
               <DateTimePicker 
                  margin="dense"
                  name="date"  
                  value={newDate}  
                  onChange={date => approveDate(date)}
                  label="Date" 
                />
               </MuiPickersUtilsProvider>
               <TextField
                  margin="dense"
                  name="duration"
                  value={training.duration}
                  onChange={handleInputChange}
                  label="Duration"
                  fullWidth
               />
               <TextField
                  margin="dense"
                  name="activity"
                  value={training.activity}
                  onChange={handleInputChange}
                  label="Activity"
                  fullWidth
               />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
         </DialogActions>
      </Dialog>
   </div>
   );
}