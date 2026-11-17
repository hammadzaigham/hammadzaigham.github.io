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

/** Progressive single-caret typewriter reveal; falls back to static text under reduced motion. */
export function enhanceTypewriter() {
  const line = document.querySelector<HTMLElement>('.typewriter-line');
  if (!line) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const characters = Array.from(line.querySelectorAll<HTMLElement>('.typewriter-character'));
  if (!characters.length || preference.matches) return;

  const finish = () => {
    characters.forEach(character => {
      character.classList.add('is-typed');
      character.classList.remove('is-caret', 'is-caret-blink');
    });
    line.classList.remove('typewriter-active');
  };

  preference.addEventListener('change', () => {
    if (preference.matches) finish();
  });

  line.classList.add('typewriter-active');
  const stepMs = 55;
  const startDelayMs = 300;
  let startedAt: number | null = null;
  let activeCaretIndex = -1;

  const tick = (now: number) => {
    if (preference.matches) {
      finish();
      return;
    }
    if (startedAt === null) startedAt = now + startDelayMs;
    const elapsed = now - startedAt;
    if (elapsed < 0) {
      requestAnimationFrame(tick);
      return;
    }
    const revealedCount = Math.min(characters.length, Math.floor(elapsed / stepMs) + 1);
    for (let i = 0; i < revealedCount; i++) {
      characters[i].classList.add('is-typed');
    }
    const caretIndex = revealedCount - 1;
    if (caretIndex !== activeCaretIndex) {
      if (activeCaretIndex >= 0) characters[activeCaretIndex].classList.remove('is-caret');
      characters[caretIndex].classList.add('is-caret');
      activeCaretIndex = caretIndex;
    }
    if (revealedCount < characters.length) {
      requestAnimationFrame(tick);
      return;
    }
    const last = characters[characters.length - 1];
    last.classList.remove('is-caret');
    last.classList.add('is-caret-blink');
    window.setTimeout(() => last.classList.remove('is-caret-blink'), 1800);
  };

  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.08 });
  observer.observe(line);
}
