---
title: Managing Users
description: Manage local Scout Portal accounts via self-service registration or the command-line user management script.
order: 6
---

## Self-service registration

Users can create their own accounts at `/auth/register` when `ENABLE_LOCAL_AUTH=true`.

## Command-line management

```bash
# Create a user
php bin/manage-local-users.php create username email@example.com "Full Name"

# List all users
php bin/manage-local-users.php list

# Reset password
php bin/manage-local-users.php reset-password username

# Disable/enable user
php bin/manage-local-users.php disable username
php bin/manage-local-users.php enable username

# Delete user
php bin/manage-local-users.php delete username
```
