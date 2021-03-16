// CANVASMASKZOOM

const s = svgToBlobImage
  , A = function() {
    return window.devicePixelRatio > 1 ? 2 : 1
  }
  , l = "rgba(0, 0, 0, 1.0)"
  , c = 1
  , u = 0
  , h = 1
  , d = {
    CANVAS_MASK: ".mask",
    SVG: "svg"
}


export default class CanvasMaskZoom {

    constructor(t) {
      this._el = t.el,
      this._canvas = this._el.querySelector(d.CANVAS_MASK),
      this._parent = this._canvas.parentElement,
      this._ctx = this._canvas.getContext('2d', { alpha: true }),
      this._ctx.imageSmoothingEnabled = false,
      this._bgColor = t.bgColor || l,
      this._svgImg = null,
      this._metrics = {
          pixelDensity: A(),
          canvas: {
              width: 0,
              height: 0
          },
          svgImg: {
              width: 0,
              height: 0
          },
          focusStartSize: {
              w: t.zoomFocusPoint.initialSize[0] || h,
              h: t.zoomFocusPoint.initialSize[1] || h
          },
          focusOffset: {
              x: t.zoomFocusPoint.offset[0] || u,
              y: t.zoomFocusPoint.offset[1] || u
          },
          scale: {
              min: c,
              max: c
          }
      };
      var i = this._parent.getBoundingClientRect().width
        , n = window.innerHeight;
      this._metrics.scale.max = this._calcMaxScale(i, n),
      this.maskZoomProgress = 0,
      this.imgOpacity = 1,
      this.maskOpacity = 0,
      this.draw = this.draw.bind(this);

      // clippify(this);
    }

    setCanvasSize() {
        var e = this._canvas
          , t = this._metrics
          , i = t.pixelDensity
          , r = this._parent.getBoundingClientRect().width
          // , n = window.innerHeight
          , n = this._parent.getBoundingClientRect().height
          , a = t.canvas.width = e.width = r * i
          , s = t.canvas.height = e.height = n * i;
        e.style.width = "".concat(a / i, "px"),
        e.style.height = "".concat(s / i, "px")
    }

    getSvgBlobImage() {
        var t = this._el.querySelector(d.SVG);
        return s(t).then((img) => this._svgImg = img);
    }

    directScaleDraw(e) {
        this._clearCanvas(),
        this._directScaleTransform(e),
        this._drawImg(),
        this._drawImgMask()
    }

    draw() {
        this._clearCanvas(),
        this._calculatedOffsetScaleTransform(),
        this._drawImg(),
        this._drawImgMask()
    }

    getFocusMetrics(e) {
        var t = this._parent.getBoundingClientRect()
          , i = t.width
          , r = window.innerHeight
          , n = this._metrics;
        if (e) {
            var a = e.getBoundingClientRect()
              , s = this._calcFocusOffset(a, t, i, r);
            n.focusStartSize.w = a.width,
            n.focusStartSize.h = a.height,
            n.focusOffset.x = s[0],
            n.focusOffset.y = s[1]
        }
        n.scale.max = this._calcMaxScale(i, r)
    }

    _calcFocusOffset(bcr, parent, w, h) {
        var n = w / 2
          , a = h / 2
          , s = bcr.left + bcr.width / 2
          , o = bcr.top + bcr.height / 2 - parent.top
          , A = s - n
          , l = o - a;
        return [A, l]
    }

    _calcMaxScale(e, t) {
        var i = Math.ceil(e / this._metrics.focusStartSize.w)
          , r = Math.ceil(t / this._metrics.focusStartSize.h);
        return Math.max(i, r)
    }

    _clearCanvas() {
        var e = this._ctx;
        e.globalCompositeOperation = "source-over",
        e.globalAlpha = 1,
        e.setTransform(1, 0, 0, 1, 0, 0),
        e.fillStyle = this._bgColor,
        e.fillRect(0, 0, this._metrics.canvas.width, this._metrics.canvas.height)
    }

    _directScaleTransform(e) {
        if (this._svgImg) {
            var t = e
              , i = e
              , r = 0
              , n = 0
              , a = {
                width: this._svgImg.width * t,
                height: this._svgImg.height * i
            }
              , s = this._metrics.canvas.width / 2 - a.width / 2
              , o = this._metrics.canvas.height / 2 - a.height / 2;
            this._ctx.setTransform(t, n, r, i, s, o)
        }
    }

    _calculatedOffsetScaleTransform() {
        if (this._svgImg) {
            var e = this._metrics
              , t = this.maskZoomProgress
              , i = e.scale.min + e.scale.max * t
              , r = i
              , n = i
              , a = 0
              , s = 0
              , o = {
                width: this._svgImg.width * r,
                height: this._svgImg.height * n
            }
              , A = e.focusOffset.x * e.pixelDensity * r * t
              , l = e.focusOffset.y * e.pixelDensity * n * t
              , c = e.canvas.width / 2 - o.width / 2;
            c -= A;
            var u = e.canvas.height / 2 - o.height / 2;
            u -= l,
            this._ctx.setTransform(r, s, a, n, c, u);
            // console.log('w | h | scale | minscale', c,u, i, e.scale.min);
        }
    }

    _drawImg() {
        if (this._svgImg) {
            var e = this._ctx;
            e.globalCompositeOperation = "source-over";
            e.globalAlpha = this.imgOpacity;
            e.drawImage(this._svgImg, 0, 0)
        }
    }

    _drawImgMask() {
        if (this._svgImg) {
            var e = this._ctx;
            e.globalCompositeOperation = "destination-out";
            e.globalAlpha = this.maskOpacity;
            e.drawImage(this._svgImg, 0, 0)
        }
    }
}



function svgToBlobImage(e) {
  return new Promise((resolve, reject) => {
    const ratio = window.devicePixelRatio > 1 ? 2 : 1;
    let w = e.getAttribute('width');
    let h = e.getAttribute('height');

    if (!w || !h) {
      const parent = window.getComputedStyle(e.parentElement);
      w = parent.width;
      h = parent.height;
    }

    w = parseFloat(w) * ratio
    h = parseFloat(h) * ratio;

    e.setAttribute('width', w),
    e.setAttribute('height', h);

    const bob = new Blob([e.outerHTML], { type: 'image/svg+xml' });
    const src = (window.URL || window.webkitURL).createObjectURL(bob);
    const img = new Image;

    img.addEventListener('load', () => resolve(img)),
    img.src = src;
  });
}










var Circle = {
    x: 440,
    y: 440,
    size: 0,
    maxSize: 77,

    draw: function(ctx) {
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        debugger;

    },

    update: function(t) {
        this.size = Math.abs(Math.round(Math.sin(t) * this.maxSize));
    }
};
var circle = Object.create(Circle);

function clippify(mask) {
  const ctx = mask._ctx;
  const drawImg = mask._drawImg;
  const drawMask = mask._drawImgMask;

  loop();

  function loop() {
    requestAnimationFrame(loop);

    let t = 0.001 * Date.now();
    circle.update(t);


    // ctx.drawImage(imgBase, 0, 0);
    drawImg.call(mask);

    ctx.save();
    ctx.beginPath();
    circle.draw(ctx);
    ctx.closePath();
    ctx.clip();

    // Draw the 'I Am The Night' image, which will be clipped
    // by our path, so it is drawn 'into' the circles.
    // ctx.drawImage(imgXtra, 0, 0);
    drawMask.call(mask);

    ctx.restore();

  }
}
