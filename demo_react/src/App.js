import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloComponent from './components/hello-component';
import ButtonComponent from './components/button-component';

function App() {

  function goToAbout(e) {
    e.preventDefault();
    alert('Click');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <HelloComponent />

      <button onClick={goToAbout}>Go to about</button>

      <ButtonComponent />

    </div>
  );
}

export default App;
