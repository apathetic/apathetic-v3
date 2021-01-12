import { Scrollify, fx } from "@apatheticwes/scrollify";
const icons = document.querySelectorAll('data-scrollify="icon"]');

icons.forEach((el, i) => {
  const delay = (i % 3) * 0.1;

  new Scrollify(el).addScene({
    start: 0.1 + delay,
    duration: 0.3,
    effects: [
      {
        fn: fx.translateY,
        options: {
          to: 1,
          from: 50,
        },
      },
      {
        fn: fx.fade,
        options: {
          to: 1,
          from: 0,
        },

        // }, {
        //   fn: function(progress) {
        //     const filter = `grayscale(${progress}) contrast(0.5))`;
        //     this.element.style.filter = filter;
        //   }
      },
    ],
  });
});
