---
title: "HTMX vs SPAs III - This-a Time, It's-a Personal"
description: 'A somewhat amicable solution (coupling intensifies).'
date: '2025-03-09'
---

In my previous post, I wrote about how HTMX makes updating a small part of a larger view a little awkward if that view requires hitting the database in order to render. I figured out a solution that, while it works, leaves a little to be desired.

HTMX has a rich event system which allows one to hook into specific points of the request life-cycle and modify the default behaviour. One such default behaviour is that HTMX does not swap content when the response is an error (not a 2XX code).

```javascript
document.body.addEventListener('htmx:beforeSwap', function ({ detail }) {
  if (detail.isError) {
    const targetId = detail.elt.id
    const newTarget = `#${targetId.split('-')[0]}-error`
    detail.shouldSwap = true
    detail.swapOverride = 'innerHTML'
    detail.target = document.querySelector(newTarget)
  }
})
```

As you can see in the above snippet, I am overriding the default behaviour by allowing HTMX to swap content on error and specifying a new target for this swap. This means that all handlers used by my HTMX "components" must return specialised HTML when responding with an error code.

To facilitate this I have set out the following convention:

- The original element that is to be swapped must have an id of `{base-id}` or `{base-id}-subelement` etc.
- The content which will hydrate with an error message will have the id `{base-id}-error`.

This is ok for my small use-case but I have major doubts as to how this will scale for a large application. Will I end up with a massive event handler containing a million `if` statements?

One gripe I have is that I was hoping for HTMX to abstract all of the Javascript so that I wouldn't have to write any for this project (any that is directly involved in requests / rendering at the very least). That was wishful thinking though. If I'm going to be writing Javascript for a bunch of edge cases anyway then I feel like I might as well use a framework! We'll see how much is needed by the time the project is complete.

This also shines light on another issue I have with this application architecture: extreme coupling between front end back end. There is basically no separate front end. This is something that proponents of HTMX seem to like: the server is the single source of truth and the browser simply displays the server state as it is. That sounds good in theory but it already feels messy to implement and my application is extremely small.

I prefer the idea of a server sending out it's state as JSON and any number of different clients can consume the API and render what they want.

I'm not sold on this just yet.
