import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { navItems } from './data';

import './Navigation.css';

class Navigation extends Component {
  renderLinks() {
    return navItems.map((item) => {
      return (
        <li key={item.path} className="nav__item">
          <Link to={item.path} className="nav__link">{item.title}</Link>
        </li>
      );
    });
  };

  render() {
    return (
      <nav className="nav">
        <ul className="nav__list">
          { this.renderLinks() }
        </ul>
      </nav>
    )
  }
}


export default Navigation;
