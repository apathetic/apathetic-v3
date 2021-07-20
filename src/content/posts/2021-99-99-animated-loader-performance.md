---
title: Animated loader performance
description: gotchas for svg-animation under load
tags: draft
---

CPU & LOADING ICONS
Effect of CPU blocking things in the browser on a loading icon
On Firefox: an <svg> loading icon animated w/ CSS, works great under all CPU loads
On Chrome: an <svg> loading icon animated w/ CSS, stutters under CPU load

---

On Firefox: a loading gif, stutters under CPU
On Chrome: a loading gif animated w/ CSS, works great under all CPU loads
When heavy render / rendering+mounting templates after API load, our loading icon stuttered. It was annoying. However, it was also peculiar because the stuttering was very inconsistent across browsers. I, at first, chalked that up to different browser rendering engines, ro things optimized differently (ie animations). Interesting,

findings:
svg is not optimized like the rest of the DOM is. That means that parts of your svg are -not\_ promoted to their own render layer (1). `will-animate` also has no effect. Hacks like `translate: transform3d(xxx) (2) as well*...
The practical impact of this is that animated svg loaders will often stutter or freeze during "heavy page load". <-- can we isolate what htis is...? (render? loading? other?)


* note: I'm talking for a <path> or <group> within the svg. If you wanted to optimize the entire svg for GPU acceleration by providing these hints on its root, you could. But, this would not solve the problem of smoothly animating thse children within the svg
\\\\\\

Here's an example:

<svg animation running in tandem with some CPU calc that busts out of 16ms performance budget>

## How to fix?

Well, there's not silver bullet to fixing performance (ref).  The best solution, albeit perhaps not the most practical, is to never blow your frame perfoirmance budget of 16ms. Make sure nothing blocks the main JS thread, make sure your work is batched / time sliced / etc.  Your svg animation will be competing for the same CPU resources as the rest of your app

Okay, if that isn't possible, then how to offload xxxx the animation.  Option 2) dont use an svg. Get creative with CSS -- that _can_ be optimized and offloaded to the GPU, running buttery smooth in parallel with a heavy, render blocking calculation

<example> CSS spinner i madke for LL
<together with same heavy render-blocking thing from above>





ref
(sara drasner ?)

