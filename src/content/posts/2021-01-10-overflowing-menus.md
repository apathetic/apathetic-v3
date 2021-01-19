---
title: An Overflowing Menu with IntersectionObserver.
description: a simpler approach
tags: post
---

# Example
# Overview
# Implementation
# Discussion

[Demo](https://codepen.io/apatheticwes/pen/NWRooYP?editors=0010)

We designed our secondary navigation so as to dynamically display as many navigation items as can fit horizonally across the page, _space permitting_. Those that cannot fit are instead neatly tucked away into a "more" dropdown item. I've noticed that a few other [sites](https://www.bbc.com/) now have similar approaches, and thought I'd provide an overview of a possible implemententation.

This all works by using the *Intersection Observer* API.

## Implementation

First, a simple structure to house our navigation. You'll note that the `more` dropdown item is present, although it is hidden.
``` html
<nav>
  <ul class="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Products</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Locations</a></li>
    <li><a href="#">Blog</a></li>
    <li><a href="#">Contact</a></li>
  </ul>

  <div class="more invisible">
    <button>More</button>
    <ul class="dropdown hidden"></ul>
  </div>
</nav>
```

And a few display details to make it run horizontally.
``` css
nav {
  position: relative;
}

ul.menu {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

div.more {
  flex: 0 0 auto;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(100%);
}

/* .hasMore {
  margin-right: var(--more-width);
} */

.dropdown {
  position: absolute;
  right: 0;
}

.invisible {
  visibility: hidden;
}

.hidden {
  display: none;
}

```

A few salient details:
* we've set `flex-wrap: nowrap` so that the items continue horizontally
* `inline-flex` so that the `ul` takes up just as much room as it needs
* the `dropdown` is positioned absolutely, and lives on the right edge. We'll show / hide it as needed
* a few minor helper classes for showing hiding things.
* you also might be wondering about the `transform` on the `div`. We'll come to that...

Note: we have _both_ visibility hidden and display none helpers here. This is important. When we remove an item from the navigation, we want to leave it in the layout so that it may continue to trigger the Intersection Observer. We use `visibility:hidden` for this.



And the JS. This is a slightly abridged version for clarity. A working version can be [found here](https://codepen.io/apatheticwes/pen/eYdLRZY).

Set up vars:
``` js
const nav = document.querySelector('nav');
const dropdown = document.querySelector('ul.dropdown');
const more = document.querySelector('div.more');
const items = document.querySelectorAll('li');
const list = document.querySelector('ul.menu');
const button = document.querySelector('button');

const listWidth = list.getBoundingClientRect().width;
const moreWidth = more.getBoundingClientRect().width;
```

The core logic:
``` js
let isIntersecting = false;
const clones = new WeakMap();

const options = {
  root: nav,
  threshold: 1, // when any child is _not_ 100% contained (i.e. < 1)
};

const callback = (entries) => {
  isIntersecting = entries.some(i => i.rootBounds.width < listWidth);
  nav.classList.toggle('showMore', isIntersecting);
  more.classList.toggle('invisible', !isIntersecting);

  entries.forEach((entry) => {
    const hide = (entry.intersectionRatio < 1);
    const item = entry.target;
    const clone = clones.get(entry.target);

    item.classList.toggle('invisible', hide);
    clone.classList.toggle('hidden', !hide);
  });
};

const navIO = new IntersectionObserver(callback, options);
```
And, the initialization:
```js
nav.style.setProperty('--more-width', `${ moreWidth }px`);

items.forEach(li => {
  const clone = li.cloneNode(true);
  dropdown.appendChild(clone);
  clones.set(li, clone);
  navIO.observe(li);
});

button.addEventListener('click', (e) => {
  dropdown.classList.toggle('hidden');
});
```


This would actually work _almost_ fine.  When the viewport shrinks, each intersection is detected on the left edge of each nav item, and we can take appropriate action. however, when the viewport expands, we miss the intersection of the last item until we're beyond it.  It's not a huge deal... it just means that the overflow menu remains visible in a very particular edge case where there is room for the last menu item.

So, to have a more robust impelmentation, we need to detect intersections on each edge of each menu item. On the left edge for when the screen shrinks, and on the right edge for where were expanding.  Here's the updated code:




### Demo

https://codepen.io/lebbers/pen/aKYzbq