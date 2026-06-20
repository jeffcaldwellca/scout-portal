export interface Feature { title: string; blurb: string; icon: string; }

// icon = the `d` attribute of a 24x24 stroke icon path.
export const FEATURES: Feature[] = [
  { title: 'Dynamic request forms', blurb: 'Conditional fields per request type — onboarding, problems, changes, access and software requests.', icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2' },
  { title: 'LDAP & local auth', blurb: 'Authenticate against Active Directory / LDAP, local SQLite accounts, or let users choose.', icon: 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2' },
  { title: 'File attachments', blurb: 'Users attach screenshots and documents; uploads are type-, size- and content-validated.', icon: 'M21.44 11.05 12 20.5a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48' },
  { title: 'Ticket dashboard', blurb: 'A "My Tickets" view with real-time status — Active, Pending, Closed — and full history.', icon: 'M3 13h8V3H3v10Zm10 8h8V3h-8v18ZM3 21h8v-6H3v6Z' },
  { title: 'Two-way messaging', blurb: 'Users reply to tickets and read responses from support staff in a single thread.', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z' },
  { title: 'Custom branding', blurb: 'Configure company name, logo, colors, icon, and support contacts to match your org.', icon: 'M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5' },
];
