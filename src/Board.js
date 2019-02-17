import React, { Component } from 'react';
import wheat from './images/wheat.png';
import ore from './images/ore.png';
import wood from './images/wood.png';
import sheep from './images/sheep.png';
import brick from './images/brick.png';

class Board extends Component {

  constructor(props) {
    super(props);
    this.tile_offset = 0.22 * this.props.tile_height;
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")


    //TESTING CODE. should do this programatically
    const ore_img = this.refs.ore_tile
    ore_img.onload = () => {
      ctx.drawImage(ore_img, 0, 0, this.props.tile_width, this.props.tile_height);
    }

    const wheat_img = this.refs.wheat_tile
    wheat_img.onload = () => {
      ctx.drawImage(wheat_img, this.props.tile_width, 0, this.props.tile_width, this.props.tile_height)
    }

    const wood_img = this.refs.wood_tile
    wood_img.onload = () => {
      ctx.drawImage(wood_img, this.props.tile_width / 2, this.props.tile_height - this.tile_offset, this.props.tile_width, this.props.tile_height)
    }

    const brick_img = this.refs.brick_tile
    brick_img.onload = () => {
      ctx.drawImage(brick_img, this.props.tile_width * 3 / 2, this.props.tile_height - this.tile_offset, this.props.tile_width, this.props.tile_height)
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
      </div>
    );
  }
}

export default Board;
