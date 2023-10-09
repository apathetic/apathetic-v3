---
title: All the Data Options
description: Personal thoughts around all the new cloud data platforms
# tags: draft
---

# Comparing some Cloud Data options

For a recent personal project, I tried out a few of the newer crop of cloud databases. I implemented (or tried to implement) the same app across each of the following 6 platforms. I'm actually looking for a platform to fit all my future data needs, so this was a fun opportunity to play with them all.

* [Firebase](https://firebase.google.com/)
* [Supabase](https://supabase.com/)
* [PlanetScale](https://planetscale.com/)
* [Xata](https://xata.io/)
* [Fauna](https://fauna.com/)
* [Turso](https://turso.tech/)

Also, given that these each leverage a different database under the hood (MYSQL, Postgres, SQLite), it seemed like a good idea to minimize friction when moving between them by leveraging an ORM.  I experimented with
* [Prisma](https://www.prisma.io/)
* [Drizzle](https://orm.drizzle.team/)

I had some very unique data requirements, so my thoughts and feedback will be _unique_ to the issues I was trying to solve.  Very briefly, the items I'm looking for and evaluating, were
* a free tier for mucking about (with approx 2GB of storage)
* a FullText search solution (or pattern, way to implement)
* can store text documents upwards of 1MB

Lastly, I'm typing this up mostly as a memory aid to myself.  There are probably inaccuracies, and things may have changed in the interim.

---

### PLANETSCALE
- FULLTEXT search works, but not (really) in conjuction w/ other queries
- good free tier
- handles all manner of data, fields
- a little clunky to work with
  - pscale CLI tool is pretty helpful, though
- supports a "branch" architecture, if that's your thing
- any/all mysql supported, but you'll need to roll your own sql queries

### XATA
- built-in FULLTEXT search (via Elastic search)
- very generous free tier
- cannot handle large text fields (> 64K)
  - update: now it's at 200K ...?
- "branch" architecture
- tooling is quite nice
  - xata CLI is nice
  - nice table visualizer
  - schema editing is nice, easy
- only rudimentary queries, ie. no joins, many-to-many search

### TURSO
- FULLTEXT search TBD
- free tier is great
- SQLite, can store whatevers, ie. large text fields, etc
- tooling is limited, very much in its infancy
  - turso CLI is okay though
- it is noticeably faster than the others on this list

### SUPABASE
- FULLTEXT search works, but hard to sort by "not-relevancy" (ie createdAt)
- very limited free tier (500MB)
- handles all manner of data, fields
- easy to work with tooling
  - nice table visualizer
- nice api, easy to query
  - web api, edge functions built-in

### FAUNA
- FULLTEXT... not really supported. Need to author your own via FQL
- decent free tier
- handles all manner of data, fields
- FQL is a clusterfuck, incredibly complex, vague, poorly documented
- querying is a clusterfuck
- overall was very hard to get going, seed data, and use

### FIRESTORE
- FULLTEXT is very clunky -- need to author your own or work w/ 3rd party integrations
- decent free tier
- handles all manner of data
- nosql, hard to manage data, very clunky tooling
- clunky querying, hard to manage
  - recommended pattern is a separate repo within your repo??
  - setting up a "schema" and rules for your data (in custom JSON) is brittle, hard to update, hard to manage


---

Okay, and for the ORMs:

### DRIZZLE
- fast, it lives up to the hype
- concise, simple to use
- typesafe
  - generates typings for your data (and it works well!)
- uses the schema to inform data relationships
  - there _appears_ to be redundancy between foreign keys and this "relations" data, but one is for the schema, the other is for typings and the query builder
- still not clear `search` vs `query`
  - update: `query` sits on search, and uses the generated typings for a more streamlined experience

### PRISMA
- really wanted this to work, but
- SLOOOOOOWWWW. Had to roll virtually every query by hand, kinda obviating the need for this
- clunky, not an easy local dev experience
- honestly, not sure why this is even a thing. Once upon a time it would have been useful for defining / updating your schema, but most of the above solutions do that natively, kinda obviating this.