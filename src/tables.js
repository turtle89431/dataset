import React from 'react'

import Butte from './butte'
let Tables =props=>{
    this.props=props||{ keys: {headers:[],data:[]},shasta: {headers:[],data:[]}, butte: {headers:[],data:[]},cross: {headers:[],data:[]}, glen: {headers:[],data:[]}, nc: {headers:[],data:[]}, plumas: {headers:[],data:[]}, headers:[],data:[]}
    let kt ={"headers":["Level","Degree"],"data":[["1"," Doctoral or professional degree"],["2"," Master's degree"],["3"," Bachelor's degree"],["4"," Associate's degree"],["5"," Postsecondary nondegree award"],["6"," Some college, no degree"],["7"," High school diploma or equivalent"],["8"," No formal educational credential"]]}
   return (<div>
    <div className="row">
        <div className="col-8">
        <h3>Soc-Top-Cip cross reference</h3>
          <Butte header={this.props.cross.headers || {}} data ={this.props.cross.data || {} } />
        </div>
        <div className="col-4 smt">
            <h3>Key for education level</h3>
            <Butte header={kt.headers} data ={kt.data} />
        </div>
    </div>
    <div className="row">
        <div className="col-6">
        <h3>Butte County</h3>
        <Butte header={this.props.butte.headers ||{}} data ={this.props.butte.data || {}} /></div>
        <div className="col-6">
        <h3>Shasta County</h3>
        <Butte header={this.props.shasta.headers ||{}} data ={this.props.shasta.data || {}} /></div>
    </div>
    <div className="row">
    <div className="col-6">
        <h3>Del Norte, Humboldt, Lake &amp; Mendocino Counties</h3>
        <Butte header={this.props.nc.headers ||{}} data ={this.props.nc.data || {}} /></div>
        
        <div className="col-6">
        <h3>Lassen, Modoc, Nevada, Plumas, Sierra, Siskiyou &amp; Trinity Counties</h3>
        <Butte header={this.props.plumas.headers ||{}} data ={this.props.plumas.data ||{}} /></div>
    </div>
    <div className="row">
    <div className="col-6">
        <h3>Colusa, Glenn, &amp; Tehama Counties</h3>
        <Butte header={this.props.glen.headers ||{}} data ={this.props.glen.data || {}} /></div>
        <div className="col-6">
        
        </div>
    </div>
    </div>)
}
export default Tables