---
title: Using Schemas.
description: "How we may abstract away non-critical set-up data into easily-consumable data structures."
tags: vue
---

# Using Schemas

> tl;dr Ideally, top-level components (page / wrapper / what-have-you) should be thin and lightweight. Schemas are one trick to help minimize code complexity, allowing one to quickly understand the organization and function of a page.


## The why: managing complexity

We have a lot of complexity in our client-side applications these days. Luckily, we have a number of top-notch frameworks to help us manage it. However, while these frameworks are great for managing _architectural_ complexity, they take somewhat of an un-opinionated stance on how we leverage the tools on offer; how we manage state, what we put into a component, and how we abstract functionality away are left to the devices of the developer.

While JS frameworks encourage in-component organization through the creation of child-components, when it comes to data structures the choices become a little murkier. Without _some_ guardrails in your app, though, you'll likely bear witness to spaghetti code and structures finding their way into the codebase. One approach for managing code complexity that has worked extremely well for me is _schema-ifying_ all the things.

<!-- Luckily, we, as devs, love to organize things. Often to this end we might tweak things to make them consistent, or abstract away common functionality.  -->

Like child components, organizing code structures into schemas has several immediate benefits. Components become a lot more readable on their surface, and it's easy to understand where logic lives and what it does.

## The what: some guardrails

So, what is a schema (in this context), exactly?  Essentially, a large-ish object or data structure that is used at runtime to provide the view with a particular chunk of data. It's not stateful, yet in some situations it might be dynamically instantiated at page-load _using_ the state. Candidates include ancillary data, set-up data, or configuration structures that define how the application should behave at runtime. Once it's created, it's essentially static, though.

A few specific examples that we'll look at in turn, are:

* **filters**: dynamically generated filters and filter options
* **sorting**: large sets of sorting options and their logic
* **validations**: many validation libraries use schema-based rules
<!-- * **analytics** tracking schemas, dynamically injected into a page -->

## The how: some code

As the objective is to simplify the organization of our app, we can keep my schemas in a folder next to where they're used. I use the following folder structure:

```
MyPage
├── _schemas/
│   ├── filters.js
│   ├── validation.js
│   └── sorting.js
├── page.js
└── page.css
```

The goal is to clean up our components, moving large set-up data structures out.

As for the schema itself, the basic idea is simple: a function that returns an object when needed. A simple sorting schema would look like:

``` js
export function sortSchema() {
  return Object.freeze({
    asc: { sortBy: 'name' },
    desc: { sortBy: 'name', sortDesc: true },
    // ...
```
{% note %}
* we use `Object.freeze` to ensure that the object remains static
* If we wanted we could also apply other transformations, such as internationalizing the copy, here.
{% endnote %}

<!-- {% tip %}
If we wanted we could also apply other transformations, such as internationalizing the copy, here.
{% endtip %} -->

{% tip %}
If you use TypeScript, you might do something like:

```
import { ISchemaItem } from '@/types';
export function exampleSchema(): Readonly<ISchemaItem[]> {
  // ...
```
{% endtip %}

This works fine if the structure is always known and deterministic. However, sometimes the fields and nested data that we need to generate are determined from the current application state. In this case, we can inject the state and use it to derive the required structure.
``` js
// schema.js
import store from '@/store';

export function exampleSchema() {
  const { user } = store.state;
  return Object.freeze([
    {
      // use the state to derive the object structure
    },
  ]);
}
```

{% note %}
* the `exampleSchema` function receives state upon instantiation
* not shown here, but we can then generate the required schema structure as needed
{% endnote %}


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
{% note %}
* because it's a function that depends on state, we import it under `computed`
* using `Object.freeze` will make Vue skip "reactifying" its contents
{% endnote %}

Let's see a few concrete examples.


### Sorting and Filtering

The ability to sort or filter on any moderately complex data-set, by specific fields or nested data, is a core piece of functionality in an app. If we do it client-side, the sorting criteria and filtering options must correspond to the fields _on hand_. These are usually different for each record.

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
{% note %}
* this function generates options and filtering logic for a set of filters in a component
* the filter options are generated dynamically from `company` state data: `company.license` and `company.salesRep` are arrays of objects (Not shown is the structure of each, though)
* we may filter by "licenseId" and "salesRepId" fields
* the type of the filter is defined as a `<select>` in both cases
* we define `attributes` for the actual filter component (`<select>`)
* there is a custom `fn` filter function in the second item
{% endnote %}

<!--
### Tracking user actions

A difficulty of any complex client-side application is managing the myriad of different tracking events required. Stakeholders, product managers, data analysts, client services, and even design will want to know certain things on a page. Usually, client-side code starts to get bogged down with tracking events

Wouldn't it be nice to remove all of that, and leave a clean, uncluttered DOM in its wake?
<!-- This would help separate out concerns -- we shoudnt' make concessions for tracking demands -- often times i'll see large swaths of code written and rewritten to accommodate a paticular event. DONT dO THIS.  Tracking considerations shoild _never_ override core code xxxx.  They are lower priority to core user X on the site (etc etc. scripts are deferred etc)
- - >
Instead, use a tracking schema where we can enter events, triggers and names, that is then programatically applied to a component.

```
  const trackingSchema = {
    onFilter: debounce((filters) => {
      const data = filters.filter(f => f.value !== undefined);
      track('Filters applied', { data });
    }, 1000),
    onSearch: debounce((term) => {
      track('Search Applied', { term });
    }, 1000),
  };
```
-->

### Validation

Client-side validation and, specifically, form validation often uses a schema-based approach to define the _validation rules_ on a page. There are a many different approaches, here. We borrow from the [most popular](https://vuelidate.js.org/):

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


<hr>
<sup>
* Note this is a liberal defintion of the word schema. Not the application state directly, but a blue-print from which a lot of the data is defined and hydrated at runtime.
</sup>
