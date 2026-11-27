(() => {
  'use strict';
  const output = document.querySelector('#blog-writing');
  const back = document.querySelector('#blog-back');
  const slug = new URLSearchParams(window.location.search).get('post');
  const isPost = slug !== null;
  if (isPost) back.hidden = false;
  if (isPost && !/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    output.textContent = 'Post not found.';
    return;
  }
  const source = isPost ? slug + '.md' : 'index.md';
  fetch(source, { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error('Markdown unavailable');
      return response.text();
    })
    .then(markdown => {
      if (typeof window.markdownit === 'function') {
        const renderer = window.markdownit({ html: false, linkify: true });
        output.innerHTML = renderer.render(markdown);
      } else {
        output.textContent = markdown;
        output.style.whiteSpace = 'pre-wrap';
      }
      if (isPost) {
        const heading = output.querySelector('h1,h2');
        if (heading) document.title = heading.textContent + ' | Silas Ifeanyi';
      }
    })
    .catch(() => {
      output.textContent = isPost ? 'Post not found.' : 'Coming soon.';
    });
})();
