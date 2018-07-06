const express = require('express');
const protobuf = require("protocol-buffers");
const fs = require("fs");

let messages = protobuf(fs.readFileSync('model.proto'));
let app = express();

app.use(function(req, res, next){
    console.log(req.headers);
    if(!req.is('application/octet-stream')) return next();
    let data = [];

    // listening data from request
    req.on('data', function(chunk){
        data.push(chunk);
    });

    req.on('end', function(){
        if (data.length < 0) return next();

        data = Buffer.concat(data);        
        req.raw = data;
        return next();
    });
});

app.post('/api/collection', function(req, res){
    if (req.raw){
        let data = messages.Collection.decode(req.raw);
        console.log("Protobuf data decoded: " + JSON.stringify(data));
    }
    res.send("done");
});

app.listen(3000);