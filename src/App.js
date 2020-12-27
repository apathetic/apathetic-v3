import React, { Component }  from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home/";

// const Home = Loadable({
//   loading: Loading,
//   loader: () => import('./pages/Home'),
// });


class App extends Component {
  render() {
    return (
      <>
        <Birds />

        <Header></Header>

        <Router>
          <Route exact path="/" component={ Home } />
        </Router>

        <Footer />
      </>
    );
  }
}

export default App;

