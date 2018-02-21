import React from 'react';
import "./news.css"
let News=props=>{
    const o = props.news.map((u,i)=><li><a href={u.href}>{u.text}</a></li>)
    return <div className="col-12"><ul>{o}</ul></div>
}
export default News