import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';

export default function Trainings() {

   const [trainings, setTrainings] = useState([]);

   useEffect(() => fetchTrainings(), []);
   
   const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/api/trainings')
      .then(response => response.json())
      .then(data => setTrainings(data.content))
      .catch(err => console.error(err))
   }

   const columns = [

      {field: 'date', sortable: true, filter: true, cellRenderer: params => {return moment(params.value).format('llll')}},
      {field: 'duration', sortable: true, filter: true},
      {field: 'activity', sortable: true, filter: true},

   ]

   return(
      <div className="ag-theme-material" style={{height: '700px', width: '100%', margin: 'auto'}}>
      <AgGridReact
         columnDefs={columns}
         rowData={trainings}>
      </AgGridReact>
   </div>
   );
}