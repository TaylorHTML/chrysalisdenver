window.CHRYSALIS_CONFIG = {
  calendar: {
    // For now the public site uses Google's embed view so Chrysalis can
    // update the calendar without needing an API key. October 2026 is the
    // only month exposed while November is still being worked on.
    useGoogleCalendar: false,
    calendarId: "chrysalisdenver@gmail.com",
    timeZone: "America/Denver",
    displayStart: "2026-10-01",
    displayEnd: "2026-10-31",
    maxPublicEventsPerDay: 2
  },

  photos: {
    source: "cloudinary", // "demo" or "cloudinary"
    cloudName: "pwrhopya",
    tag: "chrysalis-gallery"
  }
};

/* ==========================================================
   TEMPORARY OCTOBER CALENDAR EMBED + HERO TUNING

   The existing custom calendar stays in the DOM (hidden) so app.js keeps
   working normally. The public-facing calendar and upcoming-events areas
   use the venue's live Google Calendar for October 2026.
   ========================================================== */

(() => {
  const calendar = window.CHRYSALIS_CONFIG.calendar;

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

    /* live Google Calendar */
    .google-calendar-embed,
    .google-agenda-embed {
      overflow: hidden;
      border: 1px solid var(--ink);
      background: var(--panel-bg);
    }

    .google-calendar-embed iframe,
    .google-agenda-embed iframe {
      display: block;
      width: 100%;
      border: 0;
      background: #fff;
    }

    .google-calendar-embed iframe {
      height: 680px;
    }

    .google-agenda-embed {
      grid-column: 2;
      min-width: 0;
    }

    .google-agenda-embed iframe {
      height: 510px;
    }

    .calendar-live-note {
      margin: .7rem 0 0;
      color: var(--muted);
      font-family: "Courier New", monospace;
      font-size: 10px;
      text-align: right;
    }

    html[data-theme="dark"] .google-calendar-embed iframe,
    html[data-theme="dark"] .google-agenda-embed iframe {
      filter: invert(.92) hue-rotate(180deg) saturate(.82) brightness(.9) contrast(.96);
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

      .google-calendar-embed iframe {
        height: 560px;
      }

      .google-agenda-embed {
        grid-area: events;
        grid-column: auto;
        width: 100%;
      }

      .google-agenda-embed iframe {
        height: 460px;
      }

      .calendar-live-note {
        text-align: left;
      }
    }
  `;
  document.head.appendChild(style);

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
    // Keep the old custom calendar alive for app.js, but don't show its demo data.
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

    const note = document.createElement("p");
    note.className = "calendar-live-note";
    note.textContent = "October is live — November is still in progress.";

    calendarShell.insertAdjacentElement("afterend", embed);
    embed.insertAdjacentElement("afterend", note);
  }

  const eventsList = document.querySelector("#eventsList");

  if (eventsList && !document.querySelector(".google-agenda-embed")) {
    // app.js can continue rendering into this hidden element without exposing
    // the old sample-event fallback to visitors.
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
