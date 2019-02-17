import React, { Component } from 'react';

class ControlArea extends Component {

  render() {
    return (
      <div>
        <button onClick={(e) => this.props.onGenerateNewBoard()}>
          Generate New Board
        </button>
      </div>
    )
  }

}

export default ControlArea;
