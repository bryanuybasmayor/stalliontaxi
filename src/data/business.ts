/**
 * Every business fact on the site lives here.
 * Update this file and the whole page follows — header, footer, form and schema.
 *
 * Source: Stallion Taxi's Facebook page, checked October 25, 2026.
 * https://www.facebook.com/people/Stallion-Taxi/61593001542307/
 */

export const business = {
  name: 'Stallion Taxi',
  tagline: 'PREMIUM RIDE AT A STANDARD PRICE',

  phoneDisplay: '(306) 920-9896',
  phoneHref: 'tel:+13069209896',
  email: 'stalliontaxi@outlook.com',
  emailHref: 'mailto:stalliontaxi@outlook.com',
  facebook: 'https://www.facebook.com/people/Stallion-Taxi/61593001542307/',

  city: 'Melfort',
  provinceShort: 'SK',
  postalCode: 'S0E1A0',

  hours: {
    days: 'Seven days a week',
    opens: '6:00 a.m.',
    closes: '1:00 a.m.',
    schema: { dayOfWeek: 'Monday Tuesday Wednesday Thursday Friday Saturday Sunday', opens: '06:00', closes: '01:00' },
  },

  launch: {
    serviceStarts: 'Tuesday, October 27, 2026',
    phoneLinesOpen: 'Monday, October 26, 2026',
  },
} as const;

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  note: string;
};

/** Facebook, September 30 post. No fares were published, so out-of-town trips say "call for a quote". */
export const services: Service[] = [
  {
    id: 'melfort',
    index: '01',
    title: 'Rides in Melfort',
    description:
      'Short trips across town, the grocery store, work, the rink, or home after a late shift.',
    note: 'Charged as set out in the City of Melfort taxi bylaws.',
  },
  {
    id: 'medical',
    index: '02',
    title: 'Medical appointments',
    description:
      'Rides to and from appointments in Prince Albert, Saskatoon, and Regina.',
    note: 'Out-of-town, fixed price — call for a quote.',
  },
  {
    id: 'neighbours',
    index: '03',
    title: 'Kinistino, Tisdale, St. Brieux',
    description:
      'Transportation to and from these towns, in either direction.',
    note: 'Both directions, fixed price — call for a quote.',
  },
  {
    id: 'full-day',
    index: '04',
    title: 'Full-day bookings',
    description:
      'Keep a driver for the day: appointments, errands, a family event, or a full day out of town.',
    note: 'Call to arrange a date and a quote.',
  },
];

// Naicam is deliberately not listed: a Facebook reply mentioned it tentatively.
// Add it to `nearby` only once the owner confirms it (see the `naicam` TODO below).
export const serviceArea = {
  local: ['Melfort'],
  medical: ['Prince Albert', 'Saskatoon', 'Regina'],
  nearby: ['Kinistino', 'Tisdale', 'St. Brieux'],
};

export type Todo = { id: string; text: string; where: string };

/** Unconfirmed facts. These render as visible placeholders until the owner fills them in. */
export const todos: Todo[] = [
  {
    id: 'hours',
    text: 'Confirm the 6:00 a.m. – 1:00 a.m., seven-days-a-week hours are still current after the October 27, 2026 launch.',
    where: 'Hours note in the Visit section',
  },
  {
    id: 'naicam',
    text: 'Confirm whether Naicam is a pickup town, and the rate if it is.',
    where: 'Service area section',
  },
  {
    id: 'fares',
    text: 'Add real out-of-town fares or a price range to replace "call for a quote".',
    where: 'Services section',
  },
  {
    id: 'accessibility',
    text: 'Confirm wheelchair, walker, child-seat and luggage support so they can be listed as services.',
    where: 'Why Stallion section',
  },
  {
    id: 'fleet',
    text: 'Confirm vehicle make, model and passenger capacity for the fleet note.',
    where: 'Why Stallion section',
  },
  {
    id: 'address',
    text: 'Confirm a street address or mailing address (Facebook shows only Melfort, SK, S0E1A0).',
    where: 'Footer',
  },
  {
    id: 'domain',
    text: 'Confirm the website domain, then set it in astro.config.mjs so canonical and social URLs are absolute.',
    where: 'Site config',
  },
  {
    id: 'form',
    text: "Connect the booking form to the owner's email, SMS or dispatch system. Until then it shows a confirmation and prepares an email the passenger can send.",
    where: 'Booking form',
  },
  {
    id: 'photos',
    text: 'Replace the free stock photos with real Stallion Taxi photos (car, driver, Melfort streets).',
    where: 'All photography',
  },
];
