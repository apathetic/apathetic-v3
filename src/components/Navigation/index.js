import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { navItems } from './data';

import './Navigation.css';

class Navigation extends Component {
  renderLinks() {
    return navItems.map((item) => {
      return (
        <li key={item.path} className="Navigation-item">
          <Link to={item.path} className="Navigation-link">{item.title}</Link>
        </li>
      );
    });
  };

  render() {
    return (
      <nav className="Navigation">
        <ul className="Navigation-list">
          { this.renderLinks() }
        </ul>
      </nav>
    )
  }
}


export default Navigation;
