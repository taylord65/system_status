import React, { Component } from 'react';
import './css/App.css';
import Clock from './components/Clock';
import logo from './images/logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} alt="Akira Logo"/>
        </div>

        <Clock/>

      </div>
    );
  }
}

export default App;
