---
title: 'HTMX vs SPAs II - Electric Boogaloo'
description: 'Already annoyed.'
date: '2025-03-08'
---

Coming from the wonderful world of React, I’ve found that one is forced into a rather clunky and (relatively) expensive way of making api calls when using HTMX.

Take this list of RSS feeds, for example.

![Screenshot](/static/img/blog/htmx_vs_spa_1.png)

When a user clicks the `Add` button, a request is made to the required endpoint which adds the feed to the user’s followed feeds and then returns the entire view, feeds list and input included.

This might seem ok but what if the request goes wrong in some way? We will want to display an error.

Let’s say the user inputs a feed that already exists in their followed feeds list. We might want to display an error message under the input saying something like: `Feed is already followed!`.

With an SPA framework this would be trivial as you have absolute control of what is rendered and where it is rendered, all depending on the contents of a JSON response.

With HTMX, however, we have to send back the entire view (or sub-view) rather than some arbitrary data which tells our frontend how to react (hehe).

Where am I going with this? Just send back the view, you might be thinking.

Well, we end up in an annoying scenario where no matter how far down the logic chain we go, we _always_ have to hit the database to get the list of followed feeds in order to render the view to send back.

Again, with an SPA, the database is only hit at the end of the chain of command if everything else goes correctly first. There are several steps in the corresponding API handler that can fail and return an error, every single one of which needs to repeat itself and contain code to hit the database and return a freshly rendered view along with the error.

This might be entirely meaningless to a lot of people, but it’s yet another quirk of MPAs / hypermedia based applications that simply annoys me. It doesn’t feel good knowing that my server and database are doing more work than would otherwise be necessary, even if it is a negligible amount.

The could be a solution around server-side caching that I’m missing. There might also be a way to respond with JSON only in the case of an error and then opt out of HTMX’s content swap and handle rendering the error message with vanilla JS. Email me your thoughts!

One solution would be to send a serialised version of the list along with the request and parse it on the server, using the data to render the view without hitting the database. I’m sure you’ll agree that this sounds absolutely awful.

There. That’s my rant.
