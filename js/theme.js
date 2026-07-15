/**
 * PREMIUM AI SALES ASSISTANT - THEME MANAGEMENT (theme.js)
 * Implements instant toggle, system pref fallback, and zero-flicker rendering
 */

(function () {
  // Retrieve saved theme or default to system preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark-mode");
  }
})();

// Document Ready synchronization
document.addEventListener("DOMContentLoaded", () => {
  // Sync body class with html class
  const isDark = document.documentElement.classList.contains("dark-mode");
  if (isDark) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  const themeToggles = document.querySelectorAll(".theme-toggle-checkbox");

  // Sync state of any checkboxes found on the page
  themeToggles.forEach(toggle => {
    toggle.checked = isDark;
  });

  // Attach event listener to toggles
  themeToggles.forEach(toggle => {
    toggle.addEventListener("change", function () {
      if (this.checked) {
        document.documentElement.classList.add("dark-mode");
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark-mode");
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
      
      // Keep all checkboxes synced across the page if multiple exist
      themeToggles.forEach(t => {
        if (t !== this) t.checked = this.checked;
      });
    });
  });
});
