(function () {
  "use strict";
  const picker = document.querySelector(".theme-picker");
  const toggle = picker.querySelector(".theme-toggle");
  const panel = picker.querySelector(".theme-panel");
  const radios = Array.from(picker.querySelectorAll("input[name=theme]"));
  const status = picker.querySelector("[role=status]");
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    const colors = { editorial: "#f8f5ed", tech: "#0b1220", corporate: "#ffffff", creative: "#07030d" };
    document.querySelector('meta[name="theme-color"]').content = colors[theme];
  }
  function sync(theme) {
    radios.forEach(function (radio) { radio.checked = radio.value === theme; });
  }
  function close(restoreFocus) {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) toggle.focus();
  }
  sync(document.documentElement.dataset.theme);
  picker.hidden = false;
  toggle.addEventListener("click", function () {
    const open = panel.hidden;
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    if (open) {
      document.querySelector(".menu-toggle[aria-expanded=true]")?.click();
      picker.querySelector("input:checked").focus();
    }
  });
  radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (!radio.checked) return;
      apply(radio.value);
      let saved = true;
      try { localStorage.setItem("portfolio-theme", radio.value); } catch (_) { saved = false; }
      status.textContent = "Tema: " + radio.closest("label").querySelector("span:last-child").firstChild.textContent + (saved ? "." : ". No se puede guardar la elección en este navegador.");
      window.dispatchEvent(new Event("resize"));
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) {
      event.preventDefault();
      close(true);
    }
  });
  document.addEventListener("click", function (event) {
    if (!picker.contains(event.target)) close(false);
  });
  picker.addEventListener("focusout", function (event) {
    if (!picker.contains(event.relatedTarget)) close(false);
  });
  window.addEventListener("storage", function (event) {
    if (event.key !== "portfolio-theme") return;
    const theme = event.newValue || "tech";
    if (!radios.some(function (radio) { return radio.value === theme; })) return;
    apply(theme);
    sync(theme);
    window.dispatchEvent(new Event("resize"));
  });
})();
