---
title: Troubleshooting
description: Fix common Support Portal issues — FreeScout API failures, LDAP authentication problems, and file upload errors.
order: 8
---

## FreeScout API issues

**Problem:** Tickets not being created in FreeScout

**Solutions:**

1. Verify API module is installed and enabled in FreeScout
2. Check API key is correct in `.env`
3. Verify FreeScout API URL is accessible from the server
4. Check FreeScout mailbox ID exists
5. Review logs in `logs/app.log`

## Authentication issues

**Problem:** LDAP authentication fails

**Solutions:**

1. Verify LDAP server is accessible
2. Check LDAP credentials and base DN
3. Test LDAP connection from server: `ldapsearch -x -H ldap://server -D "user" -W -b "dc=domain,dc=com"`
4. Review logs in `logs/app.log`

**Problem:** Cannot create local account

**Solution:** Ensure `ENABLE_LOCAL_AUTH=true` in `.env`

## File upload issues

**Problem:** File uploads fail

**Solutions:**

1. Check `uploads/` directory permissions (755 or 775)
2. Verify PHP upload limits: `upload_max_filesize` and `post_max_size`
3. Check disk space
