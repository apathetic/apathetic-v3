---
title: Overflowing menus and IntersectionObserver.
description: A responsive menu that dynamically tucks away overflowing items
tags: [css, js]
---

# Overflowing menus and IntersectionObserver

> tl;dr A responsive horizontal menu whose items will not overflow. Instead, overflowing items are dynamically tucked away into a dropdown menu item.

## Overview

We designed our secondary navigation so as to dynamically display as many navigation items as can fit horizonally across the page, _space permitting_. Those that cannot fit are instead neatly tucked away into a "more" dropdown. I've noticed that a few other [sites](https://www.bbc.com/) now have similar approaches, and thought I'd provide an overview of a possible implemententation.


![GitHub Logo](/static/images/responsive-menu.svg "title")


This all works by using the *Intersection Observer* API.

## Example

Quickly jump to a <a href="https://codepen.io/apatheticwes/pen/NWRooYP" target="_blank">live demo</a> before diving in.

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
{% note %}
A few salient details:
* we've set `flex-wrap: nowrap` so that the items continue horizontally
* `inline-flex` so that the `ul` takes up just as much room as it needs
* the `pinned` class positions both the _dropdown_ and the _more_ elements absolutely on the right edge. We'll show / hide both as needed
* a few minor helper classes (`.invisble` and `.hidden`) for showing hiding things.
* you also might be wondering about the `transform` on the `div`. We'll come to that...
{% endnote %}

Also, notice how we have _both_ visibility hidden and display none helpers, here. This is important. When we remove an item from the navigation, we want to leave it in the document so that it may continue to trigger the Intersection Observer. We use `visibility:hidden` for this. Contrast it to `display:none`, which is used to remove an element (and its children) from the layout completely.


For the JS, we first set up some references to the DOM nodes we'll need handles to:

 <!-- This is a slightly abridged version for clarity. A working version can be [found here](https://codepen.io/apatheticwes/pen/eYdLRZY). -->

``` js
const nav = document.querySelector('nav');
const dropdown = document.querySelector('ul.dropdown');
const more = document.querySelector('div.more');
const items = document.querySelectorAll('li');
const list = document.querySelector('ul.menu');
const button = document.querySelector('button');
```

The core logic, which contains the "toggle" logic, and the callback for the IntersectionObserver:
``` js/1,7,20
let isOverflowing = false;
const clones = new WeakMap();
const listWidth = list.getBoundingClientRect().width;
const moreWidth = more.getBoundingClientRect().width;

const options = {
  root: nav,
  threshold: 1,
};

const toggle = (entry) => {
  const hide = (entry.intersectionRatio < 1);
  const item = entry.target;
  const clone = clones.get(entry.target);

  item.classList.toggle('invisible', hide);
  clone.classList.toggle('hidden', !hide);
};

const callback = (entries) => {
  isOverflowing = entries.some(i => i.rootBounds.width < listWidth);
  more.classList.toggle('invisible', !isOverflowing);
  entries.forEach(toggle);
};

const navIO = new IntersectionObserver(callback, options);
```
{% note %}
* a `WeakMap` is used to store clones of the overflowing nav items, which are set up below
* a threshold of 1 means: trigger when any child is _not_ 100% contained (i.e. < 1)
* each `entry` in the callback is an object that contains a few useful items. We use `rootBounds` to know what the parent boundingClientRect is
{% endnote %}

And, the initialization:
```js/0,3-5
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
{% note %}
* we reserve an amount of margin equal to the dropdown button
* we also `clone` each nav item and insert them into the dropdown, keeping a reference to each in our WeakMap
{% endnote %}

At this point, things actually work pretty well. Though, there is one minor detail that may be an issue -- or not -- depending on your use-case. When the viewport is shrinking, each intersection is detected on the _right_ edge of each nav item. When the viewport expands, though, this means we "miss" the intersection of the last item until we're beyond it. That is to say, when the right edge of the last nav item is clear of the bounding container.

It's not a huge deal (as we wouldn't expect the user to be frequently resizing the viewport) but more importantly, the menu still works fine. To hide the overflow dropdown again, the user would need to resize a little beyond the bounding nav container in order to trigger the intersection.

If we did want to address this, though, we could get fancy by keeping track of widths and margins and updating offsets dynamically (yuck), but it's far simpler to have an addtional IntersectionObserver, instead. We'd need to detect intersections on the bounding nav container, and also on an "adjusted" bounding nav container -- one with the width of the dropdown button taken into consideration:

``` js
  let isOverflowing = false;
  let isIntersecting = false;
  // ...

  const navIO = new IntersectionObserver((entries) => {
    isOverflowing = entries.some(i => i.rootBounds.width < listWidth);
    isIntersecting = entries.some(i => i.intersectionRatio < 1);

    more.classList.toggle('invisible', !isOverflowing);
    (isOverflowing == isIntersecting) && entries.forEach(toggle);
  }, options);

  const moreIO = new IntersectionObserver((entries) => {
    isOverflowing && entries.forEach(toggle)
  }, {
    ...options,
    rootMargin: `0px -${ moreWidth }px 0px 0px`
  });
```
{% note %}
* we no longer need to set a CSS var to reserve margin
* we extend our options in the second IntersectionObserver, using a negative `rootMargin` instead
* both IntersectionObservers will call the same `toggle` method (from above) upon intersection. The logic for this (isIntersecting, isOverflowing) is discussed in the next section

{% endnote %}

Finally, we need to make sure we observe both:
``` js
  items.forEach(li => {
    // lines removed for brevity
    navIO.observe(li);
    moreIO.observe(li);
  });
```

## Discussion

The approach in the first version uses a CSS var to dynamically set a margin on the containing nav element, which is equal to the width of the `more` overflow toggle. This way, the overflow toggle is able to sit in the free space created, floating at the edge of the parent element. Then, when any items intersect (i.e. any element is less that 100% contained), we toggle `isOverflowing` to true and use it to 1) show the overflow dropdown and 2) add a right-margin equal to the width of the dropdown.

The example with two IntersectionObservers foregoes this approach, though, using a constant negative `rootMargin` on one of the observers instead. The _offset-adjusted_ observer detects intersections offset by the `more` button width and is used to manage the display of nav items (as before), while the _non-offset_ one is used to simply activate / deactivate the overflow dropdown at the correct time. For this, an `isIntersecting` variable tracks when a nav item is intersecting, which, when used in tandem with the `isOverFlow` variable, can be used to activate the `more` dropdown accordingly. We use `isOverflowing == isIntersecting` as a trick for when to turn it on (both true) and off (both false).

## Demos

[Basic demo](https://codepen.io/apatheticwes/pen/eYdLRZY)
[Edge-adjusted](https://codepen.io/apatheticwes/pen/NWRooYP)
