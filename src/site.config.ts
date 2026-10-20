// The site's name, description, contact details and menus, in one place.
// Every page reads from here, so changing the business name is one edit.

export const site = {
  name: 'Your Business Name',
  tagline: 'One sentence about what you do and who it is for.',
  description: 'A short description of the business, shown in search results and link previews.',
  email: 'hello@example.com',

  // The logo in the header. null shows the name as text instead.
  // src is a file in public/ ('/logo.svg'); height is in pixels;
  // showName also shows the name as text next to the logo.
  logo: null as null | { src: string; height: number; showName: boolean },

  // The menu at the top of every page, in order.
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  // Links in the footer of every page.
  footerLinks: [{ label: 'Privacy', href: '/privacy' }],
};
