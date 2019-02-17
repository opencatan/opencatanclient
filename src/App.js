import React, { Component } from 'react';
import Board from './Board';
import ControlArea from './ControlArea';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {},
    }
  }

  componentDidMount() {
    fetch('https://opencatanserver.herokuapp.com/')
      .then(response => response.json()).then((data) => {
        console.log(data);
        this.setState({ game: data });
      }).catch((error) => {
        this.setState({ board: {"foo": "bar"} });
        console.log('Error in fetching data', error);
      });
  }

  generateNewBoard() {
    fetch("https://opencatanserver.herokuapp.com/generate/3/5")
      .then(response => response.json()).then((data) => {
        console.log(data);
        this.setState({ game: data });
      }).catch((error) => {
        this.setState({ board: {"foo": "bar"} });
        console.log('Error in fetching new data', error);
      });
  }

  render() {
    return (
      <div className="App">
        <p>Hello, World</p>
        <Board tile_width={150} tile_height={174} game_state={this.state.game}/>
        <ControlArea game_state={this.state.game} onGenerateNewBoard={(e) => this.generateNewBoard()}/>
      </div>
    );
  }
}

export default App;
