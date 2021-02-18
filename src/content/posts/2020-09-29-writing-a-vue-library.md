---
title: Writing a Component Library for Vue.
description: challenges and learnings encountered along the way
tags: draft
---

# Writing a Component Library for Vue

> tl;dr Learnings and xxx from wwriting a fully-feature Component library.

I recently had the pleasure to lead development on a component library, and thought I'd share some learnings. There are many fine component libraries out there already, but there is an ever-increasing drive for a company or brand to assert its own particualr flavour and style of UI.

There are [better](https://atomicdesign.bradfrost.com/) [resources](https://www.invisionapp.com/inside-design/scale-design-systems/) out there that paint a more holsitc picture of the undertaking; but here are musings fromt eh technical side of things.

## Thoughts, considerations
approach.  If you're at a smaller company and bandwith / resources are at issues, it absolutely makes sense to adopt one of the many great UI libraraies out there. Over time, as xxx grow, it to start developing and implementing a custom component framework. how exciting!

## deliverables

architecture

- "core" parts
- à la carte
- services

core CSS? leverage prior art?


### Publishing the library

Once xxx it makes sense to publish to npm. Set yourself up a company account, and ....

There are a couple of ways to publish. I'd recommend the `xxxxx` from sindre sorhus. Or, manually like
`npm version patch`  // or minor, major, etc
`npm publish --access=public`

However, as this thing is used by multiplel folks, i ended up writing a custom publish script, and calling it via npm `npm run publish` (note the `run`, which distinguises it)



## Internal tooling
Bundling, rollup
- speed
- minification
- chunking. not using webpack...?

### Building the library. A History:

I explored several (equally mediocre) options. One thing to note is that most every other framework out there uses _render functions_ for their components; we dont. Therefore, our build pipeline is a lot more complex: we need a way to extract JS, HTML and CSS from a Vue SFC (i.e vue-loader) and process each independently. There are several paths:

1) Rollup: fast, easy to set up, outputs any format (modules included). There is a "prefer rollup for frameworks, webpack for applications" mentality in the JS community. Also, it seems more efficient at bundling things and it is officially supported by the Vue team. Several other Vue frameworks also seem to use it, including the new [renderless build pipeline](https://github.com/vuejs/vite/blob/master/src/node/build.ts) in Vue 3. Cons: it needs a million plugins to work.

2) Webpack: solid, robust, well-used. We're using it in a few places (marketplace, storybook), so there's a nice opportunity to share configs. Requires separate configs for different build pipelines, though, ie. entry and components bundles, and a few other plugins as well (i.e vue-loader). Crucially, does _not_ output ES modules (at present). WTH webpack.

3) Vue-CLI: why not use the Vue-CLI built on top of webpack? (If we ignore that we cannot output `esm` modules). We have a config for it and there'd be an opportunity to resue code. Well... it's not super configurable (in terms of generating a framework), in that it outputs every type of JS file (umd, common, etc) by default, _and HTML_. And, crucially, it is _slooow_.




## testing

## feedback (or, promoting it)
surfacing the current xxx in the system to interested parties. NOt jsut other devs or designers, but stakeholders, PMs, 3rd party vendors, etc.
- storybook
- documentation



------------------------


[Green-UI](https://github.com/apathetic/green-ui)






#### Scripts

All relevant build-things live in `scripts/`. The library will be generated upon `npm install leaflink-ui` in a consuming application. This, then, runs `build.sh`
We might keep a few other modalities for building the library around, in case things ever change. (OR - we scrap them if we're comfortable w/ Rollup to reduce noise). In `scripts/`, here's what each file is applicable to:

* **Rollup**: configs.js, rollup.config.js
* **Webpack**: webpack.conponents.js, webpack.config.js, babel.config.js
* **Vue CLI**: vue.config.js, babel.config.js
* **Jest**: babel.config.js, jest.config.js


## References:

* [atomic design](https://atomicdesign.bradfrost.com/)
* [scale design systems](https://www.invisionapp.com/inside-design/scale-design-systems/)