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

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);

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
    }
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width="800" height="600" style={{border:"1px solid #000000"}} />
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
