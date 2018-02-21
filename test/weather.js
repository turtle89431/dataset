var request = require('request');
var cheerio = require("cheerio");

let weather = ()=>{
    return new Promise((res,eee)=>{
        var inx=new Date()
        request(`https://www.wunderground.com/personal-weather-station/dashboard?ID=KCAOROVI35`,(err,resp,html)=>{
            var $=cheerio.load(html)
            let out ={
                temp:$('#curTemp > span > span.wx-value').text(),
                wind:$('#windDir > span > span > span').text() + " at "+ $('#windCompassSpeed > h4 > span').text().replace(/\s/g,'')+ ' MPH',
                hum:`${$('#condition-data > div:nth-child(5) > div.small-7.medium-12.columns.collapse.conditions > div:nth-child(1) > div:nth-child(2) > div.small-5.medium-6.columns > span > span.wx-value').text()}`
            }
            
            res(out)
        })})
}
module.exports=weather