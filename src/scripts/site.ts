/**
 * Two jobs: the mobile menu, and the booking forms.
 *
 * TODO: connect the form to the owner's email/SMS/dispatch. Until a backend
 * exists, a valid request becomes a prefilled email to stalliontaxi@outlook.com,
 * and the Call Now path is always one tap away.
 */

const OWNER_EMAIL = 'stalliontaxi@outlook.com';
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

/* ---------------------------------------------------------------- nav menu */

const navToggle = document.querySelector<HTMLButtonElement>('#nav-toggle');
const navPanel = document.querySelector<HTMLElement>('#nav-panel');

if (navToggle && navPanel) {
  const setOpen = (open: boolean) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navPanel.hidden = !open;
  };

  navToggle.addEventListener('click', () => {
    setOpen(navPanel.hidden);
  });

  navPanel.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !navPanel.hidden) {
      setOpen(false);
      navToggle.focus();
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

/* ------------------------------------------------------------ booking forms */

const readValue = (form: HTMLFormElement, name: string) => {
  const field = form.elements.namedItem(name);
  return field instanceof HTMLInputElement ||
    field instanceof HTMLSelectElement ||
    field instanceof HTMLTextAreaElement
    ? field.value.trim()
    : '';
};

const setError = (form: HTMLFormElement, name: string, show: boolean) => {
  const field = form.elements.namedItem(name);
  if (!(field instanceof HTMLElement)) return;
  const message = form.querySelector<HTMLElement>(`#${field.id}-error`);

  field.setAttribute('aria-invalid', show ? 'true' : 'false');
  if (message) message.dataset.visible = String(show);
};

const isPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
};

const formatDate = (iso: string) => {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatTime = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return value;
  const suffix = hours >= 12 ? 'p.m.' : 'a.m.';
  const hour = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`;
};

const buildMailto = (values: Record<string, string>) => {
  const date = values.date ? formatDate(values.date) : '';
  const time = values.time ? formatTime(values.time) : '';
  const lines = [
    `Ride request from the Stallion Taxi website`,
    ``,
    `Name: ${values.name || '(not given)'}`,
    `Phone: ${values.phone}`,
    `Pickup: ${values.pickup}`,
    `Drop-off: ${values.dropoff || '(not given)'}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Passengers: ${values.passengers}`,
    `Notes: ${values.notes || '(none)'}`,
  ];

  const subject = `Ride request — ${date} at ${time}`;
  return `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join('\n'),
  )}`;
};

const SUMMARY_FIELDS: Array<[string, string]> = [
  ['name', 'Name'],
  ['phone', 'Phone'],
  ['pickup', 'Pickup'],
  ['dropoff', 'Drop-off'],
  ['date', 'Date'],
  ['time', 'Time'],
  ['passengers', 'Passengers'],
  ['notes', 'Notes'],
];

document.querySelectorAll<HTMLFormElement>('[data-booking-form]').forEach((form) => {
  const confirmation = form.parentElement?.querySelector<HTMLElement>('[data-confirmation]');
  const summary = confirmation?.querySelector<HTMLElement>('[data-summary]');
  const mailto = confirmation?.querySelector<HTMLAnchorElement>('[data-mailto]');
  const editButton = confirmation?.querySelector<HTMLButtonElement>('[data-edit]');
  const formError = form.querySelector<HTMLElement>('[data-form-error]');

  const dateField = form.elements.namedItem('date');
  if (dateField instanceof HTMLInputElement) {
    const iso = (date: Date) => date.toISOString().slice(0, 10);
    const latest = new Date(TODAY);
    latest.setFullYear(latest.getFullYear() + 1);
    dateField.min = iso(TODAY);
    dateField.max = iso(latest);
  }

  // Clear a field's error as soon as the person fixes it.
  form.addEventListener('input', (event) => {
    const field = event.target;
    if (field instanceof HTMLElement && 'name' in field && field.getAttribute('aria-invalid') === 'true') {
      setError(form, (field as HTMLInputElement).name, false);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const values: Record<string, string> = {
      name: readValue(form, 'name'),
      phone: readValue(form, 'phone'),
      pickup: readValue(form, 'pickup'),
      dropoff: readValue(form, 'dropoff'),
      date: readValue(form, 'date'),
      time: readValue(form, 'time'),
      passengers: readValue(form, 'passengers'),
      notes: readValue(form, 'notes'),
    };

    const validators: Record<string, (value: string) => boolean> = {
      name: (value) => value.length > 1,
      phone: isPhone,
      pickup: (value) => value.length > 2,
      date: (value) => value !== '' && new Date(`${value}T12:00:00`) >= TODAY,
      time: (value) => value !== '',
    };

    let firstInvalid: HTMLElement | null = null;

    // Walk the fields in the order they appear on screen so the first error is the one the
    // person would have hit first.
    form.querySelectorAll<HTMLElement>('input, select, textarea').forEach((control) => {
      const name = (control as HTMLInputElement).name;
      const validate = validators[name];
      if (!validate) return;

      const valid = validate(values[name] ?? '');
      setError(form, name, !valid);
      if (!valid && !firstInvalid) firstInvalid = control;
    });

    if (firstInvalid) {
      if (formError) formError.hidden = false;
      (firstInvalid as HTMLElement).focus();
      return;
    }

    if (formError) formError.hidden = true;

    if (summary) {
      summary.replaceChildren();
      SUMMARY_FIELDS.forEach(([name, label]) => {
        const value =
          name === 'date'
            ? values.date && formatDate(values.date)
            : name === 'time'
              ? values.time && formatTime(values.time)
              : values[name];
        if (!value) return;

        const row = document.createElement('div');
        const term = document.createElement('dt');
        term.textContent = label;
        term.className = 'text-[0.625rem] font-medium tracking-[0.16em] text-mute uppercase';
        const description = document.createElement('dd');
        description.textContent = value;
        description.className = 'mt-1 text-bone';
        row.append(term, description);
        summary.append(row);
      });
    }

    if (mailto) mailto.href = buildMailto(values);

    form.hidden = true;
    if (confirmation) {
      confirmation.hidden = false;
      confirmation.setAttribute('tabindex', '-1');
      confirmation.focus({ preventScroll: true });
      confirmation.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  });

  editButton?.addEventListener('click', () => {
    if (confirmation) confirmation.hidden = true;
    form.hidden = false;
    const first = form.querySelector<HTMLElement>('input, select, textarea');
    first?.focus();
  });
});

/* ------------------------------------------------------------- page motion */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // Blocks rise into place as they enter the viewport.
  const revealTargets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];

  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    document.documentElement.classList.add('reveal-ready');

    revealTargets.forEach((element) => {
      const siblings = [...(element.parentElement?.children ?? [])].filter((sibling) =>
        sibling.hasAttribute('data-reveal'),
      );
      const index = siblings.indexOf(element);
      if (index > 0) element.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
    );

    revealTargets.forEach((element) => observer.observe(element));

    // The observer only reports frames it actually sees. After a jump (anchor link, restored
    // scroll position, browser resize) sweep the current viewport so nothing stays hidden.
    const sweep = () => {
      const viewportHeight = window.innerHeight;
      revealTargets.forEach((element) => {
        if (element.classList.contains('is-revealed')) return;
        const rect = element.getBoundingClientRect();
        if (rect.top < viewportHeight * 0.96 && rect.bottom > 0) {
          element.classList.add('is-revealed');
          observer.unobserve(element);
        }
      });
    };

    requestAnimationFrame(sweep);
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep);
  }

  // Parallax: the image inside a clipping frame drifts as its section passes.
  const parallaxTargets = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];

  if (parallaxTargets.length > 0) {
    let queued = false;

    const paint = () => {
      queued = false;
      const viewportHeight = window.innerHeight;

      parallaxTargets.forEach((image) => {
        const host = image.parentElement;
        if (!host) return;

        const rect = host.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > viewportHeight + 200) return;

        const speed = Number(image.dataset.parallax ?? '0.1');
        const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
        const shift = -progress * speed * rect.height;
        image.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0) scale(1.25)`;
      });
    };

    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
  }
}

const siteHeader = document.querySelector('header');

if (siteHeader) {
  const syncHeader = () => siteHeader.toggleAttribute('data-stuck', window.scrollY > 8);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
}
