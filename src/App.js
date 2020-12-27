import React, { Component }  from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import Birds from "./components/Birds";
import Header from "./components/Header";
import Footer from "./components/Footer";

import About from "./pages/Home/About"
import Work from "./pages/Home/Work"
import Contact from "./pages/Home/Contact"

import "./App.css";

class App extends Component {
  render() {
    return (
      // <Router>
      //   <Route exact path="/" component={Home} />
      //   <Route exact path="/hello" component={Hello} />
      // </Router>

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

