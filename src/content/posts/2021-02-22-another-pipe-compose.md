---
title: Function composition
description: Writing your own `compose` function
tags: draft
---

What is compose and pipe?

So, we want to run a function, take its output, and use it as input to some subsequent function. Rinse and repeat.
We might have two functions in this "chain" of functions, or twenty. In a nutshell, this looks like:

``` javascript
var a = "my input";
var b = fn1(a);
var c = fn2(b);
var d = fn3(c);
```

Obviously, this doesn't scale well. We'd like a way that offers more flexibility. Pipe and compose are an elegant way to solve this.

Conceptually, we'd want to rewrite the previous snippet to look something like:

`runAllFunc("my_input") = compose(fn1, fn2, fn3);`

Here, we'd create a "meta" function, `runAllFunc` that is comprised of a chain of fns....
How would we write the `compose` function to accommodate this?

naive approach:

``` javascript
const compose = (fn1, fn2, fn3) => {
   return (a) => {
    const b = fn1(a);
    const c = fn2(b);
    const d = fn3(c);
    return d;
  }
};
```

Well, it runs. but it has to take three functions, no less no more. Lets first generalize that:

1. First Pass:
Let's collapse that list of fn's to a `forEach` loop.  Now, we need just a single variable to hold the output from each. Here, it's `input` (it'd be `a` in the above ex.). It'll get continually updated with the result from running each fn but note it is also the input to the next.

``` javascript
const compose = (...fns) => {
  return (input) => {
    fns.forEach((fn) => {
      input = fn(input);
    });
    return input;
  }
};
```

2. Next pass

Let's clean it up a bit. It could be nicer with `reduce`.

``` javascript
const compose = (...fns) => {
  return (input) => fns.reduce((result, fn) => {
    return fn(result);
  }, input);
};
```

3. Final pass.

You'll often see compose/ pipe in this format. It's not really readable and sacrifices comprehensibility for terseness. For a utility function, that's common.
You would never be expected to edit something like this; the docs should be fine, demonstrating usage where it's pulled in. `x` is our input, and `v` is value, the holder for the internal result

``` javascript
const compose = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);
```

like this:

let thing = compose(fn1, fn2, fn3)('my input');

//
// var asciiQrcodeFromInput = compose(
// asciify,
// qrencode,
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
