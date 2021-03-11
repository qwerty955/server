const http = require("http");

const ws = require('ws');

const clients = new Set();

const server = http.createServer((req, res)=>{
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
        res.setHeader("content-type","text/html")
        res.write("<h1>Good Job</h1>")
        res.end();
       return;
    }});

const wss = new ws.Server({server});
wss.on("connection",(ws)=>{
    
    clients.add(ws)
    
    ws.on("message",(e)=>{
        for(let client of clients) {
            client.send(e);
        }
    })

})
server.listen(3000, ()=>{
    console.log('Good Job!');
})