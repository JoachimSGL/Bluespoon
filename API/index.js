var express = require('express');
var app = express();
const mysql = require('mysql');
const cors = require('cors');
app.use('/image',express.static('images'));
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname ) //Appending .jpg
  }
})

var upload = multer({ storage: storage });
//var upload = multer({ dest: 'uploads/' })

var bodyParser = require('body-parser');
var fs = require('fs');

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
 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/commande', function (req, res) {
  let id = req.query['id'];
  let value=[[id]];
  var rechsql = 'select * from commandes join plats on commandes.idPlat=plats.idPlat join utilisateurs on commandes.idUtilisateur = utilisateurs.id where commandes.idUtilisateur= ?';
  db.query(rechsql,value, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
});

app.get('/commandeHome', function (req, res) {
  let id = req.query['id'];
  let value=[[id]];
  var rechsql = 'select * from commandes join plats on commandes.idPlat=plats.idPlat join utilisateurs on commandes.idUtilisateur = utilisateurs.id where commandes.idUtilisateur= ?';
  db.query(rechsql,value, function (err, result, fields) {
    if (err) {res.send(JSON.stringify('no'));}else{
        if(result[0]==undefined){
          res.send(JSON.stringify('no'));
        }else{
          res.send(JSON.stringify(result[0]));
        }
     }
})
});

app.get('/commandeRestaurant', function (req, res) {
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select * from commandes join plats on commandes.idPlat=plats.idPlat where commandes.idRestaurant = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
});

app.get('/restaurant', function (req, res) {
  var rechsql = 'select * from restaurant join plats on restaurant.id=plats.idRestaurant';
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
app.get('/all', function (req, res) {
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select* from plats where idRestaurant = ?';
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
      if(password == result[0]['password']){
        valueId = [[email]];
        var rechsqlID = 'select id,serveur from utilisateurs where email = ?';
          db.query(rechsqlID,valueId, function (err2, result2, fields2) {
              if (err2) {res.send(JSON.stringify('no'));}else{
                res.send(JSON.stringify(result2));
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
      var rechsql2 = 'select id , nom , prenom , nomPlat, prix ,contact from commandes join plats on commandes.idPlat=plats.idPlat join utilisateurs on commandes.idUtilisateur = utilisateurs.id where idTable = ?';
      db.query(rechsql2,values2, function (err2, result2, fields2) {
        if (err2) {throw err2;}else{
          res.send(JSON.stringify(result2));
        }
      })

     }
})
});

app.get('/notation', function (req, res) {
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select * from notationPlat join restaurant on notationplat.idRestaurant=restaurant.id join utilisateurs on notationplat.idUtilisateur=utilisateurs.id where idRestaurant = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
});

app.get('/notationRestaurant', function (req, res) {
  var rechsql = 'select  idRestaurant,note from notation join restaurant on notation.idRestaurant=restaurant.id ';
  db.query(rechsql, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
});



app.post('/table',jsonParser, function (req, res) {
  let numero = req.body.numero;
  let idU = req.body.id;
  let values=[[numero],[idU]]
  var rechsql = "update utilisateurs set numTable = ? where id = ?";
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify('done'));
     }
})
});

app.post('/demandeAddition',jsonParser, function (req, res) {
  let addition = req.body.addition;
  let idUtilisateur = req.body.idUtilisateur;
  let numCommande = req.body.numCommande;
  let value=[[idUtilisateur]];
  if(!addition){
      //var rechsql = "delete from commandes where numCommande = "+numCommande+ " and idUtilisateur = "+idUtilisateur;
      
      var rechsql = "delete from commandes where idUtilisateur = ?";
      db.query(rechsql,value, function (err, result, fields) {
        if (err) {throw err;}else{
          res.send(JSON.stringify('done'));
        }
    })
  }else{
    var rechsql = "select * from commandes where idUtilisateur = ?";
    db.query(rechsql,value, function (err, result, fields) {
      if (err) {throw err;}else{
        let bool =true;
        for(let i = 0 ; i<result.length;i++){
          if(result[i].servi==false){
            res.send(JSON.stringify('no'));
            bool =false
            break;
          }
        }
        if(bool){
          let value2=[[addition],[idUtilisateur]];
            var rechsql = "update commandes set addition = ? where idUtilisateur = ?";
            db.query(rechsql,value2, function (err2, result2, fields2) {
              if (err2) {throw err2;}else{
                res.send(JSON.stringify('done'));
              }
          })
        }
          
      }
  })
  }
});

app.post('/addition',jsonParser, function (req, res) {
  let servi = req.body.servi;
  let numCommande = req.body.numCommande;
  let idUtilisateur = req.body.idUtilisateur;
  let values=[[servi],[numCommande],[idUtilisateur]];
      var rechsql = "update commandes set servi = ? where numCommande = ? and idUtilisateur = ?";
      db.query(rechsql,values, function (err, result, fields) {
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
      var rechsqlID = 'select id,serveur from utilisateurs where email = ?';
        db.query(rechsqlID,valueId, function (err2, result2, fields2) {
            if (err2) {res.send(JSON.stringify('no'));}else{
              res.send(JSON.stringify(result2));
            }
        })
      
     }
})
});

app.post('/inscriptionServeur',jsonParser, function (req, res) {
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let email = req.body.email;
  let mdp = req.body.mdp;
  let mdpR = req.body.mdpR;
  let nomRestaurant = req.body.nomRestaurant;
  let valuesR = [[nomRestaurant]];
  var rechsqlR = 'select passwordRestaurant from restaurant where nomRestaurant = ?';
  db.query(rechsqlR,valuesR, function (errR, resultR, fields) {
    if (errR) {res.send(JSON.stringify('no'));}else{
      if(mdpR == resultR[0]['passwordRestaurant']){

        values=[[nom,prenom,email,0,mdp,true]];
        var rechsql = "insert into utilisateurs(nom,prenom,email,numTable,password,serveur) values(?)";
        db.query(rechsql ,values, function (err, result, fields) {
          if (err) {res.send(JSON.stringify('no'));}else{

            valueId = [[email]];
            var rechsqlID = 'select id,serveur from utilisateurs where email = ?';
              db.query(rechsqlID,valueId, function (err2, result2, fields2) {
                  if (err2) {res.send(JSON.stringify('no'));}else{
                    res.send(JSON.stringify(result2));
                  }
              })
            
          }
      })
      }else{
        res.send(JSON.stringify('no'));
      }
  }
});

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
  boisson = req.body.boisson;
  imagePlat = req.body.imagePlat;
  let values = [[idRestaurant,nom,commentaires,prix,boisson,imagePlat]];
  var rechsql = "insert into plats(idRestaurant,nomPlat,commentaires,prix,boisson,imagePlat) values(?)";

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
  contact = req.body.contact;
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
          for(let j = 0;j<commande[i][4];j++){
            let values = [[commande[i][3],idRestaurant,id,numCommande,idTable,contact]];
            var rechsql = "insert into commandes(idPlat,idRestaurant,idUtilisateur,numCommande,idTable,contact) values(?)";
      
            db.query(rechsql,values, function (err, result, fields) { 
              if (err) {throw err;}else{
                console.log('done');
              }
          })
        }
      }
      res.send(JSON.stringify(numCommande));


      
    }

})


  
});

app.post('/ajoutNotation',jsonParser, function (req, res) {
  idRestaurant = req.body.idRestaurant;
  commentairesNotation = req.body.commentairesNotation;
  id = req.body.id;
  note = req.body.note;
  let values = [[id,idRestaurant,note,commentairesNotation]];
  var rechsql = "insert into notation(idUtilisateur,idRestaurant,note,commentairesNotation) values(?)";

  db.query(rechsql,values, function (err, result, fields) { 
    if (err) {throw err;}else{
      res.send(JSON.stringify('done'));
     }
})
});

app.post('/ajoutNotationPlat',jsonParser, function (req, res) {
  idPlat = req.body.idPlat;
  commentairesNotation = req.body.commentairesNotation;
  id = req.body.id;
  note = req.body.note;
  idRestaurant = req.body.idRestaurant;
  let values = [[id,idPlat,note,commentairesNotation,idRestaurant]];
  var rechsql = "insert into notationPlat(idUtilisateur,idPlat,note,commentairesNotation,idRestaurant) values(?)";

  db.query(rechsql,values, function (err, result, fields) { 
    if (err) {throw err;}else{
      res.send(JSON.stringify('done'));
     }
})
});




app.post('/modifPlat',jsonParser, function (req, res) {
  id = req.body.idPlat;
  nom = req.body.plat;
  idRestaurant = req.body.idRestaurant;
  commentaires = req.body.commentaires;
  prix = req.body.prix;
  imagePlat = req.body.imagePlat;
  boisson = req.body.boisson;
  
  let values = [[nom],[commentaires],[prix],[boisson],[imagePlat],[id]];
  var rechsql = "UPDATE plats set nomPlat= ?, commentaires= ?, prix= ?,boisson = ? ,imagePlat = ? where idPlat = ?";
  db.query(rechsql,values, function (err, result, fields) { 
    if (err) {throw err;}else{
      res.send('done');
     }
})
});

app.post('/image',upload.single('file'), function (req, res) {
  let file = req.file;
  console.log(file);
  
//fs.writeFile(file.originalname, file);
})
app.get('/image2', function (req, res) {
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