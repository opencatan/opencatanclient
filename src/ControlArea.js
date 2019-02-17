import React, { Component } from 'react';

class ControlArea extends Component {
  constructor(props) {
    super(props);
    this.state = {"name": "",
                  "min": "3",
                  "max": "5"};
  }

  onValueChange(key, e) {
    const newState = {};
    newState[key] = e.target.value;
    this.setState(newState);
  }

  render() {
    let playerResources = [];
    if (this.props.game_state.players) {
      playerResources = this.props.game_state.players.map((player) => {
        if (player.name === this.state.name) {
          return (
            <div key={player.name}>
              <p> {player.name}</p>
              <label>Ore: {player.resources.ore} </label>
              <label>Wheat: {player.resources.wheat} </label>
              <label>Sheep: {player.resources.sheep} </label>
              <label>Brick: {player.resources.brick} </label>
              <label>Wood: {player.resources.wood} </label>
            </div>
          );
        } else {
          let totalResources = 0;
          for (const prop in player.resources) {
            totalResources += parseInt(player.resources[prop]);
          }
          return (
            <div key={player.name}>
              <p> {player.name}</p>
              <label>Cards: {totalResources}</label>
            </div>

          );
        }
      });
    }

    return (
      <div>
        <button onClick={(e) => this.props.onGenerateNewBoard(this.state.min, this.state.max)}>
          Generate New Board
        </button>
        <input type="text" value={this.state.min} onChange={(e) => this.onValueChange("min", e)} />
        <input type="text" value={this.state.max} onChange={(e) => this.onValueChange("max", e)} />
        <br />
        <label>Name: </label>
        <input type="text" value={this.state.name} onChange={(e) => this.onValueChange("name", e)} />
        {playerResources}
      </div>
    )
  }

}

export default ControlArea;
