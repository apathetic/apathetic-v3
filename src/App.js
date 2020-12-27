import React, { Component }  from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import Birds from "./components/Birds";
import Header from "./components/Header";
import Footer from "./components/Footer";

import About from "./pages/About"
import Work from "./pages/Work"
import Contact from "./pages/Contact"

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Birds />

        <Header></Header>

        <main className="content" ref={(main) => { this.main = main; }}>
          <span className="more"></span>
          <About />
          <Work />
          <Contact />
        </main>

        <Footer />
      </>
    );
  }
}

export default App;

