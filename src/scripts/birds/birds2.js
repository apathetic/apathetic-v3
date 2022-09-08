//
// random shader example: adapted from "two slabs of texture" demo
// Three.js "tutorials by example"
// Author: Lee Stemkoski
//

import * as THREE from 'three';
{/* <script src="js/Detector.js"></script> */}
{/* <script src="js/Stats.js"></script> */}
{/* <script src="js/OrbitControls.js"></script> */}
{/* <script src="js/THREEx.KeyboardState.js"></script> */}
{/* <script src="js/THREEx.FullScreen.js"></script> */}
{/* <script src="js/THREEx.WindowResize.js"></script> */}

// <!-- ---------------- Custom Shader Code ------------------------ -->
const vertexShader = `
varying vec2 vUv;
void main()
{
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

// <!-- fragment shader a.k.a. pixel shader -->
const fragmentShader = `
uniform sampler2D baseTexture;
uniform float baseSpeed;
uniform sampler2D noiseTexture;
uniform float noiseScale;
uniform float alpha;
uniform float time;

varying vec2 vUv;
void main()
{
	vec2 uvTimeShift = vUv + vec2( -0.7, 1.5 ) * time * baseSpeed;
	vec4 noiseGeneratorTimeShift = texture2D( noiseTexture, uvTimeShift );
	vec2 uvNoiseTimeShift = vUv + noiseScale * vec2( noiseGeneratorTimeShift.r, noiseGeneratorTimeShift.b );
	vec4 baseColor = texture2D( baseTexture, uvNoiseTimeShift );

	baseColor.a = alpha;
	gl_FragColor = baseColor;
}
`;


// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var clock = new THREE.Clock();
var customUniforms, customUniforms2;
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

container = document.querySelector('.birds');

init();
animate();

// FUNCTIONS
function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  renderer = new THREE.WebGLRenderer( {antialias:true} );

	scene.add(camera);
	camera.position.set(0,100,400);
	camera.lookAt(scene.position);


  window.camera = camera; // TODO: remove from window! (ref'd in home.js)

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container.appendChild( renderer.domElement );


	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);

	// FLOOR
	var floorTexture = new THREE.ImageUtils.TextureLoader.load('static/images/checkerboard.jpg' );
	var waterTexture = new THREE.ImageUtils.TextureLoader.load( '/static/images/water.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

	// SKYBOX/FOG
	scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

	////////////
	// CUSTOM //
	////////////

	var noiseTexture = new THREE.ImageUtils.TextureLoader.load( 'static/images/zigzag-ui.png' );
	noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;

	var lavaTexture = new THREE.ImageUtils.TextureLoader.load( 'static/images/zigzag-ui.png' );
	lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping;

	customUniforms = {
		baseTexture:	{ type: "t", value: lavaTexture },
		baseSpeed:		{ type: "f", value: 0.05 },
		noiseTexture:	{ type: "t", value: noiseTexture },
		noiseScale: 	{ type: "f", value: 0.5337 },
		alpha:  			{ type: "f", value: 1.0 },
		time:   			{ type: "f", value: 1.0 }
	};

	// create custom material from the shader code above
	var customMaterial = new THREE.ShaderMaterial({
    uniforms: customUniforms,
		vertexShader,
		fragmentShader
	});

	// other material properties
	customMaterial.side = THREE.DoubleSide;

	// apply the material to a surface
	var flatGeometry = new THREE.PlaneGeometry( 100, 100 );
  var surface = new THREE.Mesh( flatGeometry, customMaterial );
	surface.position.set(-60,50,150);
	scene.add( surface );

	/////////////////////////////////
	// again, but for water!

	// var waterTexture = new THREE.ImageUtils.loadTexture( '/static/images/water.jpg' );
	var waterTexture = new THREE.ImageUtils.TextureLoader.load( '/static/images/water.jpg' );
	waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping;

	// use "this." to create global object
	customUniforms2 = {
		baseTexture:	{ type: "t", value: waterTexture },
		baseSpeed:		{ type: "f", value: 1.15 },
		noiseTexture:	{ type: "t", value: noiseTexture },
		noiseScale:		{ type: "f", value: 0.2 },
		alpha:				{ type: "f", value: 0.8 },
		time:					{ type: "f", value: 1.0 }
	};

	// create custom material from the shader code above
	//   that is within specially labeled script tags
	var customMaterial2 = new THREE.ShaderMaterial({
    uniforms: customUniforms2,
		vertexShader,
		fragmentShader,
	});

	// other material properties
	customMaterial2.side = THREE.DoubleSide;
	customMaterial2.transparent = true;

	// apply the material to a surface
	var flatGeometry = new THREE.PlaneGeometry( 100, 100 );
  var surface = new THREE.Mesh( flatGeometry, customMaterial2 );
	surface.position.set(60,50,150);
	scene.add( surface );
}

function animate(){
  requestAnimationFrame( animate );
	render();
	update();
}

function update() {
	var delta = clock.getDelta();
	customUniforms.time.value += delta;
	customUniforms2.time.value += delta;
	// controls.update();
	// stats.update();
}

function render() {
	renderer.render( scene, camera );
}

