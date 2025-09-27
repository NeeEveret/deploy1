import logo from './logo.svg';
import Component from './Component';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HOLA ME GUSTA EL DINERO<br/>
          Edit <code>src/App.js</code> and save to reload.
        
        </p>
        <Component/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
