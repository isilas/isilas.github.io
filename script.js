const nodes = document.querySelectorAll('.node[data-base-angle]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let paused = false;
const graph = document.querySelector('.orbit-wrap');
if (graph) {
  graph.addEventListener('mouseenter', () => paused = true);
  graph.addEventListener('mouseleave', () => paused = false);
}
function animate(t) {
  if (!reduceMotion && !paused) {
    const rotation = (t / 125) % 360;
    nodes.forEach((node, i) => {
      const base = Number(node.dataset.baseAngle || 0);
      const direction = i % 2 === 0 ? 1 : 0.65;
      node.style.setProperty('--angle', `${base + rotation * direction}deg`);
    });
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
