import React from 'react'
let Jtable=props=>{
    let p=props.jobs
    let out = p.map(item=>(
        <tr>
            <td><a href={item.href}>{item.title}</a></td>
            <td>{item.comp}</td>
            <td>{item.desc}</td>
        </tr>
    ))
    // return <td className="col-12"><td className="row"><p className="col-12"><h3>Far North ICT Jobs</h3></p></td><td className="jcc"> {out}</td></td>
    return <div className="row jcc">
    <h3>Current Open Ict Jobs</h3>
    <div className="col-12">
    <table>
        <tr>
            <th>Job</th>
            <th>Employeer</th>
            <th>Description</th>
        </tr>
        {out}
    </table>
    </div>
    </div>
}
export default Jtable