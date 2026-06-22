# The Cleaning Specialist — Website

Professional Cleaning & Hygiene Services. A static marketing site built on a proven
conversion architecture (Website A — Cloud Nine export) and rendered in the visual
language of the reference site (Website B — The Specialists), using the brand's own
blue + green identity.

## Design approach

- **Conversion architecture** (replicated section-for-section from Website A's homepage):
  top bar → sticky nav → hero with 5-minute call-back quote form → trust marquee →
  reviews → about (owner-led) → services → why-us → gallery → 4-step process →
  offers/guarantee → blog → FAQ → service areas → stats → final CTA form +
  membership badges → footer.
- **Visual language** (from Website B): rounded navy→blue gradient hero cards,
  two-tone bold Poppins headings, green accent bars, pill buttons, colored-outline
  cards, icon detailing, trust/verification badges, and a floating WhatsApp button.
- **Brand colours** (from the logo): blue `#1577c7`, green `#7ac142 / #58a618`,
  deep navy `#161a4d`.

## Structure

```
index.html                 Home — full conversion homepage
about.html                 Story, vision/mission, values, stats
services.html              All services overview + process
gallery.html               Project gallery
service-areas.html         Areas served
guarantee.html             Guarantee, offers, FAQ
blog.html                  Article grid
contact.html               Contact form + info + areas
services/                  7 service detail pages
  domestic-cleaning.html            office-commercial-cleaning.html
  carpet-upholstery-cleaning.html   hygiene-services.html
  disinfecting-sanitising.html      window-facade-cleaning.html
  deep-move-cleaning.html
assets/
  styles.css               Full design system
  site.js                  Mobile menu, FAQ accordion, form handler, stat counters
  logo.svg / logo-white.svg / favicon.svg
```

## Notes

- Fonts (Poppins + Inter) load via Google Fonts `@import` in `styles.css`.
- Stock photography is served from Unsplash CDN URLs.
- The lead forms are wired to a placeholder `alert()` in `assets/site.js` —
  **replace with your CRM / email endpoint** before going live.
- Replace placeholder contact details (phone, email, address, social links) with
  the real business details.
