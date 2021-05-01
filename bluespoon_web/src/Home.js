import './css/styles.css';
import React from 'react';
import bcrypt from 'bcryptjs';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      nom:'',
      add:'',
      long:'',
      lat:'',
      type:'',
      pass:'',
      pass2:'',
      };
      this.send=this.send.bind(this);
      this.onChangeNom=this.onChangeNom.bind(this);
      this.onChangeAdd=this.onChangeAdd.bind(this);
      this.onChangeLong=this.onChangeLong.bind(this);
      this.onChangeLat=this.onChangeLat.bind(this);
      this.onChangeType=this.onChangeType.bind(this);
      this.onChangePass=this.onChangePass.bind(this);
      this.onChangePass2=this.onChangePass2.bind(this);
}
     send(){
       let t = this;
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(t.state.pass, salt, function(err, hash) {
            // Store hash in your password DB.
        
      fetch('https://bluespoon-app.herokuapp.com/inscriptionRestaurant', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          //'mode':'no-cors',
        },
        body: JSON.stringify({
          nom: t.state.nom,
          add:t.state.add,
          long:t.state.long,
          lat:t.state.lat,
          type:t.state.type,
          pass:hash
      })
      }).then(response => response.json())
      .then((json) => {
      console.log(json);
      if(json!=='pas autorisé' && json!=='no'){
        //this.storeToken(json);
        localStorage.setItem('id', json);
        t.props.history.push("/Acceuil");
      }else{

      }
    });
  });
});
    }
    onChangeNom(txt){
      this.setState({nom:txt.target.value});
    }
    onChangeAdd(txt){
      this.setState({add:txt.target.value});
    }
    onChangeLong(txt){
      this.setState({long:txt.target.value});
    }
    onChangeLat(txt){
      this.setState({lat:txt.target.value});
    }
    onChangeType(txt){
      console.log(txt.target.value);
      this.setState({type:txt.target.value});
    }
    onChangePass(txt){
      this.setState({pass:txt.target.value});
    }
    onChangePass2(txt){
      this.setState({pass2:txt.target.value});
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
                            <h1 class="mb-3">Inscription</h1>
                            <p class="mb-5">
                                Veuillez entrer les informations relatives à votre restaurant
                                  <br/>
                                  Gardez bien en mémoire votre mot de passe, il servira lors de l'inscriptions de vos serveur sur l'application mobile
                                
                            </p>
                            
                            <div class="input-group input-group-newsletter">
                                <input class="form-control" type="email" placeholder="Nom du restaurant..." aria-label="Nom du restaurant..." aria-describedby="submit-button" onChange={this.onChangeNom} value={this.state.nom}/>
                                
                            </div>
                            <div class="input-group input-group-newsletter">
                                <input class="form-control" type="email" placeholder="Adresse" aria-label="Adresse" aria-describedby="submit-button" onChange={this.onChangeAdd} value={this.state.add}/>
                            </div>
                            <div class="input-group input-group-newsletter">
                                <input class="form-control" type="email" placeholder="Longitude" aria-label="Longitude" aria-describedby="submit-button" onChange={this.onChangeLong} value={this.state.long}/>
                            </div>
                            <div class="input-group input-group-newsletter">
                                <input class="form-control" type="email" placeholder="Latitude" aria-label="Latitude" aria-describedby="submit-button"  onChange={this.onChangeLat} value={this.state.lat}/>
                            </div>

                            <select name="pets" id="pet-select" onChange={this.onChangeType}>
                                <option value="">--Selectionnez le type de votre restaurant--</option>
                                <option value="Fast Food">Fast Food</option>
                                <option value="Jap">Jap</option>
                                <option value="Chinois">Chinois</option>
                                <option value="Gastronomique">Gastronomique</option>
                                <option value="Italien">Italien</option>
                                <option value="Grec">Grec</option>
                            </select> 




                            <div class="input-group input-group-newsletter">
                                <input class="form-control" type="password" placeholder="Mot de passe" aria-label="Mot de passe" aria-describedby="submit-button" onChange={this.onChangePass} value={this.state.pass}/>
                            </div>
                            <div class="input-group input-group-newsletter">
                                <input class="form-control" type="password" placeholder="Retapez le mot de passe" aria-label="Retapez le mot de passe" aria-describedby="submit-button"  onChange={this.onChangePass2} value={this.state.pass2}/>
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

/*
<div className='container'>
      <div className='rect'>
          <form>
        <input type="text" name="name"/><br/>
        <input type="text" name="lastname"/><br/>
        <input type="text" name="resto" className='inputText'/><br/>
        <input type="text" name="password" className='inputText'/><br/>
        </form>
      </div>
    </div>
*/
export default Home;