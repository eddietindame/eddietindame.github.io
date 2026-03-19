---
title: 'I Built a CLI to Stop Copy-Pasting pg_dump Commands'
description: 'Resetting my Postgres database dozens of times a day got old fast, so I built a small Go CLI to fix it.'
date: '2026-03-17'
---

While working on an offline-first app, I found myself constantly resetting my database to a known state.

Testing sync scenarios meant running the same commands over and over:

- dump the database
- drop the schema
- restore from a file

It worked, but it was clumsy. I’d forget which file was which, mistype a connection string, or restore the wrong snapshot.

So I built a small tool:
[github.com/eddietindame/pgcheckpoint](https://github.com/eddietindame/pgcheckpoint)

Now the workflow is simple:

```bash
> pgcheckpoint create "before-sync"
```

```bash
> pgcheckpoint restore
```

It wraps `pg_dump` and `psql`, manages snapshots, and lets me refer to them by name instead of files.

---

### Why Go?

I could have written this in TypeScript, it’s what I use every day.

But that was exactly the reason not to.

It’s easy to fall into the habit of using the same language for everything. At some point, it stops being a choice and becomes a default.

Go felt like a better fit for this kind of tool:

- it compiles to a single binary
- no runtime dependencies
- strong standard library for CLI work

More importantly, it made me think differently. The constraints are different, the patterns are simpler, and the trade-offs are more explicit.

I’ve actually dabbled with Go before (a couple of previous posts touch on it), but I’d never really used it for something practical in my day-to-day workflow.

---

### Takeaway

`pgcheckpoint` is a small tool, but it solved a real annoyance in my workflow.

And building it in Go was a reminder that choosing tools deliberately matters, even if you’ve only lightly explored them before.

You don’t really understand a language by reading about it, you understand it when it makes something easier than what you’re used to.

For me, that moment was running `go build` and getting a single binary that just worked.
