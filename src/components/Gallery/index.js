import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollify, fx } from "@apatheticwes/scrollify";
import './Gallery.css';

// import { ReactComponent as MCMIcon } from '@/assets/mcm.svg';

class Gallery extends Component {
  scrollify(el, i) {
    const delay = (i%3) * 0.1;
    new Scrollify(el).addScene({
      start: 0.1 + delay,
      duration: 0.3,
      effects: [{
        fn: fx.translateY,
        options: {
          to: 1,
          from: 50
        }
      }, {
        fn: fx.fade,
        options: {
          to: 1,
          from: 0
        }

      // }, {
      //   fn: function(progress) {
      //     const filter = `grayscale(${progress}) contrast(0.5))`;
      //     this.element.style.filter = filter;
      //   }
      }]
    });
  }

  renderLogos() {
    return this.props.logos.map((l, i) => {
      const logo = require(`../../assets/icons/${l}.svg`); // THIS WORKS FOR WEBPACK... BUT NOT SSR

      return (
        <li className="grid-item" key={"logo=" + i}>
          <img
            ref={(el) => { this.scrollify(el, i); }}
            className={"icon" + (i % 2 ? " icon--wide" : "")}
            src={logo}
            // src={`/icons/${l}.svg`}
            alt=""
          />
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="gallery grid">{this.renderLogos()}</ul>
    );
  }
}

const mapStateToProps = (state) => ({
  site: state.sites,
  logos: state.logos.logos
});

export default connect(
  mapStateToProps
)(Gallery);
