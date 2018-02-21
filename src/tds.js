import React, { Component } from 'react';
class STD extends Component{
    
    render(){
        return(
        <tr key={this.props.kkey}>
        <td>{this.props.occupation}</td>
        <td>{this.props.empNum}</td>
        <td>{this.props.empRse}</td>
        <td>{this.props.amw}</td>
        <td>{this.props.medw}</td>
        </tr>)
    }
}
export default STD