import './Home.css';
import React from 'react';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      nom:'',
      add:'',
      pass:'',
      pass2:'',
      };
      this.send=this.send.bind(this);
      this.onChangeNom=this.onChangeNom.bind(this);
      this.onChangeAdd=this.onChangeAdd.bind(this);
      this.onChangePass=this.onChangePass.bind(this);
      this.onChangePass2=this.onChangePass2.bind(this);
}
     send(){
      fetch('http://192.168.0.8:3001/inscriptionRestaurant', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
          nom: this.state.nom,
          add:this.state.add,
          pass:this.state.pass
      })
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
    onChangeAdd(txt){
      this.setState({add:txt.target.value});
    }
    onChangePass(txt){
      this.setState({pass:txt.target.value});
    }
    onChangePass2(txt){
      this.setState({pass2:txt.target.value});
    }
    render(){
  return (
    <div className="container">
        
      <div className="rect">
      <div className='containerInput'>
    <input placeholder='nom du restaurant' className='inputText' onChange={this.onChangeNom} value={this.state.nom}/><br/>
    </div>
      <div className='containerInput'>
      <input placeholder='adresse' className='inputText' onChange={this.onChangeAdd} value={this.state.add}/><br/>
      </div>
      
      
      <div className='containerInput'>
      <input placeholder='password' className='inputText'onChange={this.onChangePass} value={this.state.pass}/><br/>
      </div>
      <div className='containerInput'>
      <input placeholder='retype password' className='inputText' onChange={this.onChangePass2} value={this.state.pass2}/><br/>
    </div>
    
    
          <button className='but' onClick={this.send}>submit</button>
      
      </div>
      
    </div>
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