import './App.css';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';

function App() {
  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {  
    setValue(value);
  };

  return (
    <div className="App">
      <Tabs value={value} onChange={handleChange}>
        <Tab value="one" label="Customerlist" />
        <Tab value="two" label="Traininglist" />
      </Tabs>
      {value === 'one' && <div><Customers/></div>}
      {value === 'two' && <div><Trainings/></div>}
    </div>
  );
}

export default App;
