import React, { Component }  from "react";

import Birds from "components/Birds";
import Header from "components/Header";
import Footer from "components/Footer";

import About from "./pages/About"
import Work from "./pages/Work"
import Contact from "./pages/Contact"

import "./App.css";

class App extends Component {
  componentDidMount() {
    window.addEventListener("scroll", () => {
      const scroll = window.pageYOffset;
      const dist = Math.min(scroll / window.innerHeight, 1);

      document.body.style.setProperty("--scroll", scroll);
      document.body.style.setProperty("--scroll_", dist);
    });

    let currentPosition = 0;
    const scrollContainer = document.documentElement;
    const scrollContent = document.querySelector("main > div");

    if (!scrollContent) return;

    const scrollTotal = scrollContainer.scrollHeight - scrollContainer.offsetHeight;
    const xxx = scrollTotal + scrollContent.scrollHeight - scrollContent.offsetHeight;

    scrollContent.style.pointerEvents = "none";
    // when body reaches bottom (after going down), toggle :
    // pointer-events: auto;
    // on text content
    window.addEventListener("scroll", () => {
      currentPosition = scrollContainer.scrollTop + scrollContent.scrollTop;
      console.log(currentPosition/xxx);
      if (scrollContainer.scrollTop >= scrollTotal) {
        scrollContent.style.pointerEvents = "auto";
      } else {
        scrollContent.style.pointerEvents = "none";
      }
    });


    // when text content reaches top (after goin up), toggle:
    // pointer-events: none;
    // on text-content
    scrollContent.addEventListener("scroll", () => {
      currentPosition = scrollContainer.scrollTop + scrollContent.scrollTop;
      console.log(currentPosition / xxx);
      if (scrollContent.scrollTop <= 0) {
        scrollContent.style.pointerEvents = "none";
      } else {
        scrollContent.style.pointerEvents = "auto";
      }
    });

  }

  render() {
    // const { location } = this.props;

    return (
      <div className="">
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

