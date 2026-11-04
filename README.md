# Siflon Group — Phase 2 Design System Starter

This is a **starter scaffold**, not a deployed website. It implements the first design-system pass and a responsive homepage concept using Next.js App Router, TypeScript and Tailwind CSS v4.

## Included
- Design tokens: navy `#102A43`, charcoal `#202B36`, industrial blue `#477A9E`, light grey `#F4F6F8`.
- Manrope / DM Sans typography.
- Responsive navigation and homepage sections.
- Video hero with muted autoplay, pause/play control, poster fallback and reduced-motion handling.
- Three business cards based on information verified in the audit.
- Siflon Pipes is deliberately shown as pending verification; no products or claims are invented.

## Run locally
Use Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add the real video and poster
Copy the approved, visually reviewed corporate footage into:
- `public/media/siflon-corporate-hero.mp4`
- `public/images/hero-poster.jpg`

The video source in `components/hero.tsx` already points to that path. The hero is intentionally not tied to the provisional timestamps in the audit. Create a final 12–18 second edit only after the footage has been visually approved and timestamps are confirmed.

For production, compress the hero video (target a lightweight web-optimised MP4; provide WebM if available), keep it muted, and retain the poster image for mobile/slow connections. Do not autoplay audio.

## Important content checks before launch
1. Confirm legal names and exact group/company relationships.
2. Confirm Siflon Pipes legal entity, products, contact details and relationship to the group.
3. Replace the illustrative capability graphic with an authentic, approved Siflon photograph.
4. Verify the contact email and all contact information. `info@siflongroup.com` is a placeholder pending confirmation.
5. Obtain a transparent approved logo (SVG/PNG). The current text-based mark is only a temporary scaffold mark.
6. Validate all certificate names, numbers, issuing bodies and expiry dates before publishing.
7. Confirm whether distributor statistics may be published; do not expose the raw shop list or personal contact details.
8. Review font licensing / self-host fonts before production.

## Suggested next implementation phase
- Replace placeholder visual with selected authentic images.
- Add About, individual business, quality, news and contact pages.
- Build reusable business-page templates and enquiry forms.
- Add metadata, sitemap, analytics/consent as appropriate, accessibility QA and performance optimisation.
