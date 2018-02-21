import React from 'react';
function BUTTE (props){
    let h = props.header || []
    let d=props.data ||[[]]
    let ths = h.map(item=>{
        return <th>{item}</th>
    })
    let trs=d.map(tra=><tr>{tra.map(td=><td>{td}</td>)}</tr>)
    return (
        <table>
            <tr>{ths}</tr>
            {trs}
        </table>
    )
}
export default BUTTE