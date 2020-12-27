import React, { Component } from 'react';
import * as THREE from 'three';
import Bird from './Bird';
import './Birds.css';

const NUM_BIRDS = 200;
const LINE_COLOUR = 0x333333;
let camera, scene, renderer;
let particles = [];

class Birds extends Component {
  constructor(props) {
    super(props);

    if (typeof window === 'undefined') return;

    this.state = {
      mouseX: 0,
      mouseY: 0
    };

    // this.animate = () => {
    //   this._animate();
    // };

    this.mouseMove = e => {
      this.onMouseMove(e);
    };

    this.resize = () => {
      this.onResize();
    };

    // params: field of view, aspect ratio for render output, near and far clipping plane.
    // also move the camera backwards so we can see stuff! (default position is 0,0,0)
    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      4000
    );
    camera.position.z = 200;
    camera.position.y = 300;
    camera.position.x = -500;

    // the scene contains all the 3D object data
    scene = new THREE.Scene();
    scene.add(camera);

    // figure out what the stuff in the scene looks like, draws it
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.makeGrid();
    this.makeParticles();
    camera.lookAt(scene.position);
  }

  componentDidMount() {
    this.container.appendChild(renderer.domElement);

    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', this.mouseMove);

    this.animate();
  }

  onMouseMove(e) {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  }

  onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  animate() {
    requestAnimationFrame(() => { this.animate() });
    this.draw();
  }

  draw() {
    // var timer = Date.now() * 0.0001;

				// const now = performance.now();
				// let delta = ( now - last ) / 1000;

				// if ( delta > 1 ) delta = 1; // safety cap on large deltas
				// last = now;

    // camera.position.x = Math.cos(timer) * -500;
    // // camera.position.z = Math.sin(timer) * 200;
    // camera.lookAt(scene.position);


    particles.forEach((bird, i) => {
      bird.position.z += 1; //mouseY * 0.1;
      bird.phase = (bird.phase + 0.1) % 62.83;
      bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;

      bird.geometry.verticesNeedUpdate = true;

      // if the bird is too close move it to the back
      if (bird.position.z > 1000) {
        bird.position.z -= 2000;
      }
    });

    renderer.render(scene, camera);
  }

  makeParticles() {
    for (let i = 0; i < NUM_BIRDS; i++) {
      let bird = particles[i] = new THREE.Mesh(
        new Bird(),
				new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
      );
      bird.phase = Math.floor(Math.random() * 62.83);
      bird.position.x = Math.random() * 1000 - 500;
      bird.position.y = Math.random() * 1000 - 500;
      bird.position.z = Math.random() * 2000 - 1000;

      // we want the bird pointed so that it is going along the z-axis
      bird.rotation.y = Math.atan2(-1, 0); // Math.atan2(1, 0); "backwards"
      bird.rotation.z = 0; // Math.asin(1);
      // bird.scale.x = bird.scale.y = bird.scale.z = 10;

      scene.add(bird);
    }
  }

  makeGrid() {
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
    geometry.vertices.push(new THREE.Vector3(500, 0, 0));

    for (let i = 0; i <= 20; i++) {
      const line1 = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: LINE_COLOUR, opacity: 0.2 })
      );
      line1.position.z = i * 50 - 500;
      scene.add(line1);

      const line2 = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: LINE_COLOUR, opacity: 0.2 })
      );
      line2.position.x = i * 50 - 500;
      line2.rotation.y = 90 * Math.PI / 180;
      scene.add(line2);
    }
  }

  render() {
    // const { x, y } = this.state;
    return (
      <div
        className="birds"
        ref={ (birds) => { this.container = birds }}
      >
      </div>
    );
  }
}


export default Birds;



