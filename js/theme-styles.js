(function () {
  "use strict";
  const sheets = document.querySelectorAll("[data-theme-sheet]");
  function syncStyles() {
    const corporate = document.documentElement.dataset.theme === "corporate";
    sheets.forEach(function (sheet) {
      sheet.media = ((sheet.dataset.themeSheet === "corporate") === corporate) ? "all" : "not all";
    });
  }
  syncStyles();
  new MutationObserver(syncStyles).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
})();
