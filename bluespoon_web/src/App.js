import React, { Component } from 'react';
import Home from './Home'
import { BrowserRouter , Route } from 'react-router-dom'
import Navbar from './Navbar'
import Connection from './Connection'
import Accueil from './Accueil'
import CompteServeur from './CompteServeur'

class App extends Component {
render() {
  return (
    <BrowserRouter >
     <div className="App">
     
      
     
     </div>
     <Route path='/' exact component={Navbar}></Route>
     <Route path='/Home' component={Home}></Route>
     <Route path='/Connection' component={Connection}></Route>
     <Route path='/Accueil' component={Accueil}></Route>
     <Route path='/CompteServeur' component={CompteServeur}></Route>
    </BrowserRouter>
   );
  }
  }

  export default App;