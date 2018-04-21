import React, { Component } from "react";
import Gallery from "../../components/Gallery";
import "./Work.css";

class Work extends Component {
  render() {
    return (
      <section className="work section">
        <div className="container">
          <h2>Selected Work</h2>
          <Gallery></Gallery>
        </div>
      </section>
    )
  }
}

export default Work;
