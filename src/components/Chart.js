import React, {useEffect, useState} from 'react';
import {CartesianGrid, XAxis, YAxis, Bar, BarChart} from 'recharts';
import lodash from 'lodash';

export default function Chart() {
   const [trainings, setTrainings] = React.useState([]);
   const [newTrainings, setNewTrainings] = React.useState({
      activity: '',
      totalduration: ''
   });

   useEffect(() => getTrainings(), []);

   const getTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(responseData => setTrainings(responseData))  
   }

   let newData = 
      lodash(trainings)
         .groupBy('activity')
         .map((value, key) => ({
            'activity': key,
            'total': lodash.sumBy(value, 'duration')
         }))
         .value();
         
   console.log(newData);
   

   return (
      <BarChart width={730} height={250} data={newData} >
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="activity" />
         <YAxis label={{value: 'Kesto (min)', position: 'insideLeft', angle: 90}}/>
         <Bar dataKey="total" fill="black" />
      </BarChart>
   );
}