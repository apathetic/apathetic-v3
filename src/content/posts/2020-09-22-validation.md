---
title: Client-side validation.
description: a simpler approach
tags:
  - post
  - vue3
---

# Validation in Vue


> tl;dr Instead of a promise-based API for every asynchronous field in a form, a much more flexible approach is a single async `setError` method for the entire reactive form. This gives greater flexibility, significantly less code, and can be useful when integrating back-end validation messaging.

## approach

The Validation composable is a _reactive form object_. This object is consumed by the page component and used in its template, where it will automatically validate any user-entered data.

It requires a set of `values` (ie. component data) and `rules` to validate the them. The rules are a JSON-schema that define which inputs on a page need validation, and how.


- challenges
- schema-based

- doesn't obscure `data` props. --> ie. nested away in a schema
- configurable, reactive
- "reactive form" object _can be exported_. Why? So we can hydrate it with any/all error response from the server _in one place_ vs. _per field_.

  - requires a mapping layer if server responses differ from form fields
  - handling json-error responses

- validators
- $dirty, $errors, \$invalid,
- context -- for validatiosn / comparisions across different fields
- Typescript


### why not async...?
Many frameworks have a Promise-based validator field. Personally, I don't think it's necessary. If you need to hit an API for a valdiation, just do it when the value is entered. The `setErrors` function can then handle all responses unambiguously and am...    The form may xx    This also



why not expose functions that can set props on the reactive form object ?

### keeping a handle
    Object.defineProperties(form, Object.getOwnPropertyDescriptors(validations));

`getOwnPropertyDescriptors` is a under-used, relatively unknown xxxx. It is the magic that allows us to _proxy_ the input values, while still retaining a reference to them. ie. we update the object in place, vs. modifying it and returning a new one.  NOW, we can do ....



## Proof of concept

A working example can be found HERE. At a Glance:

- Schema-based. Validation rules and structure may be imported, keeping the component lean
- Flexible. Simply provide the validation with rules + values
  - use the component's `data` as `values`, and provide rules elsewhere (no "black box" set up)
  - optionally, sweep away both rules and values into a schema config (for a very lean component)
- Reactive. Validation reacts to user input
- Extensible. Easy to override and add new rules
- Utilizes prior art. No need to author a new framework from scratch
- De-coupled. The reactive form-object can be injected _directly into the middleware_
  - In the middleware a `server-generated` error (in the JSON error format) may be used to _hydrate_ the validation object <sup>(now, we see how these prior efforts are coming together...)</sup>
<!-- - Optionated. May be _tightly integrated_ with the LeafLink UI. For example:
  - Dedicated wrappers (or "validation providers") such as `LL-Field`. -->
- Front-end / back-end "agnostic". The form-object can consume validation errors generated on either client or server
- Future-looking. Leverages Vue 3 composition API


Setting up a validation _schema_ is easy. Its structure is flexible enough such that we can bootstrap it in a variety of different ways, depending on our use-case.

### Option 1

- set up the `values` and their validation `rules` in an external schema, and import it.

```
// schemas/validation.js
const exampleSchema = { ... };
const exampleValues = { ... };

export function useExampleValidation() {
  return useValidation(exampleSchema, ExampleValues);
}
```

```
// exampleComponent.vue
import { useExampleValidation } from '@/path/to/schemas';

const { form } = useExampleValidation();

export default {
  computed() {
    form: () => form
  }
  // ...
```

The advantage in this set-up is simplicity; the disadvantage is that the component's values are not readily visible to the developer, which may be opaque in the template.

### Option 2

- use your page component's data as `values`.
- define the validation schema externally and "curry" them into the `useValidation` composable
- use the `setValues` helper from the composable to asynchronously add values when they're available

```
// schemas/index.js
const exampleSchema = { ... };

export function useExampleValidation2() {
  return useValidation(exampleSchema); // note: values will be injected in the component
}
```

```
// exampleComponent.vue
import { useExampleValidation2 } from '@/schemas';

const { setValues } = useExampleValidation2();

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

Note: in `beforeCreate`, we use the object returned from `setValues` to setup the computed `form` prop in the template. This is similar to how Vuelidate handles it, as well.

However, we can modify this slightly be wrapping the object returned in `data` (note: the setValues in the `data()` function), and relying on the reactive `form` object. This has the advantage of enabling us to modify validation results _externally_, while the `form` will continue to be reactive in the component. This is discussed in <a href="">Portability</a>.


```
<script>
  import { exampleForm } from '@/path/to/schemas';

  const { form, setValues } = exampleForm();

  export default {
    data() {
      return {
        form: setValues({
          name: '',
          email: '',
        }),
      };
    },

    computed: {
      form: () => form,
    },

```




## Portability

Once created, the composable creates a reactive object representating a component's data. Reactive validation bindings will automically update if any data field is updated, and can be surfaced in the template.

Note though, that it is equally possible to export the composable to the middleware, where it may be used to hydrate server-side errors; any field or validation that is then updated here will automatically be surfaced in the template where it is used.

First, we create the validation object. We'll inject both rules and values for simplicity:

```
// schemas/index
const schema = { ... };
const values = { ... };
const exampleForm = useValidation(schema, values);

export { exampleForm };
```

Then, in an action

```
export const exampleAction = async ({ commit }) => {
  try {
    const exampleData = await api.settings.getExampleData();
    ...
  } catch (error) {
    import('@/schemas/exampleForm') // WEBPACK conditional import.
      .then((exampleForm) => {
        exampleForm.setErrors(error);
      });
  }
};
```
...note that we conditionally load the module and hydrate it upon any error(s) originating from the server. That's it, we can now surface server errors anywhere in the page.  If the server response is in the JSON-error format, the framework will unwrap it and apply it to the corresponding field in the template automatically.


## Usage



### Validation object

`useValidation` creates a reactive `form` _validation_ object. The returned object matches the same shape as the validation schema, except each field will be decorated/returned as follows:

* There will be five (5) _core_ properties: `$model`, `$error`, `$dirty`, `$invalid` and `$errors`.

```
  "$model": "horace",
  "$error": false, // helper for: $invalid && $dirty
  "$dirty": false,
  "$invalid": false,
  "$errors": [ ... ]
```

* There will be _dynamic_ properties for each specific validation rule added (i.e. `required`, `email`, etc)
```
  // validation props. These are dynamic:
  "required": true,   // passes required check
  "minLength": false, // does not meet minLength criteria
  "email": true,      // passes email validation
  ...
```


### Validation usage in a Vue template

```
<template>
  <form>
    <input
      v-model="form.email"
      class="span-6"
      :disabled="!!user"
      :label="Email"
    />
    Form is valid: { { isValid }}
  </form>
</template>
```

```
<script>
  import { exampleForm } from '@/path/to/schemas';

  const { form, setValues } = exampleForm();

  export default {
    data() {
      return {
        form: setValues({
          name: '',
          email: '',
          date: null,
          value: 0,
        }),
      };
    },

    computed: {
      form: () => form,
      isValid: () => !form.$invalid,
    },

```
### Form field helper Component

The `n-field` component may be used as a field wrapper. It accepts `errors` array from validation rules, or even a single `errors[0].$message` if desired. LL-Field can wrap any other UI component, and act as a decorator for error feedback.


```
<template>
  <div :class="['input', {'has-error': hasError}]">
    <label class="input-label" v-if="label">{{ label }}</label>
    <slot v-bind="$attrs"></slot>
    <span v-if="text" class="input-hint text-small">{{ text }}</span>
  </div>
</template>
```
```javascript
<script>
  export default {
    name: 'n-field',
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
</script>
```
```
<style>
  .has-error .input-label {
    animation: 1s shake 1;
  }
</style>
```

## References:

The `Validatable` idea draws inspiration from multiple sources.
* [Vue Composable](https://pikax.me/vue-composable/composable/validation/validation.html): Vue 3 composition API approach to
* [Vee Validate](https://logaretm.github.io/vee-validate/): Vue 3 composition API + "validation provider" component
* [Vuelidate](https://github.com/vuelidate/vuelidate/blob/master/src/index.js): for model based validation
* [Vuetify](https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetify/src/mixins/validatable/index.ts): Array validation approach
