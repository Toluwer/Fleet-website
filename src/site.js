const ICONS = {
  activity: '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  box: '<path d="m4 7 8-4 8 4-8 4z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  eye: '<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"/><circle cx="12" cy="12" r="2.5"/>',
  'eye-off': '<path d="m3 3 18 18M10.6 6.2A10 10 0 0 1 12 6c6 0 9.5 6 9.5 6a16 16 0 0 1-2.2 2.8M6.6 6.6C4 8.2 2.5 12 2.5 12s3.5 6 9.5 6c1 0 2-.2 2.9-.5"/>',
  'hard-drive': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 15h.01M11 15h6"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l2 2M14 9l2 2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12 18 6M12 3v2M21 12h-2"/>',
  refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M18 9a7 7 0 0 0-12-2L4 9M6 15a7 7 0 0 0 12 2l2-2"/>',
  rotate: '<path d="M20 7v5h-5M19 12a7 7 0 1 1-2-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  shield: '<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  sparkles: '<path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4zM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8zM19 14l.6 1.4L21 16l-1.4.6L19 18l-.6-1.4L17 16l1.4-.6z"/>',
  split: '<path d="M6 3v5c0 3 2 4 5 4h7M15 9l3 3-3 3M6 21v-4c0-2 1-3 3-4"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/>',
  tool: '<path d="M14 6a4 4 0 0 0-5-3l3 3-3 3-3-3a4 4 0 0 0 5 5l7 7 3-3-7-7z"/>',
  trash: '<path d="M4 7h16M9 3h6l1 4H8zM6 7l1 14h10l1-14M10 11v6M14 11v6"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 19c0-4 2-6 6-6s6 2 6 6M16 5a3 3 0 0 1 0 6M17 13c3 .2 4 2 4 5"/>'
};

function svg(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.sparkles}</svg>`;
}

const page = document.body.dataset.page || 'home';
const links = [
  ['home', './index.html', 'Overview']
];

function headerMarkup() {
  const nav = links.map(([id, href, label]) => `<a href="${href}" class="${page === id ? 'active' : ''}">${label}</a>`).join('');
  return `<header class="site-header" data-header>
    <div class="nav-shell shell">
      <a class="site-brand" href="./index.html" aria-label="Fleet home"><img src="./assets/fleet-logo.svg" alt=""><span>Fleet</span><small>for Windows</small></a>
      <nav class="desktop-nav" aria-label="Primary navigation">${nav}</nav>
      <div class="nav-actions"><span class="nav-version">v1.5.2</span><a class="button button-primary" href="https://github.com/Toluwer/Fleet">GitHub</a><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-toggle>${svg('menu')}</button></div>
    </div>
    <nav class="mobile-nav" aria-label="Mobile navigation" data-mobile-nav>${nav}<a class="button button-primary" href="https://github.com/Toluwer/Fleet">View on GitHub</a></nav>
  </header>`;
}

function footerMarkup() {
  return `<footer class="site-footer"><div class="shell">
    <div class="footer-grid">
      <div class="footer-intro"><a class="site-brand" href="./index.html"><img src="./assets/fleet-logo.svg" alt=""><span>Fleet</span></a><p>A local-first Windows command center for launching and managing multiple Roblox clients.</p></div>
      <div class="footer-column"><h3>Project</h3><a href="./index.html#demo">Demo</a><a href="./index.html#features">Features</a><a href="./index.html#inside">How it works</a></div>
      <div class="footer-column"><h3>Community</h3><a href="https://github.com/Toluwer/Fleet/issues">Issues</a><a href="https://github.com/Toluwer/Fleet/releases">Releases</a></div>
      <div class="footer-column"><h3>Source</h3><a href="https://github.com/Toluwer/Fleet">Application repository</a><a href="https://github.com/Toluwer/Fleet/releases">Releases</a><a href="https://github.com/Toluwer/Fleet/blob/main/LICENSE">MIT license</a></div>
    </div>
    <div class="footer-bottom"><span>© 2026 Fleet. Independent software; not affiliated with Roblox Corporation.</span><span>Local-first · Windows-only · MIT licensed</span></div>
  </div></footer>`;
}

const headerHost = document.querySelector('[data-site-header]');
const footerHost = document.querySelector('[data-site-footer]');
if (headerHost) headerHost.innerHTML = headerMarkup();
if (footerHost) footerHost.innerHTML = footerMarkup();
document.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = svg(node.dataset.icon); });

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');
const syncHeader = () => header?.classList.toggle('scrolled', scrollY > 12);
syncHeader();
addEventListener('scroll', syncHeader, { passive: true });
menuButton?.addEventListener('click', () => {
  const open = !mobileNav.classList.contains('open');
  mobileNav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});
mobileNav?.addEventListener('click', event => {
  if (event.target.closest('a')) { mobileNav.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false'); }
});

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = [...document.querySelectorAll('.reveal')];
if (reducedMotion || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('visible'));
else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .12, rootMargin: '0px 0px -35px' });
  reveals.forEach(el => observer.observe(el));
}

document.querySelector('[data-scroll-to-demo]')?.addEventListener('click', () => document.querySelector('#live-demo')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' }));

// Screenshot switcher and keyboard-accessible tabs.
const shots = {
  instances: { src: './screens/instances.png', alt: 'Fleet Instances page', number: '01', spots: ['Launch modes', 'Saved sessions'] },
  games: { src: './screens/games.png', alt: 'Fleet Games browser', number: '02', spots: ['Discovery filters', 'Game actions'] },
  people: { src: './screens/people.png', alt: 'Fleet People search', number: '03', spots: ['People and Server tabs', 'Live filters'] },
  stats: { src: './screens/stats.png', alt: 'Fleet playtime Stats page', number: '04', spots: ['Time windows', 'Local session data'] }
};
const showcase = document.querySelector('[data-showcase]');
if (showcase) {
  const tabs = [...showcase.querySelectorAll('.showcase-tab')];
  const frame = showcase.querySelector('.showcase-image-wrap');
  const image = showcase.querySelector('[data-showcase-image]');
  const title = showcase.querySelector('[data-showcase-title]');
  const copy = showcase.querySelector('[data-showcase-copy]');
  const number = showcase.querySelector('.caption-number');
  const spotButtons = [...showcase.querySelectorAll('[data-hotspot]')];
  const note = showcase.querySelector('[data-hotspot-note]');
  const select = tab => {
    const shot = shots[tab.dataset.shot];
    tabs.forEach(item => { const active = item === tab; item.classList.toggle('active', active); item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    frame.classList.add('switching');
    setTimeout(() => { image.src = shot.src; image.alt = shot.alt; title.textContent = tab.dataset.title; copy.textContent = tab.dataset.copy; number.textContent = shot.number; spotButtons.forEach((button, i) => { button.dataset.hotspot = shot.spots[i]; button.setAttribute('aria-label', `Show information about ${shot.spots[i]}`); }); note.textContent = 'Click a marker to inspect the workflow.'; frame.classList.remove('switching'); }, reducedMotion ? 0 : 160);
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp'].includes(event.key)) return;
      event.preventDefault(); const direction = ['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1; const next = tabs[(index + direction + tabs.length) % tabs.length]; next.focus(); select(next);
    });
  });
  spotButtons.forEach(button => button.addEventListener('click', () => { note.textContent = button.dataset.hotspot; }));
}

// Keep only one FAQ expanded on the homepage.
document.querySelectorAll('[data-accordion] details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) document.querySelectorAll('[data-accordion] details').forEach(other => { if (other !== detail) other.open = false; });
}));

// Reusable accessible tabs.
document.querySelectorAll('[data-tabs]').forEach(group => {
  const tabs = [...group.querySelectorAll('[role=tab]')];
  const panels = [...group.querySelectorAll('[role=tabpanel]')];
  const activate = tab => {
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== tab.dataset.tab; });
  };
  tabs.forEach((tab, index) => { tab.addEventListener('click', () => activate(tab)); tab.addEventListener('keydown', event => { if (!['ArrowLeft','ArrowRight'].includes(event.key)) return; event.preventDefault(); const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]; next.focus(); activate(next); }); });
});

async function copyText(value, button) {
  try { await navigator.clipboard.writeText(value); const old = button.textContent; button.textContent = 'Copied'; setTimeout(() => { button.textContent = old; }, 1300); }
  catch { button.textContent = 'Copy failed'; }
}
document.querySelectorAll('[data-copy-code]').forEach(button => button.addEventListener('click', () => copyText(button.closest('.code-block').querySelector('code').textContent, button)));
document.querySelectorAll('[data-copy-value]').forEach(button => button.addEventListener('click', () => copyText(button.dataset.copyValue, button)));

// Documentation filtering.
const docsSearch = document.querySelector('[data-docs-search]');
if (docsSearch) {
  const sections = [...document.querySelectorAll('[data-doc-section]')];
  const empty = document.querySelector('[data-docs-empty]');
  docsSearch.addEventListener('input', () => {
    const query = docsSearch.value.trim().toLowerCase(); let shown = 0;
    sections.forEach(section => { const haystack = `${section.dataset.keywords || ''} ${section.textContent}`.toLowerCase(); const match = !query || haystack.includes(query); section.hidden = !match; if (match) shown++; });
    empty.hidden = shown > 0;
  });
}

// Sticky documentation and changelog navigation follows the viewport.
const anchored = [...document.querySelectorAll('[data-doc-section], .release-entry[id]')];
if (anchored.length && 'IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('.docs-nav a, .release-index a')];
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-25% 0px -65% 0px' });
  anchored.forEach(section => sectionObserver.observe(section));
}

// Interactive Server Intelligence lab.
const lab = document.querySelector('[data-server-lab]');
if (lab) {
  const servers = [
    { id: 'a4f1', playing: 27, max: 28, ping: 68, fps: 59 },
    { id: 'b8c2', playing: 19, max: 28, ping: 42, fps: 60 },
    { id: 'c3d9', playing: 12, max: 28, ping: 31, fps: 54 },
    { id: 'd1e7', playing: 7, max: 28, ping: 25, fps: 60 },
    { id: 'e9a6', playing: 24, max: 28, ping: 112, fps: 46 },
    { id: 'f2b5', playing: 15, max: 28, ping: 83, fps: 58 }
  ];
  let sort = 'best';
  const filters = { occupancy: 0, ping: 999, fps: 0, slots: 1 };
  const results = lab.querySelector('[data-server-results]');
  const metrics = lab.querySelector('[data-server-metrics]');
  const quality = server => Math.max(0, Math.min(100, Math.round(100 - server.ping * .3 + (server.fps - 30) * .55 - Math.max(0, server.playing / server.max - .9) * 80)));
  const visible = () => servers.filter(s => s.playing / s.max * 100 >= filters.occupancy && s.ping <= filters.ping && s.fps >= filters.fps && s.max - s.playing >= filters.slots);
  const sorted = list => list.sort((a,b) => sort === 'ping' ? a.ping-b.ping : sort === 'space' ? (b.max-b.playing)-(a.max-a.playing) : sort === 'players' ? b.playing-a.playing : sort === 'fps' ? b.fps-a.fps : quality(b)-quality(a));
  const render = () => {
    const list = sorted(visible()); const pings = list.map(s=>s.ping).sort((a,b)=>a-b); const avgFps = list.length ? Math.round(list.reduce((n,s)=>n+s.fps,0)/list.length) : 0; const peak = list.length ? Math.max(...list.map(s=>s.playing)) : 0;
    metrics.innerHTML = `<div class="server-metric"><b>${list.length}</b><small>Visible</small></div><div class="server-metric"><b>${pings.length ? pings[Math.floor(pings.length/2)]+' ms' : '—'}</b><small>Median ping</small></div><div class="server-metric"><b>${avgFps || '—'}</b><small>Average FPS</small></div><div class="server-metric"><b>${peak}</b><small>Peak players</small></div>`;
    results.innerHTML = list.length ? list.map(server => { const q = quality(server); const label = q>=80?'Excellent':q>=60?'Good':q>=40?'Fair':'Weak'; return `<div class="server-result"><div><strong>${server.playing}/${server.max}</strong><small>players</small></div><div class="server-fill-track"><i style="--fill:${Math.round(server.playing/server.max*100)}%"></i></div><div class="server-quality"><b>${q} · ${label}</b><span>${server.ping} ms · ${server.fps} fps</span></div><button type="button" data-lab-join="${server.id}">Join</button></div>`; }).join('') : '<div class="demo-empty">No servers match these filters.</div>';
  };
  lab.querySelectorAll('[data-sort]').forEach(button => button.addEventListener('click', () => { sort=button.dataset.sort; lab.querySelectorAll('[data-sort]').forEach(item=>item.classList.toggle('active',item===button)); render(); }));
  lab.querySelectorAll('[data-filter]').forEach(select => select.addEventListener('change', () => { filters[select.dataset.filter]=Number(select.value); render(); }));
  lab.querySelector('[data-server-scan]').addEventListener('click', event => { const button=event.currentTarget; button.disabled=true; button.insertAdjacentHTML('afterend','<div class="scan-progress"></div>'); setTimeout(()=>{ lab.querySelector('.scan-progress')?.remove(); button.disabled=false; servers.push({id:'g7k3',playing:26,max:28,ping:54,fps:60}); render(); },800); });
  results.addEventListener('click', event => { const join=event.target.closest('[data-lab-join]'); if(join){ const old=join.textContent; join.textContent='Ready'; setTimeout(()=>join.textContent=old,1200); } });
  render();
}
