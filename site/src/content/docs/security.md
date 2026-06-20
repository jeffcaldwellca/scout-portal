---
title: Security
description: Support Portal's security model — required CSRF secret, validated uploads, TLS LDAP, login throttling, and hardening headers.
order: 9
---

## Security considerations

- **API Keys** — Store in `.env`, never commit to version control
- **CSRF Secret** — `CSRF_SECRET` is required; the app refuses to boot without a real value
- **LDAP** — Bind over TLS (`LDAP_ENCRYPTION=tls`/`ssl`); credentials and the username filter are escaped
- **File Uploads** — Type/size/content validated on all paths (submissions and ticket replies)
- **Database** — SQLite file should be read-only by web server where possible
- **HTTPS** — Always use HTTPS in production; keep `COOKIE_SECURE=true`
- **Session Security** — Cookies are `HttpOnly`, `SameSite=Strict`, and `Secure`
- **Brute force** — Login attempts are throttled per username + IP
- **Headers** — CSP and hardening headers are sent on every response
