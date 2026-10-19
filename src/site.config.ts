// The site's name, description, contact details and menus, in one place.
// Every page reads from here, so changing the business name is one edit.

export const site = {
  name: 'Your Business Name',
  tagline: 'One sentence about what you do and who it is for.',
  description: 'A short description of the business, shown in search results and link previews.',
  email: 'hello@example.com',

  // The menu at the top of every page, in order.
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  // Links in the footer of every page.
  footerLinks: [{ label: 'Privacy', href: '/privacy' }],
};
