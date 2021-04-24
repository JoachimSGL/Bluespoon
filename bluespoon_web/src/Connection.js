import './Connection.css';
import React from 'react';
import bcrypt from 'bcryptjs';
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
        t.props.history.push("/Acceuil");
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
    <div className="container">
        
      <div className="rect">
      <div className='containerInput'>
      <input placeholder='nom du restaurant' className='inputText' onChange={this.onChangeNom} value={this.state.nom}/><br/>
      </div>
      <div className='containerInput'>
      <input placeholder='password' className='inputText' onChange={this.onChangePass} value={this.state.pass}/><br/>
      </div>
        
    
          <button className='but' onClick={this.send}>se connecter</button>
      
      </div>
      
    </div>
  );
    }
    
}


export default Connection;