import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Gallery.css';


class Gallery extends Component {
  renderSites() {    
    return this.props.site.list
      .sort((a, b) => b.year - a.year)
      .map((item, index) => {
        return (
          <li className="gallery__item" key={"site-"+index}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {item.tech && 
              <p>
              {item.tech.map((t, i) => 
                <span key={"tech-"+i}>{t}</span>
              )}
              </p>
            }
          </li>
        )
      });
  }

  renderLogos() {
    return this.props.logos.map((l, i) => {
      const logo = require(`../../assets/icons/${l}`);
      return (
        <li className="grid-item" key={"logo="+i}>
          <img className={"icon"+ (i%2 ? " icon--wide" : "")} src={ logo } alt="" />
        </li>
      );
      
      // return (
      //   <li className="grid-item" key={"logo="+i}>
      //     <Logo />
      //   </li>
      // );
    });
  }

  render() {
    return (
      // <ul className="gallery">{this.renderSites()}</ul>
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
