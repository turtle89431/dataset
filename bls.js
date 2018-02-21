var request = require('request');
var cheerio = require("cheerio");
var dbms = require('node-json-db')
var blsData = new dbms("./bls",true)
let bls = ()=>{
    if(!Array.isArray(blsData.getData("/"))){
        return new Promise((r,e)=>{
            r(blsData.getData("/"))
        })
    }
    return new Promise((res,eee)=>{
        request(`https://www.bls.gov/oes/current/oes_ca.htm`,(err,resp,html)=>{
            let $ = cheerio.load(html)
            let _fn=(fn)=>{
              let name = [
                  "code",
                  "occupation",
                  "level",
                  "empNum",
                  "empRse",
                  "jobs",
                  "locQ",
                  "medWage",
                  "meanWage",
                  "amw",
                  "mwRSE"
              ]
              return name[fn]
           }
            if (!err){
              const $ = cheerio.load(html)
              let out = []
              var tds = []
              let trs = $(`tbody`).children('tr')
              let tmp2
              trs.each((i,item)=>{
                let tmp = $(item).children('td')
                let tmp2={}
                tmp.each((j,ii)=>{
                    let tmp3;
                  if(j==0){
                      tmp3 = $(ii).text().split('-')
                      tmp2[`indcode`] = tmp3[0]
                      tmp2[`kkey`] = tmp3[1]
                      
                  }else{  
                  tmp2[`${_fn(j)}`] = $(ii).text()} 
                })
                tds.push(tmp2)
                })
              tds.splice(0,2)
              let rtn = tds.filter(t=>t.indcode == 15)
              rtn.slice(rtn.length,1)
              blsData.push('/',rtn)
              res(rtn)
          }else{
              console.log(err)
          }
          })
        
    })
}
module.exports=bls