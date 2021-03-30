//
// Original / THREEJS implementation
//
//
import * as THREE from "three";
import Bird from "./Bird";

const NUM_BIRDS = 200;
const LINE_COLOUR = 0x333333;
const EXTEND = 300; // extend beyond the viewport
let canvas;
let camera;
let scene;      // the scene contains all the 3D object data
let renderer;   // figure out what the stuff in the scene looks like, draws it
let particles = [];

function init() {
  canvas = document.querySelector('.birds');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  camera = new THREE.PerspectiveCamera();
  scene = new THREE.Scene();

  camera.fov = 70;
  camera.near = 1;
  camera.far = 4000;
  // move the camera backwards so we can see stuff!
  camera.position.z = 200;
  camera.position.y = 300;
  camera.position.x = -500;
  camera.lookAt(scene.position);

  scene.add(camera);

  window.camera = camera; // TODO: remove from window! (ref'd in home.js)
  window.addEventListener('resize', onResize);

  onResize();
  makeGrid();
  makeParticles();
  animate();

  // return { camera, scene };
}

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight + EXTEND;
  // renderer.setPixelRatio( window.devicePixelRatio ); // if no `false`, below:
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  draw();
}

function draw() {
  particles.forEach((bird, i) => {
    bird.position.z += 1;
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

function makeParticles() {
  for (let i = 0; i < NUM_BIRDS; i++) {
    let bird = (particles[i] = new THREE.Mesh(
      new Bird(),
      new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
    ));
    bird.phase = Math.floor(Math.random() * 62.83);
    bird.position.x = Math.random() * 1000 - 500;
    bird.position.y = Math.random() * 600;  // 1000 - 500;
    bird.position.z = Math.random() * 2000 - 1000;

    // we want the bird pointed so that it is going along the z-axis
    bird.rotation.y = Math.atan2(-1, 0); // Math.atan2(1, 0); "backwards"
    bird.rotation.z = 0; // Math.asin(1);
    // bird.scale.x = bird.scale.y = bird.scale.z = 10;

    scene.add(bird);
  }
}

function makeGrid() {
  const geometry = new THREE.Geometry();
  const material = new THREE.LineBasicMaterial({ color: LINE_COLOUR, opacity: 0.2 });

  geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
  geometry.vertices.push(new THREE.Vector3(500, 0, 0));

  for (let i = 0; i <= 20; i++) {
    const line1 = new THREE.Line(geometry, material);
    line1.position.z = i * 50 - 500;
    scene.add(line1);

    const line2 = new THREE.Line(geometry, material);
    line2.position.x = i * 50 - 500;
    line2.rotation.y = (90 * Math.PI) / 180;
    scene.add(line2);
  }
}


export default init();
