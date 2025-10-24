+++
weight=70
title="The website of Trondheim Bike Kitchen"
date="2025-10-24"
+++


This is the website of Trondheim Bike Kitchen. It is built with Sveltekit, hosted on Netlify and has a few features:

* **An admin-interface with editable pages and settings** -  using Decap CMS, a git-based CMS that keeps all the content in the repo.
* **Event page that also syncs to Facebook** - Using Eventbrite as the backend for events saves us from creating events twice, as their API can be used to list out all events on our website. 
* **Membership registration** - With storage in a Google spreadsheet and payment via Vipps or credit card. (Yes, I know spreadsheets aren't data bases...)
* **Internationalization** - We even have Nynorsk!  




{{ lightbox (img_name="bk.png", alt="Screenshot of website", width=1000) }}

## How it came to be

During the Covid-19 pandemic I started tinkering with bikes. I did this mostly on our patio, and bolts and nuts often fell between the decking. My lovely wife happened to read about a new organization that had popped up in Trondheim: a bike kitchen. I ended up going there, and after a while, I became a board member.

Fast forward a bit, our firstborn had arrived and I was on parental leave from work. Being blessed with a baby that actually slept a bit during the day gave me some time to tinker with Svelte. Before long I had started on what would become the website of [Trondheim Bike Kitchen](https://sykkelkjokken.no).

It started out very basic. All pages had hard coded content. I used Svelte's static adapter to build the site. This generated html, css and js files. I rewrote some of the pages to use Decap CMS in order to allow the other board members to edit them.

As the site grew and feature requests came in I changed it to use server side rendering for some of the pages, while keeping others static. Membership registration was added. Vipps and credit card payment was added in an effort to make the treasurer's job a bit easier.

Having worked mostly with React for frontend at that point, Svelte(kit) was nothing short of a revelation. Things made sense. The builds were small and loaded fast. The code was a joy to write, and not horrible to read after a few weeks. I still enjoy it, although I now prefer non-javascript/typescript when I can.

There are still many things I want to with the site, but time is the most limited resource in my life in these days. Luckily others have joined in a bit in the development. 