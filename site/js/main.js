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

  /* Groeiende welkomstfoto (zoals anthropic.com): start als afgeronde container (88% schermhoogte),
     groeit tijdens het eerste stuk scrollen naar de volle breedte, schuift daarna onder het menu weg. */
  const heroMedia = document.querySelector('.hero__media');
  if (heroMedia) {
    let tickingGrow = false;
    const grow = () => {
      tickingGrow = false;
      const box = document.querySelector('.site-nav .container') || document.querySelector('.container');
      const pad = parseFloat(getComputedStyle(box).paddingLeft) || 0;
      const edge = box.getBoundingClientRect().left + pad;          /* linkerrand van de inhoud */
      const x0 = Math.max(16, edge - 48);                            /* foto 48px breder dan de inhoud */
      const navH = document.querySelector('.site-nav')?.offsetHeight || 64;
      const dist = window.innerHeight * 0.4;                          /* na 40% schermhoogte scrollen: volle breedte */
      const p = calm.matches ? 0 : Math.min(1, Math.max(0, window.scrollY / dist));
      const k = 1 - p;
      heroMedia.style.setProperty('--hi-t', (navH + 24) * k + 'px');
      heroMedia.style.setProperty('--hi-b', 24 * k + 'px');
      heroMedia.style.setProperty('--hi-x', x0 * k + 'px');
      heroMedia.style.setProperty('--hi-r', 24 * k + 'px');
    };
    window.addEventListener('scroll', () => { if (!tickingGrow) { tickingGrow = true; requestAnimationFrame(grow); } }, { passive: true });
    window.addEventListener('resize', grow);
    grow();
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

  /* Kaart van Zweden: zoomt in op Midden-Zweden terwijl je scrolt. Het zoomen start zodra de kaart
     onderaan in beeld komt en is klaar als de bovenkant van de kaart op een kwart van het scherm staat.
     De labels (afstand, vliegtijden) volgen dezelfde zoom en verschijnen op het einde.
     Met 'minder beweging' (prefers-reduced-motion) staat de kaart meteen ingezoomd. */
  document.querySelectorAll('.map-plain[data-zoom], .map-zoom[data-zoom]').forEach((fig) => {
    const img = fig.querySelector('img');
    if (!img) return;
    const labels = [...fig.querySelectorAll('.map-label, .map-tag')];
    const small = window.matchMedia('(max-width: 768px)');              // regiokaart: andere uitsnede (svg) op mobiel
    const mob = () => small.matches && fig.dataset.zoomM;
    let vw, vh, zx, zy, zw, zh;
    const dims = () => {
      [vw, vh] = (mob() ? fig.dataset.vbM : fig.dataset.vb).split(' ').map(Number);              // volledige kaart (svg-eenheden)
      [zx, zy, zw, zh] = (mob() ? fig.dataset.zoomM : fig.dataset.zoom).split(' ').map(Number);  // zoomgebied
    };
    dims();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lerp = (a, b, t) => a + (b - a) * t;
    const route = fig.querySelector('.map-route path');
    const car = fig.querySelector('.map-car');
    const routeLen = route && route.getTotalLength ? route.getTotalLength() : 0;
    const CAR_SIZE = 12;                                                 // svg-eenheden, schaalt mee met de zoom
    const STOCKHOLM_Y = 349.55;                                          // punt van de Stockholm-pin (svg-eenheden)
    const HOME_Y = 251.3;                                                // punt van het huis-pinnetje (svg-eenheden)
    let last = '';
    const render = (force) => {
      const W = img.clientWidth, H = img.clientHeight;
      if (!W || !H) return;
      const r = fig.getBoundingClientRect(), vp = window.innerHeight;
      let t = reduce.matches ? 1 : (vp - r.top) / (vp * 0.75);
      t = Math.min(1, Math.max(0, t));
      t = t * t * (3 - 2 * t);                                            // zacht vertrekken en landen
      // Autootje: vertrekt pas als Stockholm in beeld is (onderaan het scherm, met wat marge) en komt bij Wim & Iris
      // aan op het einde van de scroll: als het huisje bijna bovenaan uit beeld gaat (15% van de schermhoogte). We rekenen met de plek van Stockholm op de
      // ingezoomde kaart: die schuift gelijkmatig mee met het scrollen, dus het autootje rijdt nooit achteruit.
      // 'Minder beweging': het autootje staat stil halverwege.
      const py0 = (() => { const n = parseFloat(getComputedStyle(img).objectPosition.split(' ')[1]); return isNaN(n) ? 0.5 : n / 100; })();
      const sZ = Math.max(W / zw, H / zh);                                // schaal van de ingezoomde kaart
      const stockY = r.top + img.offsetTop + (H - zh * sZ) * py0 - zy * sZ + STOCKHOLM_Y * sZ;
      const startY = vp * 0.9;                                              // Stockholm komt onderaan in beeld
      const endY = vp * 0.15 + (STOCKHOLM_Y - HOME_Y) * sZ;                // huisje staat dan op 15% van boven
      let c = reduce.matches ? 0.65 : (startY - stockY) / Math.max(vp * 0.2, startY - endY);
      c = Math.min(1, Math.max(0, c));
      if (!reduce.matches) c = c * c * (3 - 2 * c);
      const key = t.toFixed(4) + '|' + c.toFixed(4);
      if (!force && key === last) return;
      last = key;
      const [px, py] = getComputedStyle(img).objectPosition.split(' ').map((v) => { const n = parseFloat(v); return isNaN(n) ? 0.5 : n / 100; });
      // Begin: hele kaart (object-fit: cover). Einde: het zoomgebied vult het vlak.
      const s0 = Math.max(W / vw, H / vh), ox0 = (W - vw * s0) * px, oy0 = (H - vh * s0) * py;
      const s1 = Math.max(W / zw, H / zh), ox1 = (W - zw * s1) * px - zx * s1, oy1 = (H - zh * s1) * py - zy * s1;
      const s = s0 * Math.pow(s1 / s0, t);
      const cx = lerp((W / 2 - ox0) / s0, (W / 2 - ox1) / s1, t);
      const cy = lerp((H / 2 - oy0) / s0, (H / 2 - oy1) / s1, t);
      const ox = W / 2 - cx * s, oy = H / 2 - cy * s, k = s / s0;
      img.style.transform = `translate(${(ox - k * ox0).toFixed(2)}px, ${(oy - k * oy0).toFixed(2)}px) scale(${k.toFixed(4)})`;
      const show = Math.min(1, Math.max(0, (t - 0.8) / 0.2));
      labels.forEach((l) => {
        const lx = mob() && l.dataset.xm ? +l.dataset.xm : +l.dataset.x, ly = mob() && l.dataset.ym ? +l.dataset.ym : +l.dataset.y;
        l.style.setProperty('--lx', (img.offsetLeft + ox + lx * s).toFixed(1) + 'px');
        l.style.setProperty('--ly', (img.offsetTop + oy + ly * s).toFixed(1) + 'px');
        if (!l.classList.contains('map-tag')) l.style.opacity = show;   /* plaatsnamen altijd zichtbaar */
        l.classList.add('is-placed');
      });
      if (car && routeLen) {
        const pt = route.getPointAtLength(lerp(routeLen, 3.5, c));      // de lijn loopt van het huisje (0) naar Stockholm (einde)
        car.style.setProperty('--cx', (img.offsetLeft + ox + pt.x * s).toFixed(1) + 'px');
        car.style.setProperty('--cy', (img.offsetTop + oy + pt.y * s).toFixed(1) + 'px');
        car.style.setProperty('--cs', (CAR_SIZE * s).toFixed(1) + 'px');
        car.classList.add('is-placed');
      }
    };
    let busy = false;
    window.addEventListener('scroll', () => {
      if (busy) return;
      busy = true;
      requestAnimationFrame(() => { busy = false; render(); });
    }, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(() => render(true)).observe(img);
    else window.addEventListener('resize', () => render(true));
    reduce.addEventListener?.('change', () => render(true));
    small.addEventListener?.('change', () => { dims(); render(true); });
    img.addEventListener('load', () => render(true));
    render(true);
  });

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

  /* Menu: Sleep, Shop en Eat openen meteen het juiste tabblad; de huidige sectie krijgt aria-current */
  const navLinks = [...document.querySelectorAll('.site-nav__link')];
  const currentTab = () => { const t = tabs.find((x) => x.getAttribute('aria-selected') === 'true'); return t ? t.id.replace('tab-', '') : null; };
  let currentSection = null;
  const markNav = () => {
    navLinks.forEach((a) => {
      const on = a.hash === '#' + currentSection && (!a.dataset.tab || a.dataset.tab === currentTab());
      if (on) {
        a.setAttribute('aria-current', 'location');
        const list = a.closest('.site-nav__list');   /* mobiel: het actieve item in beeld schuiven */
        if (list && list.scrollWidth > list.clientWidth) list.scrollTo({ left: a.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft - (list.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
      } else a.removeAttribute('aria-current');
    });
  };
  navLinks.forEach((a) => a.addEventListener('click', () => {
    if (a.dataset.tab) { const i = tabs.findIndex((t) => t.id === 'tab-' + a.dataset.tab); if (i > -1) select(i); }
  }));
  tabs.forEach((t) => t.addEventListener('click', markNav));
  const navSections = [...new Set(navLinks.map((a) => a.hash))].map((h) => document.querySelector(h)).filter(Boolean);
  /* Huidige sectie = de sectie die over een lijn op 40% van de schermhoogte ligt. Rekent bij elke scroll
     (één keer per frame) in plaats van met IntersectionObserver: die negeert zijn marges in een iframe
     (zoals de preview), waardoor soms het verkeerde menu-item actief bleef. */
  if (navSections.length) {
    let ticking = false;
    const spy = () => {
      ticking = false;
      const line = window.innerHeight * 0.4;
      const hit = navSections.find((sec) => { const r = sec.getBoundingClientRect(); return r.top <= line && r.bottom > line; });
      const id = hit ? hit.id : null;
      if (id !== currentSection) { currentSection = id; markNav(); }
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
    window.addEventListener('resize', spy);
    spy();
  }

  /* Regio's: "Onze tips" klapt een paneel open; één tegelijk open */
  const regionToggles = [...document.querySelectorAll('.region-card__toggle')];
  regionToggles.forEach((btn) => btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    regionToggles.forEach((b) => {
      const on = b === btn && open;
      b.setAttribute('aria-expanded', String(on));
      b.closest('.region-card').classList.toggle('is-open', on);
      document.getElementById(b.getAttribute('aria-controls')).classList.toggle('is-open', on);
    });
    /* Na het openklappen (0,35s, ook het dichtklappen van een ander blok) naar de bovenkant van het blok scrollen,
       zodat het open blok volledig in beeld komt. scroll-padding houdt rekening met het menu. */
    if (open) {
      const card = btn.closest('.region-card');
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setTimeout(() => {
        /* Enkel scrollen als de bovenkant van het blok niet (goed) zichtbaar is: verstopt onder het menu of onderaan buiten beeld */
        const top = card.getBoundingClientRect().top;
        const navH = document.querySelector('.site-nav')?.offsetHeight || 0;
        if (top < navH || top > window.innerHeight - 96) card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      }, reduce ? 0 : 360);
    }
  }));

  /* Route-verkenner: één optie tegelijk open; de kaart toont de gekozen route (of alle routes als niets open staat) */
  document.querySelectorAll('.routes-explorer').forEach((explorer) => {
    const map = explorer.querySelector('.route-map--big');
    const options = [...explorer.querySelectorAll('.route-option')];
    /* Label "Hoe wil je reizen?" op het midden van de weg (volgt de uitsnede van de kaart) */
    const hint = map && map.querySelector('.route-map__hint');
    const road = map && map.querySelector('.route-map__road');
    const placeHint = () => {
      const svg = map.querySelector('svg'); const ctm = svg.getScreenCTM(); if (!ctm) return;
      const box = map.getBoundingClientRect();
      map.querySelectorAll('.map-tag').forEach((tag) => {   /* plaatsnamen naast de pinnen */
        const q = svg.createSVGPoint(); q.x = +tag.dataset.x; q.y = +tag.dataset.y;
        const sp = q.matrixTransform(ctm);
        tag.style.setProperty('--lx', (sp.x - box.left).toFixed(1) + 'px');
        tag.style.setProperty('--ly', (sp.y - box.top).toFixed(1) + 'px');
        tag.classList.add('is-placed');
      });
      /* Het label schuift heel licht mee over de weg tijdens het scrollen: van onder het midden (richting Stockholm)
         naar erboven (richting Wim & Iris), over ongeveer een derde van de weg. We meten op het hele blok, want de kaart zelf blijft staan (sticky). */
      const eb = explorer.getBoundingClientRect(), vp = window.innerHeight;
      let prog = calmHint.matches ? 0.5 : (vp - eb.top) / (vp + eb.height);
      prog = Math.min(1, Math.max(0, prog));
      const p = road.getPointAtLength(road.getTotalLength() * (0.66 - 0.32 * prog));
      const pt = svg.createSVGPoint(); pt.x = p.x; pt.y = p.y;
      const s = pt.matrixTransform(ctm); const r = map.getBoundingClientRect();
      hint.style.setProperty('--lx', (s.x - r.left).toFixed(1) + 'px');
      hint.style.setProperty('--ly', (s.y - r.top).toFixed(1) + 'px');
      hint.classList.add('is-placed');
    };
    const calmHint = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (hint && road) {
      placeHint();
      let hintBusy = false;
      window.addEventListener('scroll', () => {
        if (hintBusy) return;
        hintBusy = true;
        requestAnimationFrame(() => { hintBusy = false; placeHint(); });
      }, { passive: true });
      if ('ResizeObserver' in window) new ResizeObserver(placeHint).observe(map);
      else window.addEventListener('resize', placeHint);
    }
    const setOpen = (target) => {
      options.forEach((opt) => {
        const open = opt === target;
        opt.classList.toggle('is-open', open);
        opt.querySelector('.route-option__toggle').setAttribute('aria-expanded', String(open));
      });
      if (map) {
        if (target) map.dataset.active = target.dataset.route;
        else delete map.dataset.active;
      }
    };
    options.forEach((opt) => {
      opt.querySelector('.route-option__toggle').addEventListener('click', () => {
        setOpen(opt.classList.contains('is-open') ? null : opt);
      });
    });
    setOpen(null);
  });

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
