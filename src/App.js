import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Hello, World</p>
        <Board tile_width={100} tile_height={116}/>
      </div>
    );
  }
}

export default App;
