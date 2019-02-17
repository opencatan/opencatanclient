import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
    }
  }

  componentDidMount() {
    fetch('endpoint')
      .then(response => response.json()).then((data) => {
        this.setState({ board: data });
      }).catch((error) => {
        this.setState({ board: {"foo": "bar"} });
        console.log('Error in fetching data', error);
      });
  }

  render() {
    return (
      <div className="App">
        <p>Hello, World</p>
        <Board tile_width={100} tile_height={116} board={this.state.board}/>
      </div>
    );
  }
}

export default App;
