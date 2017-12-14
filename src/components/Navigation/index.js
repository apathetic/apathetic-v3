import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { navItems } from './data';

class Nav extends Component {
  renderLinks() {
    return navItems.map((item) => {
      return (
        <li key={item.path}>
          <Link to={item.path}>{item.title}</Link>
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
