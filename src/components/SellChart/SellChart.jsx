import React from 'react'
 import { LineChart } from '@mui/x-charts';
 
 
 
 export const SellChart = ({labels, values }) => {
 
   if (!labels || !values) {
     console.log("labels: ", labels)
     console.log("values: ", values)
     return
   }
 
   const valores = [10, 15, 8, 20, 17];
   console.log(labels)
   return (
     <div className='w-7/10 flex items-center justify-center'>
       <LineChart
       xAxis={[
         {
           scaleType: 'band',
           data: labels,
           label: "Fecha",
         },
       ]}
       series={[{ data: values, label: "Ventas" }]}
       grid={{"horizontal": true}}
       height={300}
       margin={{ top: 40, bottom: 50, left: 70, right: 30 }}
     />
     </div>

   );
 }