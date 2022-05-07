import React, { useState, useEffect, gridRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import Button from '@mui/material/Button';

export default function Trainings() {

   const [trainings, setTrainings] = useState([]);

   useEffect(() => fetchTrainings(), []);
   
   const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
   }

   const deleteTraining = (arvo) => {
      if(window.confirm('Are you sure you want to delete a training?')) {
         fetch('https://customerrest.herokuapp.com/api/trainings/' + arvo, {method: 'DELETE'})
         .then(response => fetchTrainings())
         .catch(err => console.error(err))
         console.log(arvo);
      }
   }

   const columns = [

      {headerName: '', field: 'id', width: 130, sortable: true, filter: true, cellRenderer: params => <Button style={{margin: '10px'}} variant="outlined" onClick={() => deleteTraining(params.value)}>Delete</Button>},
      {field: 'date', sortable: true, filter: true, cellRenderer: params => {return moment(params.value).format('llll')}},
      {field: 'duration', sortable: true, filter: true},
      {field: 'activity', sortable: true, filter: true},
      {headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true},
      {headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true},

   ]



   return(
      <div className="ag-theme-material" style={{height: '700px', width: 'auto', margin: 'auto'}}>
      <AgGridReact
         ref={gridRef}
         rowSelection='single'
         columnDefs={columns}
         rowData={trainings}>
      </AgGridReact>
   </div>
   );
}