---
title: Enforcing Application Data Integrity
descripion: "_Type guards_ or models in an application's services layer"
tags: draft
---

> We can ensure key parts of our app are _known quantites_ ie. conform to a particular shape / contract. But what about at runtime?

??? IN LIEU of GRAPHQL query schemas. !!

tl;dr

validation and enforce data entering app

- type guards
- tests

## Benefits of enforcing Data Integrity

this keeps templates and components light. We shold not need multiple checks in a template ie

- <address> { {  customer && customer.address && customer.address.city } } </address>```
- rather... we should already assume -customer- object has the desired fields (b/c we've enforced "upstream" and have tests around this)
- there are mutliple benefits:
- keeps code lightwerigh
- smaller code "surface area"
- more maintainable
- easier to "grok" and therefore iterate on
- these kinds of "checks" and extra cruft add up. Be hyper-vigilant about keeping them under wraps

dealing w/ bugs.

- lots of bugs arise b/c of data inconsistently. We have a _tonnne_ of "Cannot read JSON in position 0" bugs

-->






when we receive data from an enpoint:

```
import Thing from './thing';

return session
  .get(url)
  .then((response) => {
    return new Thing(response);
  });
```

```
class Thing() {
  constructor(data) {
    // this.foo = data.xxxx.foo
    // this.bar = data.xxx / 10;
    // etc.
  }
}
```