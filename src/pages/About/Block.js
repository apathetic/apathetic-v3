import React, { Component } from 'react';
import { Scrollify, fx } from '@apatheticwes/scrollify';

class Block extends Component {
  scrollify(el, i) {
    const delay = (i%3) * 0.1;

    new Scrollify(el).addScene({
      start: 0, // + delay,
      duration: 0.3,
      effects: [{
        fn: function(p) {
          const q = (1 - p);
          // const rotate = `rotate3d(0.7, 1, 0.1, -${p}deg)`;
          // const trapezoid = `perspective(${progress * 100 + 100}px) translateX(${p * -40}px) rotateY(-${p * 10}deg)`;    
          const trapezoid = `perspective(${p * 100 + 100}px) translateY(${q * 50}px) rotateX(${q * 10}deg)`;    

          this.element.style.transform = trapezoid; // rotate;
        }
      }, {
        fn: fx.fade,
        options: {
          to: 1,
          from: 0
        }
      }]
    });
  }

  render() {
    const items = this.props.items;    

    return <div className="block">
        <h3 ref={title => { this.title = title }}>
          {this.props.title}
        </h3>
        <ul className="bullets" ref={(el) => { this.scrollify(el); }}>
          {Object.keys(items).map(function(r, i) {
            return (
              <li key={"item-" + i}>
                <a href={items[r]} target="_blank" rel="noopener noreferrer">
                  {r}
                </a>
              </li>
            );
          })}
        </ul>
      </div>;
  }
}

export default Block;
