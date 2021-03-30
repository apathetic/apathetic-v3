// CANVASMASKZOOM

const s = svgToBlobImage
  , A = () => 1 // window.devicePixelRatio > 1 ? 2 : 1
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
      };
      this.imgOpacity = 1,
      this.maskOpacity = 0;
    }

    setCanvasSize() {
        var e = this._canvas
          , t = this._metrics
          , i = t.pixelDensity
          , r = this._parent.getBoundingClientRect().width
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

    directScaleDraw(scale) {
        this._clearCanvas(),
        this._directScaleTransform(scale),
        // this._drawImg(),
        this._drawImgMask()
    }

    // draw() {
    //     this._clearCanvas(),
    //     this._calculatedOffsetScaleTransform(),
    //     // this._drawImg(),
    //     this._drawImgMask()
    // }

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



function svgToBlobImage(svgEl) {
  return new Promise((resolve, reject) => {
    const ratio = A();
    let w = svgEl.getAttribute('width');
    let h = svgEl.getAttribute('height');

    if (!w || !h) {
      const parent = window.getComputedStyle(svgEl.parentElement);
      w = parent.width;
      h = parent.height;
    }

    w = parseFloat(w) * ratio
    h = parseFloat(h) * ratio;

    svgEl.setAttribute('width', w),
    svgEl.setAttribute('height', h);

    const bob = new Blob([svgEl.outerHTML], { type: 'image/svg+xml' });
    const src = (window.URL || window.webkitURL).createObjectURL(bob);
    const img = new Image;

    img.addEventListener('load', () => resolve(img)),
    img.src = src;
  });
}

