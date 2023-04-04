---
title: Supabase Cheatsheet
description: A few common commands and queries.
---

# Supabase Cheatsheet

> tl;dr Dumping some commonly-used things from my explorations with [Supabase](https://supabase.com/).

### Quick Setup

Pull it from the cloud if you want to quickly get up and running. This'll set a `supabase` on the window.

```html
  <script src="https://unpkg.com/@supabase/supabase-js"></script>
```

Alternatively, using [Skypack](https://www.skypack.dev/) is an easy way to quickly spin up a build-less POC.

```html
<script type="module">
  import supabase from 'https://cdn.skypack.dev/supabase';
  // ...
```

Initialize some things:

```js
  // ...
  const DB_URL = 'https://<your-database-url>.supabase.co';
  const PUBLIC_KEY = 'abcdef1234xxxx....';
  const { createClient } = supabase;
  const client = createClient(DB_URL, PUBLIC_KEY);
```

### Search

* **simple**

  ```js
    let query = client
      .from('posts')
      .select('title, id, tags');
  ```

* **Matchers" aka filtering or refining results**

  Supabase has a bunch of docs on its available matchers, but less what they do.
  If you know sql you'll likely infer what's going on.
  Otherwise:

        // good for filtering on arrays:
        contains:  AND
        containedBy: ONLY
        overlaps: OR

        // good for getting a single record
        eq: EXACT

* **construct a query dynamically**
  ```
    if (X) { query = query.contains('tag_ids', X) }    // AND
    if (Y) { query = query.containedBy('tag_ids', Y) } // ONLY (ie. have Y and no others)
    if (Z) { query = query.overlaps('tag_ids', Z) }    // OR

    query.then(({ data, error }) => {
      console.log(data, error);
    });
  ```

* **text search**

  Supabase has full-text-search built in, which is nice.
  For more sophisticated searching (hashing/indexing), try
  ```
  if (Q) { query = query.textSearch('title, synopsis', Q) }
  ```

* **FULL text search**

  Searching large amounts of text is slow.
  In postgres, you can construct a "VECTOR" (or something?) that _pre-indexes_ a particular table column (or _multiple columns_).

  _However_, to leverage it, you need to define an "index", which is like a hash of the words in the field to search.
  You set it up by creating a "searchable" column.
  (From their site) run this snippet in the CMD window:

  ```sql
  alter table
    books
  add column
    # here we add an "fts" column that'll contain a hash (tsvector, more
    # specifically) of the words from the "description" and "title" fields
    fts tsvector generated always as (to_tsvector('english', description || ' ' || title)) stored;

  # generate an index from the "fts" column
  create index books_fts on books using gin (fts);

  select id, fts
  from books;
  ```

  Then, use the same `textSearch` but on the generated-index like so:

  ```
  if (Q) { query = query.textSearch('fts', Q) }
  ```


### Pagination

First, a helper function to managing paging:

```js
function paginate(page, size) {
  const limit = size ? size : 50;
  const from = page * limit;
  const to = from + size - 1;
  return { from, to }
}
```

Use it with the _range_ filter:

```js
const { from, to } = paginate(page, 50);
let query = client
  .from('books')
  .select('title, id, tags')
  .range(from, to);
```

### JOIN (or, getting things from multiple tables at once)

First, you'll need a "foreign key" set up.
That is, a key that points to a record in a _different_ table.
You can set this in the Supabase table editor.

```js
  .select(`
    title,
    synopsis,
    author ( name ), // will get the authors NAME*
    tags ( name )    // will get the tag NAME*
  `)
```

<sup>* NOTE: it doesn't say here where/what table authors live in. Nor the tags. We just have to know that those relationships were previously set up in the database.</sup>
