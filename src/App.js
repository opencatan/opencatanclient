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
      shouldUseLiveServer: false,
    }
  }

  serverURL() {
    console.log(this.state.shouldUseLiveServer);
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
    setInterval(() => {this.loadData()}, 2000); //poll every 2 seconds
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

  place() {
    const object = this.refs.object_type.value;
    const player = this.refs.player.value;
    const i = this.refs.i.value;
    const j = this.refs.j.value;
    const k = this.refs.k.value;

    const url = new URL(this.serverURL() + "place/" + object + "/" + i + "/" + j + "/" + k);
    url.searchParams.append("player", player);

    fetch(url)
      .then(response => response.text()).then( data => {
        console.log("response: ", data);
        if (data) {
          alert(data);
        }
        this.loadData();
      });
  }

  hitEndpoint(endpoint) {
    const url = new URL(this.serverURL() + endpoint);
    const player = this.refs.player.value;
    url.searchParams.append("player", player);
    fetch(url)
      .then(response => response.text()).then( data => {
        if (data) {
          alert(data);
        }
        this.loadData();
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

        <br/>
        <h1>Place Object</h1>
        <label>Object type: </label>
        <select ref="object_type">
          <option value="settlement">Settlement</option>
          <option value="city">City</option>
          <option value="road">Road</option>
        </select>
        <br/>
        <label>Player: </label>
        <input ref="player" type="text"/>
        <br/>
        <label>Location: </label>
        <input ref="i" type="text"/>
        <input ref="j" type="text"/>
        <input ref="k" type="text"/>
        <br/>
        <button onClick={() => this.place()}>Go</button>
        <br />

        <button onClick={() => this.hitEndpoint("roll_dice")}>Roll Dice</button>
        <button onClick={() => this.hitEndpoint("end_turn")}>End Turn</button>
      </div>
    );
  }
}

export default App;
