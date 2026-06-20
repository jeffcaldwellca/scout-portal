---
title: Configuration
description: Configure Support Portal — FreeScout API and mailbox settings, security and auth environment variables, form fields, and branding.
order: 3
---

## FreeScout environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `FREESCOUT_API_URL` | Yes | - | The base URL for your FreeScout API (e.g., `https://helpdesk.example.com/api`) |
| `FREESCOUT_API_KEY` | Yes | - | API key generated in FreeScout Admin > Manage > API |
| `FREESCOUT_MAILBOX_ID` | Recommended | Auto-detect | The numeric ID of the FreeScout mailbox to submit tickets to. If not set, the application uses the first available mailbox from the API. |
| `FREESCOUT_CACHE_TTL` | No | `30` | Seconds to cache a user's ticket list, avoiding a blocking API call on every page load. `0` disables caching. |

**Finding your Mailbox ID:** In FreeScout, go to Manage > Mailboxes and open the mailbox; the ID is the
number in the URL (e.g. `/mailboxes/1/edit` means ID `1`). You can also call `GET /api/mailboxes`.

## Security & auth environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `CSRF_SECRET` | Yes | - | Secret for CSRF token HMAC. App refuses to boot if unset/placeholder. Generate with `php -r "echo bin2hex(random_bytes(32));"`. |
| `COOKIE_SECURE` | No | `true` | Adds the `Secure` flag to the session cookie. Set `false` only for local HTTP dev. |
| `LDAP_ENCRYPTION` | No | `tls` | LDAP transport: `tls` (StartTLS), `ssl` (LDAPS), or `none`. Avoid `none` outside trusted networks. |

## Form fields

Form fields are defined in `config/form_fields.yaml`. Configure how fields map to FreeScout in
`config/form_fields.yaml` or `config/freescout_mappings.php`.

## Branding

Customize the appearance of your helpdesk portal:

```env
COMPANY_NAME="Your Company Inc."
COMPANY_SHORT_NAME="Your Company"
PORTAL_TITLE="IT Helpdesk"
PORTAL_NAME="Support Portal"
BRAND_ICON=bi-headset
USE_LOGO=true
SUPPORT_EMAIL=support@yourcompany.com
SUPPORT_PHONE="+1 (555) 123-4567"
IT_CONTACT_EMAIL=it@yourcompany.com
SELF_SERVICE_URL=https://kb.yourcompany.com
```
