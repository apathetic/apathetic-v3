import { Scrollify } from "@apatheticwes/scrollify";
import CanvasMaskZoom from "./svgmask.js";
import "./birds/";

// import xxx from './hi';
// import perlin from './perlin';
// const run = perlin(noise);
// FOR PERLIN NOISE EXPERIMENTS:
// let dataURL = run(true);

// refs
const introEl = document.querySelector('[data-scrollify="intro"]'); // 'div.intro');
const me = document.querySelector('.weshatch h1');
const role = document.querySelector('.weshatch h2');
const el = document.querySelector('.cover');

// var red =   [255, 44, 11, 0.5];
// var grey =  [24, 24, 24, 1];
// var glint_grey = [250, 250, 80, 0.35];
var glint_grey = [0, 250, 240, 0.8];
var glint_red =  [144, 35, 22, 0.45];

const root = document.documentElement;
const lerp = (start, end, t) => (end - start) * t + start;
const css = (prop, el) => window.getComputedStyle(el)[prop] || 0;
const bgColor = css('background-color', document.body);



const mask = new CanvasMaskZoom({
  el,
  bgColor,
  zoomFocusPoint: {
    offset:      [0, 0],  // focusOffset (x,y)
    initialSize: [0, 0],  // focusStartSize (w,h)
    // initialSize: [10000, 10000],  // focusStartSize (w,h)
  }
});

mask.imgOpacity = 1;
mask.maskOpacity = 1;
mask.setCanvasSize();
mask.getSvgBlobImage().then(mask.draw);

window.mask = mask; // for debuggability, etc

// const dummy = document.querySelector('svg .focus_square'); // a class IN a lotte-generated svg
// mask.getFocusMetrics(dummy);


// TODO debounce
window.addEventListener('resize', () => {
  mask.setCanvasSize();
  mask.draw();
});




// BIRD-GRID ZOOM / SCALE-IN
new Scrollify('.birds canvas').addScene({
  start: 1,
  end: '100vh',
  skipMatrix: true,
  effects: {
    // rotateX: [0, -Math.PI/4],
    // scale: [1, 1.7],
    pan: () => (t) => {
      // camera position descends while it tilts upwards, and widens its fov
      window.camera.position.y = (1-t) * 270 + 30 // 300 -> 30
      window.camera.lookAt(0, t*120, 0);          // 0 -> 120
      window.camera.fov = t * 20 + 70;            // 70 -> 90
      window.camera.zoom = 1 - (0.3 * t);         // 1 -> 0.7
      window.camera.updateProjectionMatrix();
    },
  }
});

// GLINT
new Scrollify('.birds').addScene({
  start: 0,
  end: '100vh',
  easing: 'easeOutCubic', // 'easeInOutQuad',
  skipMatrix: true,
  effects: {
    glint: () => (t) => {
      let r = ~~lerp(glint_red[0], glint_grey[0], t);
      let g = ~~lerp(glint_red[1], glint_grey[1], t);
      let b = ~~lerp(glint_red[2], glint_grey[2], t);
      let a =   lerp(glint_red[3], glint_grey[3], t);

      root.style.setProperty('--color-glint', `rgba(${r},${g},${b},${a})`);
      // root.style.setProperty('--t', 1 - t);
    }
  }
});

// MASK
new Scrollify('.mask').addScene({
  start: 0,
  end: '80vh',
  easing: 'easeInOutCubic',
  effects: {
    translateY: ['-10vh', '45vh'],
    mask: () => (t) => {
      mask.maskZoomProgress = 1 - t;
      requestAnimationFrame(mask.draw);
    }
  }
});

// MASk punctuation
new Scrollify('.tint').addScene({
  start: '80vh',
  end: '100vh',
  skipMatrix: true,
  // easing: 'easeInOutCubic',
  effects: {
    line: ({ element }) => (t) => {
      element.style.setProperty('--t', 1 - t);
    }
  }
});




// FALLING NAMES
const scrollify = (el) => {
  new Scrollify(el).addScene({
    start: 1,    // start when scroll >= 1
    end: '40vh', // end when scroll >= 40vh
    effects: {
      fade: [1, 0],
      translateY: [0, Math.random() * 300 + 200],
      rotate: [0, ((Math.random() - 0.5) * Math.PI) / -3]
    },
  });
};

scrollify(me);
scrollify(role);


// SQUIGGLES
// document.querySelectorAll('.squiggle path').forEach((el) => {
//   new Scrollify(el).addScene({
  new Scrollify('.squiggle path').addScene({
    end: 'el.top - 70vh',
    skipMatrix: true,
    effects: {
      draw: ({ element }) => (t) => {
        element.style['stroke-dasharray'] = `${t*166.656}, 166.656`;
      },
    }
  });
// });


// ABOUT
new Scrollify(introEl).addScene({
  end: 'el.top - 70vh',
  // easing: 'easeInQuint',
  easing: 'easeInOutBack',
  effects: {
    fade: [0, 1],
    rotateY: [-Math.PI/6, 0],
    // scale: [1.08, 1],

    // rotateX: [-Math.PI/16, 0],
    // translateY: [60, 0],
  }
});

// EXPERIENCE
document.querySelectorAll('dd').forEach((el, i) => {
  new Scrollify(el).addScene({
    end: 'el.top - 70vh',
    easing: 'easeInOutBack',
    effects: {
      fade: [0, 1],
      rotateY: [Math.PI/4, 0],
    }
  });
});

// NPM

// WORK
/* * /
document.querySelectorAll('[data-scrollify="icon"]').forEach((el, i) => {
  const delay = (i % 3) * 0.1;

  new Scrollify(el).addScene({
    start: el.offsetTop + delay,
    // duration: 0.3,
    effects: {
      translateY: [50, 1],
      fade: [0, 1],
    },
    debug: true
  });
});
/* */