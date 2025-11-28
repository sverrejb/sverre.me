# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website built with Zola (v0.19.0), a static site generator written in Rust. The site features blog posts, project showcases, and uses progressive enhancement principles with minimal JavaScript.

## Build and Development Commands

- **Build the site**: `zola build`
- **Development server**: `zola serve` (starts local server with hot reload)
- **Check for errors**: `zola check` (validates content and templates)

The built site is output to the `public/` directory.

## Architecture

### Content Structure
- **Content directory** (`content/`): All markdown files for pages, blog posts, and projects
  - `content/blog/`: Blog posts with date-prefixed filenames (YYYY-MM-DD-slug.md)
  - `content/projects/`: Project pages, often with co-located images
  - Each section has an `_index.md` defining section metadata

### Templates
- **Tera templating engine** (similar to Jinja2/Django templates)
- `templates/base.html`: Base template with header, footer, and content block
- `templates/blog-page.html`: Individual blog post layout
- `templates/project-page.html`: Individual project layout
- `templates/section.html`: List pages for sections
- `templates/shortcodes/`: Reusable components
  - `lightbox.html`: Pure CSS lightbox for images (no JavaScript required)
  - `projectImage.html`: Project image display
  - `img.html`: General image handling with WebP conversion

### Image Processing
Zola's built-in `resize_image()` function is used throughout templates to generate optimized WebP images. The function resizes and converts images at build time:
```
resize_image(format="webp", path=image_path, width=800, op="fit_width", quality=100)
```

### Styling and JavaScript
- **CSS**: `static/css/style.css` - Custom styles with CSS variables for theming
- **JavaScript**: Minimal, progressive enhancement approach
  - `static/js/script.js`: Theme toggle with localStorage persistence and system preference detection
  - `static/js/htmx.min.js`: HTMX for SPA-like navigation (hx-boost="true" on body)
  - Uses `hx-boost="false"` to disable HTMX for specific links (e.g., lightbox anchors)

### Progressive Enhancement Features
- **Pure CSS lightbox**: Uses `:target` pseudo-class and `<dialog>` elements for image lightboxes without JavaScript
- **Mobile-responsive lightbox**: Desktop shows clickable lightbox, mobile links directly to full image
- **Theme toggle**: Respects system preferences, persists choice in localStorage
- **No-JS fallback**: Core functionality works without JavaScript

## Configuration

- **config.toml**: Main Zola configuration
  - Base URL: https://sverre.me
  - Syntax highlighting enabled
  - Search index generation enabled
  - Navigation menu defined in `[extra]` section

- **netlify.toml**: Netlify deployment configuration
  - Build command: `zola build`
  - Publish directory: `public`
  - Deploy preview URLs use `$DEPLOY_PRIME_URL` for base URL override

## Content Frontmatter

Blog posts and projects use YAML frontmatter:
```yaml
title: "Post Title"
date: 2025-01-16
[tags]: ["tag1", "tag2"]  # Optional
[extra.toc]: true  # Optional, enables table of contents
```

## Shortcode Usage

In markdown content:
- `{{ img(img_name="file.jpg", alt="Description") }}`: Basic image
- `{{ lightbox(img_name="file.jpg", alt="Description", caption="Optional caption") }}`: Lightbox image
- `{{ projectImage(img_name="file.jpg", alt="Description") }}`: Project image with hover effect

Images should be co-located with content (same directory as the markdown file) or placed in `static/images/`.
