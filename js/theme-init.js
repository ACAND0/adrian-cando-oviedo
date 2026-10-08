(function () {
  "use strict";
  const themes = ["editorial", "tech", "corporate", "creative"];
  let theme = "tech";
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (themes.includes(saved)) theme = saved;
  } catch (_) { /* The selector still works when storage is unavailable. */ }
  document.documentElement.dataset.theme = theme;
  const colors = { editorial: "#f8f5ed", tech: "#0b1220", corporate: "#ffffff", creative: "#07030d" };
  document.querySelector('meta[name="theme-color"]').content = colors[theme];
})();
