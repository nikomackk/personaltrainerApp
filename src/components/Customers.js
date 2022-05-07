import React, { useState, useEffect, gridRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

export default function Customers() {
   const [customers, setCustomers] = useState([]);

   useEffect(() => fetchCustomers(), []);

   const fetchCustomers = () => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data.content))
      .catch(err => console.error(err))
   }


   const columns = [

      {field: 'firstname', sortable: true, filter: true},
      {field: 'lastname', sortable: true, filter: true},
      {field: 'streetaddress', sortable: true, filter: true},
      {field: 'postcode', sortable: true, filter: true},
      {field: 'city', sortable: true, filter: true},
      {field: 'email', sortable: true, filter: true},
      {field: 'phone', sortable: true, filter: true},
      {headerName: '', field: 'links.0.href', width: 130, 
      cellRendererFramework: params =>  
      <Addtraining link={params.value} training={params.data} addTraining={addTraining} customerId={params.value}/>},
      {headerName: '', field: 'links.0.href', width: 130,
      cellRendererFramework: params => 
      <Button style={{margin: '10px'}} variant="outlined" onClick={() => deleteCustomer(params.value)}>DELETE</Button>
      },
      {headerName: '', field: 'links.0.href', width: 130,
      cellRendererFramework: params => 
      <Editcustomer link={params.value} customer={params.data} editCustomer={editCustomer}/>
      }

   ]

   const deleteCustomer = (link) => {
      if(window.confirm('Are you sure you want to delete customer?')) {
         fetch(link, {method: 'DELETE'})
         .then(res => fetchCustomers())
         .catch(err => console.error(err))
      }
   }

   const saveCustomer = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(customer)
      }) 
      .then(res => fetchCustomers())
      .catch(err => console.error(err))
   }

   const editCustomer = (link, customer) => {
      fetch(link, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(customer)
      })
      .then(res => fetchCustomers())
      .catch(err => console.error(err))
   }

   const addTraining = (training) => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(training)
      })
      .then(res => fetchCustomers())
      .catch(err => console.error(err))
   }





   return(
      <div className="ag-theme-material" style={{height: '1100px', width: '100%', margin: 'auto'}}>
         <Addcustomer saveCustomer={saveCustomer}/>
         <AgGridReact
            ref={gridRef}
            rowSelection='single'
            columnDefs={columns}
            rowData={customers}>
         </AgGridReact>
      </div>
   );
}