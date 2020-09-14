import React from 'react';
import cash_symbol from './assets/cash_symbol.png';
import Main from './components/MainStage.js'
import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={cash_symbol} className="App-logo" alt="logo" />
      </header>
      <main>
        <Main />
      </main>
      <footer>
        <p>
          Designed & Built by{' '}
          <span>
            <a href="/localhost:5000">Haja Childs.</a>
          </span>
          Copyright 2020.
        </p>
      </footer>
    </div>
  );
}

export default App;
