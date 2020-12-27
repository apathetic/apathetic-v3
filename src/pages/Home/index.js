import React, { Component } from 'react'
import './Home.css';

import Birds from "@/components/Birds";
import Header from "./components/Header";
import Footer from "./components/Footer";

class Home extends Component {
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

export default Home;

