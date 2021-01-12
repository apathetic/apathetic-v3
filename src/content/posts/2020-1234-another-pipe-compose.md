---
title: Function composition
description: Writing your own `compose` function
tags: post
---

What is compose and pipe?

we want to run a function, takes its output, and use it as input to a subsequent function. Rinse and repeat
We might have two funcitons in the chain, or twenty.
pipe / compose are an elegant way to right this

without:
var a = "...";
var b = fn1(a);
var c = fn2(b);
var d = fn3(c);

we want it to look like: `runAllFunc(input) = compose(fn1, fn2, fn3);


naive approach:
```
const compose = (fn1, fn2, fn3) => {
   return (a) => {
    const b = fn1(a);
    const c = fn2(b);
    const d = fn3(c);
    return d;
  }
};
```
Well, it runs. but it has to take three functions, no less no more.  TO generalize that:


first pass:
overwrite an `input` variable with the results from running each fn
```
const compose = (...fns) => {
  return (input) => {
    fns.forEach((fn) => {
      input = fn(input);
    });
    return input;
  }
};
function compose(...fns) {
  return function(input) {
    fns.forEach((fn) => {
      input = fn(input);
    });
    return input;
  }
};
```

// next pass. Nicer with reduce.
const compose = (...fns) => {
   return (input) => fns.reduce((result, fn) => {
     return fn(result);
   }, input);
 };



// final pass. You'll often see pipe in this format. It's not really readable, and sacrifices comprehensibility for terseness. For a utility function, that's common.
You would never be expected to edit something like this; the docs should be fine, demonstrating usage where it's pulled in.
```
const pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);
```

like this:

let thing = compose(fn1, fn2, fn3)('...');







//
// var asciiQrcodeFromInput = compose(
//   asciify,
//   qrencode,
// );
//
// asciiQrcodeFromInput(image);



async function asciify(input) {
  const { stdout, stderr } = await syncExec('jp2a ./ASS/tests/wes.jpg');

  if (stdout) {
    return stdout;
  }

  if (stderr) {
    return stdout;
  }

  // return stdout || stderr;
}

async function qrencode(input) {

  const { stdout, stderr } = await syncExec('qrencode -t ansiutf8 < ./ASS/ascii.js');

  return stdout;
}

    // in composed bits:
    // const ascii = await asciify(data);
    // const qrcode = await qrencode(ascii);
    //
    // or
    //
    // result = compose(asciify, qrencode)(data);
