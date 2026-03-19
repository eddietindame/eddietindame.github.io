---
title: 'I Built a CLI to Stop Manually Diffing Databases'
description: 'Comparing SQLite and Postgres by hand was miserable, so I built a CLI for it, and ended up falling in love with Bun.'
date: '2026-03-19'
---

In an offline-first app, your data lives in two places: SQLite on the client, Postgres on the backend.

At some point, you need to answer a simple question: _do they actually match?_

For a while, my approach was switching between tmux panes, writing ad-hoc SQL queries, and comparing results by eye.

It worked, but it was miserable.

So I built:
[github.com/eddietindame/pgcheckpoint](https://github.com/eddietindame/dbcompare)

A CLI that compares tables across SQLite and Postgres and tells you exactly what’s different.

---

### The Problem

On paper, comparing two databases sounds simple. In practice, it isn’t.

- SQLite uses `0/1` for booleans, Postgres has `true/false`
- timestamps come back in different formats
- numeric precision differs
- some columns only exist on one side
- soft deletes and renames complicate things

Most of these show up as false positives when you’re just trying to verify sync correctness.

---

### What `dbcompare` Does

You define tables in a TypeScript config:

- which columns to compare
- how to normalise values
- which fields to ignore

The tool fetches rows from both databases (sorted by primary key) and runs a linear comparison.

```bash
> dbcompare

users  ✓ 1,204 rows match

tasks  ✗ 3 diffs found

Row [id: abc-123]
title: “Buy milk” vs “Buy oat milk”
```

There’s also a watch mode that monitors the SQLite file and polls Postgres, re-running comparisons automatically and notifying when diffs change.

Normalisers handle type mismatches (`0 → false`, timestamp parsing, numeric rounding), and you can define your own as simple functions.

---

### Why Bun?

I picked Bun mostly because I wanted to try something different.

It ended up feeling closer to Go than Node - not in syntax, but in philosophy.

Everything you need is built in:

- runtime (runs TypeScript directly)
- test runner (`bun test`)
- bundler (`bun build`)
- package manager
- SQLite driver (`bun:sqlite`)
- Postgres client

For this project, that meant no extra libraries for database access, no Jest/Vitest setup, no bundler config.

Each database adapter is ~40 lines of code.

In a typical Node setup, you’d piece this together from multiple tools and configs. With Bun, most of it is just… there.

You write TypeScript, run it, and it works.

---

### Caveats

Bun’s ecosystem is still young, and Node compatibility isn’t perfect.

For a local CLI tool, that didn’t matter. If you’re targeting Node in production, you’ll run into edges.

---

### Takeaway

`dbcompare` is about 800 lines of TypeScript, with only a few runtime dependencies. Everything else comes from Bun.

It solved a real pain point, but more importantly, it changed how much effort it took to build the tool in the first place.

Bun’s “batteries included” approach meant I spent less time wiring things together and more time solving the actual problem.
