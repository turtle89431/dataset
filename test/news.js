var request = require('request');
var cheerio = require("cheerio");
const news=()=>{
    return new Promise((res,eee)=>{
        
        request(`http://www.orovillemr.com/`,(err,resp,html)=>{
            var $=cheerio.load(html)
            let out =[]
            let lis = $('.span2 > div > ul')
           // console.log(lis.children('li'))
            lis.children().each((i,item)=>{
                let $$ = cheerio.load(item)
                out.push({href:"http://www.orovillemr.com"+$$('a').attr().href,text:$$('a').text()})
            })
            
            res(out)
        })})
}
module.exports=news