import React from 'react';
import STD from './tds'
import './bls.css'
function BLS(props){
  //console.log(props)
 const data = props.data 
 const trs = data.map((u,i)=><STD key={u.kkey.toString() + i} occupation={u.occupation} empNum={u.empNum} empRse={u.empRse} amw={u.amw} medw={u.medWage}/>)
 return (
   <div className="col-12">
   <table>
     <thead>
       <tr>
       <th>Job</th>
      <th>Emp Number</th>
      <th>Rate of Change</th>
      <th>avg Yr Wage</th>
      <th>medWage</th>
       </tr>
     </thead>
     <tbody>
       {trs}
     </tbody>
   </table>
   </div>
 )
}

export default BLS;
