import React from 'react'
import './About.css'

const About = () => (
  <div className="page">
    <section>
      <div className="flex container">
        <div className="column gap">
          <p>
            developing best practices, coding standards advocate for- and
            promoting performance optimizations authorship of many core,
            reusable components defined many front-end boilerplates mentoring
            junior developers ensuring high quality, timely code delivery
          </p>
          <p>
            Vue / Vuex, Angular 1.x, React Isomorphic Javascript Functional
            Programming NodeJS some php, python
          </p>
        </div>
      </div>
    </section>

    <section>
      <div className="flex container">
        <div className="column">
          <h3>Experience</h3>
          <ul>
            <li>
              <a href="https://docs.google.com/document/d/1eHbgSWL5puQnpyi2SiLGgqpW0Jp0W5t-dpUXdb461Gg">
                wes hatch CV
              </a>
            </li>
          </ul>
        </div>

        <div className="column">
          <h3>Demos</h3>
          <ul>
            <li>http://apathetic.github.io/showcase/</li>
            <li>smash your friends</li>
            <li>modular synth</li>
            <li>malformed.ca</li>
          </ul>
        </div>
      </div>
    </section>

    <section>
      <div className="flex container">
        <div className="column">
          <h3>Selected Repos</h3>
          <ul>
            <li>
              <a href="https://github.com/apathetic/scrollify">scrollify</a>
            </li>
            <li>
              <a href="https://github.com/apathetic/modular-synth">
                modular synth
              </a>
            </li>
            <li>
              <a href="https://github.com/apathetic/flexicarousel">carousel</a>
            </li>
            <li>
              <a href="https://">boilerplate ...</a>
            </li>
            <li>
              <a href="https://github.com/apathetic/stickynav">
                this here site.
              </a>
            </li>
          </ul>
        </div>

        <div className="column">
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
              <a href="https://www.npmjs.com/package/@hugeinc/panels">panels</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

export default About;
