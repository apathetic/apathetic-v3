import { Scrollify } from "@apatheticwes/scrollify";
import { debounce, lerp, css } from '@apatheticwes/scrollify/src/utils';
import CanvasMaskZoom from "./svgmask.js";
import "./birds/";

const root = document.documentElement;

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
    y: ['0', '45vh'],
    mask: () => (t) => {
      mask.maskZoomProgress = 1 - t;
      mask.draw(); // note: already inside a RAf
    }
  }
});


// -------------------------------------
// CANVAS ZOOM-OUT
// -------------------------------------

new Scrollify('.birds').addScene({
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
    },
  }
});

const more = document.querySelector('.more');
new Scrollify('.birds').addScene({
  start: '75vh',
  end: '90vh',
  effects: {
    fade: [1, 0.2],
    custom: () => (t) => {
      more.classList.toggle('hidden', !!(t << 1));
    }
  },
});


// -------------------------------------
// SECTION ANIMATIONS
// -------------------------------------

document.querySelectorAll('[data-fx]').forEach((el, i) => {
  const value = el.dataset.fx;

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
            y: [20, 0],
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
