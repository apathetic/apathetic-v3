import React, { Component } from 'react'
import './Contact.css'

class Contact extends Component {
  render() {
    return (
      <section className="contact section">
        <div className="container">
          <h3 className="color-yellow">Contact</h3>
          <dl>
            <dt>email</dt>    <dd>wes.hatch@gmail.com</dd>
            <dt>linkedin</dt> <dd><a href="http://linkedin.com/in/weshatch">linkedin.com/in/weshatch/</a></dd>
            <dt>github</dt>   <dd><a href="http://github.com/apathetic">http://github.com/apathetic</a></dd>
            <dt>npm</dt>      <dd><a href="http://npmjs.com/~apatheticwes">npmjs.com/~apatheticwes</a></dd>
          </dl>
        </div>
      </section>
    );
  }
}

export default Contact;
