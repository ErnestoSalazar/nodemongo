'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var db = require('./connection.js');
var User = require('./models/user.js');

db.connect; // Nos conectamos a la DB

var app = express();

var port = process.env.PORT || 3000; //obtenemos el puerto del servidor

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.get('/api', function(req,res){
    User.findUsers(res);
});

// Si utilizamos enviamos datos a la API
app.post('/api', function(req,res){
    var body = req.body; // obtenemos el cuerpo del request
    User.saveUsers(res,body);
});

app.post('/api/update',function(req,res){
    var body = req.body;
    User.updateUsers(res,body);
});

app.post('/api/delete',function(req,res){
    var body = req.body;
    User.deleteUsers(res,body);
});

app.listen(port, function(){
    console.log('Server running at port: '+port);
});