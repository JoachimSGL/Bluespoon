import './App.css';
import { Link} from 'react-router-dom'
function Navbar() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Bluespoon
        </p>
        <div>
            <Link className='App-link' to={"/Home"}>s'inscrire</Link>
        </div>
        <div>
            <Link className='App-link' to={"/Connection"}>se connecter</Link>
        </div>
      </header>
    </div>
  );
}

export default Navbar;