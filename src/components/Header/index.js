import React from 'react'
import { Link } from "react-router-dom";
import Navigation from "components/Navigation";

import './Header.css'

const Header = () => (
  <header className="header">
    <div className="parallax">
      <div className="weshatch-is-great">
        <h1 className="h1">Wes Hatch</h1>
        <h2 className="h2">front-end web dev</h2>
      </div>
    </div>

    <Navigation />

  </header>
);

export default Header;
