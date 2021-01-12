---
title: An Overflowing Menu with IntersectionObserver.
description: a simpler approach
tags:
  - post
  - vue3
---

# Overview
# Implementation
# Discussion


We designed our secondary navigation to dynamically display nav items horizonally across the page. The algorithm tries to accommodate as many navigation items as can fit, _space permitting_, while those that cannot are instead neatly tucked away into a "more" items dropdown. I've noticed that a few other [sites](https://www.bbc.com/) now have similar approaches, and thought I'd provide a quick demo.

This all works by using the *Intersection Observer* API

## Implementation

First, a simple structure to house our navigation.
```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Products</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Locations</a></li>
    <li><a href="#">Blog</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

And a few display details to make it run horizontally. A few salient details:
* we've set `flex-wrap: nowrap` so that the items continue horiz
* `inline-flex` so that the `ul` takes up just as much room as it needs
* ...
We're also assuming you have a reset somewhere, and have styled your lists appropriately.

```css
ul {
  display: inline-flex;
  flex-wrap: nowrap;
  flex-direction: row;
}

li {
  margin: 0 0.5em;
}
```

And the JS
```javascript
const nav = document.querySelector('nav');
const items = document.querySelector('ul');

const callback = (entries) => {
  isIntersecting = entries[0].intersectionRatio < 1;
};
const options = {
  threshold: 1 // we want to know when the child is _not_ 100% contained (i.e. less than 1.0)
},
let isIntersecting = false;


if ('IntersectionObserver' in window) {
  new IntersectionObserver(callback, options).observe(items);
}

```

### Demo

https://codepen.io/lebbers/pen/aKYzbq