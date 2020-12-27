import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scrollify, fx } from "@apatheticwes/scrollify";
import './Gallery.css';

// import { ReactComponent as MCMIcon } from '@/assets/icons/mcm.svg';
import { ReactComponent as MCMIcon } from '../../../../assets/icons/mcm.svg';
import { ReactComponent as GoogleIcon } from '../../../../assets/icons/google.svg';
import { ReactComponent as HPIcon } from '../../../../assets/icons/hp.svg';
import { ReactComponent as WalmartIcon } from '../../../../assets/icons/walmart.svg';
import { ReactComponent as NBCIcon } from '../../../../assets/icons/nbc.svg';
import { ReactComponent as nyulangoneIcon } from '../../../../assets/icons/nyulangone.svg';

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

  icons = {
    google: GoogleIcon,
    hp: HPIcon,
    mcm: MCMIcon,
    nbc: NBCIcon,
    nyulangone: nyulangoneIcon,
    walmart: WalmartIcon,
  };

  renderLogos() {
    return this.props.logos.map((l, i) => {
      // const logo = require(`../../assets/icons/${l}.svg`); // THIS WORKS FOR WEBPACK... BUT NOT SSR
      let Icon = this.icons[l] || MCMIcon; // LETS TRY THIS WAY

      return (
        <li
          className="grid-item"
          key={"logo=" + i}
          ref={(el) => { this.scrollify(el, i); }}
        >
          <Icon width="54" height="54" className={"icon" + (i % 2 ? " icon--wide" : "")} />
          {/* <img
            ref={(el) => { this.scrollify(el, i); }}
            className={"icon" + (i % 2 ? " icon--wide" : "")}
            src={logo}
            src={`/icons/${l}.svg`}
            alt=""
          /> */}
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
