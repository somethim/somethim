// Tiny, dependency-free behaviors — each maps to a small Leptos signal/effect.

// ---- Theme toggle: dark is the native theme; light is the variant ----
(function initTheme() {
  const param = new URLSearchParams(location.search).get("theme");
  const stored = param || localStorage.getItem("theme");
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  if (stored === "light" || (!stored && prefersLight)) {
    document.body.classList.add("light-mode");
  }
  const toggle = document.querySelector(".dark-mode-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const light = document.body.classList.toggle("light-mode");
      localStorage.setItem("theme", light ? "light" : "dark");
    });
  }
})();

// ---- Hero typing: type the command, pause, swap to the name ----
(function initHero() {
  const el = document.getElementById("typed");
  if (!el) return;
  const command = "whoami";
  const name = el.dataset.name || "Arbi Kullakshi";
  let i = 0;

  function typeCommand() {
    if (i <= command.length) {
      el.textContent = command.slice(0, i);
      i++;
      setTimeout(typeCommand, 90 + Math.random() * 80);
    } else {
      setTimeout(swapToName, 550);
    }
  }

  function swapToName() {
    el.textContent = "";
    let j = 0;
    (function typeName() {
      if (j <= name.length) {
        el.textContent = name.slice(0, j);
        j++;
        setTimeout(typeName, 55 + Math.random() * 50);
      }
    })();
  }

  typeCommand();
})();

// ---- Inner-page titles: type the ~/path ----
(function initPathTitles() {
  document.querySelectorAll("[data-path]").forEach((el) => {
    const path = el.dataset.path;
    let i = 0;
    (function type() {
      if (i <= path.length) {
        el.textContent = path.slice(0, i);
        i++;
        setTimeout(type, 60 + Math.random() * 60);
      }
    })();
  });
})();

// ---- Robot: eyes follow the cursor, jump on click, antenna lights while typing ----
(function initRobots() {
  const slots = document.querySelectorAll(".sprite-slot");
  if (!slots.length) return;

  document.addEventListener("mousemove", (e) => {
    slots.forEach((slot) => {
      const r = slot.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.38; // eye height
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      const reach = Math.min(d / 40, 1) * 2.5;
      slot.querySelectorAll(".sprite-eye").forEach((eye) => {
        eye.style.translate = `${(dx / d) * reach}px ${(dy / d) * reach}px`;
      });
    });
  });

  // Antenna flash, color-coded by action:
  // typing = amber, backspace = red, enter = green, stray click = blue
  let flashTimer;
  function flashAntennas(color) {
    slots.forEach((s) => {
      s.style.setProperty("--tx-color", color || "var(--signal-warm)");
      s.classList.add("typing");
    });
    clearTimeout(flashTimer);
    flashTimer = setTimeout(
      () => slots.forEach((s) => s.classList.remove("typing")),
      300
    );
  }

  // Clicking a robot makes that robot jump; any other click flashes antennas
  document.addEventListener("click", (e) => {
    const clicked = e.target.closest(".sprite-slot");
    if (clicked) {
      if (clicked.classList.contains("party")) return;
      clicked.classList.remove("jump");
      void clicked.offsetWidth; // restart the animation
      clicked.classList.add("jump");
    } else {
      flashAntennas("var(--signal-blue)");
    }
  });
  slots.forEach((slot) => {
    slot.addEventListener("animationend", (e) => {
      if (e.animationName === "robot-jump") slot.classList.remove("jump");
    });
  });

  // Easter egg: seven quick taps on the big hero robot start party mode
  const hero = document.querySelector(".home-hero .sprite-slot");
  if (hero) {
    let taps = 0;
    let lastTap = 0;
    hero.addEventListener("click", () => {
      const now = Date.now();
      taps = now - lastTap < 1500 ? taps + 1 : 1;
      lastTap = now;
      if (taps >= 7) {
        taps = 0;
        hero.classList.remove("jump");
        hero.classList.add("party");
        setTimeout(() => hero.classList.remove("party"), 6000);
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      flashAntennas("var(--flash-red)");
    } else if (e.key === "Enter") {
      flashAntennas("var(--flash-green)");
    } else {
      flashAntennas("var(--signal-warm)");
    }
  });

  // Opening the console gets noticed: startled double-take, wide eyes,
  // red alert antenna — and a note left in the console itself.
  let lastCaught = 0;
  function caughtSnooping() {
    const now = Date.now();
    if (now - lastCaught < 10000) return;
    lastCaught = now;
    slots.forEach((s) => {
      s.classList.add("alert");
      setTimeout(() => s.classList.remove("alert"), 4000);
    });
    console.log(
      "%c" +
        "  ▄▄▄▄▄▄▄▄\n" +
        "  █ ◉  ◉ █   caught you snooping.\n" +
        "  ▀▄▄▄▄▄▄▀   since you're here —\n" +
        "   ▐▌  ▐▌    arbi@kullakshi:~$ say hi → contact@arbikullakshi.com",
      "color:#2dd4bf;font-family:monospace;font-size:12px;line-height:1.5"
    );
  }
  setInterval(() => {
    const gap = Math.max(
      window.outerWidth - window.innerWidth,
      window.outerHeight - window.innerHeight
    );
    if (gap > 170) caughtSnooping();
  }, 700);
  document.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (k === "i" || k === "j" || k === "c"))) {
      caughtSnooping();
    }
  });

  // Rest after a while: ~18s idle turns the robot drowsy (nodding, heavy
  // eyelids), 30s puts it fully asleep. Any interaction wakes it.
  let drowsyTimer;
  let sleepTimer;
  function restartSleepTimer() {
    slots.forEach((s) => {
      // Waking from deep sleep isn't instant: the eyes flutter open first
      if (s.classList.contains("asleep")) {
        s.classList.add("waking");
        setTimeout(() => s.classList.remove("waking"), 1150);
      }
      s.classList.remove("drowsy", "asleep");
    });
    clearTimeout(drowsyTimer);
    clearTimeout(sleepTimer);
    drowsyTimer = setTimeout(
      () => slots.forEach((s) => s.classList.add("drowsy")),
      18000
    );
    sleepTimer = setTimeout(() => {
      slots.forEach((s) => {
        // Freeze the current animated pose as inline styles first — the
        // transition to the slump then starts from where the robot visually
        // is, instead of snapping to neutral when the nod animation stops.
        const cs = getComputedStyle(s);
        let tx = 0;
        let ty = 0;
        if (cs.transform.startsWith("matrix(")) {
          const p = cs.transform.slice(7, -1).split(",");
          tx = parseFloat(p[4]) || 0;
          ty = parseFloat(p[5]) || 0;
        }
        if (cs.translate && cs.translate !== "none") {
          const p = cs.translate.split(" ");
          tx += parseFloat(p[0]) || 0;
          ty += parseFloat(p[1] || "0") || 0;
        }
        s.style.rotate = cs.rotate === "none" ? "0deg" : cs.rotate;
        s.style.translate = `${tx}px ${ty}px`;
        s.classList.remove("drowsy");
        s.classList.add("asleep");
        void s.offsetWidth; // commit the frozen pose
        s.style.rotate = "";
        s.style.translate = ""; // release: eases into the slump from here
      });
    }, 30000);
  }
  ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach((ev) =>
    document.addEventListener(ev, restartSleepTimer, { passive: true })
  );
  restartSleepTimer();
})();

// ---- 404 quip: a random line on every load (list lives in quips.js) ----
(function initQuip() {
  const el = document.getElementById("quip");
  const quips = window.QUIPS || [];
  if (!el || !quips.length) return;
  el.textContent = quips[Math.floor(Math.random() * quips.length)];
})();

// ---- Cookie consent: first-visit banner + settings dialog from the footer ----
(function initCookies() {
  const KEY = "cookie-consent"; // "all" | "essential"
  const params = new URLSearchParams(location.search);

  const dialog = document.createElement("dialog");
  dialog.className = "email-dialog";
  dialog.setAttribute("aria-labelledby", "cookie-dialog-title");
  dialog.innerHTML = `
    <div class="email-dialog-inner">
      <div class="email-dialog-head">
        <div>
          <p class="section-index">Privacy / Cookies</p>
          <h2 id="cookie-dialog-title">Cookie settings</h2>
        </div>
        <button type="button" class="email-dialog-close" id="cookie-close" aria-label="Close">✕</button>
      </div>
      <div class="consent-list">
        <div class="consent-row">
          <div>
            <p class="consent-name">Essential</p>
            <p class="consent-desc">Sign-in session and theme preference. Always on.</p>
          </div>
          <button type="button" class="consent-toggle" aria-pressed="true" disabled>on</button>
        </div>
        <div class="consent-row">
          <div>
            <p class="consent-name">Analytics</p>
            <p class="consent-desc">Anonymous page views — powers the post view counts. First-party only.</p>
          </div>
          <button type="button" class="consent-toggle" id="consent-analytics" aria-pressed="true">on</button>
        </div>
      </div>
      <div class="email-dialog-footer">
        <p class="form-status">Stored on this device — change it here any time.</p>
        <button type="button" class="button-primary" id="consent-save">Save choices ↘</button>
      </div>
    </div>`;
  document.body.appendChild(dialog);

  const banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Cookie consent");
  banner.hidden = true;
  banner.innerHTML = `
    <p class="section-index">Cookies</p>
    <p>A session cookie keeps sign-ins alive; an anonymous first-party counter powers the post view counts. Nothing is shared with third parties.</p>
    <div class="cookie-actions">
      <button type="button" class="button-primary small" data-consent="all">Accept</button>
      <button type="button" class="button-ghost small" data-consent="essential">Essential only</button>
      <button type="button" class="button-ghost small" id="cookie-settings">Settings</button>
    </div>`;
  document.body.appendChild(banner);

  const analytics = dialog.querySelector("#consent-analytics");

  function save(choice) {
    localStorage.setItem(KEY, choice);
    banner.hidden = true;
    if (dialog.open) dialog.close();
  }

  function openDialog() {
    const consent = localStorage.getItem(KEY) || "all";
    const on = consent !== "essential";
    analytics.setAttribute("aria-pressed", String(on));
    analytics.textContent = on ? "on" : "off";
    dialog.showModal();
  }

  analytics.addEventListener("click", () => {
    const on = analytics.getAttribute("aria-pressed") !== "true";
    analytics.setAttribute("aria-pressed", String(on));
    analytics.textContent = on ? "on" : "off";
  });
  dialog.querySelector("#consent-save").addEventListener("click", () => {
    save(analytics.getAttribute("aria-pressed") === "true" ? "all" : "essential");
  });
  dialog.querySelector("#cookie-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });

  banner.querySelectorAll("[data-consent]").forEach((b) =>
    b.addEventListener("click", () => save(b.dataset.consent))
  );
  banner.querySelector("#cookie-settings").addEventListener("click", openDialog);
  document.querySelectorAll(".cookies-open").forEach((b) => b.addEventListener("click", openDialog));

  // ?cookies=banner / ?cookies=settings force the UI for review; otherwise
  // the banner shows on first visit only
  if (params.get("cookies") === "banner" || !localStorage.getItem(KEY)) banner.hidden = false;
  if (params.get("cookies") === "settings") openDialog();
})();

// ---- Email dialog: open/close only (the form is a visual mockup) ----
(function initEmailDialog() {
  const dialog = document.getElementById("email-dialog");
  const open = document.getElementById("email-open");
  if (!dialog || !open) return;
  open.addEventListener("click", () => dialog.showModal());
  if (new URLSearchParams(location.search).get("dialog") === "open") dialog.showModal();
  document.getElementById("email-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close(); // click on backdrop
  });
})();
