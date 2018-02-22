import React, { Component }  from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Sticky } from "@apatheticwes/stickynav";

import Birds from "components/Birds";
import Header from "components/Header";
import Footer from "components/Footer";

import NotFound from "pages/NotFound"
import Home from "pages/Home"
import About from "./pages/About"
import Work from "./pages/Work"
import Contact from "./pages/Contact"

import "./App.css";

// when current nav item is clicked, act as a toggle, then:
// filter: invert(84%);

// handles the effect on load
// body.style.filter = "invert( calc( var(--scrollparallax) * 1% ) )";



// const App = withRouter(({ location }) => (
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

          {/* <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route path="/work" component={Work} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route component={NotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup> */}

          <Home />
          <About />
          <Work />
          <Contact />

        </main>

        <Footer />
      </div>
    );
  }
}
  // ));

// export default withRouter(({ location }) => (
export default withRouter(App);

// export default App;

