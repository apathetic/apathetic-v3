import React from 'react'
import Block from "./Block";
import { connect } from "react-redux";
import './About.css'

const About = (props) => {
  return <section className="about section">
      <div className="container">
        <div className="intro block">
          <p>
            Hi. I'm a experienced front-end developer with a broad set of
            skills. Usually I'm championing the newest coding paradigms in the
            front-end world, but you'll also find me collaborating with
            designers on UI/UX patterns or messing around in back-end
            architecture, too.
          </p>

          <a className="not-white" target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/1eHbgSWL5puQnpyi2SiLGgqpW0Jp0W5t-dpUXdb461Gg">
            wes hatch CV
          </a>
        </div>

        <div className="block">
          <h3>Experience</h3>
          <dl>
            <dt>Front-end</dt>
            <dd>CSS3, Javascript, ES6, Vue/Vuex, ThreeJS</dd>

            <dt>Back-end</dt>
            <dd>Node, php, python, Express/Koa, nginx</dd>

            <dt>CMS</dt>
            <dd>
              Drupal, Wordpress, Sitecore, Contentful, Brightspot, Symfony,
              Keystone
            </dd>

            <dt>Design</dt>
            <dd>Photoshop, Sketch</dd>

            <dt>Miscellany</dt>
            <dd>Firebase, bash, git</dd>
          </dl>
        </div>

        <Block items={props.demos} title="Demos" />
        <Block items={props.repos} title="Selected Repos" />
        <Block items={props.npm} title="Selected NPM packages" />
      </div>
    </section>;
};

const mapStateToProps = state => ({
  demos: state.demos,
  npm: state.npm,
  repos: state.repos
});

export default connect(mapStateToProps)(About);
