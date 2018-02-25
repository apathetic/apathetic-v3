import React from 'react'
import { connect } from "react-redux";
import './About.css'

const About = (props) => {
  console.log(props);
  
  return <section className="about section">
      <div className="container">
        <div className="block">
          <p>
            Hi. I'm a experienced front-end developer with a broad set of
            skills. Usually I'm championing the newest coding paradigms in the
            front-end world, but I also enjoy collaborating with designers on
            UI/UX patterns and am equally at home within back-end
            architecture, too.
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
          <ul className="bullets">
            {props.demos.map((d, i) => <li key={"demo-" + i}>{d}</li>)}
          </ul>
        </div>

        <div className="block">
          <h3>Selected Repos</h3>
          <ul className="bullets">
            {Object.keys(props.repos).map(function(r, i) {
              return (
                <li key={"repo-" + i}>
                  <a href={props.repos[r]} target="_blank" rel="noopener noreferrer">{r}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="block">
          <h3>Selected NPM packages</h3>
          <ul className="bullets">
            {Object.keys(props.npm).map(function(n, i) {
              return (
                <li key={"npm-" + i}>
                  <a href={props.npm[n]} target="_blank" rel="noopener noreferrer">{n}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>;
};

const mapStateToProps = state => ({
  demos: state.demos.demos,
  npm: state.npm,
  repos: state.repos.repos
});

export default connect(mapStateToProps)(About);
