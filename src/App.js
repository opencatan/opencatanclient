import React, { Component } from 'react';
import Board from './Board';
import ControlArea from './ControlArea';
import './App.css';

const liveServerURL = 'https://opencatanserver.herokuapp.com/';
const devServerURL = 'http://127.0.0.1:5000/';

const debugSettlements = [
  {"location": [0, 1, 0], "owner": "A", "settlement": 1},
  {"location": [0, 1, 1], "owner": "A", "settlement": 1},
  {"location": [0, 1, 2], "owner": "A", "settlement": 1},
  {"location": [0, 1, 3], "owner": "A", "settlement": 1},
  {"location": [0, 1, 4], "owner": "A", "settlement": 1},
  {"location": [0, 1, 5], "owner": "A", "settlement": 1},
];

const debugRoads = [
  {"owner": "A", "type": "road", "v1":[0, 1, 0], "v2":[0, 1, 1]},
  {"owner": "A", "type": "road", "v1":[0, 1, 1], "v2":[0, 1, 2]},
  {"owner": "A", "type": "road", "v1":[0, 1, 2], "v2":[0, 1, 3]},
  {"owner": "A", "type": "road", "v1":[0, 1, 3], "v2":[0, 1, 4]},
  {"owner": "A", "type": "road", "v1":[0, 1, 4], "v2":[0, 1, 5]},
  {"owner": "A", "type": "road", "v1":[0, 1, 5], "v2":[0, 1, 0]},
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {},
      shouldUseLiveServer: false,
      debug: false,
    }
  }

  serverURL() {
    console.log(this.state.shouldUseLiveServer);
    return this.state.shouldUseLiveServer ? liveServerURL : devServerURL;
  }

  handleInputChange(field, e) {
    let state = [];
    state[field] = e.target.checked;
    this.setState(state);
  }

  loadData() {
    fetch(this.serverURL())
      .then(response => response.json()).then((data) => {
        if (this.state.debug) {
          data.settlements = debugSettlements;
          data.roads = debugRoads;
        }
        console.log(data);
        this.setState({ game: data });
      }).catch((error) => {
        this.setState({ board: {"foo": "bar"} });
        console.log('Error in fetching data', error);
      });
  }

  componentDidMount() {
    this.loadData();
    // setInterval(() => {this.loadData()}, 2000); //poll every 2 seconds
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

  updateItemFields(row, column, itemIndex, itemType) {
    this.refs.i.value = row;
    this.refs.j.value = column;
    this.refs.k.value = itemIndex;
    this.refs.object_type.value = itemType;
  }

  render() {
    return (
      <div className="App">
        <Board
          tile_width={150}
          tile_height={174}
          game_state={this.state.game}
          on_item_update={(i, j, k, type) => this.updateItemFields(i, j, k, type)}
          debug={this.state.debug}/>
        <ControlArea game_state={this.state.game} onGenerateNewBoard={(min, max) => this.generateNewBoard(min, max)}/>

        <label>Use live server: </label>
        <input name="Use live server" type="checkbox" checked={this.state.shouldUseLiveServer} onChange={(e) => this.handleInputChange('shouldUseLiveServer', e)} />
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
        <br />

        <label>Debug: </label>
        <input name="Debug" type="checkbox" checked={this.state.debug} onChange={(e) => this.handleInputChange('debug', e)} />
      </div>
    );
  }
}

export default App;
