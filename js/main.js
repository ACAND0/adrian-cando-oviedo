(function () {
  "use strict";

  document.documentElement.classList.add("js-ready");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".page-progress span");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-header nav");
  const hero = document.querySelector(".hero");
  const profile = document.querySelector(".hero-profile");
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const counterGrid = document.querySelector(".metric-grid");
  let countersStarted = false;
  let scrollTicking = false;

  function updateScrollState() {
    const scrollTop = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-scrolled", scrollTop > 24);
    progress.style.width = (scrollable > 0 ? (scrollTop / scrollable) * 100 : 0) + "%";

    if (!reducedMotion && scrollTop < window.innerHeight * 1.25) {
      const heroProgress = Math.min(scrollTop / Math.max(window.innerHeight, 1), 1);
      hero.style.setProperty("--hero-scroll", heroProgress.toFixed(3));
      profile.style.setProperty("--profile-shift", (heroProgress * 34).toFixed(1) + "px");
    }

    const viewportMarker = scrollTop + window.innerHeight * 0.38;
    let activeId = "";
    sections.forEach(function (section) {
      if (section.offsetTop <= viewportMarker) activeId = section.id;
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + activeId);
    });
  }

  function requestScrollUpdate() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(function () {
      updateScrollState();
      startCountersWhenReady();
      scrollTicking = false;
    });
  }

  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.classList.remove("is-open");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  menuButton.addEventListener("click", function () {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });

  document.querySelectorAll("a[href^='#']").forEach(function (link) {
    link.addEventListener("click", function (event) {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      closeMenu();
      const top = target.getBoundingClientRect().top + window.scrollY - 66;
      window.scrollTo({ top: top, behavior: reducedMotion ? "auto" : "smooth" });
    });
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".reveal").forEach(function (element) {
      if (!element.closest(".hero")) revealObserver.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;

    document.querySelectorAll("[data-count]").forEach(function (counter, index) {
      const target = Number(counter.dataset.count);
      const suffix = counter.dataset.suffix || "";

      if (reducedMotion) {
        counter.textContent = target + suffix;
        return;
      }

      counter.textContent = "0" + suffix;
      const delay = index * 130;
      const duration = 1250;
      const startAt = performance.now() + delay;

      function frame(now) {
        const elapsed = Math.max(0, now - startAt);
        const animationProgress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - animationProgress, 4);
        counter.textContent = Math.round(target * eased) + suffix;
        if (animationProgress < 1) window.requestAnimationFrame(frame);
      }

      window.requestAnimationFrame(frame);
    });
  }

  function startCountersWhenReady() {
    if (countersStarted || !counterGrid) return;
    const rect = counterGrid.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.88 || rect.bottom < 0) animateCounters();
  }

  if (counterGrid && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        animateCounters();
        counterObserver.disconnect();
      }
    }, { threshold: 0.18 });
    counterObserver.observe(counterGrid);
  }

  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    const cursorGlow = document.querySelector(".cursor-glow");
    document.addEventListener("mousemove", function (event) {
      cursorGlow.style.transform = "translate3d(" + (event.clientX - 180) + "px," + (event.clientY - 180) + "px,0)";
    });

    document.querySelectorAll(".timeline-item, .focus-feature").forEach(function (element) {
      element.addEventListener("mousemove", function (event) {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--spot-x", ((event.clientX - rect.left) / rect.width) * 100 + "%");
        element.style.setProperty("--spot-y", ((event.clientY - rect.top) / rect.height) * 100 + "%");
      });
    });
  }

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) closeMenu();
    requestScrollUpdate();
  });

  updateScrollState();
  startCountersWhenReady();
  window.requestAnimationFrame(function () {
    document.body.classList.add("intro-ready");
    document.querySelectorAll(".hero .reveal").forEach(function (element) {
      element.classList.add("is-visible");
    });
  });
})();
