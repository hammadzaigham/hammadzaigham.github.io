/** Preserve native details behavior as the no-script/reduced-motion fallback. */
export function enhanceProjectDetails() {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll<HTMLDetailsElement>('.project-details').forEach(details => {
    const summary = details.querySelector('summary');
    if (!summary) return;
    let animation: Animation | null = null;
    let expanded = details.open;
    const settle = () => {
      animation?.cancel();
      animation = null;
      details.open = expanded;
      details.style.height = '';
      details.style.overflow = '';
    };
    summary.addEventListener('click', event => {
      if (preference.matches) return;
      event.preventDefault();
      if (!animation) expanded = details.open;
      expanded = !expanded;
      const startHeight = details.getBoundingClientRect().height;
      animation?.cancel();
      details.style.height = '';
      details.open = true;
      const endHeight = expanded ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height;
      details.style.overflow = 'hidden';
      const current = details.animate(
        [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
        { duration: 260, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }
      );
      animation = current;
      current.finished.then(() => { if (animation === current) settle(); }).catch(() => {});
    });
    preference.addEventListener('change', () => { if (preference.matches && animation) settle(); });
  });
}
