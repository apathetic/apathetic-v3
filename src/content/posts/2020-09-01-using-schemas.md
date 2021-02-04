---
title: Using Schemas.
description: "How we may abstract away non-critical set-up data into easily-consumable data structures."
---

# Using Schemas

> tl;dr Ideally, top-level components (page / wrapper / what-have-you) should be thin and lightweight. Schemas are one trick to help minimize code complexity, allowing one to quickly understand the organization and function of a page.


## The why: managing complexity

We have a lot of complexity in our client-side applications these days. Luckily, we have a number of top-notch frameworks to help us manage it. However, while these frameworks are great for managing _architectural_ complexity, they take somewhat of an un-opinionated stance on how we leverage the tools on offer; how we manage state, what we put into a component, and how we abstract functionality away are left to the devices of the developer.

While JS frameworks encourage in-component organization through the creation of child-components, when it comes to data structures the choices become a little murkier. Without _some_ guardrails in your app, though, you'll likely bear witness to spaghetti code and structures finding their way into the codebase. One approach for managing code complexity that has worked extremely well for me is _schema-ifying_ all the things.

<!-- Luckily, we, as devs, love to organize things. Often to this end we might tweak things to make them consistent, or abstract away common functionality.  -->

Like child components, organizing code structures into schemas has several immediate benefits. Components become a lot more readable on their surface, and it's easy to understand where logic lives and what it does.

## The what: some guardrails

So, what is a schema (in this context), exactly?  Essentially, a large-ish object or data structure that is used at runtime to provide the view with a particular chunk of data. It's not stateful, yet in some situations it might be _dynamically instantiated_ at pageload _using_ the state. Candidates include ancillary data, set-up data, or configuration structures that define how the application should behave at runtime. Once it's created, it's essentially static, though.

A few specific examples that we'll look at in turn, are:

* **filters**: dynamically generated filters and filter options
* **sorting** large sets of sorting options and their logic
* **analytics** tracking schemas, dynamically injected into a page
* **validations** many validation libraries use schema-based rules

## The how: some code

First, as the objective is to simplify the organization of our app, I like to keep my schemas in a folder next to where they're used. I have the following structure in my set up:

```
MyPage
├── _schemas/
│   ├── filters.js
│   ├── validation.js
│   └── sorting.js
├── page.js
└── page.css
```

asfsa s  saf sddf s axxxxxxx x x x x x x x x x x
x

x

x

x

x

We have two types of schema: those that are static and those that are generated dynamically. The static ones take the form of an ojbect (ie. validation schemas);

The dynamic ones use the following format:


``` js
// schema.js
import store from '@/store';

export function exampleSchema() {
  const { user } = store.state;
  return Object.freeze([
    {
      // some dynamic calculation, here, using `user` state
    },
  ]);
}
```
Note
* the (dynamic) schema receives state upon instantiation....
* ... we inject the current state of the app. The schema can use what it needs uppon instnatiation
* we user Object.freeze our schemas to enforce / ensure this distinction / that they remain static


{% tip %}
If you use TypeScript, you might do something like:

```
import { ISchemaItem } from '@/types';
export function exampleSchema(): Readonly<ISchemaItem[]> {
```
{% endtip %}

Then, we leverage it in a component. In Vue, we now have a computed structure that corresponds to the user's state:

``` js
  import { exampleSchema } from '@/path/to/schema';

  export default {
    computed: {
      // this schema object was generated
      // dynamically for this particular user:
      exampleSchema,
      // ...

```
Note:
* because it's a function that depends on state, we import it under `computed`
* using `Object.freeze` will make Vue skip "reactifying" its contents


Let's see a few concrete examples.


### Sorting and Filtering

The ability to sort or filter on any moderately complex data-set, by specific fields or nested data, is a core piece of functionality in an app. If we do it client-side, the sorting criteria and filtering options must apply to the fields _on hand_. These are usually different for each record.

Let's generate a filtering schema for an arbitrary number of companies, each with their own licences and sales reps:

``` js
import store from '@/store';

export function filterSchema() {
  const { company } = store.state;

  return Object.freeze([
    {
      label: 'Licenses',
      filterBy: 'licenseId',
      type: 'select',
      attributes: {
        multiple: true,
        options:
          company.licenses.map((l) => ({
            ...l,
            name: `${l.name} (${l.id})`,
          })),
        },
      }
    }, {
      label: 'Sales Rep',
      filterBy: 'salesRepId',
      type: 'select',
      fn: (selectedfilters, items) => {
        return !!selectedfilters.filter((f) => items.includes(f)).length;
      },
      attributes: {
        multiple: true,
        options: company.salesReps
      },
    }
  ]);
```
Note:
* this function generates options and filtering logic for a set of filters in a component
* the type of the filter is defined as a a `<select>` in both cases
* we are filtering the company data by "licenseId" and "salesRepId" fields
* we define `attributes` for the actual filter component (`<select>`)
* the filter options are generated dynamically from company data in the state.
* there is a custom `fn` filter function in the second item

{% tip %}
If we wanted we could also apply other transformations, such as internationalizing the copy, in this filter function.
{% endtip %}

### Tracking user actions

A difficulty of any complex client-side application is managing the myriad of different tracking events required. Stakeholders, product managers, data analysts, client services, and even design will want to know certain things on a page. Usually, client-side code starts to get bogged down with tracking events<!-- and look like this: ({TODO tracking code everywhere image}) -->

Wouldn't it be nice to remove all of that, and leave a clean, uncluttered XXX in its wake?  This would help separate out concerns -- we shoudont' make concessions for tracking demands -- often times i'll see large swaths of code written and rewritten to accommodate a paticular event. DONT dO THIS.  Tracking considerations shoild _never_ override core code xxxx.  They are lower priority to core user X on the site (etc etc. scripts are deferred etc)

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

### Validation

Client-side validation and, specifically, form validation often uses a schema-based approach to define the _validation rules_ on a page. There are a many different approaches, here. We borrow from the most popular, and simply layer / provide our set-up schema.

An example validation schema:
```
export const schema = {
  username: {
    required,
    minLength: minLength(3),
  },
  email: {
    required,
    email,
  },
  password: {
    required,
  },

```

I will talk more about this [in a future post](/content/posts/2020-09-22-validation/)







* Note that I'm taking a liberal defintion of the word schema, here. To be clear, i'm not talking about application _state_ directly.

** also note... we're somewhat bending the concept of schema -- in addition to a "blue-print"... a lot of the data _for_ the blueprint is defined and hydrated at runtime.
