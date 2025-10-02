import logo from './logo.svg';
import Component from './Components/Component';
import './App.css';
import TituloA from './Components/TituloA';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <TituloA/>
        <p>
        No le creas al tú de ese día        
        </p>
        <Component/>
        
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
