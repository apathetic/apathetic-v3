---
title: Writing a vue library.
description: challenges encountered along the way
tags: draft
---

Thoughts, considerations

- deliverables

architecture

- "core" parts
- à la carte
- services

Bundling, rollup
-speed

- minification

chunking

not using webpack...?

testing



------------------------


[Green-UI](https://github.com/apathetic/green-ui)



### Publishing the library

#### Pre-requisites
* [ ] an npm account
* [ ] access to the `developers` group in the `@leaflink/leaflink-ui`
* [ ] have an `NPM_API_KEY` env var set

#### Steps

1. `npm run publish` (<small>note: don't leave out the `run` in this command</small>)

2. Follow the command prompts
3. Done.


### Building the library. A History:

I explored several (equally mediocre) options. One thing to note is that most every other framework out there uses _render functions_ for their components; we dont. Therefore, our build pipeline is a lot more complex: we need a way to extract JS, HTML and CSS from a Vue SFC (i.e vue-loader) and process each independently. There are several paths:

1) Rollup: fast, easy to set up, outputs any format (modules included). There is a "prefer rollup for frameworks, webpack for applications" mentality in the JS community. Also, it seems more efficient at bundling things and it is officially supported by the Vue team. Several other Vue frameworks also seem to use it, including the new [renderless build pipeline](https://github.com/vuejs/vite/blob/master/src/node/build.ts) in Vue 3. Cons: it needs a million plugins to work.

2) Webpack: solid, robust, well-used. We're using it in a few places (marketplace, storybook), so there's a nice opportunity to share configs. Requires separate configs for different build pipelines, though, ie. entry and components bundles, and a few other plugins as well (i.e vue-loader). Crucially, does _not_ output ES modules (at present). WTH webpack.

3) Vue-CLI: why not use the Vue-CLI built on top of webpack? (If we ignore that we cannot output `esm` modules). We have a config for it and there'd be an opportunity to resue code. Well... it's not super configurable (in terms of generating a framework), in that it outputs every type of JS file (umd, common, etc) by default, _and HTML_. And, crucially, it is _slooow_.


#### Scripts

All relevant build-things live in `scripts/`. The library will be generated upon `npm install leaflink-ui` in a consuming application. This, then, runs `build.sh`
We might keep a few other modalities for building the library around, in case things ever change. (OR - we scrap them if we're comfortable w/ Rollup to reduce noise). In `scripts/`, here's what each file is applicable to:

* **Rollup**: configs.js, rollup.config.js
* **Webpack**: webpack.conponents.js, webpack.config.js, babel.config.js
* **Vue CLI**: vue.config.js, babel.config.js
* **Jest**: babel.config.js, jest.config.js

