+++
weight=80
title="Auox: A Terminal banking client"
date="2025-12-27"
description="Because everything is better in the terminal."
draft=false
+++

Short version: I made a terminal banking client for my personal banking needs with Rust, Ratatui and the PSD2-API's of my bank. I call it Auox, short for Aurum Oxidatum, the pseudo-latin name for [gold oxide](https://en.wikipedia.org/wiki/Gold(III)_oxide), or "gold rust". 
The code is on [GitHub](https://github.com/sverrejb/auox) if you want to take a look.

The application looks like this:

<div id="demo"><noscript>
    <p>This terminal recording requires JavaScript to function properly.</p>
</noscript></div>

<script>
    AsciinemaPlayer.create('/casts/auox.cast', document.getElementById('demo'), {autoPlay: true, loop: true, theme: 'dracula'});
</script>

(Some personal data has been replaced with placeholders for this demo.)

## Longer version

When I started out learning Rust, one of the first projects I tried to build was a CLI app for interfacing with my bank. This was a few years after the [PSD2-law](https://en.wikipedia.org/wiki/Payment_Services_Directive) went into effect, mandating banks to allow third party applications to access your banking data. The API's at that time were not well documented, and I was a very green developer learning a brand new language with a steep learning curve, so progress was slow. Before I had anything actully working, I ended up switching banks as well, and the project was abandoned. 

I have since kept up with both the Rust language and ecosystem, and seen it grow and become a viable (and in many cases, the right) choice for a wide range of applications. Personally, I often put the carriage before the horse and choose Rust just because I like working with it and want to become better at using it, even if it is not the most pragmatic choice for a given project. This fall I have been hunting "the one that got away", and actually made a useful banking application.

As all software, it is a work in progress, but it currently does what I most often need from a banking app: show my accounts, their respective balance and  transactions, and lets me transfer money between accounts. All while not leaving the comfort of the terminal!

## Under the hood

The app is made with [ratatui](https://github.com/ratatui/ratatui) for the TUI (Text-based User Interface, a bit more interactive than a CLI). Ratatui is a very active project, well documented and feature rich. The app is first set up, and then everything happens in a main loop where a frame is drawn, user input is registred and state is updated. The different application views and the movement between them I have attempted to model sort of like a state machine, with the current view applied to the top of a stack that can be popped to go up/back. 

The OAuth flow for the banking API is pretty standard. It tries to use a stored access token first, then attempts to refresh it if expired, and only initiates a full OAuth flow if that fails. The full flow spawns a tiny HTTP server on port 8321 to catch the callback, then opens the browser for authentication. Most of the time you don't need to touch the browser at all, ideally only once a year.

The SpareBank 1 API itself is straightforward, and pretty [well documented](https://developer.sparebank1.no/#/apis). The API for personal use is quite limited in scope, and allows for listing account details and transactions, as well as transfering money between accounts you own yourself.

## Terminal... but make it ✨*fancy*✨

I recently came across [tachyonfx](https://github.com/junkdog/tachyonfx), a Ratatui library for making advanced animations possible in your TUI application, and I *had* to try it out. After playing around with it a bunch, I settled for an effect where the app sort of "pixelates" into view on start, and out again on terminating. This is done with the coalesce-effect. You can see it in the demo recording on the top. An online showcase of some of the effects can be seen in [this sandbox](https://junkdog.github.io/tachyonfx-ftl/),

## Further work:
Currently, these are some of the things I am planning to improve:

* The error handling is pretty rough, with some `panic!` and `expect()` calls that should be handled better.
* Logging is haphazardly applied, and should ideally write to a file I think.
* Search (and/or filtering) in transactions list.
* Support for more banks, ideally making it configurable.
* Async API requests. Currently every call to the API is blocking. This is fine enough, as there is not much to do in the app without the data from a request, but it would be nice with some placeholder skeleton text or something while waiting. Not sure if it is worth it.


