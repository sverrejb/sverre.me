+++
title="Info screen for the office"
weight=20
date="2024-04-29"
+++

Short version: I made an info screen for the office. It currently looks like this:

![](https://github.com/Knowit-Objectnet/infoskjerm-trondheim/raw/main/screenshot.png)

The code can be found [here](https://github.com/Knowit-Objectnet/infoskjerm-trondheim).

**I used:**
* Rust, with:
  * Slint
  * Serde
  * Reqwest
  * Tokio
  * Tide
  * Cargo-zigbuild
  * ... and more
* Github Actions
* Raspberry Pi
* Python and bash for some scripting



## Long version:    
When I was a student, we had an info screen showing bus times, the lunch menu, upcoming events, meeting room bookings and so on. There were several iterations of this, but the one in use during my time was a web application. It looked like this:

{{ projectImage(img_name="1.jpg", width=550, alt="Picture of info screen from my student days" vw="65%") }}


What we don't see in this picture is the chunky computer on the floor that ran this thing. At the time, the first generation Raspberry Pi was out, but as the info screen featured some simple CSS animations, even a relatively simple web app was too much to handle. Later, when the Raspberry Pi 2 became available, I set up the screen to run on one. It worked well enough, but running an application (the info screen) within another application (the browser) seemed unnecessarily complex.

Some years later I started to learn Rust, and one of the first things I wanted to make was an info screen for our apartment. But these were the early days of the Rust ecosystem, and while I was able to render a simple "Hello World" text string with the Conrod GUI library on a Raspberry Pi, the whole thing was very bare bones, and I had barely scratched the surface of Rust. And while I continued learning Rust, the info screen idea was relegated to the back burner.

Rust has since become my favorite language that I rarely find a fitting use case for. Most of my projects are silly web things. But I wanted to do a "proper" project in Rust now. Putting the cart before the horse, I decided to write an info screen for our office in Rust. Providentially, an episode of [Rustacean Station](https://rustacean-station.org/episode/tobias-hunger-slint-1.0/) about [Slint](https://slint.dev/) that had just reached v1.0 came out around the same time.

The first version was released with a single useful feature: telling the time. Notice the clock in the lower right corner.
{{ projectImage(img_name="2.jpg", width=550, alt="Picture of info screen on wall" vw="100%") }}


The application is written in Slint, which so far has been great to work with. It runs on a Raspberry Pi 3, stuck to the back of the screen.


After a while, I added weather forecast and the newest XKCD strip. The individual components were pulled out into separate modules, and are updated by dedicated worker threads. 

{{ projectImage(img_name="3.png", width=550, alt="Picture of info screen on wall" vw="100%") }}


Eventually, some of my colleagues took an interest, and we made the info screen the focus of a hackathon where a new design was cooked up, a calendar widget was prototyped and bus times were worked on.

{{ projectImage(img_name="4.png", width=550, alt="Picture of info screen on wall" vw="75%") }}


It is still far from finished, but it is starting to take shape. I also added a feature to track our food orders on the screen, showing the remaining time and production status.
