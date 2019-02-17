import React, { Component } from 'react';
import wheat from './images/wheat.png';
import ore from './images/ore.png';
import wood from './images/wood.png';
import sheep from './images/sheep.png';
import brick from './images/brick.png';
import desert from './images/desert.png';
import water from './images/water.png';

import imgNum2 from './images/img_num_02.png';
import imgNum3 from './images/img_num_03.png';
import imgNum4 from './images/img_num_04.png';
import imgNum5 from './images/img_num_05.png';
import imgNum6 from './images/img_num_06.png';
import imgNum8 from './images/img_num_08.png';
import imgNum9 from './images/img_num_09.png';
import imgNum10 from './images/img_num_10.png';
import imgNum11 from './images/img_num_11.png';
import imgNum12 from './images/img_num_12.png';

import ocean from './images/oceanNew.gif';

class Board extends Component {

  constructor(props) {
    super(props);
    this.tile_offset = 0.22 * this.props.tile_height;
    this.number_tile_width = 0.4 * this.props.tile_width;
    this.number_tile_height = 0.94 * this.number_tile_width;
    this.state = {"mouseDownInCanvas": false,
                  "canvasMouseX": 0,
                  "canvasMouseY": 0,
                  "scale": 1};
  }

  componentDidMount() {
    this.imgs = {
      "ore": this.refs.ore_tile,
      "wheat": this.refs.wheat_tile,
      "wood": this.refs.wood_tile,
      "brick": this.refs.brick_tile,
      "sheep": this.refs.sheep_tile,
      "desert": this.refs.desert_tile,
      "water": this.refs.water_tile,

      "ocean": this.refs.ocean,

      "num2": this.refs.imgNum2,
      "num3": this.refs.imgNum3,
      "num4": this.refs.imgNum4,
      "num5": this.refs.imgNum5,
      "num6": this.refs.imgNum6,
      "num8": this.refs.imgNum8,
      "num9": this.refs.imgNum9,
      "num10": this.refs.imgNum10,
      "num11": this.refs.imgNum11,
      "num12": this.refs.imgNum12,
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


    //draw background
    const ptrn = context.createPattern(this.imgs['ocean'], 'repeat'); // Create a pattern with this image, and set it to "repeat".
    context.fillStyle = ptrn;
    context.fillRect(0, 0, canvas.width, canvas.height); // context.fillRect(x, y, width, height);

    context.setTransform(oldTransform);

    //draw tiles
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

    if (tile && tile.resource_type && this.imgs[tile.resource_type] && tile.resource_number) {
      const img = this.imgs[tile.resource_type];
      context.drawImage(img, x, y, this.props.tile_width, this.props.tile_height);

      if (tile.resource_number !== 7) {
        const imgNumber = this.imgs["num" + tile.resource_number];
        const cx = x + this.props.tile_width / 2 - this.number_tile_width / 2;
        const cy = y + this.props.tile_height / 2 - this.number_tile_height / 2;
        context.drawImage(imgNumber, cx, cy, this.number_tile_width, this.number_tile_width);
      }
    }
  }

  zoom(scaleUpdate) {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    context.scale(scaleUpdate, scaleUpdate);
    const scale = this.state.scale * scaleUpdate;
    this.setState({scale});
    this.updateCanvas();
  }

  move(x, y) {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    context.translate(x, y);
    this.updateCanvas();
  }

  onCanvasMouseDown(e) {
    this.setState( {"mouseDownInCanvas": true,
                    "canvasMouseX": e.pageX,
                    "canvasMouseY": e.pageY} );
  }

  onCanvasMouseMove(e) {
    if (this.state.mouseDownInCanvas) {
      const diffX = (e.pageX - this.state.canvasMouseX) / this.state.scale;
      const diffY = (e.pageY - this.state.canvasMouseY) / this.state.scale;
      this.move(diffX, diffY);
      this.setState( {"canvasMouseX": e.pageX,
                      "canvasMouseY": e.pageY} );
    }

  }

  onCanvasMouseEnter(e) {
    if (e.buttons === 0) {
      this.setState( {"mouseDownInCanvas": false});
    }
  }

  onCanvasMouseUp(e) {
    this.setState( {"mouseDownInCanvas": false} );
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width="800" height="600" style={{border:"1px solid #000000"}}
          onMouseDown={(e) => this.onCanvasMouseDown(e)}
          onMouseMove={(e) => this.onCanvasMouseMove(e)}
          onMouseUp={(e) => this.onCanvasMouseUp(e)}
          onMouseEnter={(e) => this.onCanvasMouseEnter(e)}/>
        <button onClick={() => this.zoom(1.1111111)}>
          Zoom In
        </button>
        <button onClick={() => this.zoom(0.9)}>
          Zoom Out
        </button>


        <img ref="wheat_tile" alt="" src={wheat} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="ore_tile" alt="" src={ore} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="wood_tile" alt="" src={wood} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="sheep_tile" alt="" src={sheep} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="brick_tile" alt="" src={brick} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="desert_tile" alt="" src={desert} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="water_tile" alt="" src={water} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>

        <img ref="imgNum2" alt="" src={imgNum2} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="imgNum3" alt="" src={imgNum3} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="imgNum4" alt="" src={imgNum4} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="imgNum5" alt="" src={imgNum5} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="imgNum6" alt="" src={imgNum6} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="imgNum8" alt="" src={imgNum8} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="imgNum9" alt="" src={imgNum9} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="imgNum10" alt="" src={imgNum10} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="imgNum11" alt="" src={imgNum11} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
        <img ref="imgNum12" alt="" src={imgNum12} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>

        <img ref="ocean" alt="" src={ocean} height="0" width="0" className="hidden" onLoad={() => this.updateCanvas()}/>
      </div>
    );
  }
}

export default Board;
