/* ============================================================
   Tim's personal site — interactivity
   ============================================================ */

// ---------- Theme toggle ----------
(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-theme-toggle]");
    if (!t) return;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// ---------- Reveal on scroll ----------
(function () {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();

// ---------- Card spotlight ----------
(function () {
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
})();

// ---------- Active nav link ----------
(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;
    const target = href.split("/").pop() || href;
    if (href === path || target === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
    // also activate blog link for blog/post.html
    if (path === "post.html" && href.includes("blog")) a.classList.add("active");
  });
})();

// ---------- Filter bar (projects + blog) ----------
window.setupFilters = function (selector, itemSelector) {
  const bar = document.querySelector(selector);
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-tag]");
    if (!btn) return;
    bar.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const tag = btn.dataset.tag;
    document.querySelectorAll(itemSelector).forEach(item => {
      const tags = (item.dataset.tags || "").split(",").map(s => s.trim());
      const show = tag === "all" || tags.includes(tag);
      item.style.display = show ? "" : "none";
    });
  });
};

// ---------- Year ----------
document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});
