import React from "react";
import { Switch, Route, Link, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Birds from "components/Birds";
import Navigation from "components/Navigation";
import Footer from "components/Footer";

import NotFound from "pages/NotFound"
import Home from "pages/Home"
import About from "./pages/About"
import Work from "./pages/Work"
import Contact from "./pages/Contact"

import "./App.css";

// const App = ({ location }) => {

const App = withRouter(({ location }) => (
  <div className="">
    <Birds />

    <header className="header">
      <Link to="/"> </Link>
      <h1 className="h1">Wes Hatch</h1>
      <h2 className="h2">Front-end web dev</h2>
      <Navigation />
    </header>

    <main className="App">
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route path="/work" component={Work} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </main>

    <Footer />
  </div>
));

export default App;
