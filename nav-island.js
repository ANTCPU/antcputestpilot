/* ============================================================
   ANTCPU NAVIGATION ISLAND — the house nav playbook (v1)
   Floating island bar + slide-out drawer with search & tools.
   ONE directory drives the drawer and the search — edit the
   list, and every page carrying the island updates its nav.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- The directory: navigate + tools ---------- */
  var DIRECTORY = [
    { group: "Navigate", icon: "🏠", label: "Pathway home", hint: "The four lanes, one page", href: "index.html", keys: "home start lanes pathway doors" },
    { group: "Navigate", icon: "🏟️", label: "The Arena", hint: "Proof, live in public — antcpu.cloud", href: "https://antcpu.cloud", keys: "arena ads board proof rankings" },
    { group: "Navigate", icon: "📣", label: "Marketing Hub", hint: "How the machine runs", href: "https://antcpu.github.io/Marketing/", keys: "marketing hub rhythm surfaces pipeline" },
    { group: "Navigate", icon: "🐜", label: "Hiro on GitHub", hint: "ANTCPU is for hire", href: "https://github.com/antcputestpilot", keys: "github profile hire for hire" },
    { group: "Navigate", icon: "✍️", label: "Apply", hint: "Join the Human in the Loop Challenge", href: "https://antcpu.io/apply", keys: "apply join challenge cohort internship" },
    { group: "Tools", icon: "🛠️", label: "Challenge repo", hint: "The first task lives here", href: "https://github.com/antcpu/challenge", keys: "challenge repo code task dev" },
    { group: "Tools", icon: "📦", label: "Ads repo", hint: "The arena's own build", href: "https://github.com/antcpu/ads", keys: "ads repo code build arena" },
    { group: "Tools", icon: "🏢", label: "Arena4 office", hint: "The mentor's office", href: "https://antcpu-ads.vercel.app/office/Arena4", keys: "office mentor arena4 ops" },
    { group: "Tools", icon: "💼", label: "Free consultation", hint: "Hire the bench — antcpu.com", href: "https://antcpu.com", keys: "hire consultation business client work" },
    { group: "Tools", icon: "💬", label: "Messenger", hint: "Close it in a DM", href: "https://m.me/antcpu", keys: "messenger dm message chat talk" }
  ];

  var QUICK = [
    { label: "Arena", href: "https://antcpu.cloud" },
    { label: "Hub", href: "https://antcpu.github.io/Marketing/" },
    { label: "Apply", href: "https://antcpu.io/apply" }
  ];

  /* ---------- Build the island ---------- */
  var mount = document.getElementById("nav-island");
  if (!mount) return;

  var island = document.createElement("nav");
  island.className = "ni-island";
  island.setAttribute("aria-label", "Site");

  var brand = document.createElement("a");
  brand.className = "ni-brand";
  brand.href = "index.html";
  brand.innerHTML = '<span class="ni-ant">🐜</span><span><span class="ni-name">HIRO</span><br><span class="ni-sub">ANTCPU · Pathway</span></span>';
  island.appendChild(brand);

  var quick = document.createElement("div");
  quick.className = "ni-quick";
  QUICK.forEach(function (q) {
    var a = document.createElement("a");
    a.href = q.href; a.textContent = q.label;
    quick.appendChild(a);
  });
  island.appendChild(quick);

  var burger = document.createElement("button");
  burger.className = "ni-burger";
  burger.type = "button";
  burger.textContent = "☰";
  burger.setAttribute("aria-label", "Open navigation");
  burger.setAttribute("aria-expanded", "false");
  island.appendChild(burger);
  mount.appendChild(island);

  /* ---------- Build the drawer ---------- */
  var overlay = document.createElement("div");
  overlay.className = "ni-overlay";
  document.body.appendChild(overlay);

  var drawer = document.createElement("aside");
  drawer.className = "ni-drawer";
  drawer.setAttribute("aria-label", "Navigation drawer");

  var head = document.createElement("div");
  head.className = "ni-drawer-head";
  head.innerHTML = '<span>🐜</span><span class="ni-title">Navigate ANTCPU</span>';
  var closeBtn = document.createElement("button");
  closeBtn.className = "ni-close";
  closeBtn.type = "button";
  closeBtn.textContent = "✕";
  closeBtn.setAttribute("aria-label", "Close navigation");
  head.appendChild(closeBtn);
  drawer.appendChild(head);

  var searchWrap = document.createElement("div");
  searchWrap.className = "ni-search";
  var input = document.createElement("input");
  input.type = "search";
  input.placeholder = "Search pages & tools…";
  input.setAttribute("aria-label", "Search pages and tools");
  searchWrap.appendChild(input);
  drawer.appendChild(searchWrap);

  var list = document.createElement("div");
  list.className = "ni-list";
  drawer.appendChild(list);

  var foot = document.createElement("div");
  foot.className = "ni-foot";
  foot.innerHTML = 'Human in the Loop · Antony · <a href="https://antcpu.com">antcpu.com</a>';
  drawer.appendChild(foot);
  document.body.appendChild(drawer);

  /* ---------- Render + search ---------- */
  function render(filter) {
    list.innerHTML = "";
    var q = (filter || "").trim().toLowerCase();
    var lastGroup = null, shown = 0;
    DIRECTORY.forEach(function (item) {
      var hay = (item.label + " " + item.hint + " " + item.keys).toLowerCase();
      if (q && hay.indexOf(q) === -1) return;
      if (item.group !== lastGroup) {
        var g = document.createElement("div");
        g.className = "ni-group";
        g.textContent = item.group;
        list.appendChild(g);
        lastGroup = item.group;
      }
      var a = document.createElement("a");
      a.className = "ni-item";
      a.href = item.href;
      a.innerHTML = '<span class="ni-ico"></span><span><span class="ni-label"></span><span class="ni-hint"></span></span>';
      a.querySelector(".ni-ico").textContent = item.icon;
      a.querySelector(".ni-label").textContent = item.label;
      a.querySelector(".ni-hint").textContent = item.hint;
      list.appendChild(a);
      shown++;
    });
    if (!shown) {
      var empty = document.createElement("div");
      empty.className = "ni-empty";
      empty.textContent = "Nothing matches — try “arena”, “apply”, or “hire”.";
      list.appendChild(empty);
    }
  }
  render("");

  input.addEventListener("input", function () { render(input.value); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      var first = list.querySelector(".ni-item");
      if (first) window.location.href = first.href;
    }
  });

  /* ---------- Open / close ---------- */
  function open() {
    drawer.classList.add("open");
    overlay.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    setTimeout(function () { input.focus(); }, 60);
  }
  function close() {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    burger.focus();
  }
  burger.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer.classList.contains("open")) close();
  });
})();
