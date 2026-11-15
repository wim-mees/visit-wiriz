(() => {
  document.documentElement.classList.add('js');

  /* Welkomstfoto: zacht scherpstellen zodra hij geladen is */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    const focus = () => requestAnimationFrame(() => requestAnimationFrame(() => heroBg.classList.add('is-loaded')));
    if (heroBg.complete && heroBg.naturalWidth) focus();
    else { heroBg.addEventListener('load', focus); heroBg.addEventListener('error', focus); }
  }

  /* Lichte parallax op de welkomstfoto */
  const hero = document.querySelector('.hero');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (heroBg && hero && !calm.matches) {
    let ticking = false;
    const parallax = () => {
      const y = window.scrollY;
      if (y <= hero.offsetHeight) heroBg.style.translate = '0 ' + (y * 0.2).toFixed(1) + 'px';
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });
    parallax();
  }

  /* Gradientwolk: willekeurige posities per foto, bij elke paginaload anders */
  document.querySelectorAll('.cloud').forEach((el) => {
    const r = (min, max) => (min + Math.random() * (max - min)).toFixed(0) + '%';
    el.style.setProperty('--c1x', r(5, 40));  el.style.setProperty('--c1y', r(5, 40));
    el.style.setProperty('--c2x', r(60, 95)); el.style.setProperty('--c2y', r(10, 50));
    el.style.setProperty('--c3x', r(15, 55)); el.style.setProperty('--c3y', r(60, 95));
    el.style.setProperty('--c4x', r(55, 90)); el.style.setProperty('--c4y', r(55, 95));
  });

  /* Gradientwolk: lichte parallax, de wolk schuift trager mee dan de foto */
  const clouds = [...document.querySelectorAll('.cloud')];
  if (clouds.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let busy = false;
    const drift = () => {
      const mid = window.innerHeight / 2;
      clouds.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        const offset = (r.top + r.height / 2 - mid) * -0.18;
        el.style.setProperty('--cloud-shift', offset.toFixed(1) + 'px');
      });
      busy = false;
    };
    window.addEventListener('scroll', () => { if (!busy) { busy = true; requestAnimationFrame(drift); } }, { passive: true });
    window.addEventListener('resize', drift);
    drift();
  }

  /* Tabs: Sleep / Shop / Eat */
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));
  const select = (i, focus) => {
    tabs.forEach((t, j) => {
      const on = i === j;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panels[j].hidden = !on;
    });
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      const keys = { ArrowRight: 1, ArrowLeft: -1 };
      if (e.key in keys) { e.preventDefault(); select((i + keys[e.key] + tabs.length) % tabs.length, true); }
      if (e.key === 'Home') { e.preventDefault(); select(0, true); }
      if (e.key === 'End') { e.preventDefault(); select(tabs.length - 1, true); }
    });
  });
  if (tabs.length) select(0);

  if ('IntersectionObserver' in window) {
    /* Zachte reveal-animatie */
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }
})();
