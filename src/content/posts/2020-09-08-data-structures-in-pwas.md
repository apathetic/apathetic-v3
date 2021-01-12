---
tags: post
title: Client-side data structures.
description: "Representing xxxx hooks / composables / models"
---

problem
models / reusable "structures" that are not store-based.

constraints

- reusable across multipel pages / components
- persistable
  -0 dedicated logic (ie not just json)

possible solves:

- Class-based "models"
- vue-orm
- composition api

---

F/E thoughts
Consistency

components are _singular in focus_. when i see components with more than 3 or 4 props, and more than 2+ events... flags go up. In general: data objects / arrays in; specific, user-selected data out.

idiomatic event names. say what the event is, not "what action should be taken". Let the parent make that decision.

Keep things DRY. This includes repeating HTML to solve responsive design concerns. We have CSS grid and flexbox.. we should _never_ need to duplicate HTML to achieve a particular design

THink of "DX" when wrting code or a new feature. how will another dev use this thing? what is my expectation. Spend the bulk of your time creating a simple "interface" for a function or compoennt. That will be the most difficult thing to change later; by contrast, you can always update and iterate on an implementation internally.

performance considerations:

- how to review a PR? what to look for?
  0 performance checks in the CI?
- sneaky things like "filters" in loops --> those are O(N^2) !
