---
title: CSS Houdini - animating knobs using Paint API
description: towards the look and feel of a native application
tags: draft
---



Could I recreate a "Traktor-like" audio knob? That is, a knob with a real time representation of an audio signal painted/updating as a reference?

For that, you'd need to find an efficient way to repaint a xx arrow thingy on the canvas at 60hz / 60 times a second, using the amplitude an audio signal to drive its radial position.


lastly use 12 of these knobs for a parametrc eqalizer (each knob controls one freq bin -- each bin's engery congrols the arrow OR VOUT led column style)


Cool, so first things first.




1. find a way to derive a 60Hz signal (beween -1 and 1) from the incoming audio

we make an input, audio then feed it into our audioworkletnode


2. analyze sound and extract a bunnch of freq bins. each'll be used to power the display of a knob
      this.analyser = this.inlets[0].audio = this.context.createAnalyser();
      this.analyser.fftSize = 256; // 512;
      this.analyser.maxDecibels = -20; // max value to represent; any freq bins with amplitude above this will be 1
      this.analyser.minDecibels = -90; // min value to represent; any freq bins with amplitude below this will be 0




3. knob stuffs

			// mounted:
      this.$refs.track.setAttribute('d', describeArc(X, Y, SIZE, 30, 330)); // draw track

      arc() {
        // 30 -> 330. Dials start 30deg in and end 30deg before 360.
        const rotationValue = this.internalValue * 300 + 30;

        return describeArc(X, Y, SIZE, 30, rotationValue);
      }


  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees + 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  }






# CSS Paint API and knobs

https://jakearchibald.com/2020/css-paint-predictably-random/?utm_source=CSS-Weekly&utm_campaign=Issue-440


https://web.dev/houdini-how/