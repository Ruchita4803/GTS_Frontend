import React from 'react'
import './SetupTable.css'
const Insightlog = () => {
  return (
   
      <main className="main-container">
         <div className="Content">
           <h1>INSIGHT LOGS</h1>
           <table className="Table">
           <thead>
               <tr>
                 
                 <th> Date</th>
                 <th>Patrol Title</th>
                 <th>Guard Name</th>
                 <th>Missed Checkpoints</th>
                 <th>Incidents</th>
                 <th>Incident Status</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>06/07/2024</td>
                 <td>A_Morning</td>
                 <td>Daniel</td>
                 <td>-</td>
                 <td>-</td>
                 <td>-</td>
               </tr>
               <tr>
               <td>06/07/2024</td>
                 <td>A_Evening</td>
                 <td>Emily</td>
                 <td>-</td>
                 <td>Leakage at Building A</td>
                 <td>Unsolved</td>
               </tr>
               <tr>
               <td>06/07/2024</td>
                 <td>A_Night</td>
                 <td>John</td>
                 <td>-</td>
                 <td>-</td>
                 <td>-</td>
               </tr>
               <tr>
               <td>06/07/2024</td>
                 <td>B_Morning</td>
                 <td>Smith</td>
                 <td>Clubhouse</td>
                 <td>-</td>
                 <td>-</td>
               </tr>
               <tr>
                 <td>06/07/2024</td>
                 <td>B_Evening</td>
                 <td>Denver</td>
                 <td>-</td>
                 <td>-</td>
                 <td>-</td>
               </tr>
               <tr>
               <td>06/07/2024</td>
                 <td>B_Night</td>
                 <td>Daniel</td>
                 <td>-</td>
                 <td>Playground Maintenance</td>
                 <td>Solved</td>
               </tr>
             </tbody>
           </table>
       </div>
      </main>
    
  )
}

export default Insightlog
