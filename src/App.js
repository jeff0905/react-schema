import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Basic from './layout/basic';
import Schema from './pages/schema';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Basic>
          <Schema />
        </Basic>
      </div>
    );
  }
}

export default App;
