/**
 * Created by soygo on 14/10/2016.
 */
'use strict';

var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/bancodedatos', function(error){ // Nos conectamos a nuestra DB
    if(error){
        throw error;
    }
    else{
        console.log('Conectado a mongo');
    }
});


module.exports.connect = mongoose;