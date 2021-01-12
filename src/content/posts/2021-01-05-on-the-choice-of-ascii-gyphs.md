---
title: ASCII art
description: on the choice of glyph for ascii art
tags: post
---



* image divided up into squares
* each tile converted to greyscale
* the colour (greyness) of each tile _averaged_
* if we are using 16 "bits" (ie. characters) to represent, then the average is quantized along 1/16 steps
* next, find characters whose ratio of glyph to empty space approximates / comes cloesest to each step in 1/16 scale
  * ie. `.` not much dark/light area, maybe could be used for 1/16
  * ie; `#` much darker, maybe comes closest for 14/16 step

then, we find which glyphs' ratios come clostest to each step along the  brightness axis we've set up.  (ie. into 16 steps)


---

huffman or LWZ encoding the ascii art.

NOw, i wanted to send this in a URL.  The maximum size of aURL is, by the way, undefined. That means I could put 4 GB of query params into a URL if I wanted. Granted, Crhome wold crash first, but what's stopping us from storing "meaningful" amounts of data in there?
"Meaningful" being -- MY ASCII ART.

now, huffman / lwz won't do much if the character set is fairly random and w/ and equal distribution. it works better with text (and greater occurences of common letters). It'll work _even better_ on sequences of a _limited character set_ -- my gradient ascii glyphs.
we are, in effect _upsampling_ our bit rate. a way to encode from 16 "bits" (or, gl....