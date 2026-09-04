# Dream Kitchens — self-hosted static clone

A complete, self-contained static copy of `www.dreamkitchens.com.au`, transcribed
from a rendered-DOM capture of all 75 routes. Nothing on these pages is fetched
from the internet: every stylesheet, font, image and icon is served from the
`assets/` folder inside this archive.

## Running it

Any static file server works, and the pages also open directly from disk:

```bash
python3 -m http.server 8000      # then browse http://localhost:8000/
```

Every route is a real directory containing an `index.html`, so
`http://localhost:8000/portfolio/mosman-apartment/` resolves the same way it did
on the original host. Links between pages are written as relative paths ending in
`index.html`, so double-clicking `index.html` in a file manager works too.

## Layout

```
index.html                          Home
about-us/index.html                 …one directory per route, mirroring the URL
our-process/index.html
portfolio/<project>/index.html      30 project pages
project-type/<type>/index.html       5 taxonomy pages
tips/<article>/index.html           21 articles
category/tips/index.html            Article index
author/admin/index.html
…
assets/
  css/        Site stylesheets (the original LiteSpeed-combined bundles)
  fonts/      Open Sans + Bricolage Grotesque, self-hosted, plus the icon fonts
  js/site.js  The only script in the archive (see below)
  uploads/    Photography and graphics, original directory structure preserved
  vendor/     Theme and plugin assets (icon fonts, sprites, review-widget CSS)
```

## What was changed, and why

The input for each page is the **fully rendered DOM** — the markup as the browser
had it after the original site's JavaScript finished running. That markup is
reproduced as-is; layout and styling are untouched. The edits are confined to
making the pages stand on their own:

- **Framework and hydration scripts removed.** WordPress, WPBakery, the Salient
  theme runtime, jQuery and its plugins are gone: they exist to *produce* the DOM
  that is already baked into these files, and re-running them over an
  already-initialised document duplicates carousel slides and re-triggers reveal
  animations. Third-party tags (Google Tag Manager, reCAPTCHA, the Trustindex
  loader) went with them; the review widget's rendered markup, CSS and images are
  kept and self-hosted.
- **`assets/js/site.js` added.** A single, dependency-free script restoring the
  interactions the markup alone cannot express: the fullscreen off-canvas menu and
  its submenu drill-down, the search overlay, smooth in-page anchor scrolling, and
  holding form submissions (there is no back end behind a static archive).
- **Every URL rewritten to a relative local path** — `src`, `srcset`, `href`,
  `poster`, CSS `url()` in stylesheets, `<style>` blocks and inline `style`
  attributes, and the image-valued `<meta>` tags.
- **`<base>` tag dropped**, and the `<meta>` `content` values repaired: the capture
  had run every one of them through URL resolution, so `viewport`, `robots`,
  `description`, `og:*` and `twitter:*` had the site URL glued to the front.
- **Server-only `<link>` elements dropped** (`alternate` feeds, oEmbed, RSD,
  `api.w.org`, `pingback`, shortlink, DNS prefetch hints) — they addressed
  endpoints that no longer exist here.

## Known limits

- **Sliders and carousels are frozen at their captured frame.** The Flickity
  carousels and the parallax layers keep the exact position, transform and slide
  the capture recorded. They render correctly, but they no longer advance.
- Six internal links point at routes that were not part of the capture and will
  404: `/custom-vanities/`, `/kitchen-design-ideas/`, `/wp-admin/`, and the
  page-2 pagination for `/category/tips/`, `/author/admin/` and
  `/project-type/kitchens/`.
- Outbound links to Facebook, Instagram, Google Maps and other third-party sites
  are left pointing at those sites — they are links, not embedded resources.
- Contact and consultation forms are inert by design.
