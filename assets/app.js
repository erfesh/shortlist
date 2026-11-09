/* Shortlist demo. Plain JavaScript, no build step. State lives in localStorage (when allowed). */
(function () {
  const D = window.SL_DATA;
  const KEY = "shortlist_demo_v1";
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  let S = Object.assign({ persona: "lily", plan: "free", billing: "y", tracker: {}, user: null, minScore: 70, sel: null, onboardStep: 1, picks: null }, load());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  const P = () => D.personas[S.persona];
  const root = document.getElementById("app");

  const CHECK = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#14161a" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const ICON = {
    matches: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    tracker: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 4v16"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    plans: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>'
  };
  const icon = n => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[n]}</svg>`;
  const logo = dark => `<a class="logo ${dark ? "on-dark" : "on-light"}" href="#/"><i>${dark ? CHECK : CHECK.replace("#14161a", "#c6f36b")}</i>Shortlist</a>`;
  const ring = (n, lg) => `<span class="ring${lg ? " lg" : ""}" style="--p:${n};--c:${n >= 85 ? "#4f8f1f" : n >= 75 ? "#6b9e1f" : "#b08a1e"}"><b>${n}</b></span>`;
  const badge = s => `<span class="badge ${s}">${s}</span>`;

  let toastT;
  function toast(msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; clearTimeout(toastT); toastT = setTimeout(() => t.remove(), 2400);
  }

  /* ---------- landing ---------- */
  function landing() {
    const j = D.personas.lily.jobs;
    return `<div class="view">
<header class="hero"><div class="wrap">
  <div class="topnav">${logo(true)}<nav aria-label="Site"><a href="#how">How it works</a><a href="#samples">Samples</a><a href="#/plans">Plans</a></nav>
  <div class="right"><a class="plain" href="#/login">Log in</a><a class="btn btn-lime" href="#/signup">Start free</a></div></div>
  <div class="hero-grid">
    <div class="hero-copy"><span class="pill-dark">Job search, minus the scrolling</span>
      <h1>Stop searching.<br><em>Start shortlisting.</em></h1>
      <p class="lede">Shortlist watches the companies you care about, scores every opening against your real experience, and builds a tailored resume from your own words.</p>
      <div class="ctas"><a class="btn btn-lime" href="#/signup">Start free</a><a class="btn btn-ghost-dark" href="#samples">See a sample profile</a></div>
      <p class="fine">Free plan, no card. This is a design demo with sample data.</p></div>
    <div class="hero-card" aria-label="Example matches">
      <div style="display:flex;justify-content:space-between;align-items:center"><b>Lily's matches today</b><span class="chip">3 new</span></div>
      ${j.slice(0, 3).map(x => `<div class="mini">${ring(x.score)}<div style="min-width:0"><b style="display:block">${esc(x.title)}</b><span class="muted" style="font-size:13px">${esc(x.co)} · ${esc(x.loc)}</span></div></div>`).join("")}
    </div>
  </div></div></header>

<section id="how" class="wrap section">
  <div><p class="eyebrow">How it works</p><h2 class="h2">Three steps, then it runs on its own.</h2></div>
  <div class="grid3">
    <div class="card"><span class="num">1</span><h3>Add your resume</h3><p>Shortlist reads what you have actually done. Nothing is invented, and every claim keeps a link back to your own line.</p></div>
    <div class="card"><span class="num">2</span><h3>Pick your companies</h3><p>Choose the firms you would really join. Shortlist checks their career pages for you, so you stop refreshing ten tabs.</p></div>
    <div class="card"><span class="num">3</span><h3>Get a short list</h3><p>Each role gets an honest score, a requirement by requirement breakdown, and a resume kit built from your own lines.</p></div>
  </div>
</section>

<div class="band"><div class="wrap split">
  <div style="display:flex;flex-direction:column;gap:18px"><p class="eyebrow">Honest scoring</p><h2 class="h2">A score you can argue with.</h2>
    <p class="muted" style="font-size:17px">Every requirement is marked Strong, Partial or Gap, with the evidence from your resume next to it. Missing a hard requirement caps the score, so a 90 always means something.</p></div>
  <div class="reqbox" aria-label="Example requirement breakdown">
    ${j[0].reqs.slice(0, 4).map(r => `<div class="reqrow">${badge(r[1])}<span>${esc(r[0])}</span></div>`).join("")}
  </div>
</div></div>

<section id="samples" class="wrap section">
  <div><p class="eyebrow">Try it with a sample profile</p><h2 class="h2">Two people, two very different searches.</h2></div>
  <div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
    ${["lily", "erik"].map((k, i) => { const p = D.personas[k]; return `<button class="persona${i === 0 ? " dark" : ""}" data-persona="${k}">
      <span style="display:flex;gap:14px;align-items:center"><span class="avatar ${p.av}">${p.initials}</span><span><b style="display:block;font-size:18px">${p.name}</b><span class="muted">${p.role} · ${p.city}</span></span></span>
      <p>${esc(p.blurb)}</p><span style="font-weight:600">Open ${p.first}'s matches →</span></button>`; }).join("")}
  </div>
</section>

<section class="promises"><div class="wrap section">
  <div class="grid3">
    <div><h3>Your words only.</h3><p>Resume kits reuse your own lines, reordered for the role. If it is not on your resume, it does not go in.</p></div>
    <div><h3>No spray and pray.</h3><p>Fewer, better applications. Shortlist hides roles that are a level off or missing must-haves.</p></div>
    <div><h3>You hit send.</h3><p>Shortlist never applies for you. You review every kit and apply on the company's own site.</p></div>
  </div>
</div></section>

<section class="wrap section plans-teaser">
  <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:flex-end"><div><p class="eyebrow">Plans</p><h2 class="h2">Start free. Upgrade when it is working.</h2></div><a href="#/plans" style="margin-left:auto">Compare plans →</a></div>
  <div class="grid3">${D.plans.map(p => `<div class="plan${p.best ? " dark" : ""}"><b>${p.name}</b><span class="price">$${p.y}</span><span class="${p.best ? "" : "muted"}" style="font-size:14px;opacity:.8">${p.m ? "a month, billed yearly" : "forever"}</span></div>`).join("")}</div>
</section>

<div class="wrap"><div class="cta-band"><h2>Your next job is probably already posted.</h2><a class="btn btn-ink" href="#/signup">Start free</a></div></div>
${footer()}</div>`;
  }
  const footer = () => `<footer class="site"><div class="wrap"><span>Shortlist · a design demo by <a href="https://erfesh.com">Erfan Kooshesh</a></span><a href="https://github.com/erfesh/shortlist">GitHub</a><a href="#/plans">Plans</a><span style="margin-left:auto">Sample people and companies are fictional.</span></div></footer>`;

  /* ---------- auth ---------- */
  function signup() {
    return `<div class="auth view"><aside>${logo(true)}
  <h1>Make your search <em>smaller</em>, and better.</h1>
  <div class="ticks">${["Scores every role against your real experience", "Resume kits built from your own lines", "Free plan, no card needed"].map(t => `<span><i>${CHECK}</i>${t}</span>`).join("")}</div>
  <p style="margin-top:auto;color:#8f8d86;font-size:13px">Demo only. Nothing you type leaves this browser.</p></aside>
<main><form class="form" id="signupForm" novalidate>
  <div><h2 class="serif" style="font-size:44px;line-height:1">Create your account</h2><p class="muted" style="margin-top:6px">Already have one? <a href="#/login">Log in</a></p></div>
  <button type="button" class="btn btn-line btn-block" data-demo-login>Continue with a sample profile</button>
  <div class="or">or with email</div>
  <div class="field"><label for="su-name">Full name</label><input id="su-name" autocomplete="name" required></div>
  <div class="field"><label for="su-email">Email</label><input id="su-email" type="email" autocomplete="email" required></div>
  <div class="field"><label for="su-pass">Password</label><input id="su-pass" type="password" autocomplete="new-password" minlength="8" required><span class="hint">At least 8 characters. Stored nowhere, this is a demo.</span></div>
  <p class="error" id="su-err" role="alert" hidden></p>
  <button class="btn btn-ink btn-block" type="submit">Create account</button>
  <p class="muted" style="font-size:12px">By continuing you agree to the demo terms: nothing is saved outside your browser.</p>
</form></main></div>`;
  }
  function login() {
    return `<div class="login-wrap view">${logo(true)}
<form class="login-card" id="loginForm" novalidate>
  <div><h1 class="serif" style="font-size:46px;line-height:1">Welcome back</h1><p class="muted" style="margin-top:6px">Your short list is waiting.</p></div>
  <div class="field"><label for="li-email">Email</label><input id="li-email" type="email" autocomplete="email" required></div>
  <div class="field"><label for="li-pass">Password</label><input id="li-pass" type="password" autocomplete="current-password" required></div>
  <p class="error" id="li-err" role="alert" hidden></p>
  <button class="btn btn-ink btn-block" type="submit">Log in</button>
  <div class="or">or</div>
  <button type="button" class="btn btn-line btn-block" data-demo-login>Try the sample profile</button>
  <p class="muted" style="font-size:14px;text-align:center">New here? <a href="#/signup">Create an account</a></p>
</form></div>`;
  }

  /* ---------- onboarding ---------- */
  function onboarding() {
    const p = P(), st = S.onboardStep;
    if (!S.picks) S.picks = { roles: p.targets.slice(0, 2), firms: p.firms.slice(0, 4) };
    const bars = `<div class="bars" aria-label="Step ${st} of 3">${[1, 2, 3].map(i => `<span class="${i <= st ? "on" : ""}"></span>`).join("")}</div>`;
    let body = "";
    if (st === 1) body = `<p class="eyebrow">Step 1 of 3</p><h1>Start with your resume.</h1>
      <div class="done-file"><span class="avatar ${p.av}">${p.initials}</span><span style="flex:1;min-width:200px"><b style="display:block">${p.name.replace(" ", "-")}-Resume.pdf</b><span style="color:#c9c7c0;font-size:14px">Read ${p.resume.length} key facts. Nothing added.</span></span><span class="chip" style="background:var(--lime);color:var(--ink)">Ready</span></div>
      <div class="panel"><b>What Shortlist found</b><ul>${p.resume.map(r => `<li>${esc(r)}</li>`).join("")}</ul></div>
      <div class="drop"><b>Use a different resume</b><span class="muted">PDF or Word. In this demo the sample resume is already loaded.</span></div>`;
    if (st === 2) body = `<p class="eyebrow">Step 2 of 3</p><h1>What roles are you after?</h1>
      <div class="chips">${[...p.targets, "Team Lead", "Consultant"].map(r => `<button class="tog" aria-pressed="${S.picks.roles.includes(r)}" data-pick="roles" data-v="${esc(r)}">${esc(r)}</button>`).join("")}</div>
      <p class="muted">Pick as many as fit. Shortlist uses these to skip roles that are a level off.</p>`;
    if (st === 3) body = `<p class="eyebrow">Step 3 of 3</p><h1>Which companies should we watch?</h1>
      <div class="firms">${p.firms.map(f => `<button class="firm" aria-pressed="${S.picks.firms.includes(f)}" data-pick="firms" data-v="${esc(f)}"><b>${esc(f)}</b><small>${S.picks.firms.includes(f) ? "Watching" : "Tap to watch"}</small></button>`).join("")}</div>
      <p class="muted">Free plan watches 5. You have ${S.picks.firms.length}.</p>`;
    return `<div class="view" style="min-height:100vh"><div class="wrap" style="padding-block:20px;display:flex;align-items:center">${logo(false)}<a href="#/matches" style="margin-left:auto;font-size:14px">Skip to matches</a></div>
<div class="ob">${bars}${body}
<div class="actions">${st > 1 ? `<button class="btn btn-line" data-step="-1">Back</button>` : ""}<button class="btn btn-ink" data-step="1">${st < 3 ? "Continue" : "See my matches"}</button></div></div></div>`;
  }

  /* ---------- app shell ---------- */
  function shell(tab, inner) {
    const p = P();
    const tabs = [["matches", "Matches"], ["tracker", "Tracker"], ["profile", "Profile"], ["plans", "Plans"]];
    return `<div class="view"><div class="appbar"><div class="wrap">${logo(true)}
  <nav class="tabs" aria-label="Main">${tabs.map(([k, l]) => `<a href="#/${k}" ${k === tab ? 'aria-current="page"' : ""}>${l}</a>`).join("")}</nav>
  <div class="right"><label class="who"><span>Viewing as</span><select id="personaSel" aria-label="Sample profile">${Object.values(D.personas).map(x => `<option value="${x.id}" ${x.id === p.id ? "selected" : ""}>${x.name}</option>`).join("")}</select></label>
  <a class="planbadge" href="#/plans">${S.plan === "free" ? "Free" : S.plan === "pro" ? "Pro" : "Premium"}</a></div></div></div>
<main class="app wrap">${inner}</main>
<nav class="bottomtabs" aria-label="Main">${tabs.map(([k, l]) => `<a href="#/${k}" ${k === tab ? 'aria-current="page"' : ""}>${icon(k)}${l}</a>`).join("")}</nav></div>`;
  }

  function matches() {
    const p = P();
    const list = p.jobs.filter(j => j.score >= S.minScore);
    const wide = matchMedia("(min-width:761px)").matches;
    const sel = list.find(j => j.id === S.sel) || (wide ? list[0] : null);
    const hour = new Date().getHours();
    const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const detail = sel ? jobDetail(sel) : `<div class="detail" style="align-items:center;justify-content:center;min-height:360px;text-align:center"><h2>Pick a role</h2><p class="muted">Select a match to see the full breakdown.</p></div>`;
    return shell("matches", `
<div class="app-head"><div><p class="muted">${greet}, ${p.first}</p><h1>${list.length} jobs worth your time</h1></div>
  <div class="stats"><span><b>${S.picks ? S.picks.firms.length : p.firms.length}</b><small>companies watched</small></span><span><b>${p.jobs.filter(j => j.isNew).length}</b><small>new this week</small></span><span><b>${Object.keys(S.tracker).filter(k => k.startsWith(p.id[0])).length}</b><small>in tracker</small></span></div></div>
<div class="filters"><div class="seg" role="group" aria-label="Minimum score">${[60, 70, 80].map(n => `<button aria-pressed="${S.minScore === n}" data-min="${n}">${n}%+</button>`).join("")}</div></div>
<div class="layout ${sel ? "has-sel" : ""}">
  <div class="list">${list.map(j => `<button class="job" aria-pressed="${!!sel && j.id === sel.id}" data-job="${j.id}">${ring(j.score)}<span style="min-width:0;flex:1"><span class="t">${esc(j.title)}</span><span class="m">${esc(j.co)} · ${esc(j.loc)}</span><span class="tags">${j.isNew ? '<span class="chip">New</span>' : ""}${j.kit ? '<span class="chip" style="background:var(--lime);color:var(--ink)">Kit ready</span>' : ""}${S.tracker[j.id] ? `<span class="chip warn">${S.tracker[j.id]}</span>` : ""}</span></span></button>`).join("")}
    ${S.plan === "free" ? `<a class="upsell" href="#/plans"><b>5 more roles at firms you don't watch</b><span>Pro looks beyond your list for close matches.</span><strong>Unlock with Pro →</strong></a>` : ""}</div>
  ${detail}</div>`);
  }
  function jobDetail(j) {
    const mid = j.score < 80;
    const inT = S.tracker[j.id];
    return `<article class="detail" aria-label="${esc(j.title)}">
  <button class="back" data-back>‹ Matches</button>
  <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">${ring(j.score, true)}<div style="min-width:0;flex:1"><h2>${esc(j.title)}</h2><p class="muted">${esc(j.co)} · ${esc(j.loc)} · ${esc(j.pay)} · posted ${esc(j.posted)}</p></div></div>
  <div class="verdict${mid ? " mid" : ""}"><b>${j.score}% · ${j.score >= 85 ? "Strong fit" : j.score >= 75 ? "Good fit" : "Worth a look"}</b><span>${esc(j.summary)}</span></div>
  <div><h3 style="font-size:16px;margin-bottom:4px">Requirements</h3>${j.reqs.map(r => `<div class="req">${badge(r[1])}<span><span>${esc(r[0])}</span><small>${esc(r[2])}</small></span></div>`).join("")}</div>
  <div class="grid3" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
    <div class="panel"><b>Why it fits</b><ul>${j.pros.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
    <div class="panel"><b>Before you apply</b><ul>${j.cons.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>
  <div class="actions"><button class="btn btn-ink" data-kit="${j.id}">${j.kit ? "Open resume kit" : "Build resume kit"}</button><button class="btn btn-line" data-track="${j.id}">${inT ? "In tracker: " + inT : "Save to tracker"}</button></div>
  <p class="note-demo">Demo: AI is switched off here. In the real tool, scoring and kits run on Gemini.</p></article>`;
  }

  function tracker() {
    const p = P();
    const cols = D.statuses.map(s => {
      const cards = p.jobs.filter(j => S.tracker[j.id] === s);
      return `<section class="col" aria-label="${s}"><h3>${s} <span class="muted">${cards.length}</span></h3>${cards.map(j => `<div class="tcard"><span class="s">${j.score}%</span><b style="font-size:14px">${esc(j.title)}</b><span class="muted" style="font-size:13px">${esc(j.co)}</span>
        <label class="muted" style="font-size:12px">Move to <select data-move="${j.id}" style="font:inherit">${D.statuses.map(o => `<option ${o === s ? "selected" : ""}>${o}</option>`).join("")}<option value="">Remove</option></select></label></div>`).join("") || '<p class="muted" style="font-size:13px;padding:6px">Nothing here yet.</p>'}</section>`;
    }).join("");
    return shell("tracker", `<div class="app-head"><div><p class="muted">${p.name}</p><h1>Tracker</h1></div></div><div class="kanban">${cols}</div>`);
  }

  function profile() {
    const p = P();
    return shell("profile", `<div class="app-head"><div style="display:flex;gap:16px;align-items:center"><span class="avatar ${p.av}" style="width:64px;height:64px;font-size:20px">${p.initials}</span><div><h1>${p.name}</h1><p class="muted">${p.role} · ${p.city}</p></div></div></div>
<div class="profile-grid">
  <div class="panel"><b>Resume facts</b><ul>${p.resume.map(r => `<li>${esc(r)}</li>`).join("")}</ul></div>
  <div class="panel"><b>Target roles</b><div class="chips">${p.targets.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div></div>
  <div class="panel"><b>Watching</b><ul>${p.firms.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>
  <div class="panel"><b>Demo controls</b><p class="muted" style="font-size:14px">Switch profile, rerun onboarding, or clear everything this demo saved in your browser.</p>
    <div class="actions"><a class="btn btn-line" href="#/onboarding" data-reob>Redo onboarding</a><button class="btn btn-line" data-reset>Reset demo</button><button class="btn btn-line" data-logout>Log out</button></div></div>
</div>`);
  }

  function plans() {
    const y = S.billing === "y";
    const inner = `<div class="app-head" style="flex-direction:column;align-items:flex-start;gap:14px"><p class="eyebrow">Plans</p><h1>Pick the pace of your search.</h1>
  <div class="toggle" role="group" aria-label="Billing"><button aria-pressed="${!y}" data-bill="m">Monthly</button><button aria-pressed="${y}" data-bill="y">Yearly · save 25%</button></div></div>
<div class="plans" style="padding-top:14px">${D.plans.map(pl => `<div class="plan-card${pl.best ? " dark" : ""}">${pl.best ? '<span class="ribbon">Most popular</span>' : ""}
  <div><b style="font-size:20px">${pl.name}</b><p class="muted" style="font-size:14px">${pl.tag}</p></div>
  <div><span class="price">$${y ? pl.y : pl.m}</span> <span class="muted">${pl.m ? "/ month" : "forever"}</span>${pl.m && y ? `<p class="muted" style="font-size:13px">$${pl.y * 12} billed once a year</p>` : pl.m ? '<p class="muted" style="font-size:13px">Billed monthly, cancel anytime</p>' : '<p class="muted" style="font-size:13px">No card needed</p>'}</div>
  <ul>${pl.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
  <button class="btn ${pl.best ? "btn-lime" : "btn-line"} btn-block" style="margin-top:auto" data-plan="${pl.id}" ${S.plan === pl.id ? "disabled" : ""}>${S.plan === pl.id ? "Current plan" : pl.m ? "Start 7-day trial" : "Switch to Free"}</button></div>`).join("")}</div>
<div class="terms" style="margin:20px 0 64px"><span>7-day free trial on paid plans</span><span>Cancel in two clicks, keep access to the end of the period</span><span>We email you 3 days before any renewal</span><span><b>Demo:</b> no payment is taken</span></div>`;
    return S.user ? shell("plans", inner) : `<div class="view"><div class="wrap" style="padding-block:20px;display:flex;align-items:center">${logo(false)}<a class="btn btn-ink" style="margin-left:auto" href="#/signup">Start free</a></div><main class="wrap">${inner}</main>${footer()}</div>`;
  }
  function checkout(id) {
    const pl = D.plans.find(x => x.id === id), y = S.billing === "y";
    const bg = document.createElement("div"); bg.className = "modal-bg";
    bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mt"><h2 id="mt">Start ${pl.name}</h2>
  <div><div class="sumrow"><span>${pl.name}, ${y ? "yearly" : "monthly"}</span><b>$${y ? pl.y * 12 : pl.m}${y ? "/yr" : "/mo"}</b></div><div class="sumrow"><span>Due today</span><b>$0</b></div></div>
  <p class="muted" style="font-size:14px">Your 7-day trial starts now. In the real product you would add a card here and could cancel any time before the trial ends. This demo takes no payment.</p>
  <div class="actions"><button class="btn btn-ink" data-confirm="${id}">Start trial</button><button class="btn btn-line" data-close>Not now</button></div></div>`;
    document.body.appendChild(bg);
    bg.querySelector("[data-confirm]").focus();
    bg.addEventListener("click", e => {
      if (e.target === bg || e.target.closest("[data-close]")) bg.remove();
      const c = e.target.closest("[data-confirm]");
      if (c) { S.plan = c.dataset.confirm; save(); bg.remove(); render(); toast(`${pl.name} trial started (demo)`); }
    });
    document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { bg.remove(); document.removeEventListener("keydown", k); } });
  }

  /* ---------- router ---------- */
  const routes = { "": landing, signup, login, onboarding, matches, tracker, profile, plans };
  const gated = ["matches", "tracker", "profile", "onboarding"];
  function render() {
    let r = (location.hash.replace(/^#\/?/, "").split("?")[0]) || "";
    if (!(r in routes)) r = "";
    if (gated.includes(r) && !S.user) { S.user = { name: P().name, demo: true }; save(); }
    root.innerHTML = routes[r]();
    document.title = r ? `Shortlist · ${r[0].toUpperCase() + r.slice(1)}` : "Shortlist · Stop searching, start shortlisting";
  }
  function go(h) { if (location.hash === h) render(); else location.hash = h; window.scrollTo(0, 0); }
  window.addEventListener("hashchange", () => { render(); if (!location.hash.startsWith("#/")) return; window.scrollTo(0, 0); });

  root.addEventListener("click", e => {
    const t = e.target.closest("button, a"); if (!t) return;
    const d = t.dataset;
    if (t.getAttribute("href") && t.getAttribute("href").startsWith("#") && !t.getAttribute("href").startsWith("#/") && t.getAttribute("href").length > 1) {
      e.preventDefault(); const el = document.querySelector(t.getAttribute("href")); if (el) el.scrollIntoView({ behavior: "smooth" }); return;
    }
    if (d.persona) { S.persona = d.persona; S.sel = null; S.user = { name: P().name, demo: true }; save(); go("#/matches"); }
    if ("demoLogin" in d) { S.user = { name: P().name, demo: true }; S.onboardStep = 1; S.picks = null; save(); go("#/onboarding"); }
    if (d.step) {
      S.onboardStep += +d.step;
      if (S.onboardStep > 3) { S.onboardStep = 1; save(); go("#/matches"); toast(`Watching ${S.picks.firms.length} companies`); return; }
      save(); render(); window.scrollTo(0, 0);
    }
    if (d.pick) {
      const arr = S.picks[d.pick], v = d.v, i = arr.indexOf(v);
      if (i >= 0) arr.splice(i, 1);
      else if (d.pick === "firms" && arr.length >= 5 && S.plan === "free") { toast("Free plan watches 5 companies. Pro watches 25."); return; }
      else arr.push(v);
      save(); render();
    }
    if (d.min) { S.minScore = +d.min; save(); render(); }
    if (d.job) { S.sel = d.job; save(); render(); if (matchMedia("(max-width:760px)").matches) window.scrollTo(0, 0); }
    if ("back" in d) { S.sel = null; save(); render(); }
    if (d.track) { S.tracker[d.track] = S.tracker[d.track] || "Saved"; save(); render(); toast("Saved to tracker"); }
    if (d.kit) toast("Resume kits need the AI backend, which is off in this demo.");
    if (d.bill) { S.billing = d.bill; save(); render(); }
    if (d.plan) { if (d.plan === "free") { S.plan = "free"; save(); render(); toast("Switched to Free"); } else checkout(d.plan); }
    if ("reob" in d) { S.onboardStep = 1; S.picks = null; save(); }
    if ("reset" in d) { try { localStorage.removeItem(KEY); } catch (er) {} location.hash = "#/"; location.reload(); }
    if ("logout" in d) { S.user = null; save(); go("#/"); }
  });
  root.addEventListener("change", e => {
    if (e.target.id === "personaSel") { S.persona = e.target.value; S.sel = null; S.picks = null; S.onboardStep = 1; save(); render(); }
    if (e.target.dataset.move) { const id = e.target.dataset.move; if (e.target.value) S.tracker[id] = e.target.value; else delete S.tracker[id]; save(); render(); }
  });
  root.addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    if (f.id === "signupForm") {
      const n = f.querySelector("#su-name").value.trim(), em = f.querySelector("#su-email").value.trim(), pw = f.querySelector("#su-pass").value;
      const err = f.querySelector("#su-err");
      const msg = !n ? "Add your name." : !/^\S+@\S+\.\S+$/.test(em) ? "That email does not look right." : pw.length < 8 ? "Use at least 8 characters." : "";
      if (msg) { err.textContent = msg; err.hidden = false; return; }
      S.user = { name: n, demo: false }; S.onboardStep = 1; S.picks = null; save(); go("#/onboarding"); toast(`Welcome, ${n.split(" ")[0]}. Using a sample resume for the demo.`);
    }
    if (f.id === "loginForm") {
      const em = f.querySelector("#li-email").value.trim(), pw = f.querySelector("#li-pass").value, err = f.querySelector("#li-err");
      if (!/^\S+@\S+\.\S+$/.test(em) || !pw) { err.textContent = "Enter an email and password. Any will do in the demo."; err.hidden = false; return; }
      S.user = { name: P().name, demo: true }; save(); go("#/matches");
    }
  });

  render();
})();
