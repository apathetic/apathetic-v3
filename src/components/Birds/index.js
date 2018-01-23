import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import * as THREE from 'three';
import Bird from './Bird';
import './Birds.css';

let camera, scene, renderer;
let particles = [];

class Birds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // camera, scene, renderer;
      mouseX: 0,
      mouseY: 0
    };

    this.animate = () => { this._animate(); };
    this.onMouseMove = () => { this._onMouseMove(); };

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
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.makeGrid();
    this.makeParticles();
    camera.lookAt(scene.position);

    // add the mouse move listener
    // document.addEventListener('mousemove', onMouseMove, false);
    // window.addEventListener('resize', onResizes);
  }

  componentDidMount() {
    // the renderer's canvas domElement is added to the container
    this.container.appendChild(renderer.domElement);
    this.animate();
  }

  _onMouseMove(e) {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  }

  _animate() {
    requestAnimationFrame(this.animate);
    this.draw();
  }

  draw() {
    // var timer = Date.now() * 0.0001;
    // camera.position.x = Math.cos(timer) * 200;
    // camera.position.z = Math.sin(timer) * 200;
    // camera.lookAt(scene.position);

    // iterate through every particle
    particles.forEach(particle => {
      // move it forward dependent on the mouseY position.
      particle.position.z += 1; //mouseY * 0.1;

      particle.phase =
        (particle.phase + (Math.max(0, particle.rotation.z) + 0.1)) % 62.83;
      particle.geometry.vertices[5].y = particle.geometry.vertices[4].y =
        Math.sin(particle.phase) * 5;

      // if the particle is too close move it to the back
      if (particle.position.z > 1000) {
        particle.position.z -= 2000;
      }
    });

    renderer.render(scene, camera);
  }

  makeParticles() {
    let bird;

    for (let i = 0; i < 200; i++) {
      bird = particles[i] = new THREE.Mesh(
        new Bird(),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
      );
      bird.phase = Math.floor(Math.random() * 62.83);
      bird.position.x = Math.random() * 1000 - 500;
      bird.position.y = Math.random() * 1000 - 500;
      bird.position.z = Math.random() * 2000 - 1000;

      // we want the bird travelling along the z-axis
      bird.rotation.y = Math.atan2(-1, 0); // Math.atan2(1, 0); "backwards"
      bird.rotation.z = 0; // Math.asin(1);

      bird.doubleSided = true;
      // bird.scale.x = bird.scale.y = bird.scale.z = 10;

      scene.add(bird);
      particles.push(bird);
    }
  }

  makeGrid() {
    var geometry = new THREE.Geometry();

    geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
    geometry.vertices.push(new THREE.Vector3(500, 0, 0));

    for (let i = 0; i <= 20; i++) {
      const line1 = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.2 })
      );
      line1.position.z = i * 50 - 500;
      scene.add(line1);

      const line2 = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.2 })
      );
      line2.position.x = i * 50 - 500;
      line2.rotation.y = 90 * Math.PI / 180;
      scene.add(line2);
    }
  }

  // function onResize(event) {
  //   console.log('resizeeeing', renderer);
  //   console.log('resizeeeing', window.innerWidth, window.innerHeight);
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // };

  render() {
    const { x, y } = this.state;
    return (
      <div
        className="birds"
        onMouseMove={this._onMouseMove}
        style={{ width: "inherit", height: "inherit", position: "absolute" }}
        ref={birds => (this.container = birds)}
      >
        <h1>
          Mouse coordinates: {x} {y}
        </h1>
      </div>
    );
  }
}


export default Birds;



