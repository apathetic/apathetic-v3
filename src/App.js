import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import Navigation from "components/Navigation";
import Footer from "components/Footer";
import NotFound from 'pages/NotFound'
import FirstPage from 'pages/First'
import SecondPage from './pages/Second'

// import logo from './assets/icons/logo.svg';
import './App.css';

const logo = '';

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <Navigation />

        <main className="App">
          <Switch>
            <Route exact path="/" component={FirstPage}/>
            <Route path="/second" component={SecondPage}/>
            <Route component={NotFound}/>
          </Switch>
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
