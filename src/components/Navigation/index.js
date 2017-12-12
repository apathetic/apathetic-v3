import React, { Component } from 'react';
import { navItems } from './data';

// import * as siteActions from 'store/actions/site';
// import './Gallery.css';

class Nav extends Component {
  renderLinks() {
    return navItems.map((item) => {
      return (
        <li key={item.path}>
          {item.title}
        </li>
      );
    });
  };

  render() {
    return (
      <nav>
        <ul>
          { this.renderLinks() }
        </ul>
      </nav>
    )
  }
}


export default Nav;
