import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Tile.css';

class Tile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      style: {}
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    const dimensions = ReactDOM
     .findDOMNode(this.refs['expander'])
     .getBoundingClientRect();

    // console.log(dimensions);
    const style = {
      position: 'fixed',
      left: dimensions.x,
      // top: dimensions.y,
      width: dimensions.width,
      color: 'blue'
    };

    this.setState(prevState => ({
      isActive: !prevState.isActive,
      style: !prevState.isActive ? style : {}
    }));
  }

  render() {
    const active = this.state.isActive ? 'active' : '';

    return (
      <div
          ref='expander'
          className={['site', active].join(' ')}
          style={this.state.style}
          onClick={this.toggle}>
        <h3>{this.props.data.title}</h3>
        <p>{this.props.data.description}</p>
        date
        URL
        keywords
      </div>
    )
  }
}

export default Tile;



// function Tile(props) {
//   return (
//     <div className='site'>
//       <h3>{props.data.title}</h3>
//       <p>{props.data.description}</p>
//       date
//       URL
//       keywords
//     </div>
//   )
// }
