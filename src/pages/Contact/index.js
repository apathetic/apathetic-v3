import React, { Component } from 'react'
import './Contact.css'

class Contact extends Component {
  render() {
    return (
      <div className="container">
        <h2>Contact Page</h2>
        <ul>
          <li>email: wes.hatch@gmail.com</li>
          <li>linkedin: https://www.linkedin.com/in/weshatch/</li>
          <li>github: http://www.github.com/apathetic</li>
          <li>npm: https://www.npmjs.com/~apatheticwes</li>
        </ul>
      </div>
    );
  }
}

export default Contact;
