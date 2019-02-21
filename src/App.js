import React, { Component } from 'react';
import Board from './Board';
import ControlArea from './ControlArea';
import './App.css';

const liveServerURL = 'https://opencatanserver.herokuapp.com/';
const devServerURL = 'http://127.0.0.1:5000/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {},
      shouldUseLiveServer: true,
    }
  }

  serverURL() {
    return this.state.shouldUseLiveServer ? liveServerURL : devServerURL;
  }

  handleInputChange(e) {
    this.setState({shouldUseLiveServer: e.target.checked});
  }

  loadData() {
    fetch(this.serverURL())
      .then(response => response.json()).then((data) => {
        console.log(data);
        this.setState({ game: data });
      }).catch((error) => {
        this.setState({ board: {"foo": "bar"} });
        console.log('Error in fetching data', error);
      });
  }

  componentDidMount() {
    this.loadData();
  }

  generateNewBoard(min, max) {
    fetch(this.serverURL() + "generate/" + min + "/" + max)
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
        <Board tile_width={150} tile_height={174} game_state={this.state.game}/>
        <ControlArea game_state={this.state.game} onGenerateNewBoard={(min, max) => this.generateNewBoard(min, max)}/>

        <label>Use live server: </label>
        <input name="Use live server" type="checkbox" checked={this.state.shouldUseLiveServer} onChange={(e) => this.handleInputChange(e)} />
        <button onClick={() => this.loadData()}>Reload data</button>
      </div>
    );
  }
}

export default App;
