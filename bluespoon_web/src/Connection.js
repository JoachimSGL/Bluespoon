
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import bcrypt from 'bcryptjs';
import './css/styles.css'
class Connection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      nom:'',
      pass:'',
      };
      this.send=this.send.bind(this);
      this.onChangeNom=this.onChangeNom.bind(this);
      this.onChangePass=this.onChangePass.bind(this);
}
     send(){
       let t = this;
      fetch('https://bluespoon-app.herokuapp.com/reconnexionRestaurant?nom='+this.state.nom, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
      console.log(json);
      bcrypt.compare(t.state.pass, json[0].passwordRestaurant, function(err, res) {
        // res === true
    
      if(json!=='pas autorisé' && json!=='no' && res){
        localStorage.setItem('id', json[0].id);
        t.props.history.push("/Accueil");
      }else{

      }

    });
    });
      
    }
    onChangeNom(txt){
      this.setState({nom:txt.target.value});
  }
  onChangePass(txt){
    this.setState({pass:txt.target.value});
}
    render(){
  return (
    <body style={{height:1000}}>
        
      

      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Coming Soon </title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <script src="https://use.fontawesome.com/releases/v5.15.3/js/all.js" crossorigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400,400i,600,600i,700,700i,900,900i" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:300,300i,400,400i,700,700i,900,900i" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
    </head>
    <div class="overlay" ></div>
        
      <div class="masthead">
            <div class="masthead-bg"></div>
            <div class="container h-100">
                <div class="row h-100">
                    <div class="col-12 my-auto">
                        <div class="masthead-content text-white py-5 py-md-0">
                            <h1 class="mb-3">Connexion</h1>
                            <p class="mb-5">
                                Veuillez entrer vos informations
                                
                            </p>
                            <div class="input-group input-group-newsletter">
                                <input class="form-control" type="email" placeholder="Nom du restaurant..." aria-label="Nom du restaurant..." aria-describedby="submit-button" onChange={this.onChangeNom} value={this.state.nom}/>
                                
                            </div>
                            <div class="input-group input-group-newsletter">
                                <input class="form-control" type="password" placeholder="Mot de passe" aria-label="Mot de passe" aria-describedby="submit-button" onChange={this.onChangePass} value={this.state.pass}/>
                            </div>
                            <div class="input-group-append"><button class="btn btn-secondary" id="submit-button" type="button" onClick={this.send}>Confirmer</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
        
      
    </body>
  );
    }
    
}


export default Connection;