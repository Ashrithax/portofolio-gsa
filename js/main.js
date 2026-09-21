
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  function el(tag, attrs = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      n.setAttribute(k === "class" ? "class" : k, v);
    }
    kids.flat().forEach(k => { if (k != null) n.append(k.nodeType ? k : document.createTextNode(k)); });
    return n;
  }
  const ext = (href, text, cls) =>
    el("a", { href, target: "_blank", rel: "noopener noreferrer", class: cls }, text);

  const svg = inner =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    inner + "</svg>";

  const ICONS = {
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    linkedin: svg('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5m0 2c0-1.7 1.3-2 2.5-2s2.5.8 2.5 2.5V16"/>'),
    instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>'),
    github: svg('<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>'),
    tiktok: svg('<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.5 2.2 4 5 4.2"/>'),
    youtube: svg('<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>'),
    link: svg('<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>')
  };
  function iconFor(label) {
    const l = String(label).toLowerCase();
    const key = Object.keys(ICONS).find(k => l.includes(k));
    return ICONS[key || "link"];
  }

  const PLACEHOLDER_ICON = svg('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 9"/>');

  function placeholder(text) {
    const d = el("div", { class: "ph" }, text || "Tambahkan foto di folder images");
    d.insertAdjacentHTML("afterbegin", PLACEHOLDER_ICON);
    return d;
  }

  function setImage(box, src, alt, loading) {
    box.replaceChildren();
    if (!src) { box.append(placeholder()); return; }
    const img = el("img", { src, alt, loading: loading || "lazy" });
    img.addEventListener("error", () => box.replaceChildren(placeholder()));
    box.append(img);
  }

  function dropIfEmpty(id, list) {
    if (list && list.length) return;
    $("#" + id)?.remove();
    $('.tabs a[href="#' + id + '"]')?.remove();
  }

  document.title = DATA.name + " - Portofolio";
  $('meta[property="og:title"]').content = document.title;
  $('meta[name="description"]').content = DATA.tagline;
  $('meta[property="og:description"]').content = DATA.tagline;

  $("#name").textContent = DATA.name;
  $("#role").textContent = DATA.role;
  $("#campus").textContent = DATA.campus || "";
  $("#campus").hidden = !DATA.campus;
  $("#place").textContent = DATA.location || "";
  $("#place").hidden = !DATA.location;
  setImage($("#photo"), DATA.photo, "Foto " + DATA.name, "eager");

  const icons = $("#icons");
  function iconButton(href, label, internal) {
    const a = el("a", {
      class: "icon-btn", href, "aria-label": label, title: label,
      target: internal ? null : "_blank", rel: internal ? null : "noopener noreferrer"
    });
    a.insertAdjacentHTML("afterbegin", iconFor(label));
    return a;
  }
  icons.append(iconButton("mailto:" + DATA.email, "Email", true));
  DATA.socials.forEach(s => icons.append(iconButton(s.url, s.label, false)));

  if (DATA.cv) {
    const cv = $("#cvBtn");
    cv.href = DATA.cv; cv.hidden = false; cv.setAttribute("download", "");
  }

  $("#headline").textContent = DATA.headline;
  $("#tagline").textContent = DATA.tagline;

  DATA.about.forEach(p => $("#about").append(el("p", {}, p)));
  DATA.skills.forEach(s =>
    $("#skills").append(el("div", {}, el("dt", {}, s.group), el("dd", {}, s.items.join(", "))))
  );
  if (!DATA.skills.length) { $("#skillsTitle").remove(); $("#skills").remove(); }

  DATA.experience.forEach(e => $("#timeline").append(el("li", {},
    el("p", { class: "period" }, e.period),
    el("h3", {}, e.title),
    el("p", { class: "org" }, e.org),
    el("p", { class: "desc" }, e.desc)
  )));
  dropIfEmpty("pengalaman", DATA.experience);

  $("#geminiLead").textContent = DATA.geminiLead;
  DATA.geminiUses.forEach(u => {
    $("#uses").append(el("li", {},
      el("h3", {}, u.url ? ext(u.url, u.title) : u.title),
      el("p", { class: "feature" }, u.feature),
      el("p", { class: "story" }, u.story),
      el("p", { class: "result" }, u.result)
    ));
  });
  dropIfEmpty("gemini", DATA.geminiUses);

  $("#postsLead").textContent = DATA.postsLead;
  DATA.posts.forEach(p => {
    $("#posts").append(el("li", {},
      el("span", { class: "plat" }, p.platform),
      el("div", {},
        el("h3", {}, p.url ? ext(p.url, p.title) : p.title),
        el("p", { class: "note" }, p.note))
    ));
  });
  dropIfEmpty("konten-ai", DATA.posts);

  $("#planLead").textContent = DATA.planLead;
  DATA.plan.forEach(p => $("#plan").append(el("li", {},
    el("p", { class: "period" }, p.when),
    el("h3", {}, p.title),
    el("p", { class: "desc" }, p.desc)
  )));
  dropIfEmpty("rencana", DATA.plan);

  $("#contactLead").textContent = DATA.contactLead;
  const mail = $("#mailLink");
  mail.href = "mailto:" + DATA.email;
  mail.textContent = DATA.email;
  DATA.socials.forEach(s => $("#socials").append(ext(s.url, s.label, "btn btn-ghost")));
  $("#footer").textContent = "\u00A9 " + new Date().getFullYear() + " " + DATA.name + ". Seluruh hak cipta dilindungi.";

  const copyBtn = $("#copyMail");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(DATA.email);
      copyBtn.textContent = "Email tersalin";
      setTimeout(() => { copyBtn.textContent = "Salin email"; }, 2000);
    } catch (e) {
      location.href = "mailto:" + DATA.email;
    }
  });

  const lb = $("#lightbox");
  let lbList = [];
  let lbIndex = 0;

  function fillLightbox() {
    const it = lbList[lbIndex];
    setImage($("#lbMedia"), it.image, it.title, "eager");
    $("#lbTitle").textContent = it.title;
    $("#lbMeta").textContent = it.meta || "";
    $("#lbDesc").textContent = it.desc || "";
    const lk = $("#lbLink");
    if (it.link) { lk.href = it.link; lk.hidden = false; } else { lk.hidden = true; }
    const single = lbList.length < 2;
    $("#lbPrev").hidden = single;
    $("#lbNext").hidden = single;
  }
  function openLightbox(list, i) { lbList = list; lbIndex = i; fillLightbox(); lb.showModal(); }
  function stepLightbox(d) { lbIndex = (lbIndex + d + lbList.length) % lbList.length; fillLightbox(); }

  $("#lbClose").addEventListener("click", () => lb.close());
  $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
  $("#lbNext").addEventListener("click", () => stepLightbox(1));
  lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });   
  lb.addEventListener("keydown", e => {
    if (lbList.length < 2) return;
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  const gallery = $("#gallery");
  const filters = $("#filters");
  const categories = ["Semua", ...new Set(DATA.achievements.map(a => a.category))];
  let activeCat = "Semua";

  function renderFilters() {
    filters.replaceChildren(...categories.map(c => {
      const b = el("button", { class: "chip", type: "button", "aria-pressed": String(c === activeCat) }, c);
      b.addEventListener("click", () => { activeCat = c; renderFilters(); renderGallery(); });
      return b;
    }));
  }

  function renderGallery() {
    const shown = DATA.achievements.filter(a => activeCat === "Semua" || a.category === activeCat);
    const items = shown.map(a => ({
      title: a.title, image: a.image, desc: a.desc, link: a.link,
      meta: a.category + " - " + a.issuer + ", " + a.year
    }));
    gallery.replaceChildren(...shown.map((a, i) => {
      const thumb = el("div", { class: "thumb" });
      setImage(thumb, a.image, a.title);
      const card = el("button", { class: "ach", type: "button", "aria-label": "Lihat detail: " + a.title },
        thumb,
        el("div", { class: "cap" },
          el("span", { class: "tag" }, a.category),
          el("h3", {}, a.title),
          el("span", { class: "meta" }, a.issuer + ", " + a.year)
        )
      );
      card.addEventListener("click", () => openLightbox(items, i));
      return card;
    }));
  }

  if (DATA.achievements.length) { renderFilters(); renderGallery(); }
  dropIfEmpty("prestasi", DATA.achievements);

  $("#momentsLead").textContent = DATA.momentsLead;
  const momentItems = DATA.moments.map(m => ({
    title: m.title, image: m.image, desc: m.desc,
    meta: [m.date, m.place].filter(Boolean).join(", ")
  }));
  $("#moments").replaceChildren(...DATA.moments.map((m, i) => {
    const thumb = el("div", { class: "thumb" });
    setImage(thumb, m.image, m.title);
    const card = el("button", { class: "moment", type: "button", "aria-label": "Lihat foto: " + m.title },
      thumb,
      el("h3", {}, m.title),
      el("span", { class: "meta" }, momentItems[i].meta)
    );
    card.addEventListener("click", () => openLightbox(momentItems, i));
    return card;
  }));
  dropIfEmpty("kegiatan", DATA.moments);

    document.querySelectorAll(".hero-actions a").forEach(a => {
    if (!$(a.getAttribute("href"))) a.remove();
  });

  const links = [...document.querySelectorAll(".tabs a")];
  const sections = [...document.querySelectorAll(".block")];
  function markActive(id) {
    links.forEach(l => l.setAttribute("aria-current", String(l.getAttribute("href") === "#" + id)));
    const cur = links.find(l => l.getAttribute("href") === "#" + id);
    if (cur && cur.scrollIntoView) {
      const bar = cur.parentElement;
      bar.scrollTo({ left: cur.offsetLeft - bar.clientWidth / 3, behavior: "smooth" });
    }
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) markActive(en.target.id); });
  }, { rootMargin: "-20% 0px -70% 0px" });
  sections.forEach(s => observer.observe(s));

  const root = document.documentElement;
  try { const saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
  $("#themeBtn").addEventListener("click", () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();
