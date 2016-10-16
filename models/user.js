/**
 * Created by soygo on 14/10/2016.
 */

var mongoose = require('mongoose'); //Requerimos el modulo mongoose
var Schema = mongoose.Schema;


var userSchema = new Schema({ //Creamos un nuevo Schema de usuario
    name : String,
    age : String,
    city : String
});


//Primer paremtro nombre de la coleccion y segundo el parametro del esquema
var User = mongoose.model('users', userSchema);

//Function to get users
function findUsers(res){
    var users = [];

    User.find(function (err,User) { // Metodo de mongo para encontrar documentos
        if(err){
            return console.error(err);
        }
        else{
            User.forEach(function(user){ //Por cada usuario o documento encontrado en la coleccion
                users.push(user); //Agregamos uno al array de users
            });

            res.send(users); // mandamos la lista de usuarios para ser consumidos
        }
    });
}

//Function para guardar usuarios
function saveUsers(res,body){
    if(body.length > 1){
        body.forEach(function (user) {
            savingUsers(user);
        });
        res.send();
    }
    else{
        savingUsers(body);
        res.send();
    }
}
//Funciona
function savingUsers(user){
    var usuario = new User({ //creamos un nuevo objeto usuario
        name : user.name,
        age : user.age,
        city: user.city
    });
    usuario.save(function(err,doc){ //guardamos el usuario
        if(err) throw err;
        else{
            console.log(doc);
        }
    });
}

//Function para hacer un update a un usuario existente
function updateUsers(res,body){
    User.update({name:body.name},{$set:{age:body.age,city:body.city}}, function(err){
        if(err) throw err;
        res.send();
    });
}

//Function para remover documentos de una coleccion
function deleteUsers(res,body){
    User.find({name:body.name}).remove().exec();
    res.send();
}


module.exports.user = User;
module.exports.findUsers = findUsers;
module.exports.saveUsers = saveUsers;
module.exports.updateUsers = updateUsers;
module.exports.deleteUsers = deleteUsers;