import React, { Component } from 'react';
import wheat from './images/wheat.png';
import ore from './images/ore.png';
import wood from './images/wood.png';
import sheep from './images/sheep.png';
import brick from './images/brick.png';
import desert from './images/desert.png';

class Board extends Component {

  constructor(props) {
    super(props);
    this.tile_offset = 0.22 * this.props.tile_height;
  }

  componentDidMount() {
    if (!this.refs.ore_tile || !this.refs.wheat_tile || !this.refs.wood_tile || !this.refs.brick_tile || !this.refs.sheep_tile || !this.refs.desert_tile) {
      console.log("something went wrong");
    }
    this.imgs = {
      "ore": this.refs.ore_tile,
      "wheat": this.refs.wheat_tile,
      "wood": this.refs.wood_tile,
      "brick": this.refs.brick_tile,
      "sheep": this.refs.sheep_tile,
      "desert": this.refs.desert_tile
    }
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");

    //clear canvas
    const oldTransform = context.getTransform();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.setTransform(oldTransform);

    if (this.props.game_state.board) {
      this.props.game_state.board.forEach( (tile_row, row) => {
        tile_row.forEach( (tile, column) => {
          this.drawTile(context, row, column, tile);
        });
      });
    }
  }

  drawTile(context, row, column, tile) {
    const x = this.props.tile_width * column + this.props.tile_width * 0.5 * (row % 2 === 1);
    const y = (this.props.tile_height - this.tile_offset) * row;

    if (tile && tile.resource_type && this.imgs[tile.resource_type]) {
      const img = this.imgs[tile.resource_type];
      context.drawImage(img, x, y, this.props.tile_width, this.props.tile_height);
      context.font = "30px Arial";
      const cx = x + this.props.tile_width / 2;
      const cy = y + this.props.tile_height / 2;

      //draw circle
      context.beginPath();
      context.arc(cx, cy, 20, 0, 2 * Math.PI);
      context.fillStyle = "white";
      context.fill();

      //draw number
      context.fillStyle = "black";
      context.fillText(tile.resource_number, cx - 8, cy + 10);
    }
  }

  move(x, y) {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    context.translate(x, y);
    this.updateCanvas();
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width="800" height="600" style={{border:"1px solid #000000"}} />
        <button onClick={() => this.move(-10, 0)}>
          Left
        </button>
        <button onClick={() => this.move(10, 0)}>
          Right
        </button>
        <button onClick={() => this.move(0, -10)}>
          Up
        </button>
        <button onClick={() => this.move(0, 10)}>
          Down
        </button>

        <img ref="wheat_tile" alt="" src={wheat} className="hidden"/>
        <img ref="ore_tile" alt="" src={ore} className="hidden"/>
        <img ref="wood_tile" alt="" src={wood} className="hidden"/>
        <img ref="sheep_tile" alt="" src={sheep} className="hidden"/>
        <img ref="brick_tile" alt="" src={brick} className="hidden"/>
        <img ref="desert_tile" alt="" src={desert} className="hidden"/>
      </div>
    );
  }
}

export default Board;
