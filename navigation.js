(() => {
  'use strict';
  const nav = document.querySelector('.nav');
  const button = nav?.querySelector('.nav-toggle');
  const links = nav?.querySelector('#site-navigation');
  if (!nav || !button || !links) return;
  const mobile = window.matchMedia('(max-width:1080px)');
  function setOpen(open, restoreFocus = false) {
    links.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    if (restoreFocus) button.focus();
  }
  nav.classList.add('nav-enhanced');
  button.hidden = false;
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && button.getAttribute('aria-expanded') === 'true') setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (mobile.matches && !nav.contains(event.target)) setOpen(false);
  });
  mobile.addEventListener('change', () => setOpen(false));
})();