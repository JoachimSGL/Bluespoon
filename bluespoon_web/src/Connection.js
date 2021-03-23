import './Connection.css';
import React from 'react';
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
      fetch('http://192.168.0.8:3001/reconnexionRestaurant?nom='+this.state.nom+'&&password='+this.state.pass, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        }
      }).then(response => response.json())
      .then((json) => {
      console.log(json);
      if(json!=='pas autorisé' && json!=='no'){
        //this.storeToken(json);
        localStorage.setItem('id', json);
        this.props.history.push("/Acceuil");
      }else{

      }
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