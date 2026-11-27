(() => {
  'use strict';
  // Show the résumé CTA only when the original PDF has been deployed.
  const resume = document.querySelector('#resume-download');
  if (resume) {
    fetch(resume.href, { method: 'HEAD', cache: 'no-cache' })
      .then(response => {
        if (response.ok && (response.headers.get('content-type') || '').toLowerCase().includes('application/pdf')) resume.hidden = false;
      })
      .catch(() => {});
  }
  const awards = document.querySelector('#portfolio-awards');
  if (awards) {
    const small = window.matchMedia('(max-width:760px)');
    const setAwardsLayout = () => { awards.open = !small.matches; };
    setAwardsLayout();
    if (small.addEventListener) small.addEventListener('change', setAwardsLayout);
    else if (small.addListener) small.addListener(setAwardsLayout);
  }

  const input = document.querySelector('#project-search');
  if (!input) return;
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const tags = Array.from(document.querySelectorAll('.skill-filter'));
  const status = document.querySelector('#search-status');
  const empty = document.querySelector('#no-results');
  const clear = document.querySelector('#clear-search');
  const mobileSelect = document.querySelector('#mobile-skill-select');
  const normalize = text => text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').trim();
  function filter() {
    const query = normalize(input.value);
    const words = query.split(/\s+/).filter(Boolean);
    let count = 0;
    cards.forEach(card => {
      const haystack = normalize(card.dataset.search || card.textContent);
      const match = words.every(word => haystack.includes(word));
      card.hidden = !match;
      if (match) count++;
    });
    tags.forEach(tag => tag.setAttribute('aria-pressed', String(query !== '' && normalize(tag.dataset.filter) === query)));
    status.textContent = count + (count === 1 ? ' project' : ' projects') + (query ? ' found' : '');
    empty.hidden = count !== 0;
    if (mobileSelect) {
      const selected = Array.from(mobileSelect.options).find(option => option.value !== '__custom__' && normalize(option.value) === query);
      mobileSelect.value = selected ? selected.value : '__custom__';
    }
  }
  input.addEventListener('input', filter);
  if (mobileSelect) mobileSelect.addEventListener('change', () => { input.value = mobileSelect.value === '__custom__' ? '' : mobileSelect.value; filter(); });
  clear.addEventListener('click', () => { input.value = ''; filter(); input.focus(); });
  tags.forEach(tag => tag.addEventListener('click', () => {
    input.value = normalize(input.value) === normalize(tag.dataset.filter) ? '' : tag.dataset.filter;
    filter();
  }));
  filter();
})();