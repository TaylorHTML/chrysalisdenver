window.CHRYSALIS_CONFIG = {
  calendar: {
    calendarId: "chrysalisdenver@gmail.com",
    apiKey: "AIzaSyDnzuMrK62ZfRVrBGikkmMEJU2DLS7-Nks",
    timeZone: "America/Denver",
    displayStart: "2026-10-01",
    displayEnd: "2026-10-31",
    maxPublicEventsPerDay: 2,
    useGoogleCalendar: true
  },

  photos: {
    source: "cloudinary", // "demo" or "cloudinary"
    cloudName: "pwrhopya",
    tag: "chrysalis-gallery"
  }
};

/* ==========================================================
   TEMPORARY OCTOBER GOOGLE CALENDAR FALLBACK + HERO TUNING

   If apiKey is blank, the site temporarily shows Google's embedded calendar.
   As soon as a browser-restricted Calendar API key is added above, this block
   stops inserting the iframe and the existing custom Chrysalis calendar in
   app.js takes over automatically.
   ========================================================== */

(() => {
  const calendar = window.CHRYSALIS_CONFIG.calendar;
  const hasApiKey = Boolean(
    calendar.apiKey &&
    calendar.apiKey.trim() &&
    !calendar.apiKey.includes("YOUR_")
  );

  const style = document.createElement("style");
  style.id = "chrysalis-live-calendar-overrides";
  style.textContent = `
    /* smaller hero */
    .hero-center {
      padding: 3.65rem 0 1.6rem;
    }

    .hero-logo {
      width: min(650px, 68vw);
    }

    .hero-subtitle {
      margin: 1rem 0 1.45rem;
    }

    .gif-marquee {
      max-width: 920px;
    }

    .gif-strip {
      gap: 2rem;
      padding: 9px 1rem;
    }

    .gif-strip img {
      max-width: 120px;
      max-height: 74px;
    }

    .gif-strip img:nth-child(11),
    .gif-strip img:nth-child(12) {
      max-height: 82px;
    }

    @media (max-width: 650px) {
      .hero-center {
        padding: 2.15rem 0 1rem;
      }

      .hero-logo {
        width: 70vw;
      }

      .hero-radioactive {
        width: 48px;
        margin-bottom: .65rem;
      }

      .eyebrow {
        margin-bottom: 1rem;
      }

      .hero-subtitle {
        margin: .75rem 0 1.2rem;
      }

      .gif-marquee {
        width: 94%;
      }

      .gif-strip {
        gap: 1.4rem;
        padding: 7px .75rem;
      }

      .gif-strip img {
        max-width: 86px;
        max-height: 56px;
      }

      .gif-strip img:nth-child(11),
      .gif-strip img:nth-child(12) {
        max-height: 62px;
      }
    }
  `;
  document.head.appendChild(style);

  if (hasApiKey) return;

  const fallbackStyle = document.createElement("style");
  fallbackStyle.id = "chrysalis-google-embed-fallback";
  fallbackStyle.textContent = `
    .google-calendar-embed,
    .google-agenda-embed {
      width: 100%;
      min-width: 0;
      border: 1px solid var(--ink);
      background: var(--panel-bg);
    }

    .google-calendar-embed {
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }

    .google-calendar-embed iframe,
    .google-agenda-embed iframe {
      display: block;
      border: 0;
      background: #fff;
    }

    .google-calendar-embed iframe {
      width: 100%;
      height: 680px;
    }

    .speaker-stage {
      display: grid !important;
      grid-template-columns: 1fr auto 1fr !important;
      grid-template-areas:
        "left smile right"
        "events events events" !important;
      column-gap: 14px !important;
      row-gap: 14px !important;
      align-items: center !important;
    }

    .speaker-left {
      grid-area: left !important;
      justify-self: end !important;
    }

    .speaker-right {
      grid-area: right !important;
      justify-self: start !important;
    }

    .google-agenda-embed {
      grid-area: events !important;
      grid-column: 1 / -1 !important;
      width: 100% !important;
      min-width: 100% !important;
      overflow: hidden;
    }

    .google-agenda-embed iframe {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      height: 620px;
    }

    .calendar-live-note,
    .calendar-usage-note {
      margin: .7rem 0 0;
      color: var(--muted);
      font-family: "Courier New", monospace;
      font-size: 10px;
    }

    .calendar-live-note {
      text-align: right;
    }

    html[data-theme="dark"] .google-calendar-embed iframe,
    html[data-theme="dark"] .google-agenda-embed iframe {
      filter: invert(.92) hue-rotate(180deg) saturate(.82) brightness(.9) contrast(.96);
    }

    @media (max-width: 650px) {
      .google-calendar-embed iframe {
        width: 760px !important;
        min-width: 760px !important;
        max-width: none !important;
        height: 600px;
      }

      .speaker-stage {
        width: 100% !important;
        grid-template-columns: 1fr auto 1fr !important;
        grid-template-areas:
          "left smile right"
          "events events events" !important;
        column-gap: 10px !important;
        row-gap: 10px !important;
      }

      .speaker-smiley {
        grid-area: smile !important;
      }

      .google-agenda-embed {
        grid-area: events !important;
        grid-column: 1 / -1 !important;
        width: 100% !important;
        min-width: 0 !important;
        max-width: 100% !important;
      }

      .google-agenda-embed iframe {
        width: 100% !important;
        min-width: 100% !important;
        max-width: 100% !important;
        height: 540px;
      }

      .calendar-live-note,
      .calendar-usage-note {
        text-align: left;
      }
    }
  `;
  document.head.appendChild(fallbackStyle);

  function compactDate(dateString) {
    return dateString.replaceAll("-", "");
  }

  function buildGoogleCalendarUrl(mode) {
    const params = new URLSearchParams({
      src: calendar.calendarId,
      ctz: calendar.timeZone,
      mode,
      dates: `${compactDate(calendar.displayStart)}/${compactDate(calendar.displayEnd)}`,
      showTitle: "0",
      showNav: "0",
      showPrint: "0",
      showTabs: "0",
      showCalendars: "0",
      showTz: "0"
    });

    return `https://calendar.google.com/calendar/embed?${params.toString()}`;
  }

  const calendarShell = document.querySelector("#calendar .calendar-shell");

  if (calendarShell && !document.querySelector(".google-calendar-embed")) {
    calendarShell.hidden = true;
    calendarShell.setAttribute("aria-hidden", "true");

    const embed = document.createElement("div");
    embed.className = "google-calendar-embed";
    embed.innerHTML = `
      <iframe
        title="Chrysalis October 2026 calendar"
        src="${buildGoogleCalendarUrl("MONTH")}"
        loading="eager"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    `;

    const usageNote = document.createElement("p");
    usageNote.className = "calendar-usage-note";
    usageNote.textContent = window.matchMedia("(max-width: 650px)").matches
      ? "Swipe the calendar left / right to read event names. Full event listings are below."
      : "Full event listings are below under Upcoming events.";

    const liveNote = document.createElement("p");
    liveNote.className = "calendar-live-note";
    liveNote.textContent = "October is live — November is still in progress.";

    calendarShell.insertAdjacentElement("afterend", embed);
    embed.insertAdjacentElement("afterend", usageNote);
    usageNote.insertAdjacentElement("afterend", liveNote);
  }

  const eventsList = document.querySelector("#eventsList");

  if (eventsList && !document.querySelector(".google-agenda-embed")) {
    eventsList.hidden = true;
    eventsList.setAttribute("aria-hidden", "true");

    const agenda = document.createElement("div");
    agenda.className = "google-agenda-embed";
    agenda.innerHTML = `
      <iframe
        title="Chrysalis October 2026 upcoming events"
        src="${buildGoogleCalendarUrl("AGENDA")}"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    `;

    eventsList.insertAdjacentElement("beforebegin", agenda);
  }
})();
