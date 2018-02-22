import React from 'react'
let Jtable=props=>{
    let p=props.jobs
    let out = p.map(item=>(
        <div>
            <h3><a href={item.href}>{item.title}</a></h3>
            <div>posted by:{item.comp}</div>
            <div>{item.desc}</div>
        </div>
    ))
    return <div className="col-12"><div className="row"><p className="col-12"><h3>Far North ICT Jobs</h3></p></div><div className="jcc"> {out}</div></div>
}
export default Jtable