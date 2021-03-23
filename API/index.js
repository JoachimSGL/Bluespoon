var express = require('express');
var app = express();
const mysql = require('mysql');
const cors = require('cors');


var bodyParser = require('body-parser');

app.use(cors());

const db = mysql.createConnection({
    host: '127.0.0.1' ,
    user: 'root',
    password: 'user123',
    database: 'bluespoon'
});

db.connect( (err) =>{
    if(err){
        console.log(err);
    }else{
        console.log("connection établie")
    }
} );

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/commande', function (req, res) {
  let id = req.query['id'];
  let numCommande = req.query['numCommande'];
  var rechsql = 'select * from commandes join plats on commandes.idPlat=plats.idPlat join utilisateurs on commandes.idUtilisateur = utilisateurs.id where commandes.idUtilisateur= '+id+' and commandes.numCommande = '+ numCommande;
  db.query(rechsql, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
});

app.get('/plats', function (req, res) {
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select* from plats where idRestaurant = ? and boisson = false';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
});

app.get('/boissons', function (req, res) {
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select * from plats where idRestaurant = ? and boisson = true';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
});

app.get('/reconnexion', function (req, res) {
  let email = req.query['email'];
  let password = req.query['password'];
  let values = [[email]];
  var rechsql = 'select password from utilisateurs where email = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      console.log(result[0]['password']);
      if(password == result[0]['password']){
        valueId = [[email]];
        var rechsqlID = 'select id from utilisateurs where email = ?';
          db.query(rechsqlID,valueId, function (err2, result2, fields2) {
              if (err2) {res.send(JSON.stringify('no'));}else{
                res.send(JSON.stringify(result2[0]['id']));
              }
          })
      }else{
        res.send(JSON.stringify('no'));
      }
      }
})
});


app.get('/reconnexionRestaurant', function (req, res) {
  let nom = req.query['nom'];
  let password = req.query['password'];
  let values = [[nom]];
  var rechsql = 'select passwordRestaurant from restaurant where nomRestaurant = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      console.log(result[0]['passwordRestaurant']);
      if(password == result[0]['passwordRestaurant']){
        valueId = [[nom]];
        var rechsqlID = 'select id from restaurant where nomRestaurant = ?';
          db.query(rechsqlID,valueId, function (err2, result2, fields2) {
              if (err2) {res.send(JSON.stringify('no'));}else{
                res.send(JSON.stringify(result2[0]['id']));
              }
          })
      }else{
        res.send(JSON.stringify('no'));
      }
      }
})
});


app.get('/personnes', function (req, res) {
  let id = req.query['id'];
  let values = [[id]];
  var rechsql = 'select numTable from utilisateurs where id = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      var values2 = [[result[0].numTable]]
      var rechsql2 = 'select id , nom , prenom , nomPlat, prix from commandes join plats on commandes.idPlat=plats.idPlat join utilisateurs on commandes.idUtilisateur = utilisateurs.id where idTable = ?';
      db.query(rechsql2,values2, function (err2, result2, fields2) {
        if (err2) {throw err2;}else{
          res.send(JSON.stringify(result2));
        }
      })

     }
})
});



app.post('/table',jsonParser, function (req, res) {
  let numero = req.body.numero;
  let idU = req.body.id;
  
  console.log(idU);
  var rechsql = "update utilisateurs set numTable = "+ numero + " where id = "+idU;
  db.query(rechsql, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify('done'));
     }
})
});

app.post('/inscription',jsonParser, function (req, res) {
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let email = req.body.email;
  let mdp = req.body.mdp;
  values=[[nom,prenom,email,0,mdp]];
  var rechsql = "insert into utilisateurs(nom,prenom,email,numTable,password) values(?)";
  db.query(rechsql ,values, function (err, result, fields) {
    if (err) {res.send(JSON.stringify('no'));}else{

      valueId = [[email]];
      var rechsqlID = 'select id from utilisateurs where email = ?';
        db.query(rechsqlID,valueId, function (err2, result2, fields2) {
            if (err2) {res.send(JSON.stringify('no'));}else{
              res.send(JSON.stringify(result2[0]['id']));
            }
        })
      
     }
})
});


app.post('/inscriptionRestaurant',jsonParser, function (req, res) {
  let nom = req.body.nom;
  let add = req.body.add;
  let pass = req.body.pass;
  values=[[nom,add,pass]];
  var rechsql = "insert into restaurant(nomRestaurant,adresse,passwordRestaurant) values(?)";
  db.query(rechsql ,values, function (err, result, fields) {
    if (err) {res.send(JSON.stringify('no'));}else{

      valueId = [[nom]];
      var rechsqlID = 'select id from restaurant where nomRestaurant = ?';
        db.query(rechsqlID,valueId, function (err2, result2, fields2) {
            if (err2) {res.send(JSON.stringify('no'));}else{
              res.send(JSON.stringify(result2[0]['id']));
            }
        })
      
     }
})
});


app.post('/ajoutPlat',jsonParser, function (req, res) {
  nom = req.body.plat;
  idRestaurant = req.body.idRestaurant;
  commentaires = req.body.commentaires;
  prix = req.body.prix;
  image = req.body.image;
  boisson = req.body.boisson;
  console.log(image);
  let values = [[idRestaurant,nom,commentaires,prix,image,boisson]];
  var rechsql = "insert into plats(idRestaurant,nomPlat,commentaires,prix,image,boisson) values(?)";

  db.query(rechsql,values, function (err, result, fields) { 
    if (err) {throw err;}else{
      res.send('done');
     }
})
});



app.post('/ajoutCommande',jsonParser, function (req, res) {
  
  commande = req.body.commande;
  idRestaurant = req.body.idRestaurant;
  id = req.body.id;
  idTable = req.body.idTable;
  console.log(commande);
  var valuesSelect = [id];
  var selectsql = "select numCommande from commandes where idUtilisateur= (?)";

  db.query(selectsql,valuesSelect, function (err, result, fields) { 
    if (err) {throw err;}else{
      let numCommande=0;
      if(result[result.length-1]==undefined){
        numCommande = 1;
      }else{
        numCommande= result[result.length-1].numCommande+1;
      }

        for(let i =0 ; i<commande.length;i++ ){
          let values = [[commande[i][3],idRestaurant,id,numCommande,idTable]];
          var rechsql = "insert into commandes(idPlat,idRestaurant,idUtilisateur,numCommande,idTable) values(?)";
    
          db.query(rechsql,values, function (err, result, fields) { 
            if (err) {throw err;}else{
              console.log('done');
            }
        })
      }
      res.send(JSON.stringify(numCommande));


      
    }

})


  
});




app.post('/modifPlat',jsonParser, function (req, res) {
  id = req.body.idPlat;
  nom = req.body.plat;
  idRestaurant = req.body.idRestaurant;
  commentaires = req.body.commentaires;
  prix = req.body.prix;
  image = req.body.image;
  let values = [[idRestaurant,nom,commentaires,prix,image]];
  var rechsql = "UPDATE plats set idRestaurant = " + idRestaurant +", nomPlat= '" + nom +"', commentaires= '" + commentaires +"', prix= " + prix +" where idPlat = "+id;
  //, image= " + image +"
  db.query(rechsql, function (err, result, fields) { 
    if (err) {throw err;}else{
      res.send('done');
     }
})
});


app.get('/image', function (req, res) {
  let idPlat = req.query['idPlat'];
  let values=[[idPlat]]
  var rechsql = 'select image from plats where idPlat= ?';
  db.query(rechsql, values,function (err, result, fields) {
    if (err) {throw err;}else{
      console.log(result[0]['image']);
      /*
      var FileReader = require('filereader')
      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(result[0]['image']); 
      fileReaderInstance.onload = () => {
          base64data = fileReaderInstance.result;                
          console.log(base64data);
      }*/
      var bufferBase64 = new Buffer( result[0]['image'], 'binary' ).toString('base64');
      res.send(JSON.stringify(bufferBase64));
     }
})
});

app.listen(3001, function () {
  console.log('listening on port 3001!');
});