document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const statusCard = document.querySelector("[data-business-status]");
  const statusText = document.querySelector("[data-status-text]");
  const slides = [...document.querySelectorAll("[data-slider] img")];

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  menuToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open") ?? false;
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  if (statusCard && statusText) {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const minutesNow = hour * 60 + minute;
    const openMinutes = 8 * 60;
    const weekdayCloseMinutes = 18 * 60;
    const sundayCloseMinutes = 17 * 60;
    const closeMinutes = day === 0 ? sundayCloseMinutes : weekdayCloseMinutes;
    const isOpen = minutesNow >= openMinutes && minutesNow < closeMinutes;

    statusCard.dataset.open = String(isOpen);
    statusText.textContent = isOpen
      ? "เปิดให้บริการตอนนี้"
      : "ปิดทำการอยู่ตอนนี้";
  }

  if (slides.length > 1) {
    let activeIndex = 0;
    setInterval(() => {
      slides[activeIndex].classList.remove("active");
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex].classList.add("active");
    }, 4200);
  }

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${visible.target.id}`
          );
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
