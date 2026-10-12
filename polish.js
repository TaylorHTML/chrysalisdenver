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
})();
