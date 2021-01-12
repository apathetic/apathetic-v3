import { Scrollify, fx } from "@apatheticwes/scrollify";

const el = document.querySelector([(data - scrollify = intro)]);

new Scrollify(el).addScene({
  start: 0,
  duration: 0.4,
  effects: [
    {
      fn: fx.fade,
      options: {
        to: 1,
        from: 0,
      },
    },
  ],
});
