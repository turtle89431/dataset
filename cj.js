var request = require('request');
var cheerio = require("cheerio");
var dbms = require('node-json-db')
var jobData = new dbms("jobData.json",true,true)
let jd = ()=>new Promise((res,err)=>{
    request(`https://www.indeed.com/jobs?as_and=information+technology&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=all&st=&salary=&radius=25&l=95928&fromage=any&limit=50&sort=&psf=advsrch`,(err,resp,html)=>{
        let $ = cheerio.load(html)
        let jobslist = $('td#resultsCol').children(".result")
        let jobs = []
       jobslist.each((i,item)=>{
           let tmp = cheerio.load($(item).html())
           let obj ={
               title:tmp('.jobtitle').text().trim().replace('\\n',''),
               href :`https://www.indeed.com${tmp('.jobtitle a').attr('href')}`,
               comp:`${tmp('.company').text().trim()}`,
               desc:`${tmp('.summary').text().trim()}`
           }
           jobs.push(obj)
       })
        res(jobs)
    })
})
module.exports=jd