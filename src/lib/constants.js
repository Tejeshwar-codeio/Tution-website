export const BRAND = 'ScoreMax Institute';

export const LOCATIONS = 'Guduvanchery & Kelambakkam';

export const CONTACT = {
  email: 'contact@scoremax.in',
  phone: '+91 98765 43210',
  address: 'No 04, Nakkeran Street, Guduvanchery (Near Noor Restaurant)',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'School Programs', to: '/school' },
  { label: 'Engineering', to: '/engineering' },
  { label: 'Projects', to: '/projects' },
  { label: 'Mentors', to: '/mentors' },
  { label: 'Results', to: '/results' },
  { label: 'Contact', to: '/contact' },
];

export const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
