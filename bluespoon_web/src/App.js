import React, { Component } from 'react';
import Home from './Home'
import { BrowserRouter , Route } from 'react-router-dom'
import Navbar from './Navbar'
import Connection from './Connection'
import Acceuil from './Acceuil'

class App extends Component {
render() {
  return (
    <BrowserRouter >
     <div className="App">
     
      
     
     </div>
     <Route path='/' exact component={Navbar}></Route>
     <Route path='/Home' component={Home}></Route>
     <Route path='/Connection' component={Connection}></Route>
     <Route path='/Acceuil' component={Acceuil}></Route>
    </BrowserRouter>
   );
  }
  }

  export default App;