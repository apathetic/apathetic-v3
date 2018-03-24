import React, { Component } from 'react';
import { Scrollify, fx, easings } from '@apatheticwes/scrollify';

class BlockList extends Component {
  scrollify(el, side) {
    new Scrollify(el).addScene({
      start: 0, // + delay,
      duration: 0.3,
      effects: [{
        fn: fx.translateX,
        easings: easings.easeInCubic,
        options: {
          to: 0,
          from: side === 'left' ? -45 : 75
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

    return (
      <div className="block">
        <h3 ref={title => { this.title = title }}>
          {this.props.title}
        </h3>
        <dl>
        {Object.keys(items).map((r, i) => {
          return (
            <React.Fragment key={'list' + i}>
              <dt ref={(el) => { this.scrollify(el, 'left'); }}>{r}</dt>
              <dd ref={(el) => { this.scrollify(el, 'right'); }}>{items[r]}</dd>
            </React.Fragment>
          );
        })}
        </dl>
      </div>
    );
  }
}

export default BlockList;
