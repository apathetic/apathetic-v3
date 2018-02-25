import React from 'react'
import { connect } from "react-redux";
import './About.css'

const About = (props) => {
  console.log(props);
  
  return <section className="about section">
      <div className="container">
        <div className="block">
          <p>
            Hi. I'm a experienced front-end developer, developing best practices, coding standards advocate for- and
            promoting performance optimizations authorship of many core,
            reusable components defined many front-end boilerplates mentoring
            junior developers ensuring high quality, timely code delivery
          </p>
        </div>

        <div className="block">
          <h3>Experience</h3>
          <ul>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/1eHbgSWL5puQnpyi2SiLGgqpW0Jp0W5t-dpUXdb461Gg">
                wes hatch CV
              </a>
            </li>
          </ul>
        </div>

        <div className="block">
          <h3>Demos</h3>
          <ul>
            {props.demos.map((d, i) => <li key={"demo-" + i}>{d}</li>)}
          </ul>
        </div>

        <div className="block">
          <h3>Selected Repos</h3>
          <ul className="bullets">
            {Object.keys(props.repos).map(function(r, i) {
              return (<li key={"repo-" + i}><a href={props.repos[r]}>{r}</a></li>);
            })}
          </ul>
        </div>

        <div className="block">
          <h3>Selected NPM packages</h3>
          <ul>
            <li>
              <a href="https://www.npmjs.com/package/@apatheticwes/scrollify">
                scrollify
              </a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/@apatheticwes/flexicarousel">
                carousel
              </a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/@hugeinc/stickynav">
                stickynav
              </a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/@hugeinc/panels">
                panels
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>;
};

const mapStateToProps = state => ({
  demos: state.demos.demos,
  npm: state.npm.npm,
  repos: state.repos.repos
});

export default connect(mapStateToProps)(About);
