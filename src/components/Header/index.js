import React from "react"
import { Scrollify, fx } from "@apatheticwes/scrollify";

import "./Header.css"

const Header = () => {
  const toggle = () => {
    document.documentElement.classList.toggle("inversion");
  }

  const scrollify = (el, i) => {
    new Scrollify(el).addScene({
      start: 0,
      duration: 0.3,
      // easing: easings.easeOutCubic,
      effects: [
        {
          fn: fx.fade,
          options: {
            to: 0,
            from: 1
          }
        },
        {
          fn: fx.translateY,
          options: {
            to: Math.random() * 300 + 200
          }
        },
        {
          fn: fx.rotate,
          options: {
            rad: (Math.random() - 0.5) * Math.PI / -3
          }
        }
      ]
    });
  }

  return (
    <header className="header">
      {/* <nav>xxx</nav> */}
      {/* <div className="parallax"> */}
      <div className="weshatch-is-great">
        <h1 className="h1 font-heavy color-white"
            onClick={toggle}
            ref={(el) => { scrollify(el); }}>
          Wes Hatch
        </h1>
        <h2 className="h2"
            ref={(el) => { scrollify(el); }}>
          front-end developer
        </h2>
      </div>
      {/* </div> */}
    </header>
  )
};

export default Header;
