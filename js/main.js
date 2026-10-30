(function () {
  "use strict";

  document.documentElement.classList.add("has-js");

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-header nav");
  const navLinks = Array.from(nav.querySelectorAll("a"));
  const sections = navLinks.map(function (link) {
    return document.getElementById(link.hash.slice(1));
  });
  let scrollTicking = false;

  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir navegación");
    menuButton.classList.remove("is-open");
    nav.classList.remove("is-open");
  }

  menuButton.addEventListener("click", function () {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Cerrar navegación" : "Abrir navegación");
    menuButton.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".site-header")) closeMenu();
  });

  function updateActiveSection() {
    const viewportMarker = window.scrollY + 160;
    let activeIndex = -1;
    sections.forEach(function (section, index) {
      if (section && section.getBoundingClientRect().top + window.scrollY <= viewportMarker) {
        activeIndex = index;
      }
    });
    navLinks.forEach(function (link, index) {
      const active = index === activeIndex;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("scroll", function () {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(function () {
      updateActiveSection();
      scrollTicking = false;
    });
  }, { passive: true });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 820) closeMenu();
    updateActiveSection();
  });

  document.querySelectorAll("[data-experience-start]").forEach(function (counter) {
    const start = counter.dataset.experienceStart.split("-").map(Number);
    const now = new Date();
    let years = now.getFullYear() - start[0];
    if (now.getMonth() + 1 < start[1]) years -= 1;
    years = Math.max(years, 0);
    counter.textContent = years + (counter.dataset.suffix || "");
    counter.setAttribute("aria-label", years + " años de experiencia");
  });

  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    const track = carousel.querySelector(".app-carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".app-slide"));
    const previous = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");
    const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
    const status = carousel.querySelector(".app-carousel-status span");
    const totalStatus = carousel.querySelector("[data-carousel-total]");
    let current = 0;
    let touchStartX = 0;

    totalStatus.textContent = String(slides.length).padStart(2, "0");

    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = "translate3d(" + (-current * 100) + "%,0,0)";
      slides.forEach(function (slide, slideIndex) {
        const active = slideIndex === current;
        slide.setAttribute("aria-hidden", String(!active));
        slide.querySelectorAll("a, button").forEach(function (control) {
          control.tabIndex = active ? 0 : -1;
        });
      });
      dots.forEach(function (dot, dotIndex) {
        const active = dotIndex === current;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-pressed", String(active));
      });
      status.textContent = String(current + 1).padStart(2, "0");
    }

    previous.addEventListener("click", function () { showSlide(current - 1); });
    next.addEventListener("click", function () { showSlide(current + 1); });
    dots.forEach(function (dot) {
      dot.addEventListener("click", function () { showSlide(Number(dot.dataset.carouselDot)); });
    });
    carousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        showSlide(current + (event.key === "ArrowRight" ? 1 : -1));
      }
    });
    carousel.addEventListener("touchstart", function (event) {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    carousel.addEventListener("touchend", function (event) {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) showSlide(current + (distance < 0 ? 1 : -1));
    }, { passive: true });

    showSlide(0);
  });

  const identity = document.querySelector(".identity-art");
  const animationToggle = document.querySelector(".animation-toggle");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (identity && animationToggle) {
    animationToggle.addEventListener("click", function () {
      const paused = identity.classList.toggle("is-paused");
      animationToggle.setAttribute("aria-pressed", String(paused));
      animationToggle.textContent = paused ? "Reanudar animación" : "Pausar animación";
    });

    identity.addEventListener("pointermove", function (event) {
      if (reducedMotion.matches || identity.classList.contains("is-paused") || event.pointerType !== "mouse") return;
      const rect = identity.getBoundingClientRect();
      identity.style.setProperty("--tilt-x", ((0.5 - (event.clientY - rect.top) / rect.height) * 8) + "deg");
      identity.style.setProperty("--tilt-y", (((event.clientX - rect.left) / rect.width - 0.5) * 8) + "deg");
    });
    identity.addEventListener("pointerleave", function () {
      identity.style.removeProperty("--tilt-x");
      identity.style.removeProperty("--tilt-y");
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        identity.classList.toggle("is-offscreen", !entries[0].isIntersecting);
      }).observe(identity);
    }
  }

  updateActiveSection();
})();
