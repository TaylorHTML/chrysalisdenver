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
