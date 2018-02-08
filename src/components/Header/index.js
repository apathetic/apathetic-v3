import React from 'react'
import { Link } from "react-router-dom";
import Navigation from "components/Navigation";

import './Header.css'



// const title = document.querySelector("h1.title");
// const speed = 0.2;
// title.style.transform = "translateY( calc( var(--scrollparallax) * 1px ) )";

// window.addEventListener("scroll", function() {
//   title.style.setProperty(
//     "--scrollparallax",
//     (document.body.scrollTop || document.documentElement.scrollTop) * speed
//   );
// });


    // title {
    //   opacity: calc( 1 - calc(var(--scroll-amount) * 0.002));
    //   transform: translateY(calc(var(--scroll-amount) * var(--multiplier) * 1px ));
    //   will-change: transform;



const Header = () => (
  <header className="header">
    <div className="scrolly">
      <Link to="/"> </Link>
      <h1 className="h1">Wes Hatch</h1>
      <h2 className="h2">front-end web dev</h2>
    </div>
    <div className="container">
      <Navigation />
    </div>
  </header>
);

export default Header;
