(function () {
  "use strict";

  const solutionButtons = Array.from(document.querySelectorAll("[data-solution]"));
  const solutionPanels = Array.from(document.querySelectorAll(".map-panel"));
  const solutionControls = document.querySelector(".map-controls");
  const solutionStatus = document.getElementById("map-status");

  function selectSolution(id, options) {
    const button = solutionButtons.find(function (item) { return item.dataset.solution === id; });
    if (!button) return;
    solutionButtons.forEach(function (item) {
      const selected = item === button;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    solutionPanels.forEach(function (panel) {
      panel.hidden = panel.id !== "solucion-" + id;
    });
    if (options && options.updateURL) {
      window.history.replaceState(null, "", "#solucion-" + id);
    }
    if (options && options.announce) {
      solutionStatus.textContent = "Área de experiencia: " + document.getElementById("map-heading-" + id).textContent;
    }
  }

  solutionControls.setAttribute("role", "tablist");
  solutionButtons.forEach(function (button, index) {
    button.setAttribute("role", "tab");
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", button.id);
    panel.tabIndex = 0;
    button.addEventListener("click", function () {
      selectSolution(button.dataset.solution, { updateURL: true, announce: true });
    });
    button.addEventListener("keydown", function (event) {
      let next;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % solutionButtons.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + solutionButtons.length) % solutionButtons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = solutionButtons.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        solutionButtons[next].focus();
        selectSolution(solutionButtons[next].dataset.solution, { updateURL: true, announce: true });
      }
    });
  });

  function readHash() {
    try { return decodeURIComponent(window.location.hash.slice(1)); }
    catch (_) { return ""; }
  }

  function revealHashTarget() {
    let id = readHash();
    const aliases = { inicio: "sobre", perfil: "contacto" };
    const aliased = Boolean(aliases[id]);
    if (aliases[id]) {
      id = aliases[id];
      window.history.replaceState(null, "", "#" + id);
    }
    if (id.startsWith("solucion-")) selectSolution(id.slice(9));
    const target = document.getElementById(id);
    if (!target) return;
    if (aliased) window.requestAnimationFrame(function () { target.scrollIntoView({ block: "start", behavior: "auto" }); });
    const parentDetails = target.closest("details");
    if (parentDetails) parentDetails.open = true;
    const caseDetails = target.querySelector("[data-case-details], .career-copy > details");
    if (caseDetails) caseDetails.open = true;
  }

  selectSolution("migrar");
  document.documentElement.classList.add("has-js");
  revealHashTarget();
  window.addEventListener("hashchange", revealHashTarget);
  window.addEventListener("popstate", revealHashTarget);
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      const id = link.hash.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      if (id.startsWith("solucion-")) selectSolution(id.slice(9));
      const details = target.querySelector("[data-case-details], .career-copy > details");
      if (details) details.open = true;
    });
  });

  document.querySelectorAll("[data-experience-start]").forEach(function (element) {
    const start = element.dataset.experienceStart.split("-").map(Number);
    const now = new Date();
    const years = now.getFullYear() - start[0] - (now.getMonth() + 1 < start[1] ? 1 : 0);
    element.textContent = Math.max(0, years) + "+";
  });
  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const navTargets = navLinks.map(function (link) { return document.getElementById(link.hash.slice(1)); });
  const header = document.querySelector(".site-header");
  let scrollScheduled = false;
  function updateNavigation() {
    let active = -1;
    navTargets.forEach(function (target, index) {
      if (target.getBoundingClientRect().top <= header.offsetHeight + 120) active = index;
    });
    navLinks.forEach(function (link, index) {
      if (index === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    scrollScheduled = false;
  }
  function scheduleNavigation() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    window.requestAnimationFrame(updateNavigation);
  }
  window.addEventListener("scroll", scheduleNavigation, { passive: true });
  window.addEventListener("resize", scheduleNavigation);
  document.querySelectorAll("details").forEach(function (details) {
    details.addEventListener("toggle", scheduleNavigation);
  });
  updateNavigation();

  const dialog = document.querySelector(".project-dialog");
  const dialogImage = dialog.querySelector("img");
  document.querySelectorAll("[data-full-image]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (typeof dialog.showModal !== "function") {
        window.open(button.dataset.fullImage, "_blank", "noopener");
        return;
      }
      const image = button.querySelector("img");
      dialogImage.src = button.dataset.fullImage;
      dialogImage.alt = image.alt;
      dialog.querySelector("h2").textContent = button.closest("figure").querySelector("h3").textContent;
      dialog.showModal();
    });
  });
  dialog.querySelector(".dialog-close").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });

  window.addEventListener("beforeprint", function () {
    document.querySelectorAll("details").forEach(function (details) {
      details.dataset.printOpen = String(details.open);
      details.open = true;
    });
  });
  window.addEventListener("afterprint", function () {
    document.querySelectorAll("details[data-print-open]").forEach(function (details) {
      details.open = details.dataset.printOpen === "true";
      delete details.dataset.printOpen;
    });
  });
})();
