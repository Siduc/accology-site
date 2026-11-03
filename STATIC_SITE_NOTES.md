# Accology static site notes

## Public routes (from app/routers/website.py + main._PUBLIC_EXACT)
- GET / → public_home (only real marketing HTML page)
- GET /contact → 303 /#contact
- GET /contact/thanks → 303 /?sent=1#contact
- POST /contact → form handler
- Also public but NOT marketing: /login, /logout, /health, /favicon.ico, /manifest.webmanifest, /sw.js, /demo/tour, OAuth callbacks, /static/*, /payroll/*, /approve/*, /pack/*, /portal/onboarding/*

No privacy/terms/about/services public pages on live (those 303 to /login).

## /login neutralised
Removed footer <a href="/login">Log in</a> (was only /login link outside the CRM login form).
Embedded CRM login form kept visually; action set to # with onsubmit=return false (was POST /login).

## Contact form fields
- name (required)
- email (required)
- company (optional)
- message (required, max 4000)
- company_url (honeypot; if filled, old app treated as success without saving)

Old POST /contact behaviour:
- Validates name/email/message
- create_prospect(..., source="Website", pipeline_status="new") → prospects table
- notify_website_prospect → notifications table (type=website_prospect) + optional staff email if NOTIFY_WEBSITE_PROSPECT_EMAIL (SMTP to NOTIFY_ALERT_EMAIL/PRACTICE_EMAIL)
- Redirect /?sent=1#contact
- Thank-you copy: "Message received. A response will follow shortly."

Static form: action=https://ENQUIRY_ENDPOINT/enquiry method=POST, submit via fetch JSON, shows same thank-you.

## site_visits (table site_visits)
Columns: id, created_at, path, host, ip_hash, ua_kind
record_visit on GET / for non-logged-in non-bot non-loopback browsers; ip_hash = sha256(ip|SESSION_SECRET)[:16]; ua_kind browser|bot.

## Dynamic content not staticised
- CRM login / session / demo_available
- Server-side visit recording
- Prospect creation + email notify on enquiry (needs ENQUIRY_ENDPOINT)
- Boot splash (_boot_*) present in repo templates but NOT on currently deployed live HTML (v=21 CSS, no accology_boot.js)
- Google Fonts still loaded from fonts.googleapis.com via CSS @import
