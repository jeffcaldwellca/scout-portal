---
title: Authentication
description: Support Portal supports LDAP/Active Directory, local SQLite accounts, or both — with TLS LDAP binds and escaped credentials.
order: 4
---

## Authentication modes

The application supports three authentication modes:

1. **LDAP only** — Corporate directory authentication
2. **Local auth only** — SQLite-based local accounts
3. **Both** — Users choose their authentication method

## LDAP configuration

Set `ENABLE_LDAP_AUTH=true` in your `.env` and configure the LDAP connection options:

```env
LDAP_HOST=ldap.yourdomain.com
LDAP_PORT=389
# Transport encryption: tls (StartTLS, port 389), ssl (LDAPS, port 636), or none.
# Defaults to tls so credentials are never sent in cleartext. Only use 'none' on
# a trusted, isolated network where TLS is genuinely unavailable.
LDAP_ENCRYPTION=tls
LDAP_BASE_DN=dc=yourdomain,dc=com
LDAP_BIND_DN="cn=helpdesk-service,ou=service-accounts,dc=yourdomain,dc=com"
LDAP_BIND_PASSWORD=service_account_password
LDAP_USER_FILTER=(sAMAccountName=%s)
LDAP_DEFAULT_EMAIL_DOMAIN=yourcompany.com
```

Always bind over TLS (`LDAP_ENCRYPTION=tls`) or LDAPS (`LDAP_ENCRYPTION=ssl`) in production so that credentials are never sent in cleartext. LDAP credentials and the username filter are escaped before use. See `.env.example` for the full list of LDAP options.

## Local accounts & self-service registration

Users can create their own accounts at `/auth/register` when `ENABLE_LOCAL_AUTH=true`.
See [Managing Users](/support-portal/docs/managing-users) for CLI account management.
