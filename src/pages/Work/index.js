import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Gallery from 'components/Gallery';

import './SecondPage.css';

class SecondPage extends Component {

  render() {
    return (
      <div className='bold'>
        <h2>Second Page</h2>
        <Gallery></Gallery>
        <Link to={'/'}>First</Link>
      </div>
    )
  }
}

export default SecondPage;
