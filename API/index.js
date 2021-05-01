var express = require('express');
var app = express();
const mysql = require('mysql');
const cors = require('cors');
var path = require('path');
app.use('/image',express.static('images'));
app.use(express.static(path.join(__dirname,'templates')));
/*
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
*/
//var upload = multer({ dest: 'uploads/' })

var bodyParser = require('body-parser');
var fs = require('fs');
const { nextTick } = require('process');

app.use(cors());

const db = mysql.createConnection({
    host: 'bav4owi5cbretfhonqkl-mysql.services.clever-cloud.com' ,
    user: 'urttupjizaj6axzs',
    password: 'OXN1MYb12tv7KIW6gxVc',
    database: 'bav4owi5cbretfhonqkl'
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
setInterval(function () {
  db.query('SELECT 1');
}, 5000);


app.get('/', function (req, res) {
  res.sendFile((path.join(__dirname +'/templates/bluespoon.html')));
});

app.get('/portfolio',function(req,res){
  res.sendFile((path.join(__dirname +'/templates/bluespoon.html')));
  //res.sendFile((path.join(__dirname +'/templates/index.html')));
});

app.get('/commande', function (req, res) {
  try{
  let idTable = req.query['idTable'];
  let idRestaurant = req.query['idRestaurant'];
  let value=[[idTable],[idRestaurant]];
  var rechsql = 'select * from commandes join plats on commandes.idPlat=plats.idPlat join utilisateurs on commandes.idUtilisateur = utilisateurs.id where commandes.idTable= ? and commandes.idRestaurant = ?';
  db.query(rechsql,value, function (err, result, fields) {
    if (err) {throw err;}else{
      console.log(result);
      res.send(JSON.stringify(result));
     }
})
  }catch(e){
    console.log(e);
  }
});

app.get('/commandeHome', function (req, res) {
  try{
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
}catch(e){
  console.log(e);
}

});

app.get('/commandeRestaurant', function (req, res) {
  try{
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select * from commandes join plats on commandes.idPlat=plats.idPlat where commandes.idRestaurant = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
}catch(e){
  console.log(e);
}
});

app.get('/restaurant', function (req, res) {
  try{
  var rechsql = 'select * from restaurant join plats on restaurant.id=plats.idRestaurant';
  db.query(rechsql, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
}catch(e){
  console.log(e);
}
});

app.get('/plats', function (req, res) {
  try{
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select* from plats where idRestaurant = ? and boisson = false';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
}catch(e){
  console.log(e);
}
});
app.get('/all', function (req, res) {
  try{
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select* from plats where idRestaurant = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
}catch(e){
  console.log(e);
}
});

app.get('/boissons', function (req, res) {
  try{
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select * from plats where idRestaurant = ? and boisson = true';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
}catch(e){
  console.log(e);
}
});

app.get('/reconnexion', function (req, res) {
  try{
  let email = req.query['email'];
  
        valueId = [[email]];
        var rechsqlID = 'select id,serveur,password,numTable from utilisateurs where email = ?';
          db.query(rechsqlID,valueId, function (err2, result2, fields2) {
              if (err2) {res.send(JSON.stringify('no'));}else{
                res.send(JSON.stringify(result2));
              }
          })
        }catch(e){
          console.log(e);
        }
      

});


app.get('/reconnexionRestaurant', function (req, res) {
  try{
  let nom = req.query['nom'];
  let values = [[nom]];
  var rechsql = 'select id,passwordRestaurant from restaurant where nomRestaurant = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{       
        res.send(JSON.stringify(result));
      
      }
})
}catch(e){
  console.log(e);
}
});


app.get('/personnes', function (req, res) {
  try{
  let id = req.query['id'];
  let values = [[id]];
  var rechsql = 'select numTable from utilisateurs where id = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      var values2 = [[result[0].numTable]]
      var rechsql2 = 'select id , nom , prenom ,idTable, nomPlat, prix ,contact,payement from commandes join plats on commandes.idPlat=plats.idPlat join utilisateurs on commandes.idUtilisateur = utilisateurs.id where idTable = ?';
      db.query(rechsql2,values2, function (err2, result2, fields2) {
        if (err2) {throw err2;}else{
          res.send(JSON.stringify(result2));
        }
      })

     }
})
}catch(e){
  console.log(e);
}
});

app.get('/notation', function (req, res) {
  try{
  let idRestaurant = req.query['idRestaurant'];
  let values = [[idRestaurant]];
  var rechsql = 'select * from notationPlat join restaurant on notationPlat.idRestaurant=restaurant.id join utilisateurs on notationPlat.idUtilisateur=utilisateurs.id where idRestaurant = ?';
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
}catch(e){
  console.log(e);
}
});

app.get('/notationRestaurant', function (req, res) {
  try{
  var rechsql = 'select  idRestaurant,note from notation join restaurant on notation.idRestaurant=restaurant.id ';
  db.query(rechsql, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
}catch(e){
  console.log(e);
}
});

app.get('/additionSpecifique', function (req, res) {
  try{
  let idRestaurant = req.query['idRestaurant'];
  let idTable = req.query['idTable'];
  let id = req.query['id'];
  let contact=req.query["contact"];
  let servi=req.query["servi"];

  let values = [[idRestaurant],[idTable],[id]];
  var rechsql = '';
  if(servi=='true'){
    if(contact=='true'){
      rechsql = 'select * from commandes join plats on commandes.idPlat=plats.idPlat where commandes.idRestaurant=? and idTable= ? and contact=? and servi=false';
    }else{
      rechsql='select * from commandes join plats on commandes.idPlat=plats.idPlat where commandes.idRestaurant=? and idTable= ? and idUtilisateur=? and contact is null and servi=false'
    }
  }else{
  if(contact=='true'){
    rechsql = 'select * from commandes join plats on commandes.idPlat=plats.idPlat where commandes.idRestaurant=? and idTable= ? and contact=? ';
  }else{
    rechsql='select * from commandes join plats on commandes.idPlat=plats.idPlat where commandes.idRestaurant=? and idTable= ? and idUtilisateur=? and contact is null'
  }
}
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify(result));
     }
})
}catch(e){
  console.log(e);
}
});

app.post('/table',jsonParser, function (req, res,next) {
  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }
})

app.post('/table',jsonParser, function (req, res) {
  try{
  let numero = req.body.numero;
  let idU = req.body.id;
  let values=[[numero],[idU]]
  var rechsql = "update utilisateurs set numTable = ? where id = ?";
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify('done'));
     }
})
}catch(e){
  console.log(e);
}
});
app.post('/changeImage',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/changeImage',jsonParser, function (req, res) {
  try{
  let url = req.body.url;
  let nomPlat = req.body.nomPlat;
  let idRestaurant =  req.body.idRestaurant;
  console.log(url);
  console.log(nomPlat);
  console.log(idRestaurant);
  let values=[[url],[nomPlat],[idRestaurant]]
  var rechsql = "update plats set imagePlat = ? where nomPlat = ? and idRestaurant= ?";
  db.query(rechsql,values, function (err, result, fields) {
    if (err) {throw err;}else{
      res.send(JSON.stringify('done'));
     }
})
}catch(e){
  console.log(e);
}
});

app.post('/demandeAddition',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/demandeAddition',jsonParser, function (req, res) {
  try{
  let addition = req.body.addition;
  let idUtilisateur = req.body.idUtilisateur;
  let idRestaurant = req.body.idRestaurant;
  let force = req.body.force;
  let value=[[idUtilisateur],[idRestaurant]];
  if(!addition){
      //var rechsql = "delete from commandes where numCommande = "+numCommande+ " and idUtilisateur = "+idUtilisateur;
      
      var rechsql = "delete from commandes where idUtilisateur = ? and idRestaurant = ?";
      db.query(rechsql,value, function (err, result, fields) {
        if (err) {throw err;}else{
          res.send(JSON.stringify('done'));
        }
    })
  }else{
    var rechsql = "select * from commandes where idUtilisateur = ? and idRestaurant = ?";
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
        if(force){
          bool=true;
        }
        if(bool){
          let value2=[[addition],[idUtilisateur],[idRestaurant]];
            var rechsql = "update commandes set addition = ? where idUtilisateur = ? and idRestaurant = ?";
            db.query(rechsql,value2, function (err2, result2, fields2) {
              if (err2) {throw err2;}else{
                res.send(JSON.stringify('done'));
              }
          })
        }
          
      }
  })
  }
}catch(e){
  console.log(e);
}
});

app.post('/demandeAdditionAll',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/demandeAdditionAll',jsonParser, function (req, res) {
  try{
  let addition = req.body.addition;
  let idTable = req.body.idTable;
  let idRestaurant=req.body.idRestaurant;
  let value=[[idTable],[idRestaurant]];
  if(!addition){
      
      var rechsql = "delete from commandes where idTable = ? and addition=true and idRestaurant=?";
      db.query(rechsql,value, function (err, result, fields) {
        if (err) {throw err;}else{
          res.send(JSON.stringify('done'));
        }
    })
  }
}catch(e){
  console.log(e);
}
});


app.post('/addition',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/addition',jsonParser, function (req, res) {
  try{
  let servi = req.body.servi;
  let addition = req.body.addition;
  let idTable = req.body.idTable;
  let idRestaurant = req.body.idRestaurant;
  let idPlat= req.body.idPlat;
  let values=[[servi],[addition],[idRestaurant],[idTable],[idPlat]];
      var rechsql = "update commandes set servi = ? and addition = ? where idRestaurant = ? and idTable = ? and idPlat= ?";
      db.query(rechsql,values, function (err, result, fields) {
        if (err) {throw err;}else{
          res.send(JSON.stringify('done'));
        }
    })
  }catch(e){
    console.log(e);
  }
  
});


app.post('/additionAll',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/additionAll',jsonParser, function (req, res) {
  try{
  let servi = req.body.servi;
  let addition = req.body.addition;
  let idTable = req.body.idTable;
  let idRestaurant = req.body.idRestaurant;
  let values=[[servi],[addition],[idRestaurant],[idTable]];
      var rechsql = "update commandes set servi = ? and addition = ? where idRestaurant = ? and idTable = ? and servi= false and addition = false";
      db.query(rechsql,values, function (err, result, fields) {
        if (err) {throw err;}else{
          res.send(JSON.stringify('done'));
        }
    })
  }catch(e){
    console.log(e);
  }
  
});



app.post('/inscription',jsonParser, function (req, res) {
  try{
  let nom = req.body.nom;
  let numTable=req.body.numTable;
  
  var rechsqlID = 'select id from utilisateurs';
        db.query(rechsqlID, function (error, resu) {
          if (error) {res.send(JSON.stringify('no'));}else{
            nom = nom+'_'+(resu[resu.length-1].id+1).toString();
            console.log(nom);
            let values=[[nom,numTable]];
          var rechsql = "insert into utilisateurs(nom,numTable) values(?)";
          db.query(rechsql ,values, function (err, result, fields) {
            if (err) {
              console.log(err);
              res.send(JSON.stringify('no'));  
            }else{

              let valueId = [[nom]];
              var rechsqlID = 'select id,serveur from utilisateurs where nom = ?';
                db.query(rechsqlID,valueId, function (err2, result2, fields2) {
                    if (err2) {
                      res.send(JSON.stringify('no'));
                  }else{
                      res.send(JSON.stringify(result2));
                    }
                })
              
            }
        })
      }
})
}catch(e){
  console.log(e);
}
});

app.post('/inscriptionServeur',jsonParser, function (req, res) {
  try{
  let nom = req.body.nom;
  let prenom = req.body.prenom;
  let email = req.body.email;
  let mdp = req.body.mdp;
  let mdpR = req.body.mdpR;
  let nomRestaurant = req.body.nomRestaurant;
  console.log(mdp);
  let valuesR = [[nomRestaurant]];
  var rechsqlR = 'select id from restaurant where nomRestaurant = ?';
  db.query(rechsqlR,valuesR, function (errR, resultR, fields) {
    if (errR || resultR[0]==undefined) {res.send(JSON.stringify('no'));}else{

        values=[[nom,prenom,email,resultR[0]['id'],mdp,true]];
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
  }
});
}catch(e){
  console.log(e);
}

});


app.post('/inscriptionRestaurant',jsonParser, function (req, res) {
  try{
  let nom = req.body.nom;
  let add = req.body.add;
  let type = req.body.type;
  let lat = req.body.lat;
  let long = req.body.long;
  let pass = req.body.pass;
  values=[[nom,add,pass,long,lat,type]];
  console.log('test')
  var rechsql = "insert into restaurant(nomRestaurant,adresse,passwordRestaurant,longitude,latitude,specialite) values(?)";
  db.query(rechsql ,values, function (err, result, fields) {
    if (err) {res.send(JSON.stringify('no'));}else{
        console.log(result)
      valueId = [[nom]];
      var rechsqlID = 'select id from restaurant where nomRestaurant = ?';
        db.query(rechsqlID,valueId, function (err2, result2, fields2) {
            if (err2) {res.send(JSON.stringify('no'));}else{
              res.send(JSON.stringify(result2[0]['id']));
            }
        })
      
     }
})
}catch(e){
  console.log(e);
}
});

app.post('/ajoutPlat',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/ajoutPlat',jsonParser, function (req, res) {
  try{
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
}catch(e){
  console.log(e);
}
});


app.post('/ajoutCommande',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/ajoutCommande',jsonParser, function (req, res) {
  try{
  
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
            let values=[];
            if(commande[i][5]){
              values = [[commande[i][3],idRestaurant,id,numCommande,idTable,contact,commande[i][6]]];
            }else{
              values = [[commande[i][3],idRestaurant,id,numCommande,idTable,contact,'']];
            }
            var rechsql = "insert into commandes(idPlat,idRestaurant,idUtilisateur,numCommande,idTable,contact,commentaire) values(?)";
      
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
}catch(e){
  console.log(e);
}


  
});


app.post('/ajoutNotation',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/ajoutNotation',jsonParser, function (req, res) {
  try{
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
}catch(e){
  console.log(e);
}
});


app.post('/payement',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/payement',jsonParser, function (req, res) {
  try{
  payement = req.body.payement;
  idTable = req.body.idTable;
  let values = [[payement],[idTable]];
  var rechsql = "update commandes set payement=? where idTable=?";

  db.query(rechsql,values, function (err, result, fields) { 
    if (err) {throw err;}else{
      res.send(JSON.stringify('done'));
     }
})
}catch(e){
  console.log(e);
}
});


app.post('/ajoutNotationPlat',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/ajoutNotationPlat',jsonParser, function (req, res) {
  try{
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
}catch(e){
  console.log(e);
}
});



app.post('/modifPlat',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/modifPlat',jsonParser, function (req, res) {
  try{
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
}catch(e){
  console.log(e);
}
});



app.post('/deletePlat',jsonParser, function (req, res,next) {

  if(req.body.password=='4A1cDm$12$'){
    next();
  }else{
    res.send(JSON.stringify('not allowed'));
  }

})
app.post('/deletePlat',jsonParser, function (req, res) {
  try{
  idPlat = req.body.idPlat;
  idRestaurant = req.body.idRestaurant;
  
  let values = [[idPlat]];
  var rechsql = "delete from notationPlat where idPlat=?";
  db.query(rechsql,values, function (err, result, fields) { 
    if (err) {throw err;}else{
      let values2=[[idPlat],[idRestaurant]]
      let rechsql2='delete from plats where idPlat = ? and idRestaurant= ?';
      db.query(rechsql2,values2, function (err2, result2, fields2) { 
        if (err2) {res.send(JSON.stringify('commande'));}else{
          res.send(JSON.stringify('done'));
         }
    })
     }
})
}catch(e){
  console.log(e);
}
});



/*
app.post('/image',upload.single('file'), function (req, res) {
  let file = req.file;
  
//fs.writeFile(file.originalname, file);
})
*/
app.get('/image2', function (req, res) {
  try{
  let idPlat = req.query['idPlat'];
  let values=[[idPlat]]
  var rechsql = 'select image from plats where idPlat= ?';
  db.query(rechsql, values,function (err, result, fields) {
    if (err) {throw err;}else{
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
}catch(e){
  console.log(e);
}
});

app.listen(process.env.PORT || 3001, function () {
  console.log('listening on port 3001!');
});