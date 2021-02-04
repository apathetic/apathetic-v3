---
title: An overflowing menu with IntersectionObserver.
description: a simpler approach
tags: post
---

## Example

Quickly jump to a <a href="https://codepen.io/apatheticwes/pen/NWRooYP" target="_blank">live demo</a> before diving in.

## Overview

We designed our secondary navigation so as to dynamically display as many navigation items as can fit horizonally across the page, _space permitting_. Those that cannot fit are instead neatly tucked away into a "more" dropdown. I've noticed that a few other [sites](https://www.bbc.com/) now have similar approaches, and thought I'd provide an overview of a possible implemententation.


![GitHub Logo](/static/images/responsive-menu.svg "title")






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

  <div class="more pinned invisible">
    <button>More</button>
    <ul class="dropdown pinned hidden"></ul>
  </div>
</nav>
```

And a few display details to make it run horizontally.
``` css
nav {
  --more-width: 0;
  position: relative;
  margin-right: var(--more-width);
}

ul.menu {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

div.more {
  flex: 0 0 auto;
  transform: translate(100%);
}

.pinned {
  position: absolute;
  top: 0;
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
* the `pinned` class positions both the _dropdown_ and the _more_ elements absolutely on the right edge. We'll show / hide both as needed
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

const toggle = (entry) => {
  const hide = (entry.intersectionRatio < 1);
  const item = entry.target;
  const clone = clones.get(entry.target);

  item.classList.toggle('invisible', hide);
  clone.classList.toggle('hidden', !hide);
};

const callback = (entries) => {
  isOverflow = entries.some(i => i.rootBounds.width < listWidth);
  more.classList.toggle('invisible', !isOverflow);
  entries.forEach(toggle);
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


This actually work pretty well. There is one minor detail that may be an issue, or not, depending on your use-case. When the viewport shrinks, each intersection is detected on the _left_ edge of each nav item, and we take appropriate action. However, when the viewport expands, we "miss" the intersection of the last item until we're beyond it. It's not a huge deal, we wouldn't expect the user to be frequently resizing the viewport, and the menu still works fine. It just means the user needs to resize a little beyond the menu in order to reset the overflow's visibility.

However. If we wanted a more robust impelmentation, we'd need to detect intersections on each edge of each menu item. On the left edge for when the screen shrinks, and on the right edge for when it expands. We could get fancy with detecting widths and margins, and updating dynamically, but it's far simpler to have an addtional IntersectionObserver, instead. Here's the updated code:

``` js
  const navIO = new IntersectionObserver(
    (entries) => {
      isOverflow = entries.some(i => i.rootBounds.width < listWidth);
      isShrinking = entries.some(i => i.intersectionRatio < 1);
      more.classList.toggle('invisible', !isOverflow);
      (isOverflow == isShrinking) && entries.forEach(toggle);
    },
    options
  );

  const moreIO = new IntersectionObserver(
    (entries) => {
      isOverflow && entries.forEach(toggle)
    },
    { ...options, rootMargin: `0px -${ moreWidth }px 0px 0px` });
```
``` js
  items.forEach(li => {
    // lines removed for brevity
    navIO.observe(li);
    moreIO.observe(li);
  });
```

And, the [demo](https://codepen.io/apatheticwes/pen/NWRooYP).


## Discussion

The approach in the first, simpler version, uses a CSS var to dynamically set a margin on the xxxx, which is equal to the width of the `more` overflow toggle. This way, it sits in the free space created, and "floats" at the edge of the parent element.

The example with multiple IOs foregoes this approach, and instead detects if the viewports was "shrunk" down (ie. the var `isShrinking) or not. It does this by checking if the intersection ratios of any element are < 1. If so, it means we crossed the right edge of the element, and are proceed "leftwards". xxx a diagram here xxx.  Since we want the last item to return xxx when the viewport expands past it, we use isOverflow == isShriking as trick -- they'll both be false for the very last itme; we would only need just isShrinking otherwise.


## Demos

[simple](https://codepen.io/apatheticwes/pen/NWRooYP)
[complex](https://codepen.io/apatheticwes/pen/eYdLRZY)
