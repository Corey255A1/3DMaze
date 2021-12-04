
'use strict';
const express = require('express');
const app = express();
var http = require('http');
const path = require('path');
var port = process.env.PORT || 1335;
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname,"www")));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"www","pages","index.html"));
});


const webServer = http.createServer(app).listen(port, () => {
    console.log("LISTENING HTTP!");
});