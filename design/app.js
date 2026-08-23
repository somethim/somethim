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

  // Any click, anywhere on the page, makes every robot jump
  document.addEventListener("click", () => {
    slots.forEach((slot) => {
      if (slot.classList.contains("party")) return;
      slot.classList.remove("jump");
      void slot.offsetWidth; // restart the animation
      slot.classList.add("jump");
    });
  });
  slots.forEach((slot) => {
    slot.addEventListener("animationend", (e) => {
      if (e.animationName === "robot-jump") slot.classList.remove("jump");
      if (e.animationName === "robot-flip") slot.classList.remove("flip");
    });
  });

  // The big hero robot has its own click: a backflip. And an easter egg —
  // seven quick taps (Android-style) start party mode for a few seconds.
  const hero = document.querySelector(".home-hero .sprite-slot");
  if (hero) {
    let taps = 0;
    let lastTap = 0;
    hero.addEventListener("click", (e) => {
      e.stopPropagation(); // direct taps flip instead of the global jump
      const now = Date.now();
      taps = now - lastTap < 1500 ? taps + 1 : 1;
      lastTap = now;
      if (taps >= 7) {
        taps = 0;
        hero.classList.remove("flip");
        hero.classList.add("party");
        setTimeout(() => hero.classList.remove("party"), 6000);
        return;
      }
      if (hero.classList.contains("party")) return;
      hero.classList.remove("flip");
      void hero.offsetWidth;
      hero.classList.add("flip");
    });
  }

  let typingTimer;
  document.addEventListener("keydown", () => {
    slots.forEach((s) => s.classList.add("typing"));
    clearTimeout(typingTimer);
    typingTimer = setTimeout(
      () => slots.forEach((s) => s.classList.remove("typing")),
      250
    );
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
