# Accology static site notes

GitHub Pages serves this folder from `main`. Merging to `main` publishes accology.co. Review on a branch first.

## Pages
- `/` home, with the consultation form (`#contact`)
- `/services/` and one page per service
- `/pricing/` draft guide fees. This is the only place amounts are written.
- `/privacy/` draft UK GDPR notice, including the cookies note at `#cookies`
- `/contact/` the same consultation form
- `/contact/thanks/` redirects to `/contact/?sent=1#contact`
- `/404.html`

## Consultation form
Fields posted as JSON to `https://accology-enquiry.accology.workers.dev/enquiry`:
- name (required)
- email (required)
- company (optional)
- message (required, max 4000)
- company_url (honeypot; if filled, the page shows the thank-you and does not send)

Thank-you copy: "Message received. A response will follow shortly."
If sending fails: ask the visitor to email contact@accology.co.

## Visits and analytics
- `static/visit.js` posts path, referrer and host to the enquiry worker `/visit`. It does not set a cookie.
- Cloudflare Web Analytics beacon is on each page (cookieless, per Cloudflare's docs). Token unchanged.

## Fonts
Inter is self-hosted in `static/fonts/` (Latin, weights 400, 600, 700, SIL Open Font License). No Google Fonts request.

## Not on this site
The client portal (`/login` and the CRM) is not served from GitHub Pages. The footer has a placeholder until a portal URL is added.
Phone, address, legal name, company number and professional body are placeholders. Do not copy them off the letterhead artwork until the owner confirms they should be public.
