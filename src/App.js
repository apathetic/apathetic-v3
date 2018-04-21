import React, { Component }  from "react";

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
      <div>
        <Birds />

        <Header></Header>

        <main className="content" ref={(main) => { this.main = main; }}>
          <About />
          <Work />
          <Contact />
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;

