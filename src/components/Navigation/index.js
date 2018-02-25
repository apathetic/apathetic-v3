import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "./data";
import { Scroll, Sticky } from "@apatheticwes/stickynav";

import "./Navigation.css";



// when current nav item is clicked, act as a toggle, then:
// filter: invert(84%);

// handles the effect on load
// body.style.filter = "invert( calc( var(--scrollparallax) * 1% ) )";




class Navigation extends Component {
  constructor() {
    super();

    this.state = { path: "" };

    this.jump = () => {
      console.log("OKAY");
      // Scroll();
    };

    this.toggle = (match, location) => {
      const path = location.pathname;

      if (!match) { return false; }
      if (this.state.path === path) {        
        // document.body.classList.toggle("inversion");
      } else {
        // this.setState({ path: path });
      }
    };
  }

  renderLinks() {
    return navItems.map(item => {
      return (
        <li key={item.path} className="nav__item">
          <NavLink 
              to={item.path} 
              isActive={this.toggle} 
              className="nav__link"
          >
            <span onClick={this.jump}>{item.title}</span>
          </NavLink>
        </li>
      );
    });
  }

  render() {
    return (
      <nav
        className="nav"
        ref={nav => { this.nav = nav; }}
      >
        <div className="container container--large">
          <ul className="nav__list">{this.renderLinks()}</ul>
        </div>
      </nav>
    );
  }
}


export default Navigation;
