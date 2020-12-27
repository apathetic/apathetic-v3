import React, { Component } from 'react'
import './Home.css';

import Birds from "../../components/Birds";
import About from "./About"
import Work from "./Work"


class Home extends Component {
  render() {
    return (
      <>
        <Birds />

        <main className="content" ref={(main) => { this.main = main; }}>
          <span className="more"></span>
          <About />
          <Work />
        </main>
      </>
    );
  }
}
export default Home;

