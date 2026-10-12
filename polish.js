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
      Propose a complete show or join the artist pool for future Chrysalis lineups.<br>
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
     Keep the month grid compact. Event days show a clear
     count badge; tapping the whole day reveals readable event
     titles underneath the grid.
     ======================================================== */

  const calendarGrid = document.querySelector("#calendarGrid");
  const calendarTitle = document.querySelector("#calendarTitle");

  if (calendarGrid) {
    let mobileDayPanel = document.querySelector("#mobileDayEvents");

    if (!mobileDayPanel) {
      mobileDayPanel = document.createElement("section");
      mobileDayPanel.id = "mobileDayEvents";
      mobileDayPanel.className = "mobile-day-events";
      mobileDayPanel.setAttribute("aria-live", "polite");
      calendarGrid.insertAdjacentElement("afterend", mobileDayPanel);
    }

    function selectedDateLabel(cell) {
      const day = cell.querySelector(".day-number")?.textContent?.trim() || "";
      const monthYear = calendarTitle?.textContent?.trim() || "";
      return day && monthYear ? `${monthYear} ${day}` : monthYear;
    }

    function showMobileDayEvents(cell) {
      if (window.innerWidth > 650) return;

      const sourceButtons = [...cell.querySelectorAll(".calendar-event-chip")];
      if (!sourceButtons.length) return;

      document.querySelectorAll(".calendar-day.mobile-selected-day").forEach(day => {
        day.classList.remove("mobile-selected-day");
      });
      cell.classList.add("mobile-selected-day");

      mobileDayPanel.innerHTML = "";

      const heading = document.createElement("p");
      heading.className = "mobile-day-events-heading";
      heading.textContent = selectedDateLabel(cell);
      mobileDayPanel.appendChild(heading);

      sourceButtons.forEach(sourceButton => {
        const eventButton = document.createElement("button");
        eventButton.type = "button";
        eventButton.className = "mobile-day-event-button";
        eventButton.textContent = sourceButton.textContent.trim();
        eventButton.addEventListener("click", () => sourceButton.click());
        mobileDayPanel.appendChild(eventButton);
      });

      mobileDayPanel.classList.add("is-open");

      requestAnimationFrame(() => {
        mobileDayPanel.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      });
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
          `${selectedDateLabel(cell)}, ${eventCount} ${eventCount === 1 ? "event" : "events"}. Tap to view.`
        );

        cell.addEventListener("click", event => {
          if (event.target.closest(".calendar-event-chip")) return;
          showMobileDayEvents(cell);
        });

        cell.addEventListener("keydown", event => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          showMobileDayEvents(cell);
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

    window.addEventListener("resize", () => {
      if (window.innerWidth > 650) {
        mobileDayPanel.classList.remove("is-open");
        document.querySelectorAll(".calendar-day.mobile-selected-day").forEach(day => {
          day.classList.remove("mobile-selected-day");
        });
      }
      scheduleEnhancement();
    });

    scheduleEnhancement();
  }
})();
