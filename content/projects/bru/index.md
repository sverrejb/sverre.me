+++
weight=120
title="Bru: Send and read SMS from the browser"
date="2026-09-23"
description="Because life is too short to type on a phone."
draft=true
+++



Short version: [Bru](https://bru.works) is an Android app and web client that let's you read and send sms messages from your browser, via your phone. It is currently available from the [IzzyOnDroid](https://apt.izzysoft.de/fdroid/index/apk/works.bru) app repository, but hopefully soon on F-droid, and possibly Google Play.


I used:
* Plain HTML, Javascript and CSS
* Rust 
* [Iroh](https://iroh.computer), as WASM in the browser, and via the available Kotlin bindings
* Kotlin


## Longer version

Since the start of the summer this year I have tinkered with [Bru](https://bru.works). The *b*idirectional *r*emote *u*plink for your Android phone (and _bridge_ in norwegian). And yes, the name is of course a backronym. Since I started using a T9 phone as my daily driver, I have more than once wished I could break out into a full qwerty keyboard when typing out longer messages. Don't get me wrong, I love the tactile buttons, but for me, nothing beats an actual keyboard when writing. Another thing I wanted to solve was that every SMS was a prompt to take my phone out, opening the door for endless distractions. And yes, this could have be solved with notification settings, self dicipline and yada yada...

## Maybe I should not reinvent the wheel?
While my first instinct was "ah I can solve this!", I recognized that this might be a problem others have had and solved before me. I did some searching, and tested some alternatives. It is quite possible I have left out several good candidates, but these are the ones I looked at.

### Google messages
The default SMS app from google actually has a "Device pairing" option. Sign in to [https://messages.google.com/web](https://messages.google.com/web) and pair your phone, and it works pretty well. But for once, it is limited to the Google app, and I have (_very_) gradually tried to limit my reliance on big G. With that said, my only real gripe is that you have to re-pair very frequently. Often enough that during my limited testing I was quite annoyed. But if you are using Google messages anyway, this might be the right solution for you.

### KDE Connect
Sigh. I really wanted this to be the solution. The ambitions are great. KDE is great! Open source! It even has a Macbook client, being a linux adjacent project. But I could not get it to work reliably. The pairing process was buggy. Sometimes connectivity would break, even with the phone and laptop on the same network. I found the options for configuration overwhelming, and in good Linux-fashion, there is ample room for some UX improvements. But the biggest problem was that I found the whole experience ... clunky? For all I know the linux client is leaps and bounds better than the Mac one, though. Maybe this is the right solution for you?

### Pushbullet
Pushbullet has been around for a long time. And to be fair, I didn't really give them a fair chance. I tried it years ago, and found it aggrovatingly unreliable and buggy. Dropped notifications, sms's reported as "sent" never ended up actually sent, messages I had already answered suddenly triggering notifications agian. Things may have improved, I didn't bother to check. I am listing it here for completeness sake.


## Fuck it, wheels are good things.
I started out with the obvious problem: how can I get the phone and the browser to talk to each other? Being familiar with Wireguard, I first thought about baking that into and app on the phone that could serve a rest(ish) endpoint that a client on the same network could access. As an easy way to start prototyping I installed Tailscale on my phone and on my laptop, as Tailscale is Wireguard under the hood, and gives you a stable IP address for the devices on the network. The architecture at that point was polling based, the web client would poll the server running on the phone periodically and look for new messages. While I had a nagging feeling that this might not be optimal for many reasons (battery life on the phone for one) I just wanted something that worked to iterate on. 

After some evenings with hitting my head against the wall that is Android development I had a rudimentary app working,  running in the background on the phone and serving available the SMS threads, secured with a hard-coded token just in case. With that in place I could start working on a client.

I decided on some goals for the project:
* Free as in beer, free as in speech.
* No account or user profile.
* No backend service.
* Messages should be end-to-end encrypted (duh).
* Keep dependencies to a minimum
* No web framework for the client.
* No webserver (except the app running on the phone).
* Ideally it should be self-hostable.
* Use as little agentic coding as I could. I have used Claude as a rubberduck/documentation knowit-all/security reviewer. 

## Back to the basics
As stated above, I wanted to build this as staticly hosted web-app, and make it without any web framework. Mostly to get a feel for how it is to develop like this in 2026. Having relied almost solely on React professionally, and Sveltekit in my spare time, I wanted to do something different. I first imagined the client as a paper-and-typewriter sort of thing, but ended up turning down the skeuomorphism down a few notches. I kept the monospaced courier font and off-white though.

![alt text](image.png)

## Tincans on string
While the prototype worked, there were some things I needed to figure out. For my own personal use, depending on Tailscale as an additional app was not a problem, but it would greatly reduce the number of other people that would bother to install it. And while solving problems for my self is enough by itself, creating something that others might find useful as well is very rewarding. Embedding the wireguard tunnel library seemed like a logical step, but before I started on that, I found Iroh.

Sometimes the stars align. A post announcing Iroh 1.0.0 came up in one of my feeds, and I knew this could be the right fit. In essence, Iroh is a dumb pipe. You put stuff in at one end, it comes out the other. "Dial keys, not IP's" is the mantra. And being built with Rust, it works in the browser when compiled to WebAssembly. And with the Android SDK available, it was exactly what I needed.

Iroh works by establishing a direct peer-to-peer<sup>*</sup> connection 

## Publishing
