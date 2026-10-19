const themeToggle = document.querySelector("#themeToggle");
const root = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');

function updateThemeUI() {
  const isDark = root.dataset.theme !== "light";

  if (themeToggle) {
    themeToggle.textContent = isDark
      ? "[DARK] / LIGHT"
      : "DARK / [LIGHT]";

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  if (themeColor) {
    themeColor.setAttribute("content", isDark ? "#090909" : "#ffffff");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      root.dataset.theme === "light" ? "dark" : "light";

    root.dataset.theme = nextTheme;

    try {
      localStorage.setItem("chrysalis-theme", nextTheme);
    } catch (error) {}

    updateThemeUI();
  });
}

updateThemeUI();

const faviconHref = "/favicon.png?v=2";
const standardFavicon = document.querySelector('link[rel="icon"]');
if (standardFavicon) {
  standardFavicon.href = faviconHref;
  standardFavicon.type = "image/png";
  standardFavicon.sizes = "64x64";
}

if (!document.querySelector('link[rel="shortcut icon"]')) {
  const shortcutIcon = document.createElement("link");
  shortcutIcon.rel = "shortcut icon";
  shortcutIcon.href = faviconHref;
  document.head.appendChild(shortcutIcon);
}

if (!document.querySelector('link[rel="apple-touch-icon"]')) {
  const appleTouchIcon = document.createElement("link");
  appleTouchIcon.rel = "apple-touch-icon";
  appleTouchIcon.href = faviconHref;
  document.head.appendChild(appleTouchIcon);
}

const polishStylesheet = document.createElement("link");
polishStylesheet.rel = "stylesheet";
polishStylesheet.href = "polish.css?v=5";
document.head.appendChild(polishStylesheet);

const polishScript = document.createElement("script");
polishScript.src = "polish.js?v=5";
polishScript.async = false;
document.body.appendChild(polishScript);
