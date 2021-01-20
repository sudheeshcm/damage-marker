import logo from './logo.svg';
import './App.css';

import Demo from "./demo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1>Damage selector</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        
        <Demo />
      </header>
    </div>
  );
}

export default App;
