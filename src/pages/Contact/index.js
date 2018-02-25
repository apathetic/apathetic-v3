import React, { Component } from 'react'
import './Contact.css'

class Contact extends Component {
  render() {
    return (
      <section className="contact section">
        <div className="container">
          <h2>Contact</h2>
          <dl>
            <dt>email</dt>    <dd>wes.hatch@gmail.com</dd>
            <dt>linkedin</dt> <dd>www.linkedin.com/in/weshatch/</dd>
            <dt>github</dt>   <dd>www.github.com/apathetic</dd>
            <dt>npm</dt>      <dd>www.npmjs.com/~apatheticwes</dd>
          </dl>
        </div>
      </section>
    );
  }
}

export default Contact;
