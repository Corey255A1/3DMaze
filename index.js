
'use strict';
const express = require('express');
const app = express();
//var http = require('http');
var https = require('https');
var fs = require('fs');
const path = require('path');
var port = process.env.PORT || 1335;
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname,"www")));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"www","pages","index.html"));
});

const servwebServerer = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')},
    app)
    .listen(port, function () {
        console.log("Running");
    });
// const webServer = http.createServer(app).listen(port, () => {
//     console.log("LISTENING HTTP!");
// });