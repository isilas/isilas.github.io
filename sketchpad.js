(() => {
  'use strict';
  const input = document.querySelector('#project-search');
  if (!input) return;
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const tags = Array.from(document.querySelectorAll('.skill-filter'));
  const status = document.querySelector('#search-status');
  const empty = document.querySelector('#no-results');
  const clear = document.querySelector('#clear-search');
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
  }
  input.addEventListener('input', filter);
  clear.addEventListener('click', () => { input.value = ''; filter(); input.focus(); });
  tags.forEach(tag => tag.addEventListener('click', () => {
    input.value = normalize(input.value) === normalize(tag.dataset.filter) ? '' : tag.dataset.filter;
    filter();
  }));
  filter();
})();