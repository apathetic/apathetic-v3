import React, { Component } from "react";
import Block from "./Block";
import BlockList from "./BlockList";
import { connect } from "react-redux";
import { Scrollify, fx } from "@apatheticwes/scrollify";
import './About.css'

class About extends Component {
  scrollify(el) {
    new Scrollify(el).addScene({
      start: 0,
      duration: 0.4,
      effects: [{
        fn: fx.fade,
        options: {
          to: 1,
          from: 0
        }
      }]
    });
  }

  render() {
    const props = this.props;

    return (
      <section className="about section">
        <div className="container">
          <div className="intro block" ref={(el) => { this.scrollify(el); }}>
            <p>
              Hi. I'm a front-end developer with a broad set of
              skills. Usually I'm championing the newest coding paradigms in the
              front-end world, but you'll also find me collaborating with
              designers on UI/UX patterns or messing around in back-end
              architecture, too.
            </p>

            <a className="not-white" target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/1eHbgSWL5puQnpyi2SiLGgqpW0Jp0W5t-dpUXdb461Gg">
              wes hatch CV
            </a>
          </div>

          <BlockList items={props.experience} title="Experience" />
          <Block items={props.demos} title="Demos, Random things" />
          <Block items={props.repos} title="Selected Repos" />
          <Block items={props.npm} title="Selected NPM packages" />
        </div>
      </section>
    );
  }
};

const mapStateToProps = state => ({
  experience: state.experience,
  demos: state.demos,
  npm: state.npm,
  repos: state.repos
});

export default connect(mapStateToProps)(About);
