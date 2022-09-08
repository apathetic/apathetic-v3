---
title: Writing a Component Library for Vue.
description: Challenges and learnings encountered along the way
tags: draft
---

# Writing a Component Library for Vue

> tl;dr Learnings and insights from authoring the technical-side of a design system.


Normally when I start something new, I spend a chunk of my time setting up folders, pulling in frameworks and resources, deciding whihc llibrary to use this or that, and putting into place the all-dreaded build pipeline.  Once these things are done, I've lost the main thread of what i was doing.  (and, yes, you can tell me to simply npx nextjs or npx vite that -- however, what to do when your thing isn't precipitated on a SPA structure and needs different considerations).

So... recently, i started on a new personal project. It began, initially, with a few snippets of JavaScript that I was authoring directly in the brosers WebInspector.  Then I started pulling in a few more things.
Generally, do project structures happen _organically_ or _intentionally_?

I started pulling in things as i needed thme, and wanted to see how far i could go _wihtout_ any kind of bundler or build step. It turns out, if browser limitations aren't a concern, pretty far.  Now, most browsers understand modules _natively_ and, more interestingly, you can import them via CDN

Skypack is a tool that allows you to import xxx intor your working wihtout bundling / etc.   And, you can see results instandly.  Its' rpetty neat, and a nice way to quickly spin up a proof of concept, or validate that a thing will work as you envisioned, without having to make a detour into package.jjosn land.  It's a more focused way of working.

Skypack has pretty much all the same modules that npm's registry has.  Instead of grabbing it from xxxx, you can Skypack it (if we can use it as verb). However, on the downside, you still need to find your package....


``` index.html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<head>
	<script type="module">
		// un/comment as needed
		import three from 'https://cdn.skypack.dev/three';
		import preact from 'https://cdn.skypack.dev/preact?min';

	HOUDINI
<script src="https://unpkg.com/css-paint-polyfill"></script>

		..
	</script>
	<body>

	</body>
</html>
```
caption: a/my base prototyping env


```
<script type="module">
  import preact from 'https://cdn.skypack.dev/preact';

	import { h, render } from 'preact';
  render(<main><h1>Hello</h1></main>, document.body);

  render(<main><h1>Hello World!</h1></main>, document.body);
```



yep, you can also go do codepen (or codesandbox or jsbin...)

## Old is new again

Anyway, this all led me to be able to develop an app in a single HTML file, using `<script type="module">` within.  Quick and easy


## serve it if you need

If you don't need to load assets or anything (ie. everything is in `index.html`), you can just open with your browser directly.
Otherwise, here are a few quick and easy ways to serve content:

* (python) python -m SimpleHTTPServer
* (npm) http-server ./ -b -g
* etc



