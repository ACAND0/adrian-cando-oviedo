(function ($) {
  "use strict";

  document.documentElement.classList.add("jquery-ready");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $window = $(window);
  const $header = $(".site-header");
  const $progress = $(".page-progress span");
  const $menuButton = $(".menu-toggle");
  const $nav = $(".site-header nav");

  function updateScrollState() {
    const scrollTop = $window.scrollTop();
    const scrollable = $(document).height() - $window.height();
    $header.toggleClass("is-scrolled", scrollTop > 24);
    $progress.css("width", (scrollable > 0 ? scrollTop / scrollable * 100 : 0) + "%");
  }

  function closeMenu() {
    $menuButton.attr("aria-expanded", "false").removeClass("is-open");
    $nav.removeClass("is-open");
    $("body").removeClass("menu-open");
  }

  $menuButton.on("click", function () {
    const open = $(this).attr("aria-expanded") !== "true";
    $(this).attr("aria-expanded", String(open)).toggleClass("is-open", open);
    $nav.toggleClass("is-open", open);
    $("body").toggleClass("menu-open", open);
  });

  $("a[href^='#']").on("click", function (event) {
    const $target = $($(this).attr("href"));
    if (!$target.length) return;
    event.preventDefault();
    closeMenu();
    $("html, body").stop().animate({ scrollTop: $target.offset().top - 66 }, reducedMotion ? 0 : 720);
  });

  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $(entry.target).addClass("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px" });
    $(".reveal").each(function () { observer.observe(this); });
  } else {
    $(".reveal").addClass("is-visible");
  }

  let countersStarted = false;
  function animateCounters() {
    const $grid = $(".metric-grid");
    if (countersStarted || !$grid.length || $window.scrollTop() + $window.height() < $grid.offset().top + 80) return;
    countersStarted = true;
    $("[data-count]").each(function () {
      const $counter = $(this);
      const target = Number($counter.data("count"));
      const plus = $counter.text().includes("+");
      $({ value: 0 }).animate({ value: target }, {
        duration: reducedMotion ? 0 : 1100,
        step: function () { $counter.text(Math.ceil(this.value) + (plus ? "+" : "")); },
        complete: function () { $counter.text(target + (plus ? "+" : "")); }
      });
    });
  }

  if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
    $(document).on("mousemove", function (event) {
      $(".cursor-glow").css("transform", "translate3d(" + (event.clientX - 180) + "px," + (event.clientY - 180) + "px,0)");
    });
    $(".timeline-item, .focus-feature").on("mousemove", function (event) {
      const rect = this.getBoundingClientRect();
      this.style.setProperty("--spot-x", (event.clientX - rect.left) / rect.width * 100 + "%");
      this.style.setProperty("--spot-y", (event.clientY - rect.top) / rect.height * 100 + "%");
    });
  }

  $window.on("scroll", function () { updateScrollState(); animateCounters(); });
  $window.on("resize", function () { if ($window.width() > 980) closeMenu(); });
  updateScrollState();
  animateCounters();
  setTimeout(function () { $(".hero .reveal").addClass("is-visible"); }, 80);
})(jQuery);
