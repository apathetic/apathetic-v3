---
title: Client-side validation.
description: a simple approach
tags: vue
---

# Validation in Vue

> tl;dr Instead of a promise-based API for every asynchronous field in a form, a much more flexible approach is a single async `setError` method for the entire reactive form. This gives greater flexibility, significantly less code, and can be useful when integrating back-end validation messaging.

Play with it [HERE](https://apathetic.github.io/validation/)

This post originated from a need for a Vue 3 validation library. At the time of writing, there were not a lot of options, so I authored my own. It's inspired in part by Vuelidate, but I'm sure the landscape has certainly changed since. However, a few unique features of this one are:

- **Schema-based**. Simple rules and validation structure
- **Flexible**. Multiple ways to set-up the validation composable
    - lean: import both rules and values from the schema config. Or...
    - no "black box" set up: use the component's data directly with imported rules
- **Reactive**. User input triggers validation and display updates
- **Extensible**. Easy to override and add new rules
- **De-coupled**. The reactive validation object can be injected directly into your actions
- **Agnostic**. Can consume validation errors generated from server or client
    - client-side: validators from Vuelidate are leveraged (sharing prior-art)
    - server errors: may also be used to hydrate the validation composable. Uses the JSON error format by default


## Overview

The validation framework described herein leverages the Vue 3 [composition API](https://v3.vuejs.org/guide/composition-api-introduction.html) to produce a _reactive form object_. This object can then be consumed by any page component and used to automatically validate any user-entered data.

To get up and running, only two things are required: a set of `values`, and a set of `rules` to validate them. The values are usually the component's data, while the rules are a JSON-schema that define which inputs need validation, and how.

## Proof of concept

A working example can be found [HERE](https://apathetic.github.io/validation/).

Setting up a validation _schema_ is easy. Its structure is flexible enough such that we can bootstrap it in a variety of different ways, depending on the use-case.

### Option 1

Define both data `values` and its validation `rules` upfront, in an external schema.

``` js
// schemas/validation.js
const exampleValues = { /* the form data */ };
const exampleSchema = { /* validation rules for the above */ };

export function useExampleValidation() {
  return useValidation(exampleSchema, exampleValues);
}
```
Then, in your component:
``` js
// exampleComponent.vue
import { useExampleValidation } from '@/path/to/schemas';

export default {
  setup() {
    const { form } = useExampleValidation();
    return { form };
  };
}
```
{% tip %}
(Or if you're using Vue 2 + composition API)

```
import { useExampleValidation } from '@/path/to/schemas';
const { form } = useExampleValidation();

export default {
  computed() {
    form: () => form
  }
  // ...
```
{% endtip %}

The advantage of this set-up is simplicity; it's clean, easy, and quick. The disadvantage is that the component's data is not readily visible to the developer, which may then be opaque in the template.

### Option 2

Conversely, you may also set up the validation composable thusly:
- define the validation schema externally, _currying_ it into the exported `useValidation` composable
- `values` are instead hydrated in the component, using the `setValues` helper function

``` js
// schemas/validation.js
const exampleSchema = { /* validation rules */ };

export function useExampleValidation() {
  return useValidation(exampleSchema);
}
```
{% note %}
* no values are passed in; they'll be hydrated on component instantiation

{% endnote %}

Then, in your component:
``` js
// exampleComponent.vue
import { useExampleValidation } from '@/path/to/schemas';

export default {
  setup() {
    const { form, setValues } = useValidation(schema);
    const vals = setValues({
      name: '',
      email: '',
      // ...
    });

    return {
      form
    }
  }
}
```

In this case, the `vals` returned from `setValues` may be still be used in the component. The object is now reactively bound, and may be manipulated in parallel. Modifying `form` (or even `vals`) will trigger validation updates.

{% tip %}
(If you're using Vue 2 + composition API)

```
import { useExampleValidation } from '@/path/to/schemas';

const { form, setValues } = useExampleValidation();

export default {
  data() {
    return {
      form: setValues({
        name: '',
        email: '',
        // ...
      }),
    };
  },

  computed: {
    form: () => form,
  },

```

<!-- note: the object returned in `data` is "wrapped" by `setValues`. The object it returns is the same as was passed in (ie. not a copy), which has the advantage of enabling us to modify validation results _externally_ while the `form` will continue to be reactive in the component. This is discussed in <a href="">Portability</a>. -->

{% endtip %}



<!--

Another alternative:. In `beforeCreate`, we use the object returned from `setValues` to setup the computed `form` prop in the template. This is similar to how Vuelidate handles it, as well.

```
// exampleComponent.vue
import { useExampleValidation } from '@/path/to/schemas';

const { setValues } = useExampleValidation();

export default {
  data() ({
    values: {
      name: '',
      email: '',
    }
  }),
  beforeCreate() {
    this.$options.computed.form = setValues(this.values);
  },
  // ...

```

-->




<!-- ### aside: keeping a handle
This is made possible by "keeping a handle" the original object. Operations such as { ...} or return {} will return a reference to a newly created object, which limits our ability to mutate the underlying values down the road.


    Object.defineProperties(form, Object.getOwnPropertyDescriptors(validations));

`getOwnPropertyDescriptors` is a relatively unknown xxxx. It is the magic that allows us to _proxy_ (apply?) the input values, while still retaining a reference to them. ie. we update the object in place, vs. modifying it and returning a new one.  NOW, we can do ....   Also, this is the apprach Vue_2_ takes within its reactivity system (link)
 -->



## Portability

Once created, the composable creates a reactive object that may be bound to the view. The interesting thing is that this object may be used _elsewhere_ in your application, while still retaining reactive validation bindings to the component. Put another way, if we modify the validation composable elsewhere, the view will still automically update as desired.

This offers the unique opportunity to import the composable in your app's store or actions, where it may be used to hydrate server-side errors; any field or validation error that is updated here will automatically be surfaced in the template, with no further error handling needed.

This is accomplished with webpack's conditional imports, illustrated below. First, we create the validation object:
``` js
// schemas/index
const schema = { ... };
const values = { ... };
const exampleForm = useValidation(schema, values);

export { exampleForm };
```

...and use it in a component
``` js
// exampleComponent.vue
import { exampleForm } from '@/path/to/schemas';

export default {
  setup() {
    const { form } = exampleForm();
    return {
      form
    }
  }
}
```

Now, finally, in an action:
``` js
export const exampleAction = async ({ commit }) => {
  try {
    const exampleData = await api.settings.getExampleData();
    // ...
  } catch (error) {
    import('@/path/to/schemas/exampleForm') // WEBPACK conditional import.
      .then((exampleForm) => {
        exampleForm.setErrors(error);
      });
  }
};
```
Note that we conditionally load the module and hydrate only upon any error(s) originating from the server. That's it. We can now surface server errors directly in the page from here*.

## Details

`useValidation` creates a reactive form validation object. The generated object matches the shape of the _validation schema_, while each field is additionally decorated with the following five properties: `$model`, `$error`, `$dirty`, `$invalid` and `$errors`. For example:

``` js
"$model": "horace", // the data to be validated
"$dirty": false,
"$invalid": false,  // if _any_ of the validation rules fail
"$error": false,    // helper for: $invalid && $dirty
"$errors": [ ... ]
```

Additionally, all the validation rules for each field are provided as computed properties. In the following example, the field has three validators (is required, is an email, and meets the minimum length) and the response of each:
``` js
"required": true,   // passes required check
"minLength": false, // does not meet minLength criteria
"email": true,      // passes email validation
```

Note the similarities with [vuelidate](https://github.com/vuelidate), from which this structure was borrowed.


### Why not async...?
You may notice that there is no $pending nor it's equivalent, here. While many frameworks have provisions for a Promise-based validator _per field_, personally, I don't think it's necessary. If you need to hit an API for a valdiation, you'll be authoring an async request to do so regardless.

The approach with this framework is to use a single entry point, `setErrors`, for any asyncronous errors received from the server on its response. The `setErrors` function can then handle all responses with ambivalence -- whether they're generated server-side or client-side, mapping each back to the respective field.


### A Form-field helper Component

It's easy to create a form field helper that can be used to wrap common form elements -- selects, inputs, checkboxes, etc. Here, we create a simple wrapper that provides a slot for the aforementioned components, which normalizes the display of hint text, form labels, and errors.

``` html
<div :class="['input', {'has-error': hasError}]">
  <label class="input-label" v-if="label">{{ label }}</label>
  <slot v-bind="$attrs"></slot>
  <span v-if="text" class="input-hint text-small">{{ text }}</span>
</div>
```
``` js
export default {
  name: 'z-field',
  props: {
    hint: '',
    label: '',
    errors: () => [],
    disabled: false
  },

  computed: {
    hasError() {
      return !!(this.errors && this.errors.length);
    },

    text() {
      const { errors, hint } = this;
      return errors.length ? `${ errors[0].$message }` :
        hint ? hint :
        '';
    },
  },
};
```
``` css
.has-error .input-label {
  animation: 1s shake 1;
}
```

## References:

The `Validatable` idea draws inspiration from multiple sources.
* [Vue Composable](https://pikax.me/vue-composable/composable/validation/validation.html): Vue 3 composition API approach to
* [Vee Validate](https://logaretm.github.io/vee-validate/): Vue 3 composition API + "validation provider" component
* [Vuelidate](https://github.com/vuelidate/vuelidate/blob/master/src/index.js): for model based validation
* [Vuetify](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/mixins/validatable/index.ts): Array validation approach


<hr>
<sup>* There is the question of "mapping" the error back to the field. We presuppose two things: that the server response is in the JSON-error format (the framework will unwrap it and apply it to the corresponding field automatically if so), and that the pointer in the JSON-error is named the same as the field.</sup>
