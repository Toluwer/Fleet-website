const demo = document.querySelector('[data-fleet-demo]');

if (demo) {
  const canvas = demo.querySelector('[data-demo-canvas]');
  const navButtons = [...demo.querySelectorAll('[data-demo-view]')];
  const countBadge = demo.querySelector('[data-demo-count]');
  const toast = demo.querySelector('[data-demo-toast]');
  const state = {
    view: 'instances', mode: 'account', selected: new Set(['Primary']), signedOutCount: 1, clients: [], launches: 0,
    games: [
      { name: 'Brookhaven RP', players: '672K', c1: '#8abfdf', c2: '#52698f' },
      { name: '99 Nights in the Forest', players: '809K', c1: '#284f2c', c2: '#6d2f24' },
      { name: 'Adopt Me!', players: '475K', c1: '#f29c62', c2: '#e9657b' },
      { name: 'Steal a Brainrot', players: '307K', c1: '#2f88de', c2: '#dd4055' }
    ],
    people: [
      { display: 'Wag', user: 'wayme88', status: 'Offline', team: 'No team' },
      { display: 'Gameknight', user: 'Gameknight908_Alt', status: 'In game', team: 'Blue' },
      { display: 'Builder', user: 'builder_alt', status: 'Online', team: 'Red' },
      { display: 'Testing', user: 'fleet_testing', status: 'In game', team: 'No team' }
    ]
  };
  let toastTimer;
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const icon = name => `<span data-icon="${name}"></span>`;
  const notify = message => { clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('show'); toastTimer = setTimeout(() => toast.classList.remove('show'), 1700); };

  function hydrateIcons() {
    const paths = {
      activity:'<path d="M3 12h4l2-7 4 14 2-7h6"/>', box:'<path d="m4 7 8-4 8 4-8 4z"/><path d="M4 7v10l8 4 8-4V7M12 11v10"/>', check:'<path d="m5 12 4 4L19 6"/>', search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'
    };
    canvas.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[node.dataset.icon] || paths.box}</svg>`; });
  }

  function instancesView() {
    const accountMode = state.mode === 'account';
    const clients = state.clients.length ? state.clients.map(client => `<div class="demo-instance"><i class="client-dot"></i><span><b>${escapeHtml(client.title)}</b><small>${escapeHtml(client.account)} · PID ${client.pid}</small></span><em>${client.status}</em><button type="button" data-end-client="${client.pid}">End</button></div>`).join('') : `<div class="demo-empty">${icon('box')}<b>No Roblox clients running</b><span>Build a setup above, then launch it.</span></div>`;
    return `<div class="demo-page-head"><div><h3>Instances</h3><p>Launch Roblox and watch every client live.</p></div></div>
      <div class="demo-detected">${icon('check')}<span><b>Roblox detected</b><small>version-current · found automatically</small></span></div>
      <div class="demo-panel"><div class="demo-panel-head"><strong>Launch Roblox</strong><div class="demo-segment"><button type="button" data-mode="account" class="${accountMode?'active':''}">With account</button><button type="button" data-mode="signedout" class="${!accountMode?'active':''}">Signed out</button></div></div>
      <div class="demo-launch-row">${accountMode ? `<div class="demo-chips">${['Primary','Builder','Testing'].map(name=>`<button type="button" class="demo-chip ${state.selected.has(name)?'active':''}" data-account="${name}">${name}</button>`).join('')}</div>` : `<div class="demo-stepper"><button type="button" data-count="-1">−</button><span>${state.signedOutCount}</span><button type="button" data-count="1">+</button></div>`}<button class="demo-launch-button" type="button" data-launch>▷ Launch</button></div></div>
      <div class="demo-panel"><div class="demo-panel-head"><strong>Running clients</strong><small>${state.clients.length} active</small></div><div data-demo-instances>${clients}</div></div>`;
  }

  function gamesView(query='') {
    const needle = query.trim().toLowerCase();
    const games = state.games.filter(game => game.name.toLowerCase().includes(needle));
    return `<div class="demo-page-head"><div><h3>Games</h3><p>Browse, filter, and join with a saved account.</p></div></div><form class="demo-search" data-game-search><input type="search" aria-label="Search demo games" placeholder="Search experiences…" value="${escapeHtml(query)}"><button>Search</button></form><div class="demo-game-grid">${games.map((game,index)=>`<article class="demo-game"><div class="demo-game-art" style="--c1:${game.c1};--c2:${game.c2}"></div><div class="demo-game-body"><strong>${escapeHtml(game.name)}</strong><small>${game.players} playing</small><div class="demo-game-actions"><span>96% liked</span><button type="button" data-join-game="${index}">▷ Join</button></div></div></article>`).join('') || '<div class="demo-empty">No experiences match that search.</div>'}</div>`;
  }

  function peopleView(query='') {
    const needle = query.trim().toLowerCase();
    const people = state.people.filter(person => `${person.display} ${person.user} ${person.team}`.toLowerCase().includes(needle));
    return `<div class="demo-page-head"><div><h3>People · Server</h3><p>Inspect a simulated current-server roster.</p></div></div><form class="demo-search" data-people-search><input type="search" aria-label="Search demo roster" placeholder="Search server players…" value="${escapeHtml(query)}"><button>Search</button></form><div class="demo-people-grid">${people.map(person=>`<article class="demo-person"><i class="demo-avatar">${escapeHtml(person.display[0])}</i><span><strong>${escapeHtml(person.display)}</strong><small>@${escapeHtml(person.user)}</small></span><footer><span>${escapeHtml(person.status)}</span><span>${escapeHtml(person.team)}</span></footer></article>`).join('') || '<div class="demo-empty">No server player matches.</div>'}</div>`;
  }

  function statsView() {
    const minutes = state.launches * 18;
    return `<div class="demo-page-head"><div><h3>Stats</h3><p>Playtime tracked locally from account presence.</p></div></div><div class="demo-stat-grid"><div class="demo-stat"><b>${minutes}m</b><small>Today</small></div><div class="demo-stat"><b>${minutes+42}m</b><small>Last 7 days</small></div><div class="demo-stat"><b>${state.launches}</b><small>Sessions</small></div><div class="demo-stat"><b>${state.clients.length}</b><small>Tracking now</small></div></div><div class="demo-chart" aria-label="Simulated playtime chart"><i style="--h:28%"></i><i style="--h:44%"></i><i style="--h:34%"></i><i style="--h:${Math.max(18,48+state.launches*8)}%"></i><i style="--h:65%"></i><i style="--h:42%"></i><i style="--h:${Math.max(12,22+state.launches*10)}%"></i></div>`;
  }

  function render(query='') {
    navButtons.forEach(button => button.classList.toggle('active', button.dataset.demoView === state.view));
    countBadge.textContent = state.clients.length;
    canvas.innerHTML = state.view === 'instances' ? instancesView() : state.view === 'games' ? gamesView(query) : state.view === 'people' ? peopleView(query) : statsView();
    hydrateIcons();
  }

  navButtons.forEach(button => button.addEventListener('click', () => { state.view = button.dataset.demoView; render(); }));
  canvas.addEventListener('click', event => {
    const mode = event.target.closest('[data-mode]');
    if (mode) { state.mode = mode.dataset.mode; render(); return; }
    const account = event.target.closest('[data-account]');
    if (account) { const name=account.dataset.account; state.selected.has(name)?state.selected.delete(name):state.selected.add(name); render(); return; }
    const count = event.target.closest('[data-count]');
    if (count) { state.signedOutCount=Math.max(1,Math.min(4,state.signedOutCount+Number(count.dataset.count))); render(); return; }
    const launch = event.target.closest('[data-launch]');
    if (launch) {
      const targets = state.mode === 'account' ? [...state.selected] : Array.from({length:state.signedOutCount},(_,i)=>`Signed out ${i+1}`);
      if (!targets.length) { notify('Select at least one account'); return; }
      launch.disabled = true; launch.textContent = 'Starting…';
      setTimeout(() => { const base=12040+state.launches*30; targets.forEach((account,i)=>state.clients.push({pid:base+i,title:i%2?'99 Nights':'Brookhaven RP',account,status:'Running'})); state.launches+=targets.length; render(); notify(`${targets.length} client${targets.length===1?'':'s'} launched`); },700);
      return;
    }
    const end = event.target.closest('[data-end-client]');
    if (end) { state.clients=state.clients.filter(client=>client.pid!==Number(end.dataset.endClient)); render(); notify('Client ended'); return; }
    const join = event.target.closest('[data-join-game]');
    if (join) { const game=state.games[Number(join.dataset.joinGame)] || state.games[0]; state.clients.push({pid:14000+state.launches,title:game.name,account:'Primary',status:'Running'}); state.launches++; notify(`Joining ${game.name}`); countBadge.textContent=state.clients.length; }
  });
  canvas.addEventListener('submit', event => {
    event.preventDefault();
    if (event.target.matches('[data-game-search]')) render(event.target.querySelector('input').value);
    if (event.target.matches('[data-people-search]')) render(event.target.querySelector('input').value);
  });
  render();
}
