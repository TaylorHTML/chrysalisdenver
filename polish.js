(() => {
  const heroRadioactive = document.querySelector(".hero-radioactive");
  const heroEyebrow = document.querySelector(".eyebrow");

  if (heroRadioactive) {
    document.querySelectorAll(".gif-strip").forEach(strip => {
      if (strip.querySelector(".banner-radioactive")) return;

      const bannerRadioactive = heroRadioactive.cloneNode();
      bannerRadioactive.className = "banner-radioactive pixel-gif";
      bannerRadioactive.removeAttribute("fetchpriority");
      strip.appendChild(bannerRadioactive);
    });

    heroRadioactive.remove();
  }

  heroEyebrow?.remove();

  const openSlotKey = document.querySelector(".key-open");
  openSlotKey?.closest("span")?.remove();

  const bookingDescription = document.querySelector("#booking .section-heading > p");

  if (bookingDescription) {
    bookingDescription.innerHTML = `
      Propose a complete show or join the artist pool for future Chrysalis lineups. <a href="policies.html">rules + policies</a><br>
      Questions? <a href="mailto:chrysalisdenver@gmail.com">chrysalisdenver@gmail.com</a>
    `;
  }

  const aboutLinks = document.querySelector(".about-links");

  if (aboutLinks) {
    const links = aboutLinks.querySelectorAll("a");
    const instagramLink = links[0];
    const emailLink = links[1];

    if (instagramLink) {
      instagramLink.href = "https://www.instagram.com/chrysalis_denver/";
      instagramLink.textContent = "instagram";
    }

    if (emailLink) {
      emailLink.href = "mailto:chrysalisdenver@gmail.com";
      emailLink.textContent = "chrysalisdenver@gmail.com";
    }
  }

  const dialogDescription = document.querySelector("#dialogDescription");

  function cleanEmptyEventDescription() {
    if (!dialogDescription) return;

    const text = dialogDescription.textContent.trim();

    if (!text || text === "No additional information posted.") {
      dialogDescription.textContent = "";
      dialogDescription.hidden = true;
      return;
    }

    dialogDescription.hidden = false;
  }

  if (dialogDescription) {
    cleanEmptyEventDescription();

    new MutationObserver(cleanEmptyEventDescription).observe(dialogDescription, {
      childList: true,
      characterData: true,
      subtree: true
    });
  }

  /* ========================================================
     MOBILE CALENDAR
     Event days stay compact. Tapping the whole date cell opens
     the existing event-details modal directly.
     ======================================================== */

  const calendarGrid = document.querySelector("#calendarGrid");
  const calendarTitle = document.querySelector("#calendarTitle");

  if (calendarGrid) {
    function selectedDateLabel(cell) {
      const day = cell.querySelector(".day-number")?.textContent?.trim() || "";
      const monthYear = calendarTitle?.textContent?.trim() || "";
      return day && monthYear ? `${monthYear} ${day}` : monthYear;
    }

    function openMobileCalendarEvent(cell) {
      if (window.innerWidth > 650) return;

      const sourceButton = cell.querySelector(".calendar-event-chip");
      if (!sourceButton) return;

      sourceButton.click();
    }

    function enhanceMobileCalendar() {
      const cells = calendarGrid.querySelectorAll(".calendar-day");

      cells.forEach(cell => {
        const sourceButtons = cell.querySelectorAll(".calendar-event-chip");
        const eventCount = sourceButtons.length;
        const isCurrentMonth = !cell.classList.contains("outside-month");

        if (!eventCount || !isCurrentMonth) return;

        if (!cell.querySelector(".mobile-event-count")) {
          const badge = document.createElement("span");
          badge.className = "mobile-event-count";
          badge.textContent = `${eventCount} ${eventCount === 1 ? "EVENT" : "EVENTS"}`;
          cell.appendChild(badge);
        }

        if (cell.dataset.mobileCalendarReady === "true") return;

        cell.dataset.mobileCalendarReady = "true";
        cell.tabIndex = 0;
        cell.setAttribute(
          "aria-label",
          `${selectedDateLabel(cell)}, ${eventCount} ${eventCount === 1 ? "event" : "events"}. Tap to open details.`
        );

        cell.addEventListener("click", event => {
          if (event.target.closest(".calendar-event-chip")) return;
          openMobileCalendarEvent(cell);
        });

        cell.addEventListener("keydown", event => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          openMobileCalendarEvent(cell);
        });
      });
    }

    let enhanceScheduled = false;

    const scheduleEnhancement = () => {
      if (enhanceScheduled) return;
      enhanceScheduled = true;

      requestAnimationFrame(() => {
        enhanceScheduled = false;
        enhanceMobileCalendar();
      });
    };

    new MutationObserver(scheduleEnhancement).observe(calendarGrid, {
      childList: true,
      subtree: true
    });

    window.addEventListener("resize", scheduleEnhancement);
    scheduleEnhancement();
  }
})();
