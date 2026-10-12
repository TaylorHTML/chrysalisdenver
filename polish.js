(() => {
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
