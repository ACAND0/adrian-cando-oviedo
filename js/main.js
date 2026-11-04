(function () {
  "use strict";

  const navigation = document.querySelector(".page-nav");
  const links = Array.from(navigation.querySelectorAll("a"));
  const panels = Array.from(document.querySelectorAll(".page-panel"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const content = document.getElementById("contenido");
  document.documentElement.classList.add("has-js");
  navigation.setAttribute("role", "tablist");

  links.forEach(function (link) {
    const id = link.hash.slice(1);
    link.setAttribute("role", "tab");
    link.setAttribute("aria-controls", id);
    document.getElementById(id).setAttribute("role", "tabpanel");
    document.getElementById(id).setAttribute("aria-labelledby", link.id);
  });

  function validPanel(id) {
    return panels.some(function (panel) { return panel.id === id; });
  }

  function activate(id, options) {
    if (!validPanel(id)) id = "sobre";
    panels.forEach(function (panel) { panel.hidden = panel.id !== id; });
    links.forEach(function (link) {
      const selected = link.hash === "#" + id;
      link.setAttribute("aria-selected", String(selected));
      link.tabIndex = selected ? 0 : -1;
    });
    document.title = document.getElementById("heading-" + id).textContent + " · Adrián Cando Oviedo";
    if (options && options.history && window.location.hash !== "#" + id) {
      window.history.pushState(null, "", "#" + id);
    }
    if (options && options.scroll) {
      const top = content.getBoundingClientRect().top + window.scrollY - 20;
      if (window.scrollY > top || window.innerWidth <= 940) {
        window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion.matches ? "auto" : "smooth" });
      }
    }
    if (options && options.focusHeading) {
      document.getElementById("heading-" + id).focus({ preventScroll: true });
    }
  }

  links.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      activate(link.hash.slice(1), { history: true, scroll: true });
    });
    link.addEventListener("keydown", function (event) {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % links.length;
      if (event.key === "ArrowLeft") next = (index - 1 + links.length) % links.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = links.length - 1;
      if (event.key === " ") {
        event.preventDefault();
        activate(link.hash.slice(1), { history: true, scroll: true });
      }
      if (next !== undefined) {
        event.preventDefault();
        links[next].focus();
        activate(links[next].hash.slice(1), { history: true });
      }
    });
  });

  document.querySelectorAll("[data-open-panel]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      activate(link.hash.slice(1), { history: true, scroll: true, focusHeading: true });
    });
  });
  window.addEventListener("popstate", function () { activate(window.location.hash.slice(1)); });
  window.addEventListener("hashchange", function () { activate(window.location.hash.slice(1)); });
  activate(window.location.hash.slice(1));

  const profileToggle = document.querySelector(".profile-toggle");
  const profileContacts = document.getElementById("profile-contacts");
  const compactProfile = window.matchMedia("(max-width: 600px)");
  let profileExpanded = false;
  function syncProfile() {
    profileContacts.hidden = compactProfile.matches && !profileExpanded;
    profileToggle.setAttribute("aria-expanded", String(!profileContacts.hidden));
    profileToggle.textContent = profileContacts.hidden ? "Mostrar contacto" : "Ocultar contacto";
  }
  profileToggle.addEventListener("click", function () { profileExpanded = !profileExpanded; syncProfile(); });
  compactProfile.addEventListener("change", syncProfile);
  syncProfile();

  document.querySelectorAll("[data-experience-start]").forEach(function (element) {
    const start = element.dataset.experienceStart.split("-").map(Number);
    const now = new Date();
    const years = now.getFullYear() - start[0] - (now.getMonth() + 1 < start[1] ? 1 : 0);
    element.textContent = Math.max(0, years) + "+";
  });
  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  const dialog = document.querySelector(".project-dialog");
  document.querySelectorAll(".project-preview").forEach(function (button) {
    button.addEventListener("click", function () {
      const image = button.querySelector("img");
      const title = button.closest("figure").querySelector("h3").textContent;
      dialog.querySelector("img").src = image.src;
      dialog.querySelector("img").alt = image.alt;
      dialog.querySelector("h2").textContent = title;
      dialog.showModal();
    });
  });
  dialog.querySelector(".dialog-close").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();
