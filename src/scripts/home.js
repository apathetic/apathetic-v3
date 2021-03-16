import { Scrollify } from "@apatheticwes/scrollify";
import { debounce, lerp, css } from '@apatheticwes/scrollify/src/utils';
import CanvasMaskZoom from "./svgmask.js";
import "./birds/";

const root = document.documentElement;
// import xxx from './hi';
// import perlin from './perlin';
// const run = perlin(noise);
// FOR PERLIN NOISE EXPERIMENTS:
// let dataURL = run(true);

// -------------------------------------
// MASK
// -------------------------------------

const mask = new CanvasMaskZoom({
  el: document.querySelector('.cover'),
  bgColor: css('background-color', document.body),
  zoomFocusPoint: {
    offset:      [0, 0],  // focusOffset (x,y)
    initialSize: [0, 0],  // focusStartSize (w,h)
  }
});

mask.imgOpacity = 1;
mask.maskOpacity = 1;
mask.setCanvasSize();
mask.getSvgBlobImage().then(mask.draw);

window.addEventListener('resize', debounce(() => {
  mask.setCanvasSize();
  mask.draw();
}));
// window.mask = mask; // for debuggability, etc

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


// -------------------------------------
// CANVAS ZOOM-OUT
// -------------------------------------

const grey = [0, 250, 240, 0.8];
const red =  [144, 35, 22, 0.45];
const interpolate = (arrA, arrB, t) => { // assumes array lengths are equal
  return arrA.map((v, i) => lerp(arrA[i], arrB[i], t))
}

new Scrollify('.birds canvas').addScene({
  start: 1,
  end: '100vh',
  effects: {
    pan: () => (t) => {
      // camera position descends while it tilts upwards, and widens its fov
      window.camera.position.y = (1-t) * 270 + 30 // 300 -> 30
      window.camera.lookAt(0, t*120, 0);          // 0 -> 120
      window.camera.fov = t * 20 + 70;            // 70 -> 90
      window.camera.zoom = 1 - (0.3 * t);         // 1 -> 0.7
      window.camera.updateProjectionMatrix();

      // change "glint" colour too
      let rgba = interpolate(red, grey, t);
      root.style.setProperty('--color-glint', `rgba(${rgba.toString()})`);
    },
  }
});





new Scrollify('.more').addScene({
  start: 0,
  end: '100vh',
  effects: {
    toggle: { 0.9: 'hidden' }
  },
});



// -------------------------------------
// LINES AND SQUIGGLES
// -------------------------------------

// MASk LineS n StufF
// new Scrollify('.tint').addScene({
//   start: '78vh',
//   end: '90vh',
//   skipMatrix: true,
//   effects: {
//     line: ({ element }) => (t) => { element.style.setProperty('--t', t);  }
//   }
// });

// new Scrollify('.tint').addScene({
//   start: '92vh',
//   end: '120vh',
//   easing: 'easeInCubic',
//   skipMatrix: true,
//   effects: {
//     line: ({ element }) => (t) => {
//       element.style.setProperty('--t', 1 - (t * 0.75));    // 1 -> 0.2
//     }
//   }
// });

// SQUIGGLE
  // new Scrollify('.squiggle path').addScene({
  //   end: 'el.top - 70vh',
  //   skipMatrix: true,
  //   effects: {
  //     draw: ({ element }) => (t) => {
  //       element.style['stroke-dasharray'] = `${t*166.656}, 166.656`;
  //     },
  //   }
  // });




// FALLING NAMES
/* * /
document.querySelectorAll('.weshatch h1, .weshatch h2').forEach((el) => {
  new Scrollify(el).addScene({
    start: 1,    // start when scroll >= 1
    end: '40vh', // end when scroll >= 40vh
    effects: {
      fade: [1, 0],
      translateY: [0, Math.random() * 300 + 200],
      rotate: [0, ((Math.random() - 0.5) * Math.PI) / -3]
    },
  });
});
/* */


// -------------------------------------
// SECTION ANIMATIONS
// -------------------------------------

document.querySelectorAll('[data-scrollify]').forEach((el, i) => {
  const value = el.dataset.scrollify;

  // return;
  switch (value) {
    case 'intro':
    case 'cv':
        new Scrollify(el).addScene({
          end: 'el.bottom - 50vh',
          easing: 'easeInOutBack',
          effects: {
            fade: [0, 1],
          }
        });
      break;

    case 'li':
    case 'dd':
    case 'dt':
        new Scrollify(el).addScene({
          end: `el.top - ${value=='dd'?70:75}vh`,
          easing: 'easeInOutBack',
          effects: {
            fade: [0, 1],
          }
        });
        break;

    case 'icon':
        const delay = (i % 3) * 3;
        new Scrollify(el).addScene({
          end: `el.bottom - ${70 + delay}vh`,
          easing: 'easeInOutBack',
          effects: {
            translateY: [20, 0],
            fade: [0, 1],
          },
        });
    default:

  }
})



// -------------------------------------
// EASTER EGG
// -------------------------------------

document.querySelector('.weshatch').addEventListener('click', () => {
  const rand = [0,0,0].map(() => ~~(Math.random() * 255 )).toString();
  root.style.setProperty('--color-red', `rgba(${rand}, 0.5)`);
  root.classList.toggle('inversion');
});
