import React from 'react'
import Navigation from "components/Navigation";

import './Header.css'

const Header = () => {
  const toggle = () => {
    document.body.classList.toggle("inversion");
  }

  return (
    <header className="header">
      <div className="parallax">
        <div className="weshatch-is-great">
          <h1 className="h1" onClick={toggle}>Wes Hatch</h1>
          <h2 className="h2 heavy">front-end developer</h2>
        </div>
      </div>

      <Navigation />

    </header>
  )
};

export default Header;
