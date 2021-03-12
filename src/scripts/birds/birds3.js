
import GL from './lightgl.js';


var angleX = 30;
var angleY = 0;
var gl = GL.create({ stencil: false, alpha: false });

gl.canvas.width = 600;
gl.canvas.height = 400;
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.matrixMode(gl.PROJECTION);
gl.perspective(45, gl.canvas.width / gl.canvas.height, 0.1, 100);
gl.matrixMode(gl.MODELVIEW);
gl.enable(gl.DEPTH_TEST);
gl.getExtension('OES_standard_derivatives');
document.getElementById('shader').appendChild(gl.canvas);

var mesh = GL.Mesh.plane({ detail: 10 });
for (var i = 0; i < mesh.vertices.length; i++) {
  var v = mesh.vertices[i];
  mesh.vertices[i] = [10 * v[0], Math.random() * 2 - 1, 10 * v[1]];
}
mesh.compile();

var shaders = {};
var current = 'vertex.xz';
var vertex = [
  'varying vec3 vertex;',
  '',
  'void main() {',
  '  vertex = vec3(gl_Vertex.x * 3.0, gl_Vertex.y * 6.0, gl_Vertex.z * 3.0);',
  '  gl_Position = gl_ModelViewProjectionMatrix * vec4(gl_Vertex.xyz, 1.0);',
  '}',
].join('\n');
var fragments = {
  'vertex.xz': [
    '// License: CC0 (http://creativecommons.org/publicdomain/zero/1.0/)',
    '#extension GL_OES_standard_derivatives : enable',
    '',
    'varying vec3 vertex;',
    '',
    'void main() {',
    '  // Pick a coordinate to visualize in a grid',
    '  vec2 coord = vertex.xz;',
    '',
    '  // Compute anti-aliased world-space grid lines',
    '  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);',
    '  float line = min(grid.x, grid.y);',
    '',
    '  // Just visualize the grid lines directly',
    '  gl_FragColor = vec4(vec3(1.0 - min(line, 1.0)), 1.0);',
    '}',
  ].join('\n'),
};

Object.keys(fragments).forEach(function(coord) {
  var fragment = fragments[coord];
  shaders[coord] = {
    vertex: vertex,
    fragment: fragment,
    shader: new GL.Shader(vertex, fragment)
  };
});

gl.onupdate = function(seconds) {
  angleY += seconds * 5;
};

gl.onmousemove = function(e) {
  if (e.dragging) {
    angleX += e.deltaY;
    angleY += e.deltaX;
    angleX = Math.max(-90, Math.min(90, angleX));
  }
};

gl.ondraw = function() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.loadIdentity();
  gl.translate(0, 0, -7);
  gl.rotate(angleX, 1, 0, 0);
  gl.rotate(angleY, 0, 1, 0);
  shaders[current].shader.draw(mesh);
};

gl.animate();

