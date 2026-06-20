export interface FaqItem { q: string; a: string; }

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'What is Support Portal for FreeScout?',
    a: 'Support Portal is a free, self-hosted, open-source web app that gives your end users a friendly form-based interface to submit support tickets to FreeScout, attach files, and track ticket status — without giving them access to the FreeScout agent UI.',
  },
  {
    q: 'Is Support Portal free?',
    a: 'Yes. It is open-source software released under the GNU General Public License v3.0 and is free to self-host.',
  },
  {
    q: 'What do I need to run it?',
    a: 'PHP 8.1+ with the pdo_sqlite, curl, json, mbstring and fileinfo extensions, Composer, a web server (Apache or Nginx), and a FreeScout instance with the API module installed. The ldap extension is needed only for LDAP authentication.',
  },
  {
    q: 'Does it support LDAP / Active Directory?',
    a: 'Yes. It supports LDAP/Active Directory, local SQLite accounts, or both at once. LDAP binds over StartTLS or LDAPS and escapes credentials and the username filter.',
  },
  {
    q: 'Does it require FreeScout modules?',
    a: 'The FreeScout API module is required. The Custom Fields and Tags modules are optional and enhance functionality, but the portal works with just the API module.',
  },
  {
    q: 'Can I run it with Docker?',
    a: 'Yes. The repository includes a Dockerfile and docker-compose.yml so you can run the portal in a container.',
  },
  {
    q: 'Is it secure?',
    a: 'The app requires a CSRF secret to boot, validates all file uploads, throttles login attempts per username and IP, sets HttpOnly/SameSite=Strict/Secure cookies, and sends a Content-Security-Policy and hardening headers on every response.',
  },
];
