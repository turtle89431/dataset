import React from 'react';
let Weather=props=>{
    this.props=props
    let tchange=()=>{
        let c=1
        let b = Number.parseFloat(this.props.base)
       let out = this.props.wdb.map((u,i)=>{
       c++;
         let cur = b;
         b=b+(u*10)
         return `${c*2}, ${100 +cur} `
     } )
     let sty={strokeWidth:"2",stroke:"black",fill:"none"}
       return <polyline points={out} style={sty} />
     }
     return (
        <svg width="400" height="200">

        <g>
        <rect width="400" height={`${this.props.weather.hum*2}`} fill="rgb(0,0,255)" strokeWidth="0" stroke="rgb(0,0,0)" y={200-(this.props.weather.hum*2)}/>
        <rect width={(this.props.weather.temp*4)} height="200" fill={this.props.svgColor} strokeWidth="0" stroke="rgb(0,0,0)" />
        {tchange()}
        <text x="0" y="20" font-family="Verdana" font-size="20">
            {this.props.weather.temp} &deg; F
          </text>
          <text  x="0" y="182" font-family="Verdana" font-size="18">
          {this.props.weather.wind}
          </text>
          <text  x="300" y="20" font-family="Verdana" font-size="18">
          {this.props.weather.hum} %
          </text>
        </g>
        
        </svg>
     )
}
export default Weather