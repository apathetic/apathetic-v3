import React, { Component } from "react";
import Gallery from "components/Gallery";
import "./Work.css";

class Work extends Component {

  render() {
    return (
      <div className="work container">
        <Gallery></Gallery>
      </div>
    )
  }
}

export default Work;