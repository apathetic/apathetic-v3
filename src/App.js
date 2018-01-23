import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import Birds from "components/Birds";
import Navigation from "components/Navigation";
import Footer from "components/Footer";

import NotFound from 'pages/NotFound'
import Home from 'pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Contact from './pages/Contact'

// import logo from './assets/icons/logo.svg';
import './App.css';

const logo = '';

class App extends Component {
  render() {
    return (
      <div>

        <Birds></Birds>

        <header className="App-header">
          <Link to='/'>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Navigation />

        <main className="App">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/work" component={Work}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route component={NotFound}/>
          </Switch>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
