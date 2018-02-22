import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import News from './news'
import Butte from './butte'
import Weather from './weather.js'
import Tables from './tables'
import Jtable from './jobs'
//import events from './events'
let a = require("socket.io-client")()
let f2c=num=>Math.round((num-32)*.5556,2)


class App extends Component {
  state={jc:[],msg:"",data:[],datakeys:[],weather:{temp:50},news:[],tc:'',svgColor:"",wdb:[0,0,0,0,0],base:50,dkey:{"headers":["Level","Degree"],"data":[["1"," Doctoral or professional degree"],["2"," Master's degree"],["3"," Bachelor's degree"],["4"," Associate's degree"],["5"," Postsecondary nondegree award"],["6"," Some college, no degree"],["7"," High school diploma or equivalent"],["8"," No formal educational credential"]]},tables:{keys: {headers:[],data:[]},shasta: {headers:[],data:[]}, butte: {headers:[],data:[]}, glen: {headers:[],data:[]}, cross: {headers:[],data:[]},nc: {headers:[],data:[]}, plumas: {headers:[],data:[]}, headers:[],data:[]}}

  componentDidMount(){
   a.on('tables',data=>{console.log(data);this.setState({tables:data})});
   a.on('bls',data=>{this.setState({data});this.setState({datakeys:Object.keys(data[0])})});
    a.on('hello',dd=>{this.setState({msg:dd.message})});
    a.on('base',d=>{this.setState({base:d})});
    a.on('ok',a=>{this.setState({msg:a})});
    a.on('news',data=>{this.setState({news:data})});
    a.on('wdb',data=>{this.setState({wdb:data})});
    a.on('cj',data=>this.setState({jc:data}))
    a.on('weather',data=>{
      let colorn = Number.parseFloat(data.temp);
      let color = {r:(f2c(colorn)>70)?f2c(colorn)*5:0,g:(colorn>=55)?Math.round(f2c(colorn)*5.344)+50:(colorn <= 84 && colorn >=56)?Math.round(255-(colorn*(1/255))):Math.round(10*f2c(colorn)),b:(colorn<=65)?255-(Math.round(f2c(colorn)*14.166)):0}
      this.setState({svgColor:`rgb(${color.r},${color.g},${color.b})`});this.setState({tc:color}); this.setState({weather:data});})
  setInterval(()=>{a.emit('w',this.state.weather)},30000)
}
  clickme(e){a.emit('event',"asshole")}
  render() {
    return (
      <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={this.clickme} />
          <h1 className="App-title">Far north industry projection </h1>
        </header>
        

      <div className="container-fluid">
          <div className="row">
          
            <div className="col-7">
              <h2>News</h2>
              <News news={this.state.news}  /></div>
            <div className="col-5 wea">
              <h2>weather conditions</h2>
              <Weather base={this.state.base} weather={this.state.weather || {temp:50,hum:0}} wdb={this.state.wdb} svgColor={this.state.svgColor}/>
            </div>
           
          </div>
          
          <div className="row">
            <div className="col-12">
            <Jtable jobs={this.state.jc} />
              <Tables keys={this.state.dkey} shasta={this.state.tables.shasta} butte={this.state.tables.butte} cross={this.state.tables.cross} glen={this.state.tables.glen} nc={this.state.tables.nc} plumas={this.state.tables.plumas} data={this.state.data}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
