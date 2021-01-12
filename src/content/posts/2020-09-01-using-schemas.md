---
title: Using Schemas.
description: "How we may abstract away non-critical set-up data into easily-consumable data structures."
tags:
  - post
---

# Using Schemas

> tl;dr Ideally, top-level components (page / wrapper / what-have-you) should be thin and lightweight. Schemas are one trick to help minimize code complexity, allowing any dev to quickly understand the organization and the function of the page.




## the why: managing complexity

We have a lot of complexity in our client-side applications these days. Luckily, we have a number of top-notch frameworks to help us manage it. However, while these frameworks are great for managing _architectural_ complexity, they take somewhat of an un-opinionated stance on how we leverage the tools on offer; how we manage state, what we put into a component, how we abstract functionality away, etc. are left to the devices of the developer.

I won't discuss approaches to all these issues herein, but without _some_ guardrails in your app, you'll likely bear witness to spaghetti code, structures, and logic finding its way into the codebase. One of the guardrails/items/things/ for managing code complexity that has worked extremely well for us, though, are _schemas_*.

<sup>* Note: I'm taking a liberal defintion of the word schema, here.</sup>

### benefits

Immediately, top-level page compoentns (and any component, really) ar e a _lot_ more clear. Additionally, it's easy to see where things are coming from (imported from), and their intent.


## the What:

To be clear, i'm not talking about application _state_, nor ... I'm talking about ancillary data, set-up data, or configuration structures that define how the application _behaves_ at runtime.  I
that are instantiated on page load are also nice  for this xxx as well.
## issues

NOte: this is not static data. Most of thie data sctructures require initialization at runtime, using state from the logged-in user. If


<!-- Vue has a nice diagram outlining organizational benefits in using its compositions API ({TODO} insert component diagram); something similar for this discussion would be (TODO: diagram with massive block of set up data / CONSTS, Objects / etc... leaving little room for the actual code) -->

so, what sort of things would be candidates for this?  Giant object structure, repeated set-up data that is used across pages, consts or data that is, essentially static*. It does not change, it does not represent state.

* we even Object.freeze our schemas to enforce this distinction

** also note... we're somewhat bending the concept of schema -- in addition to a "blue-print"... a lot of the data _for_ the blueprint is defined and hydrated at runtime.


## the how:

Luckily, we, as devs, love to organize things. Often to this end we might tweak things to make them consistent, or abstract away common functionality. Large data structures are also good candidates for this type of clean-up as well. The question is then: what qualifies and how do we accomplish it ?

### injecting state

All of our data structures take in state upon instantiation.   xxxxx  They are,e xxentlially, a d large data struct with _common_ fields but dynaimcally populated values as determined by..

<span>// path/to/schema.ts</span>
```javascript
import store from '@/store';
import { ISchemaItem } from '@/types';

export function exampleSchema(): Readonly<ISchemaItem[]> {
  const { user } = store.state;

  return Object.freeze([
    {
      // some dynamic calculation, here, using `user` if need be
    },
  ]);
}
```

```
  import { exampleSchema } from '@/path/to/schema';

  export default {
    computed: {
      exampleSchema, // this is generated dynamically and is specific for a particular user

```



### examples

* filters / sorting
* analytics / tracking
* validations


### Tracking user actions

A very common pitfall of any client side application of moderate complesity is managing the myriad of different tracking events requested by Product Managers, Data xxxs, Client services, Design (for data-driven design), stakeholders, and xxxx.  There are a lot of things that people want to track, and usually, client-side code starts to get bogged down with dxxx and look like this: ({TODO tracking code everywhere image})

wouldn't it be nice to remove all of that, and leave a clean, uncluttered XXX in its wake?  This would help separate out concerns -- we shoudont' make concessions for tracking demands -- often times i'll see large swaths of code written and rewritten to accommodate a paticular event. DONT dO THIS.  Tracking considerations shoild _never_ override core code xxxx.  They are lower priority to core user X on the site (etc etc. scripts are deferred etc)

Instead, we have a tracking "schema" that allows us to enter events / tiggers, names, etc.  that is then _programatically_ applied to a page. TODO TODO. (more details, here...)


```
  const trackingSchema = {
    trackFilters: debounce(function(state) {
      if (!this._priorState) {
        this._priorState = state;
        return;
      }

      trackFilter({ currentState: state, priorState: this._priorState, filterSchema: customerFilterSchema });

      this._priorState = state;
    }, DEBOUNCE.FAST),
    trackSearch: debounce((term) => {
      (term.length > 2) && track('Customer List Search Applied', { term });
    }, DEBOUNCE.FAST),
  };

```


note: another (similar0 tact is to apply analytics in the service-worker layer,


### Sorting and Filtering

One core piece of functionality of our application is the ability to sort or filter on select data-sets. The datasets are moderately complex arrays of objects, each with specific fields and nestedxxx.  The sorting criteria, and the filtering options, must apply to the fields in each record; XX

```
  return Object.freeze([
    {
      label: 'Licenses',
      filterBy: 'licenseId',
      type: 'select',
      attributes: {
        multiple: true,
        options:
          user.licenses.map((l) => ({
            ...l,
            name: `${l.name} (${l.id})`,
          })) || [],
        },
      },
    ...
  ]);
```



### Parsing File uploads

CSV upload validation


### Validation

client side validation, and, specivially, form validation.  There are a gajillion approaches, here.  _another one_? Well, we borrow from the best, but simply layer on our set-up via a schema.

one key advantage here is that the "validation" form object that is generated may be passed around.  Specifially, to our middlewear where we may hydrate it with server-generated errors if we need.

I will talk more abou this in a future post

