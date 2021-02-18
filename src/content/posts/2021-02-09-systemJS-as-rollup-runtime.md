---
title: SystemJS as a JS runtime with Rollup.
description: "Lazy load modules and more in older browsers"
---

# SystemJS as a JS runtime with Rollup

> tl;dr Until older browsers offer robust support for JS modules, we need a JS "runtime" to manage things for us.

## Introduction

You cannot lazy-load JS modules in Rollup if your target is either a [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) or UMD format. For example, the following code works fine if loaded as a module (i.e. `<script type="module"...`):

``` js
export default function () {
  import('./module.js').then((contents) => {
    /* do something with `contents` */
  });
}
```

...but, if we want this to be a _self-executing bundle_ that runs in the browser, such as an IIFE, how do we manage or load the relevant `module.js` chunk when needed?
 <!-- Rollup will use the dynamic import to create a separate chunk that is only loaded on demand -->

 It works out-of-the-box in webpack because webpack has a _runtime_ that it injects automatically into every bundle*. It's a little verbose and you may not always need it, so Rollup leaves it out by default. Omitting it greatly simplifies Rollup's codebase; it also makes sense as (at the time of writing) [> 90% of browsers](https://caniuse.com/es6-module) already support JS modules natively. However, if you _do_ need to dynamically load something in Rollup while supporting IE11 et al., there is an easy solution.

 ## SystemJS

[SystemJS](https://github.com/systemjs/systemjs) is a lightweight runtime for an application that takes care of resolving dependencies, leaving you free to import modules in a more idiomatic fashion. Conveniently, rollup can already export to the `SystemJS` format.

In our `rollup.config.js`:

``` js/4,10
export default [
  {
    input: 'src/main.js',
    output: {
      format: 'es',
      dir: 'js/',
    },
  }, {
    input: 'src/main.js',
    output: {
      format: 'system',
      dir: 'js/nomodule/',
    },
  }
  ...
```
{% note %}
* we use the same entry point in both instances
* the second config option uses the `system` format
{% endnote%}

Then, in our markup, we leverage the `type="module"` and `nomodule` flags on our `<script>` nodes. If the browser knows how to deal with an ES module, it will; otherwise, we load the `SystemJS` runtime plus the  special bundle we created for it.

``` html
<script type="module" src="/js/main.js"></script>
<script nomodule src="https://unpkg.com/systemjs@6.8.3/dist/s.min.js"></script>
<script nomodule>System.import('/js/nomodule/main.js');</script>
```

This will work across browsers while still allowing you to write code that leverages ES6-style imports natively. The resulting bundles will be leaner and devoid of the boilerplate that was previously included.

Lastly, this helps circumvent a particular class of script execution errors -- the runtime errors that occur when, using webpack, you forget to include a necessary chunk on a page. In these instances, there are no warnings nor indications in the console that something is amiss, just ...nothing... as webpack won't execute the entry point. (I've lost many an hour trying to debug this). Utilizing native modules, though, provides better insights when something doesn't load or cannot be found.


<hr>

<sup>* This code, which you've likely seen, is an example of that runtime
``` js
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
...
```
</sup>