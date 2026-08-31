# Personal portfolio homepage

## Purpose

The homepage is a single-page personal portfolio that introduces Zhihong, highlights a small number of focus areas and selected projects, and provides an easy way to start a conversation.

## Design direction

The page takes inspiration from the reference site's editorial hierarchy: restrained navigation, a high-contrast hero, oversized typography, and image-led feature cards. It remains original through its own indigo colour system, abstract CSS artwork, placeholder content, and site structure.

## Page sections

1. Sticky navigation with anchor links.
2. Hero introducing Zhihong and a visual placeholder for a future portrait or video.
3. Brief profile and focus areas.
4. Selected-work cards with placeholder project details.
5. Contact call to action and footer.

## Content strategy

Professional biography, selected experience, achievement, email, and LinkedIn copy is drawn from the résumé supplied by Chong Zhi Hong. The TZH Sports Centre platform summary is sourced from the user's stated ownership and the project's repository documentation. Keep this content centralised in the homepage component until a content model or CMS is justified. Do not publish the résumé phone number by default.

The TZH Sports Centre card uses the supplied booking, shop, and lesson screens under `public/images/work/`. Present them as a layered three-phone composition, with booking in front and shop/lessons behind it, to communicate the platform's breadth without stretching portrait interfaces into landscape crops. On mobile, show only the booking screen to preserve clarity.

The CadenceConnect speaker gallery uses user-supplied photos and certificates from 2024–2026. Store those images under `public/images/cadence-connect/` and reveal them through a native disclosure control in the CadenceConnect recognition item. Use compact proof tiles rather than a prominent image gallery so lower-resolution source imagery is not enlarged unnecessarily. A selected tile opens in an accessible in-page lightbox using the original source file, with backdrop, close button, and Escape-key closing behavior.

The invention-disclosure recognition item follows the same disclosure and lightbox pattern. Store public proof images under `public/images/invention-disclosures/`; retain unedited source files only under the ignored `.private-assets/` directory when they contain metadata or details that should not be deployed.

The Advanced Battery Test & Emulation project card uses the supplied Battery Emulator product screenshot from `public/images/work/advanced-battery-emulator.png`. Present it as a tightly cropped, darkened interface detail with a subtle red overlay so it retains visual consistency with the rest of the portfolio while showing genuine product work.

The Schematic Migration Automation project card uses the supplied schematic canvas from `public/images/work/schematic-migration-canvas.png`. Preserve the circuit detail with a dark, lightly teal-tinted treatment that complements the product card system without making the technical visual feel like a raw screenshot.

## Acceptance criteria

- Works as a single static page without a database or client-side JavaScript.
- Navigation anchors work with keyboard and pointer input.
- Layout is readable and complete on mobile and desktop.
- Visual design does not reuse the reference site's images, logo, copy, or branding.
