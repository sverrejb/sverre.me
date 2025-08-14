+++
title="A lightbox feature for my website without using JavaScript"
+++

While writing up the [e-bike](../../projects/ebike/) project page, I realized I wanted a way to pop out images in cases where the reader might want to take a closer look at things.

I take some pride in having websites I make work as well as possible without using JavaScript. I also like the challenge of it; sometimes it feels like a puzzle. Modern CSS makes a lot of things possible! So I thought maybe I could try to make a [lightbox](https://lokeshdhakar.com/projects/lightbox2/)-like feature without resorting to JavaScript.

Zola, the static site generator I use, has borrowed the "shortcode" concept from WordPress. Templates that can be used directly from Markdown. I ended up with a shortcode that does a few things:

* Render a clickable resized .webp-version of an image on the page.
* Optionally renders a caption.
* Clicking it opens the original image in a semi-fullscreen \<dialog\>-element
* Clicking anywhere on the large image or around it closes it
* In a mobile-sized view, it instead links directly to the original image, as images take up the full width of the page anyway.

You can see an example here:

{{ lightbox (img_name="luna.jpg", alt="Our dog, Luna", width=1000) }}


The shortcode looks like this:

```HTML
<!-- Use the image preprocessing of Zola  -->
{% set resized = resize_image(format="webp", path=page.colocated_path ~ img_name, width=800, op="fit_width", quality=100) %}


<!-- Render the desktop version -->
<a class="lightbox-image-link" id="{{ img_name }}" href="#lightbox-{{ img_name }}">
    <img width="100%" loading="lazy" alt="{{ alt }}" src="{{ resized.url | safe }}" />
</a>

<!-- Render the mobile version -->
<a class="lightbox-image-link mobile" id="{{ img_name }}"
    href="/{{ page.colocated_path ~ img_name | safe }}">
    <img width="100%" loading="lazy" alt="{{ alt }}" src="{{ resized.url | safe }}" />
</a>

<!-- Conditionally render the caption, if present -->
{% if caption %}
<div class="caption">{{caption}}</div>
{% endif %}

<!-- Render the lightbox-dialog, using <a>-tags for closing the box. -->
<dialog id="lightbox-{{img_name}}" class="lightbox">
    <a class="close-background" href="#{{ img_name }}" title="Close image" role="button"></a>
    <img src="/{{ page.colocated_path ~ img_name | safe }}" loading="lazy" alt="{{ alt }}">
    <a class="close-button" href="#{{ img_name }}" title="Close image" role="button">×</a>
</dialog>
```

This not really that interesting, all the magic happens in the CSS:

```CSS
body:has(dialog:target) {
  overflow: hidden;
}

a[href^='#lightbox-'] {
  all: unset;
  cursor: zoom-in;
}

.lightbox-image-link {
  margin-top: 1rem;
  width: 100%;
  display: block;
  border-radius: 15px;
  overflow: hidden;
}

.lightbox-image-link img {
  width: 100% !important;
  height: auto;
  display: block;
  max-width: unset;
  transition: transform 0.3s ease;
}

.lightbox-image-link:hover img {
  transform: scale(1.04);
}

.lightbox {
  all: unset;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(51, 51, 51, 0.75);
}

.lightbox:target {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox .close-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  cursor: default;
}

.lightbox img {
  all: unset;
  object-fit: contain;
  max-height: 95%;
  max-width: 95%;
  z-index: 2;
  position: relative;
  pointer-events: none;
  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    0 10px 25px -5px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.lightbox .close-button {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 40px;
  color: white;
  text-decoration: none;
  z-index: 3;
  cursor: pointer;
  transition: transform 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-family: monospace;
}

.lightbox .close-button:hover {
  transform: scale(1.3);
}

.lightbox a {
  background-color: unset;
}

/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.lightbox-image-link.mobile {
  display: none;
}

@media (max-width: 768px) {
  .lightbox-image-link {
    display: none !important;
  }

  .lightbox-image-link.mobile {
    display: block !important;
  }
}
```

Yup, that sure is a lot of css. And I will in no way claim I write clean, readable or well structured CSS. The various `unsets` are because of the suCSS-stylesheet I use as a part of the theme for this site.

So how does this work? 

The main functionallity comes from using the `:target` pseudo-class in CSS, combined with semantic `<dialog>` element. When you click the image, the URL hash changes to `#lightbox-<imagename>`, which targets the dialog element. The `:target` selector then makes the dialog visible and positions it as a fullscreen overlay.

```css
.lightbox {
  display: none; /* Hidden by default */
}

.lightbox:target {
  display: flex; /* Show when targeted */
  justify-content: center;
  align-items: center;
}
```

To close the lightbox, both the background and the × button link back to `#imagename`, which removes the `:target` state and hides the dialog again.

I also added `body:has(dialog:target)` to prevent some annoying scrolling when the lightbox is open, and some nice touches like a hover effect on the thumbnail images.

For mobile devices, I decided the lightbox would be pointless since images already fill most of the screen width anyway. So I render two versions of each image link and use media queries to show the appropriate one. On mobile, it simply links directly to the original image file.

The whole approach feels very much in the spirit of the web. Using the URL hash for state, using semantic HTML elements, and providing meaningful fallbacks. No JavaScript dependencies, no frameworks. Just HTML and CSS doing what they do best.

Sure, it's not as fancy as some JavaScript lightbox libraries with their smooth transitions and keyboard navigation. But it's reliable, fast, and works mostly everywhere. Plus, there's something satisfying about solving a problem using only the fundamental building blocks of the web.

The approach could be extended with some progessive enhancements: adding keyboard navigation with a small amount of JavaScript, implementing image galleries with next/previous buttons, or even animating the transitions. But for my use case, this simple solution hits the sweet spot between functionality and simplicity. Now, if this is actuially a good idea in regards to things like accessibility etc I do not know, and there are probably better ways to do this, but having fun building the blog is a big part of having a blog as a developer.