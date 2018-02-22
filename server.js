// import { deepEqual } from 'assert';
var deepEqual = require('assert')
var app = require('express')();
var express = require('express')
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var a=0;
const bls = require("./bls")
const weather = require('./weather')
const news = require('./news')
let dbms = require("node-json-db");
let wdb = new dbms("./wdata.json",true,true)
let jobs = require("./cj")
//let wdbout = require("./wdata.json")
// var dbms = require('node-json-db')
// var blsData = new dbms("./bls")
var old={}
var butte = new dbms("./butte.json",true)
var glen = new dbms("./glen.json",true)
var plumas = new dbms("./plumas.json",true)
var shasta = new dbms("./shasta.json",true,true)
var nc = new dbms("./nc.json",true,true)
var soc = new dbms("./soc.json",true,true)
var key = new dbms("./key.json",true,true)
var jc = new dbms("./cj.json",true,true)
app.use(express.static('build'))
// weather().then(test=>{console.log(test)})
app.get("/",(req,res)=>{
  res.sendfile(__dirname + '/build/index.html')
})
io.on('connection', function(client){
  jobs().then(data=>{
    jc.push("/",data)
    client.emit('cj',data)
  })
  client.emit('hello',{message:"hello"});
  client.on('event', function(data){
      client.emit('ok',"your a " + data);
});
  
  weather().then(ddd=>{
    client.emit('base',ddd.temp)
   })
  client.on('db',()=>{
    
    client.emit('db',wdb.getData('/weather'))
    let t=[]
        t= wdb.getData("/weather")
        let out = t.slice(t.length-100,t.length)
        client.emit('wdb',out)
  })
  client.emit("butte",butte.getData('/'))
  client.emit("glen",glen.getData('/'))
  client.emit("plumas",plumas.getData('/'))
  client.emit("shasta",shasta.getData('/'))
  client.emit("nc",nc.getData('/'))
  client.emit("soc",soc.getData('/'))
  client.emit('tables',{
    butte:butte.getData("/"),
    glen:glen.getData('/'),
    plumas:plumas.getData('/'),
    shasta:shasta.getData('/'),
    cross:soc.getData('/'),
    nc:nc.getData('/'),
    keys:key.getData("/")
  })
  client.on('w',wd=>{
    weather().then(sd=>{
      old=sd
      wdb.push("/weather[]",{sd})
      if(JSON.stringify(old) !== JSON.stringify(wd)){
        client.emit('weather',old)
        let t=[]
        t= wdb.getData("/weather")
        let out = t.slice(t.length-101,t.length)
        let nout=[]
        for(let i=1;i<out.length;i++){
          nout.push(out[i-1].sd.temp - out[i].sd.temp)
        }
        client.emit('wdb',nout)
      }
      
    })
  })
  setInterval(()=>{
    let done= false
    client.broadcast.emit('hello',{message:a})
    let t=[]
        t= wdb.getData("/weather")
        let out = t.slice(t.length-101,t.length)
        let nout=[]
        for(let i=1;i<out.length;i++){
          nout.push(out[i-1].sd.temp - out[i].sd.temp)
        }
        client.broadcast.emit('wdb',nout)
    a++
  },10000)
  client.on('disconnect', function(){});
  bls().then(data=>{
    client.emit('bls',data)
  })
  //client.emit('bls',blsData.getData("/"))
  weather().then(data=>{
    client.emit('weather',data)
    old=data
  })

  news().then(data=>{
   client.emit('news',data)
  })
  
});
server.listen(process.env.port || 9000);