# Cinematic Weddings — RBA Films & Photography

A mobile-first, editorial photography studio website built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY and CONTACT_FROM
npm run dev
```

Visit `http://localhost:3000`.

## Replacing the placeholder photography

All images and copy live in `lib/content.ts`. The hero carousel, About section
image, and word choices are defined there — nothing else needs to change.

The placeholders use `picsum.photos` purely so the site renders correctly out
of the box. To use your own photographs:

1. Drop your files into `public/images/`.
2. In `lib/content.ts`, change each `src` to `"/images/your-file.jpg"`.
3. You can then delete the `images.remotePatterns` block in `next.config.js`,
   since it's only needed for the placeholder remote images.

## Connecting email delivery

Submissions are sent server-side from `app/api/contact/route.ts` via
`lib/email.ts`, using [Resend](https://resend.com). No credentials are ever
exposed to the client.

1. Create a Resend account and verify a sending domain.
2. Set `RESEND_API_KEY` and `CONTACT_FROM` in `.env.local` (see
   `.env.example`).
3. Inquiries are sent to `refractionsbyammar@gmail.com` (set in
   `lib/email.ts` as `STUDIO_INBOX`).

To swap in Nodemailer, SendGrid, or another provider, only the body of
`sendInquiryEmail()` in `lib/email.ts` needs to change — the API route and
the form stay the same.

## Project structure

```
app/
  page.tsx              — vertical scroll story (Hero → About → Contact)
  layout.tsx             — fonts, metadata, viewport
  globals.css
  api/contact/route.ts   — server-side form handler
components/
  Header.tsx             — floating frosted-glass header + title transitions
  HeroCarousel.tsx        — full-screen draggable image carousel
  AboutSection.tsx
  ContactSection.tsx      — form, validation, submission state
  ThankYou.tsx
lib/
  content.ts              — all copy + image references
  email.ts                 — Resend integration
types/
  index.ts
```

## Notes

- Respects `prefers-reduced-motion`.
- Mobile viewport uses `100svh` and safe-area insets so the layout behaves
  correctly under iOS/Android browser chrome.
- The hero carousel uses `dragDirectionLock` so horizontal swiping never
  blocks vertical page scrolling.
